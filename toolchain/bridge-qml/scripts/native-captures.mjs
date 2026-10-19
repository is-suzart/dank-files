import ts from 'typescript';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

/** Only these helpers turn a TypeScript closure into QML code. */
const CLOSURE_FACTORIES = new Set(['qmlExpression', 'qmlHandler']);
const BRIDGE_MODULE = '@nandomo/bridge-qml';
/**
 * Names every QML engine provides, plus the ECMAScript globals of its JS engine.
 * Anything else must come from the file or from the callback itself.
 */
const RUNTIME_GLOBALS = new Set([
  'Qt', 'Quickshell', 'console', 'Math', 'JSON', 'Object', 'Array', 'String', 'Number',
  'Boolean', 'Date', 'RegExp', 'Error', 'TypeError', 'Map', 'Set', 'Symbol', 'Promise',
  'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'encodeURIComponent', 'decodeURIComponent',
  'encodeURI', 'decodeURI', 'Infinity', 'NaN', 'undefined',
]);

function bindingNames(name, into) {
  if (!name) return;
  if (ts.isIdentifier(name)) into.add(name.text);
  else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name))
    for (const element of name.elements) bindingNames(element.name, into);
}

/** A file-level \`declare let Qt: any\` describes the QML scope of that view. */
function ambientNames(tree) {
  const names = new Set();
  const declared = (node) => node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.DeclareKeyword) === true;
  for (const statement of tree.statements) {
    if (!declared(statement)) continue;
    if (ts.isVariableStatement(statement))
      for (const declaration of statement.declarationList.declarations) bindingNames(declaration.name, names);
    else if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) bindingNames(statement.name, names);
  }
  return names;
}

/** Local names of the closure factories, including an aliased import. */
function factoryNames(tree) {
  const names = new Set();
  for (const statement of tree.statements) {
    if (!ts.isImportDeclaration(statement) || statement.moduleSpecifier.text !== BRIDGE_MODULE) continue;
    const bindings = statement.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements)
      if (CLOSURE_FACTORIES.has(element.propertyName?.text ?? element.name.text)) names.add(element.name.text);
  }
  return names;
}

function isTypeOnly(identifier) {
  for (let node = identifier.parent; node; node = node.parent) {
    if (ts.isTypeNode(node)) return true;
    if (ts.isExpression(node)) return false;
  }
  return false;
}

/** Identifiers that name something instead of reading a value. */
function isDeclarationName(identifier) {
  const parent = identifier.parent;
  if (!parent) return true;
  if (ts.isPropertyAccessExpression(parent)) return parent.name === identifier;
  if (parent.name === identifier && (ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent)
    || ts.isPropertyDeclaration(parent) || ts.isMethodSignature(parent) || ts.isEnumMember(parent))) return true;
  if ((ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isBindingElement(parent))
    && parent.name === identifier) return true;
  if (ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent) || ts.isClassDeclaration(parent)
    || ts.isClassExpression(parent) || ts.isMethodDeclaration(parent)) return parent.name === identifier;
  if (ts.isLabeledStatement(parent) || ts.isBreakStatement(parent) || ts.isContinueStatement(parent)) return parent.label === identifier;
  if (ts.isImportSpecifier(parent) || ts.isImportClause(parent) || ts.isExportSpecifier(parent) || ts.isNamespaceImport(parent)) return true;
  if (ts.isQualifiedName(parent)) return true;
  if (ts.isJsxOpeningElement(parent) || ts.isJsxClosingElement(parent) || ts.isJsxSelfClosingElement(parent)) return parent.tagName === identifier;
  if (ts.isJsxAttribute(parent)) return parent.name === identifier;
  return false;
}

/** Every binding introduced inside the callback. Over-approximated to avoid false alarms. */
function boundNames(callback) {
  const names = new Set();
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isBindingElement(node)) bindingNames(node.name, names);
    else if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isFunctionExpression(node) || ts.isClassExpression(node)) bindingNames(node.name, names);
    else if (ts.isCatchClause(node) && node.variableDeclaration) bindingNames(node.variableDeclaration.name, names);
    else if (ts.isImportSpecifier(node) || ts.isImportClause(node) || ts.isNamespaceImport(node)) bindingNames(node.name, names);
    ts.forEachChild(node, visit);
  };
  visit(callback);
  return names;
}

const isFunctionLike = (node) => ts.isArrowFunction(node) || ts.isFunctionExpression(node);

/**
 * Free identifiers of a native closure that QML cannot provide. Explicit native
 * references (the first parameter), the QML globals declared by the file and the
 * callback's own parameters and locals are all accepted.
 */
export function nativeCapturesIn(tree, file) {
  const factories = factoryNames(tree);
  if (!factories.size) return [];
  const ambient = ambientNames(tree);
  const findings = [];
  const visit = (node) => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && factories.has(node.expression.text)) {
      const callee = node.expression.text;
      const callback = node.arguments[1];
      const start = callback ? ts.getLineAndCharacterOfPosition(tree, callback.getStart(tree)) : { line: 0, character: 0 };
      const at = { file, line: start.line + 1, column: start.character + 1, callee };
      if (callback && isFunctionLike(callback)) {
        const bound = boundNames(callback);
        const reported = new Set();
        const scan = (inner) => {
          if (ts.isIdentifier(inner) && !bound.has(inner.text) && !ambient.has(inner.text)
            && !RUNTIME_GLOBALS.has(inner.text) && !isDeclarationName(inner) && !isTypeOnly(inner)
            && !reported.has(inner.text)) {
            reported.add(inner.text);
            findings.push({
              ...at, name: inner.text,
              message: callee + ' sends ' + inner.text + ' to QML, but ' + inner.text + ' only exists in TypeScript',
            });
          }
          ts.forEachChild(inner, scan);
        };
        scan(callback);
      } else {
        findings.push({
          ...at, name: null,
          message: callee + ' receives an indirect callback; capture checking needs the literal function',
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return findings.sort((left, right) => left.line - right.line || left.column - right.column);
}

export async function listSourceFiles(root) {
  const result = [];
  const walk = async (directory) => {
    for (const entry of await readdir(directory, { withFileTypes: true }).catch(() => [])) {
      if (['node_modules', '.git', '.nandomo', 'dist'].includes(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (/\.tsx?$/.test(entry.name)) result.push(path);
    }
  };
  await walk(root);
  return result.sort();
}

export async function checkNativeCaptures(root, files) {
  const target = resolve(root);
  const findings = [];
  for (const file of files ?? await listSourceFiles(join(target, 'src'))) {
    const source = await readFile(file, 'utf8');
    const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    for (const finding of nativeCapturesIn(tree, relative(target, file) || file)) findings.push(finding);
  }
  return findings;
}

export function formatNativeCapture(finding) {
  return finding.file + ':' + finding.line + ':' + finding.column + ' - ' + finding.message;
}
