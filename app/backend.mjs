var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// src/infrastructure/locales/fileTools.ts
var fileToolsEn, fileToolsZh, init_fileTools = __esm({
  "src/infrastructure/locales/fileTools.ts"() {
    "use strict";
    fileToolsEn = {
      "Fechar busca": "Close search",
      "Invalid file location": "Invalid file location.",
      "Invalid file clipboard": "The clipboard does not contain valid files.",
      "Invalid clipboard action": "Invalid clipboard action.",
      "Clipboard too large": "The clipboard contents exceed the limit.",
      "Invalid clipboard format": "Invalid clipboard format.",
      "Associados ao tipo de arquivo": "Recommended for this file type",
      "Todos os aplicativos": "All applications",
      "Buscar aplicativo": "Search applications",
      "Diminuir zoom": "Zoom out",
      "Aumentar zoom": "Zoom in",
      "Girar \xE0 esquerda": "Rotate left",
      "Girar \xE0 direita": "Rotate right",
      "Restaurar visualiza\xE7\xE3o": "Reset view",
      "Comando inv\xE1lido.": "Invalid command.",
      "Evento de UI inv\xE1lido.": "Invalid UI event.",
      Configura\u00E7\u00F5es: "Settings",
      Jogos: "Games",
      "Biblioteca \xB7 {name}": "Library \xB7 {name}",
      "Prefixo \xB7 {name}": "Prefix \xB7 {name}",
      "\xC1rea de trabalho": "Desktop",
      Downloads: "Downloads",
      Documentos: "Documents",
      Imagens: "Pictures",
      M\u00FAsicas: "Music",
      V\u00EDdeos: "Videos",
      Projetos: "Projects",
      "Buscando\u2026": "Searching\u2026",
      "Limite: 10.000 resultados": "Limit: 10,000 results",
      "Ordem decrescente": "Descending order",
      "Ordem crescente": "Ascending order",
      "Sem pr\xE9via para este formato": "No preview for this format",
      "N\xE3o foi poss\xEDvel carregar a pr\xE9via": "Could not load preview",
      "Carregando pr\xE9via\u2026": "Loading preview\u2026",
      "Movendo: {name} \u2192 {destination}": "Moving: {name} \u2192 {destination}",
      "Copiando: {name} \u2192 {destination}": "Copying: {name} \u2192 {destination}",
      "Transfer\xEAncia indispon\xEDvel.": "File transfer is unavailable.",
      "Escolha um nome diferente.": "Choose a different name.",
      "Substitui\xE7\xE3o indispon\xEDvel.": "Replacement is unavailable.",
      "Aplicativos indispon\xEDveis.": "Applications are unavailable.",
      "Local virtual indispon\xEDvel.": "This virtual location is unavailable.",
      "N\xE3o foi poss\xEDvel consultar volumes.": "Could not read volumes.",
      "Aplicativo inv\xE1lido.": "Invalid application.",
      "N\xE3o foi poss\xEDvel iniciar o aplicativo.": "Could not launch the application.",
      "Lixeira indispon\xEDvel.": "Trash is unavailable.",
      "Aplicativos n\xE3o podem ser alterados nesta visualiza\xE7\xE3o.": "Applications cannot be modified in this view.",
      "Informe a pasta de destino.": "Enter the destination folder.",
      "Local indispon\xEDvel.": "Location is unavailable.",
      "Edi\xE7\xE3o de permiss\xF5es indispon\xEDvel.": "Permission editing is unavailable.",
      "Abra uma pasta para adicion\xE1-la a Locais.": "Open a folder to add it to Places.",
      "Favoritos indispon\xEDveis.": "Bookmarks are unavailable.",
      "Volumes indispon\xEDveis.": "Volumes are unavailable.",
      "Personaliza\xE7\xE3o indispon\xEDvel.": "Customization is unavailable.",
      "Seletor indispon\xEDvel.": "File picker is unavailable.",
      "Editor de texto indispon\xEDvel.": "Text editor is unavailable.",
      "Gerenciador de aplicativos indispon\xEDvel.": "Application manager is unavailable.",
      "Ocultar indispon\xEDvel.": "Hiding is unavailable.",
      "Arrastar arquivos indispon\xEDvel.": "File dragging is unavailable.",
      "Copie arquivos de uma localiza\xE7\xE3o local ou montada.": "Copy files from a local or mounted location.",
      "Renomea\xE7\xE3o em lote indispon\xEDvel.": "Bulk renaming is unavailable.",
      "Compacta\xE7\xE3o indispon\xEDvel.": "Compression is unavailable.",
      "Extra\xE7\xE3o indispon\xEDvel.": "Extraction is unavailable.",
      "O seletor n\xE3o retornou uma URL de arquivo.": "The picker did not return a file URL.",
      "Escolha uma pasta.": "Choose a folder.",
      "Configure um editor padr\xE3o para arquivos de texto.": "Set a default editor for text files.",
      "Editor padr\xE3o n\xE3o encontrado.": "Default editor not found.",
      "Nenhum terminal compat\xEDvel encontrado.": "No supported terminal found.",
      "Este tipo de arquivo n\xE3o pode ser copiado.": "This file type cannot be copied.",
      "O arquivo compactado aponta para fora do destino.": "The archive points outside the destination.",
      "Permiss\xF5es inv\xE1lidas.": "Invalid permissions.",
      "Abra o arquivo original para editar permiss\xF5es.": "Open the original file to edit permissions.",
      "Substitui\xE7\xE3o dispon\xEDvel somente entre arquivos comuns. Renomeie pastas ou links.": "Only regular files can be replaced. Rename folders or links.",
      "O destino mudou. Tente novamente.": "The destination changed. Try again.",
      "N\xE3o foi poss\xEDvel abrir o arquivo.": "Could not open the file.",
      "Dispositivo indispon\xEDvel.": "Device is unavailable.",
      "Item fora da lixeira.": "Item is outside the trash.",
      "Item da lixeira n\xE3o existe.": "Trash item no longer exists.",
      "Metadados da lixeira inv\xE1lidos.": "Invalid trash metadata.",
      "Local original indispon\xEDvel.": "Original location is unavailable.",
      "Local original inv\xE1lido.": "Invalid original location.",
      "Local virtual desconhecido.": "Unknown virtual location.",
      "J\xE1 existe um item com esse nome. Escolha como continuar.": "An item with this name already exists. Choose how to continue.",
      "Lixeira parcialmente processada: {count} conclu\xEDdo(s), {reasons}": "Trash operation incomplete: {count} completed; {reasons}",
      "Restaurado, mas os metadados ficaram: {reason}": "Restored, but metadata could not be removed: {reason}",
      "Renomea\xE7\xE3o incompleta. Arquivos preservados em: {paths}": "Rename incomplete. Files were preserved at: {paths}",
      "Desktop clipboard unavailable": "Desktop clipboard is unavailable.",
      "Desktop integration unavailable": "Desktop integration is unavailable.",
      "Desktop integration closed": "Desktop integration has closed.",
      "Desktop request timed out": "The desktop request timed out.",
      "A localiza\xE7\xE3o requer um backend GVfs com acesso FUSE.": "This location requires a GVfs backend with FUSE access.",
      "Buscar nesta pasta\u2026": "Search this folder\u2026",
      "Buscar arquivos": "Search files",
      Subpastas: "Subfolders",
      Limpar: "Clear",
      Restaurar: "Restore",
      "Esvaziar\u2026": "Empty\u2026",
      Desfazer: "Undo",
      A\u00E7\u00F5es: "Actions",
      "Compactar\u2026": "Compress\u2026",
      "Extrair\u2026": "Extract\u2026",
      "Renomear em lote\u2026": "Bulk rename\u2026",
      Compactar: "Compress",
      Extrair: "Extract",
      "Renomear em lote": "Bulk rename",
      "Esvaziar lixeira": "Empty trash",
      Confirmar: "Confirm",
      "Excluir permanentemente": "Delete permanently",
      "Excluir permanentemente {count} itens da lixeira? Esta a\xE7\xE3o n\xE3o pode ser desfeita.": "Permanently delete {count} items from the trash? This cannot be undone.",
      "Use {name} para o nome original e {n} para numerar. A extens\xE3o \xE9 preservada.": "Use {name} for the original name and {n} for numbering. Extensions are preserved.",
      "Informe o nome no diret\xF3rio atual. ZIP e TAR.GZ s\xE3o suportados para compacta\xE7\xE3o.": "Enter a name in the current folder. ZIP and TAR.GZ are supported for compression.",
      "Opera\xE7\xE3o cancelada. Itens j\xE1 conclu\xEDdos foram preservados.": "Operation cancelled. Completed items were preserved.",
      "J\xE1 existe um item com esse nome. Nada foi substitu\xEDdo.": "An item with this name already exists. Nothing was replaced.",
      "J\xE1 existe um item com esse nome.": "An item with this name already exists.",
      "Informe um nome sem separadores de diret\xF3rio.": "Enter a name without directory separators.",
      "Aguarde o fim da opera\xE7\xE3o atual.": "Wait for the current operation to finish.",
      "Escolha uma pasta de destino.": "Choose a destination folder.",
      "Selecione um item para transferir.": "Select an item to transfer.",
      "A origem mudou durante a c\xF3pia. Tente novamente.": "The source changed while copying. Try again.",
      "O item mudou desde a opera\xE7\xE3o. Nada foi desfeito.": "The item changed since the operation. Nothing was undone.",
      "Um item mudou desde a renomea\xE7\xE3o. Nada foi desfeito.": "An item changed since renaming. Nothing was undone.",
      "Use .zip ou .tar.gz.": "Use .zip or .tar.gz.",
      "Selecione itens da mesma pasta.": "Select items from the same folder.",
      "Abra a pasta original para esta opera\xE7\xE3o.": "Open the original folder for this operation.",
      "Selecione um arquivo compactado.": "Select an archive.",
      "Use {name} para o nome original e/ou {n} para a sequ\xEAncia.": "Use {name} for the original name and/or {n} for numbering.",
      "Os novos nomes n\xE3o podem ser repetidos.": "The new names must be unique.",
      "O destino foi copiado, mas a origem mudou e foi preservada.": "The destination was copied, but the source changed and was preserved.",
      "N\xE3o \xE9 poss\xEDvel transferir uma pasta para dentro dela mesma.": "A folder cannot be transferred into itself.",
      "Origem e destino s\xE3o iguais.": "Source and destination are the same.",
      "Abra uma pasta para criar um item.": "Open a folder to create an item.",
      "Abra a pasta original para renomear este item.": "Open the original folder to rename this item.",
      "Abra uma pasta para transferir este item.": "Open a folder to transfer this item.",
      "Abra a pasta original para recortar este item.": "Open the original folder to cut this item.",
      "Instale GVfs para abrir locais de rede.": "Install GVfs to open network locations."
    }, fileToolsZh = {
      "Fechar busca": "\u5173\u95ED\u641C\u7D22",
      "Invalid file location": "\u65E0\u6548\u7684\u6587\u4EF6\u4F4D\u7F6E\u3002",
      "Invalid file clipboard": "\u526A\u8D34\u677F\u4E2D\u6CA1\u6709\u6709\u6548\u6587\u4EF6\u3002",
      "Invalid clipboard action": "\u65E0\u6548\u7684\u526A\u8D34\u677F\u64CD\u4F5C\u3002",
      "Clipboard too large": "\u526A\u8D34\u677F\u5185\u5BB9\u8D85\u51FA\u4E0A\u9650\u3002",
      "Invalid clipboard format": "\u65E0\u6548\u7684\u526A\u8D34\u677F\u683C\u5F0F\u3002",
      "Associados ao tipo de arquivo": "\u6B64\u6587\u4EF6\u7C7B\u578B\u7684\u63A8\u8350\u5E94\u7528",
      "Todos os aplicativos": "\u6240\u6709\u5E94\u7528\u7A0B\u5E8F",
      "Buscar aplicativo": "\u641C\u7D22\u5E94\u7528\u7A0B\u5E8F",
      "Diminuir zoom": "\u7F29\u5C0F",
      "Aumentar zoom": "\u653E\u5927",
      "Girar \xE0 esquerda": "\u5411\u5DE6\u65CB\u8F6C",
      "Girar \xE0 direita": "\u5411\u53F3\u65CB\u8F6C",
      "Restaurar visualiza\xE7\xE3o": "\u91CD\u7F6E\u89C6\u56FE",
      "Comando inv\xE1lido.": "\u65E0\u6548\u7684\u547D\u4EE4\u3002",
      "Evento de UI inv\xE1lido.": "\u65E0\u6548\u7684\u754C\u9762\u4E8B\u4EF6\u3002",
      Configura\u00E7\u00F5es: "\u8BBE\u7F6E",
      Jogos: "\u6E38\u620F",
      "Biblioteca \xB7 {name}": "\u6E38\u620F\u5E93 \xB7 {name}",
      "Prefixo \xB7 {name}": "\u524D\u7F00 \xB7 {name}",
      "\xC1rea de trabalho": "\u684C\u9762",
      Downloads: "\u4E0B\u8F7D",
      Documentos: "\u6587\u6863",
      Imagens: "\u56FE\u7247",
      M\u00FAsicas: "\u97F3\u4E50",
      V\u00EDdeos: "\u89C6\u9891",
      Projetos: "\u9879\u76EE",
      "Buscando\u2026": "\u6B63\u5728\u641C\u7D22\u2026",
      "Limite: 10.000 resultados": "\u4E0A\u9650\uFF1A10,000 \u4E2A\u7ED3\u679C",
      "Ordem decrescente": "\u964D\u5E8F",
      "Ordem crescente": "\u5347\u5E8F",
      "Sem pr\xE9via para este formato": "\u6B64\u683C\u5F0F\u4E0D\u652F\u6301\u9884\u89C8",
      "N\xE3o foi poss\xEDvel carregar a pr\xE9via": "\u65E0\u6CD5\u52A0\u8F7D\u9884\u89C8",
      "Carregando pr\xE9via\u2026": "\u6B63\u5728\u52A0\u8F7D\u9884\u89C8\u2026",
      "Movendo: {name} \u2192 {destination}": "\u6B63\u5728\u79FB\u52A8\uFF1A{name} \u2192 {destination}",
      "Copiando: {name} \u2192 {destination}": "\u6B63\u5728\u590D\u5236\uFF1A{name} \u2192 {destination}",
      "Transfer\xEAncia indispon\xEDvel.": "\u6587\u4EF6\u4F20\u8F93\u4E0D\u53EF\u7528\u3002",
      "Escolha um nome diferente.": "\u8BF7\u9009\u62E9\u5176\u4ED6\u540D\u79F0\u3002",
      "Substitui\xE7\xE3o indispon\xEDvel.": "\u66FF\u6362\u4E0D\u53EF\u7528\u3002",
      "Aplicativos indispon\xEDveis.": "\u5E94\u7528\u7A0B\u5E8F\u4E0D\u53EF\u7528\u3002",
      "Local virtual indispon\xEDvel.": "\u6B64\u865A\u62DF\u4F4D\u7F6E\u4E0D\u53EF\u7528\u3002",
      "N\xE3o foi poss\xEDvel consultar volumes.": "\u65E0\u6CD5\u8BFB\u53D6\u5377\u3002",
      "Aplicativo inv\xE1lido.": "\u65E0\u6548\u7684\u5E94\u7528\u7A0B\u5E8F\u3002",
      "N\xE3o foi poss\xEDvel iniciar o aplicativo.": "\u65E0\u6CD5\u542F\u52A8\u5E94\u7528\u7A0B\u5E8F\u3002",
      "Lixeira indispon\xEDvel.": "\u56DE\u6536\u7AD9\u4E0D\u53EF\u7528\u3002",
      "Aplicativos n\xE3o podem ser alterados nesta visualiza\xE7\xE3o.": "\u65E0\u6CD5\u5728\u6B64\u89C6\u56FE\u4E2D\u4FEE\u6539\u5E94\u7528\u7A0B\u5E8F\u3002",
      "Informe a pasta de destino.": "\u8BF7\u8F93\u5165\u76EE\u6807\u6587\u4EF6\u5939\u3002",
      "Local indispon\xEDvel.": "\u4F4D\u7F6E\u4E0D\u53EF\u7528\u3002",
      "Edi\xE7\xE3o de permiss\xF5es indispon\xEDvel.": "\u6743\u9650\u7F16\u8F91\u4E0D\u53EF\u7528\u3002",
      "Abra uma pasta para adicion\xE1-la a Locais.": "\u8BF7\u6253\u5F00\u6587\u4EF6\u5939\u4EE5\u5C06\u5176\u6DFB\u52A0\u5230\u4F4D\u7F6E\u3002",
      "Favoritos indispon\xEDveis.": "\u4E66\u7B7E\u4E0D\u53EF\u7528\u3002",
      "Volumes indispon\xEDveis.": "\u5377\u4E0D\u53EF\u7528\u3002",
      "Personaliza\xE7\xE3o indispon\xEDvel.": "\u81EA\u5B9A\u4E49\u4E0D\u53EF\u7528\u3002",
      "Seletor indispon\xEDvel.": "\u6587\u4EF6\u9009\u62E9\u5668\u4E0D\u53EF\u7528\u3002",
      "Editor de texto indispon\xEDvel.": "\u6587\u672C\u7F16\u8F91\u5668\u4E0D\u53EF\u7528\u3002",
      "Gerenciador de aplicativos indispon\xEDvel.": "\u5E94\u7528\u7A0B\u5E8F\u7BA1\u7406\u5668\u4E0D\u53EF\u7528\u3002",
      "Ocultar indispon\xEDvel.": "\u9690\u85CF\u64CD\u4F5C\u4E0D\u53EF\u7528\u3002",
      "Arrastar arquivos indispon\xEDvel.": "\u6587\u4EF6\u62D6\u653E\u4E0D\u53EF\u7528\u3002",
      "Copie arquivos de uma localiza\xE7\xE3o local ou montada.": "\u8BF7\u4ECE\u672C\u5730\u6216\u5DF2\u6302\u8F7D\u7684\u4F4D\u7F6E\u590D\u5236\u6587\u4EF6\u3002",
      "Renomea\xE7\xE3o em lote indispon\xEDvel.": "\u6279\u91CF\u91CD\u547D\u540D\u4E0D\u53EF\u7528\u3002",
      "Compacta\xE7\xE3o indispon\xEDvel.": "\u538B\u7F29\u4E0D\u53EF\u7528\u3002",
      "Extra\xE7\xE3o indispon\xEDvel.": "\u89E3\u538B\u4E0D\u53EF\u7528\u3002",
      "O seletor n\xE3o retornou uma URL de arquivo.": "\u9009\u62E9\u5668\u672A\u8FD4\u56DE\u6587\u4EF6 URL\u3002",
      "Escolha uma pasta.": "\u8BF7\u9009\u62E9\u6587\u4EF6\u5939\u3002",
      "Configure um editor padr\xE3o para arquivos de texto.": "\u8BF7\u4E3A\u6587\u672C\u6587\u4EF6\u8BBE\u7F6E\u9ED8\u8BA4\u7F16\u8F91\u5668\u3002",
      "Editor padr\xE3o n\xE3o encontrado.": "\u672A\u627E\u5230\u9ED8\u8BA4\u7F16\u8F91\u5668\u3002",
      "Nenhum terminal compat\xEDvel encontrado.": "\u672A\u627E\u5230\u652F\u6301\u7684\u7EC8\u7AEF\u3002",
      "Este tipo de arquivo n\xE3o pode ser copiado.": "\u65E0\u6CD5\u590D\u5236\u6B64\u7C7B\u578B\u7684\u6587\u4EF6\u3002",
      "O arquivo compactado aponta para fora do destino.": "\u538B\u7F29\u6587\u4EF6\u6307\u5411\u76EE\u6807\u6587\u4EF6\u5939\u4E4B\u5916\u3002",
      "Permiss\xF5es inv\xE1lidas.": "\u65E0\u6548\u7684\u6743\u9650\u3002",
      "Abra o arquivo original para editar permiss\xF5es.": "\u8BF7\u6253\u5F00\u539F\u6587\u4EF6\u4EE5\u7F16\u8F91\u6743\u9650\u3002",
      "Substitui\xE7\xE3o dispon\xEDvel somente entre arquivos comuns. Renomeie pastas ou links.": "\u53EA\u80FD\u66FF\u6362\u666E\u901A\u6587\u4EF6\u3002\u8BF7\u91CD\u547D\u540D\u6587\u4EF6\u5939\u6216\u94FE\u63A5\u3002",
      "O destino mudou. Tente novamente.": "\u76EE\u6807\u53D1\u751F\u53D8\u5316\uFF0C\u8BF7\u91CD\u8BD5\u3002",
      "N\xE3o foi poss\xEDvel abrir o arquivo.": "\u65E0\u6CD5\u6253\u5F00\u6587\u4EF6\u3002",
      "Dispositivo indispon\xEDvel.": "\u8BBE\u5907\u4E0D\u53EF\u7528\u3002",
      "Item fora da lixeira.": "\u9879\u76EE\u4E0D\u5728\u56DE\u6536\u7AD9\u4E2D\u3002",
      "Item da lixeira n\xE3o existe.": "\u56DE\u6536\u7AD9\u4E2D\u7684\u9879\u76EE\u5DF2\u4E0D\u5B58\u5728\u3002",
      "Metadados da lixeira inv\xE1lidos.": "\u56DE\u6536\u7AD9\u5143\u6570\u636E\u65E0\u6548\u3002",
      "Local original indispon\xEDvel.": "\u539F\u4F4D\u7F6E\u4E0D\u53EF\u7528\u3002",
      "Local original inv\xE1lido.": "\u539F\u4F4D\u7F6E\u65E0\u6548\u3002",
      "Local virtual desconhecido.": "\u672A\u77E5\u7684\u865A\u62DF\u4F4D\u7F6E\u3002",
      "J\xE1 existe um item com esse nome. Escolha como continuar.": "\u5DF2\u5B58\u5728\u540C\u540D\u9879\u76EE\uFF0C\u8BF7\u9009\u62E9\u5982\u4F55\u7EE7\u7EED\u3002",
      "Lixeira parcialmente processada: {count} conclu\xEDdo(s), {reasons}": "\u56DE\u6536\u7AD9\u64CD\u4F5C\u672A\u5B8C\u6210\uFF1A\u5DF2\u5B8C\u6210 {count} \u9879\uFF1B{reasons}",
      "Restaurado, mas os metadados ficaram: {reason}": "\u5DF2\u8FD8\u539F\uFF0C\u4F46\u65E0\u6CD5\u5220\u9664\u5143\u6570\u636E\uFF1A{reason}",
      "Renomea\xE7\xE3o incompleta. Arquivos preservados em: {paths}": "\u91CD\u547D\u540D\u672A\u5B8C\u6210\u3002\u6587\u4EF6\u4FDD\u7559\u4E8E\uFF1A{paths}",
      "Desktop clipboard unavailable": "\u684C\u9762\u526A\u8D34\u677F\u4E0D\u53EF\u7528\u3002",
      "Desktop integration unavailable": "\u684C\u9762\u96C6\u6210\u4E0D\u53EF\u7528\u3002",
      "Desktop integration closed": "\u684C\u9762\u96C6\u6210\u5DF2\u5173\u95ED\u3002",
      "Desktop request timed out": "\u684C\u9762\u8BF7\u6C42\u8D85\u65F6\u3002",
      "A localiza\xE7\xE3o requer um backend GVfs com acesso FUSE.": "\u6B64\u4F4D\u7F6E\u9700\u8981\u652F\u6301 FUSE \u8BBF\u95EE\u7684 GVfs \u540E\u7AEF\u3002",
      "Buscar nesta pasta\u2026": "\u641C\u7D22\u6B64\u6587\u4EF6\u5939\u2026",
      "Buscar arquivos": "\u641C\u7D22\u6587\u4EF6",
      Subpastas: "\u5B50\u6587\u4EF6\u5939",
      Limpar: "\u6E05\u9664",
      Restaurar: "\u8FD8\u539F",
      "Esvaziar\u2026": "\u6E05\u7A7A\u2026",
      Desfazer: "\u64A4\u9500",
      A\u00E7\u00F5es: "\u64CD\u4F5C",
      "Compactar\u2026": "\u538B\u7F29\u2026",
      "Extrair\u2026": "\u89E3\u538B\u2026",
      "Renomear em lote\u2026": "\u6279\u91CF\u91CD\u547D\u540D\u2026",
      Compactar: "\u538B\u7F29",
      Extrair: "\u89E3\u538B",
      "Renomear em lote": "\u6279\u91CF\u91CD\u547D\u540D",
      "Esvaziar lixeira": "\u6E05\u7A7A\u56DE\u6536\u7AD9",
      Confirmar: "\u786E\u8BA4",
      "Excluir permanentemente": "\u6C38\u4E45\u5220\u9664",
      "Excluir permanentemente {count} itens da lixeira? Esta a\xE7\xE3o n\xE3o pode ser desfeita.": "\u6C38\u4E45\u5220\u9664\u56DE\u6536\u7AD9\u4E2D\u7684 {count} \u4E2A\u9879\u76EE\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002",
      "Use {name} para o nome original e {n} para numerar. A extens\xE3o \xE9 preservada.": "\u4F7F\u7528 {name} \u8868\u793A\u539F\u540D\u79F0\uFF0C{n} \u8868\u793A\u5E8F\u53F7\u3002\u4FDD\u7559\u6587\u4EF6\u6269\u5C55\u540D\u3002",
      "Informe o nome no diret\xF3rio atual. ZIP e TAR.GZ s\xE3o suportados para compacta\xE7\xE3o.": "\u8F93\u5165\u5F53\u524D\u6587\u4EF6\u5939\u4E2D\u7684\u540D\u79F0\u3002\u652F\u6301 ZIP \u548C TAR.GZ \u538B\u7F29\u3002",
      "Opera\xE7\xE3o cancelada. Itens j\xE1 conclu\xEDdos foram preservados.": "\u64CD\u4F5C\u5DF2\u53D6\u6D88\u3002\u5DF2\u5B8C\u6210\u7684\u9879\u76EE\u5DF2\u4FDD\u7559\u3002",
      "J\xE1 existe um item com esse nome. Nada foi substitu\xEDdo.": "\u5DF2\u5B58\u5728\u540C\u540D\u9879\u76EE\uFF0C\u672A\u66FF\u6362\u4EFB\u4F55\u5185\u5BB9\u3002",
      "J\xE1 existe um item com esse nome.": "\u5DF2\u5B58\u5728\u540C\u540D\u9879\u76EE\u3002",
      "Informe um nome sem separadores de diret\xF3rio.": "\u8BF7\u8F93\u5165\u4E0D\u542B\u76EE\u5F55\u5206\u9694\u7B26\u7684\u540D\u79F0\u3002",
      "Aguarde o fim da opera\xE7\xE3o atual.": "\u8BF7\u7B49\u5F85\u5F53\u524D\u64CD\u4F5C\u5B8C\u6210\u3002",
      "Escolha uma pasta de destino.": "\u8BF7\u9009\u62E9\u76EE\u6807\u6587\u4EF6\u5939\u3002",
      "Selecione um item para transferir.": "\u8BF7\u9009\u62E9\u8981\u4F20\u8F93\u7684\u9879\u76EE\u3002",
      "A origem mudou durante a c\xF3pia. Tente novamente.": "\u6E90\u6587\u4EF6\u5728\u590D\u5236\u8FC7\u7A0B\u4E2D\u53D1\u751F\u53D8\u5316\uFF0C\u8BF7\u91CD\u8BD5\u3002",
      "O item mudou desde a opera\xE7\xE3o. Nada foi desfeito.": "\u9879\u76EE\u5728\u64CD\u4F5C\u540E\u53D1\u751F\u53D8\u5316\uFF0C\u672A\u64A4\u9500\u4EFB\u4F55\u5185\u5BB9\u3002",
      "Um item mudou desde a renomea\xE7\xE3o. Nada foi desfeito.": "\u9879\u76EE\u5728\u91CD\u547D\u540D\u540E\u53D1\u751F\u53D8\u5316\uFF0C\u672A\u64A4\u9500\u4EFB\u4F55\u5185\u5BB9\u3002",
      "Use .zip ou .tar.gz.": "\u8BF7\u4F7F\u7528 .zip \u6216 .tar.gz\u3002",
      "Selecione itens da mesma pasta.": "\u8BF7\u9009\u62E9\u540C\u4E00\u6587\u4EF6\u5939\u4E2D\u7684\u9879\u76EE\u3002",
      "Abra a pasta original para esta opera\xE7\xE3o.": "\u8BF7\u6253\u5F00\u539F\u6587\u4EF6\u5939\u4EE5\u6267\u884C\u6B64\u64CD\u4F5C\u3002",
      "Selecione um arquivo compactado.": "\u8BF7\u9009\u62E9\u538B\u7F29\u6587\u4EF6\u3002",
      "Use {name} para o nome original e/ou {n} para a sequ\xEAncia.": "\u4F7F\u7528 {name} \u8868\u793A\u539F\u540D\u79F0\uFF0C{n} \u8868\u793A\u5E8F\u53F7\u3002",
      "Os novos nomes n\xE3o podem ser repetidos.": "\u65B0\u540D\u79F0\u4E0D\u80FD\u91CD\u590D\u3002",
      "O destino foi copiado, mas a origem mudou e foi preservada.": "\u76EE\u6807\u5DF2\u590D\u5236\uFF0C\u4F46\u6E90\u6587\u4EF6\u53D1\u751F\u53D8\u5316\uFF0C\u56E0\u6B64\u5DF2\u4FDD\u7559\u3002",
      "N\xE3o \xE9 poss\xEDvel transferir uma pasta para dentro dela mesma.": "\u65E0\u6CD5\u5C06\u6587\u4EF6\u5939\u4F20\u8F93\u5230\u5176\u81EA\u8EAB\u5185\u90E8\u3002",
      "Origem e destino s\xE3o iguais.": "\u6E90\u4F4D\u7F6E\u548C\u76EE\u6807\u4F4D\u7F6E\u76F8\u540C\u3002",
      "Abra uma pasta para criar um item.": "\u8BF7\u6253\u5F00\u6587\u4EF6\u5939\u4EE5\u521B\u5EFA\u9879\u76EE\u3002",
      "Abra a pasta original para renomear este item.": "\u8BF7\u6253\u5F00\u539F\u6587\u4EF6\u5939\u4EE5\u91CD\u547D\u540D\u6B64\u9879\u76EE\u3002",
      "Abra uma pasta para transferir este item.": "\u8BF7\u6253\u5F00\u6587\u4EF6\u5939\u4EE5\u4F20\u8F93\u6B64\u9879\u76EE\u3002",
      "Abra a pasta original para recortar este item.": "\u8BF7\u6253\u5F00\u539F\u6587\u4EF6\u5939\u4EE5\u526A\u5207\u6B64\u9879\u76EE\u3002",
      "Instale GVfs para abrir locais de rede.": "\u8BF7\u5B89\u88C5 GVfs \u4EE5\u6253\u5F00\u7F51\u7EDC\u4F4D\u7F6E\u3002"
    };
  }
});

// ../../packages/core/src/runtime.ts
function getActiveSub() {
  return activeSub;
}
function withActiveSub(sub, fn) {
  let prev = activeSub;
  activeSub = sub;
  try {
    return fn();
  } finally {
    activeSub = prev;
  }
}
function enqueueWatcher(watcher, run) {
  (watcher._computed ? derivedJobs : effectJobs).set(watcher, run), !transactionDepth && !flushing && flushNotifications();
}
function enqueueListener(key, run) {
  listenerJobs.set(key, run);
}
function notificationTransaction(fn) {
  transactionDepth++;
  try {
    return fn();
  } finally {
    transactionDepth--, !transactionDepth && !flushing && flushNotifications();
  }
}
function flushNotifications() {
  flushing = !0;
  let errors = [];
  try {
    for (; derivedJobs.size || effectJobs.size || listenerJobs.size; ) {
      let queue = derivedJobs.size ? derivedJobs : effectJobs.size ? effectJobs : listenerJobs, [key, run] = queue.entries().next().value;
      queue.delete(key);
      try {
        run();
      } catch (error) {
        errors.push(error);
      }
    }
  } finally {
    flushing = !1;
  }
  if (errors.length === 1) throw errors[0];
  if (errors.length) throw new AggregateError(errors, "[nandomo/core] notification failures");
}
var activeSub, transactionDepth, flushing, derivedJobs, effectJobs, listenerJobs, init_runtime = __esm({
  "../../packages/core/src/runtime.ts"() {
    "use strict";
    activeSub = null;
    transactionDepth = 0, flushing = !1, derivedJobs = /* @__PURE__ */ new Map(), effectJobs = /* @__PURE__ */ new Map(), listenerJobs = /* @__PURE__ */ new Map();
  }
});

// ../../packages/core/src/signal.ts
function signal(initial) {
  let node2 = new SignalNode(initial), callable = (() => node2.read());
  return callable.peek = () => node2.peek(), callable.set = (next) => node2.set(next), callable.update = (fn) => node2.update(fn), callable.subscribe = (fn) => node2.subscribe(fn), callable.with_name = (name) => (node2.name = name, callable), Object.defineProperty(callable, "id", {
    get: () => node2.id,
    enumerable: !0
  }), Object.defineProperty(callable, "name", {
    get: () => node2.name,
    enumerable: !0
  }), Object.defineProperty(callable, "subscriberCount", {
    get: () => node2.subscriberCount,
    enumerable: !0
  }), callable;
}
var __signalId, SignalNode, init_signal = __esm({
  "../../packages/core/src/signal.ts"() {
    "use strict";
    init_runtime();
    __signalId = 0, SignalNode = class {
      constructor(_value) {
        this._value = _value;
        this.id = ++__signalId;
      }
      _value;
      /** Watchers that depend on this signal. Deduplicated by identity. */
      _watchers = /* @__PURE__ */ new Set();
      /** External subscribers (e.g. from `subscribe(fn)`). Deduplicated by fn. */
      _externalListeners = /* @__PURE__ */ new Set();
      /** True iff `_value` changed since the last drain (batch only). */
      _pending = !1;
      _previous;
      id;
      name;
      /** Read + track. */
      read() {
        let sub = getActiveSub();
        return sub && (this._watchers.add(sub), sub._addSource(this)), this._value;
      }
      /** Read without tracking. */
      peek() {
        return this._value;
      }
      /** Replace and notify synchronously (when changed). */
      set(next) {
        if (Object.is(this._value, next)) return;
        let prev = this._value;
        this._value = next, notificationTransaction(() => {
          this._pending || (this._pending = !0, this._previous = prev, enqueueListener(this, () => {
            let previous = this._previous, next2 = this._value;
            if (this._pending = !1, !Object.is(next2, previous))
              for (let listener of Array.from(this._externalListeners)) listener(next2, previous);
          })), this._prune();
          for (let watcher of Array.from(this._watchers)) watcher.schedule();
        });
      }
      /** Functional update. */
      update(fn) {
        this.set(fn(this._value));
      }
      /**
       * External subscription — fires after internal watchers
       * (effects / computeds) have re-run. Batches emit the final and initial values. Returns an unsubscribe function.
       *
       * Use this from non-reactive contexts (e.g. `model()` wiring its
       * `<name>Change` output). Inside an effect, prefer `signal()` to register
       * a tracked dep.
       */
      subscribe(fn) {
        return this._externalListeners.add(fn), () => {
          this._externalListeners.delete(fn);
        };
      }
      /** Prune dead watchers. */
      _prune() {
        for (let w of Array.from(this._watchers))
          w._disposed && this._watchers.delete(w);
      }
      // --- ReactiveNode --------------------------------------------------------
      _removeWatcher(w) {
        this._watchers.delete(w);
      }
      /** Number of live subscribers — used by tests + devtools. */
      get subscriberCount() {
        return this._prune(), this._watchers.size;
      }
    };
  }
});

// ../../packages/core/src/dialog.ts
function Dialog(props) {
  if (props.open == null || props.title == null) throw new TypeError("[nandomo/core] Dialog requires open and title");
  if (props.onCloseRequest != null && typeof props.onCloseRequest != "function")
    throw new TypeError("[nandomo/core] Dialog.onCloseRequest must be a function");
  return { __dialog: !0, props };
}
function isDialogNode(value2) {
  return typeof value2 == "object" && value2 !== null && value2.__dialog === !0;
}
function readDialogBinding(binding) {
  return typeof binding == "function" ? binding() : binding;
}
function requestDialogClose(props, reason2) {
  readDialogBinding(props.open) && (reason2 === "escape" && !readDialogBinding(props.closeOnEscape ?? !0) || reason2 === "outside" && !readDialogBinding(props.closeOnOutside ?? !1) || props.onCloseRequest?.(reason2));
}
var init_dialog = __esm({
  "../../packages/core/src/dialog.ts"() {
    "use strict";
  }
});

// ../../packages/core/src/scope.ts
function ownCleanup(cleanup) {
  activeScope?.own(cleanup);
}
var Scope, activeScope, init_scope = __esm({
  "../../packages/core/src/scope.ts"() {
    "use strict";
    Scope = class {
      cleanups = [];
      disposed = !1;
      own(cleanup) {
        this.disposed ? cleanup() : this.cleanups.push(cleanup);
      }
      run(fn) {
        if (this.disposed) throw new Error("[nandomo/core] Component scope is disposed");
        let previous = activeScope;
        activeScope = this;
        try {
          return fn();
        } finally {
          activeScope = previous;
        }
      }
      dispose() {
        if (this.disposed) return;
        this.disposed = !0;
        let errors = [];
        for (let cleanup of this.cleanups.splice(0).reverse())
          try {
            cleanup();
          } catch (error) {
            errors.push(error);
          }
        if (errors.length) throw new AggregateError(errors, "Component cleanup failed");
      }
    }, activeScope = null;
  }
});

// ../../packages/core/src/computed.ts
function computed(fn) {
  let node2 = new ComputedNode(fn);
  ownCleanup(() => node2.dispose());
  let callable = (() => node2.read());
  return callable.peek = () => node2.peek(), callable.dispose = () => node2.dispose(), callable;
}
var ComputedNode, init_computed = __esm({
  "../../packages/core/src/computed.ts"() {
    "use strict";
    init_runtime();
    init_scope();
    ComputedNode = class {
      constructor(_fn) {
        this._fn = _fn;
      }
      _fn;
      _computed = !0;
      _value;
      _sources = /* @__PURE__ */ new Set();
      _watchers = /* @__PURE__ */ new Set();
      _initialized = !1;
      _dirty = !0;
      _running = !1;
      _disposed = !1;
      _addSource(source) {
        this._sources.add(source);
      }
      read() {
        let value2 = this.peek(), sub = getActiveSub();
        return sub && sub !== this && (this._watchers.add(sub), sub._addSource(this)), value2;
      }
      peek() {
        if (this._disposed) throw new Error("[nandomo/core] computed read after dispose()");
        if (this._running) throw new Error("[nandomo/core] circular computed dependency");
        return this._dirty && this._recompute(), this._value;
      }
      _recompute() {
        for (let source of this._sources) source._removeWatcher(this);
        this._sources.clear(), this._running = !0;
        try {
          let next = withActiveSub(this, this._fn), changed = this._initialized && !Object.is(next, this._value);
          if (this._value = next, this._initialized = !0, this._dirty = !1, changed)
            for (let watcher of Array.from(this._watchers))
              !watcher._disposed && watcher !== getActiveSub() && watcher.schedule();
        } finally {
          this._running = !1;
        }
      }
      schedule() {
        if (!(this._disposed || this._dirty)) {
          this._dirty = !0;
          for (let watcher of Array.from(this._watchers))
            watcher._computed && watcher.schedule();
          this._watchers.size && enqueueWatcher(this, () => {
            !this._disposed && this._dirty && this._recompute();
          });
        }
      }
      _runFromNotify() {
        this.schedule();
      }
      _removeWatcher(watcher) {
        this._watchers.delete(watcher);
      }
      dispose() {
        if (!this._disposed) {
          this._disposed = !0;
          for (let source of this._sources) source._removeWatcher(this);
          this._sources.clear(), this._watchers.clear();
        }
      }
    };
  }
});

// ../../packages/core/src/effect.ts
function effect(fn) {
  let instance = new EffectInstance(fn);
  ownCleanup(() => instance.dispose());
  try {
    instance.run();
  } catch (error) {
    throw instance.dispose(), error;
  }
  return {
    dispose: () => instance.dispose()
  };
}
var EffectInstance, init_effect = __esm({
  "../../packages/core/src/effect.ts"() {
    "use strict";
    init_runtime();
    init_scope();
    EffectInstance = class {
      constructor(_fn) {
        this._fn = _fn;
      }
      _fn;
      _sources = /* @__PURE__ */ new Set();
      _userCleanup = null;
      _disposed = !1;
      _cancelled = !1;
      _running = !1;
      _addSource(source) {
        this._sources.add(source);
      }
      /** Initial run — invoked synchronously by `effect()`. */
      run() {
        this._cancelled || this._disposed || this._execute();
      }
      /**
       * Called by source `set()`. Effects re-run synchronously (no microtask —
       * per ARCH recon §1.5, mirroring Rust `effect.rs:39-43`). To coalesce
       * multiple sync sets, use `batch(fn)`.
       */
      schedule() {
        this._cancelled || this._disposed || this._running || enqueueWatcher(this, () => {
          !this._disposed && !this._running && this._execute();
        });
      }
      _runFromNotify() {
        this.schedule();
      }
      /** Execute `fn` once with tracking. */
      _execute() {
        if (!(this._cancelled || this._disposed)) {
          if (this._userCleanup) {
            let c = this._userCleanup;
            this._userCleanup = null;
            try {
              c();
            } catch {
            }
            if (this._cancelled) return;
          }
          for (let src of this._sources) src._removeWatcher(this);
          this._sources.clear(), this._running = !0;
          try {
            let maybeCleanup = withActiveSub(this, () => this._fn());
            typeof maybeCleanup == "function" && (this._userCleanup = maybeCleanup);
          } finally {
            this._running = !1;
          }
        }
      }
      _removeWatcher(_w) {
      }
      dispose() {
        if (!this._disposed) {
          if (this._cancelled = !0, this._disposed = !0, this._userCleanup) {
            let c = this._userCleanup;
            this._userCleanup = null;
            try {
              c();
            } catch {
            }
          }
          for (let src of this._sources) src._removeWatcher(this);
          this._sources.clear();
        }
      }
    };
  }
});

// ../../packages/core/src/batch.ts
function batch(fn) {
  return notificationTransaction(fn);
}
var init_batch = __esm({
  "../../packages/core/src/batch.ts"() {
    "use strict";
    init_runtime();
  }
});

// ../../packages/core/src/inputs.ts
function isInputRef(v) {
  return typeof v == "object" && v !== null && v.__input === !0;
}
function isOutputRef(v) {
  return typeof v == "object" && v !== null && v.__output === !0;
}
var init_inputs = __esm({
  "../../packages/core/src/inputs.ts"() {
    "use strict";
    init_signal();
  }
});

// ../../packages/core/src/define-component.ts
function isDefinedComponentRef(value2) {
  return typeof value2 == "object" && value2 !== null && value2.__definedComponent === !0;
}
function defineComponent(options) {
  if (!options.name.trim()) throw new Error("[nandomo/core] Component name is required");
  return Object.assign((props) => ({
    __definedComponent: !0,
    instantiate(target) {
      let view = options.views[target];
      if (!view) throw new Error(`[nandomo/core] ${options.name} has no ${target} view`);
      let scope = new Scope(), mounts = [], mounted2 = !1, disposed = !1, context = {
        onMount: (fn) => {
          mounts.push(fn);
        },
        onUnmount: (fn) => scope.own(fn)
      };
      try {
        let state = scope.run(() => withActiveSub(null, () => options.setup(context)));
        scope.run(() => withActiveSub(null, () => {
          for (let [key, value2] of Object.entries(props)) {
            let field = state[key];
            if (isInputRef(field))
              typeof value2 == "function" ? effect(() => field.set(value2())) : field.set(value2);
            else if (isOutputRef(field)) {
              if (typeof value2 != "function")
                throw new TypeError(`[nandomo/core] ${options.name}.${key} must be an output handler`);
              scope.own(field.subscribe(value2));
            } else
              throw new Error(`[nandomo/core] Unknown prop ${options.name}.${key}`);
          }
        }));
        let platform = options.platforms?.[target], platformState = scope.run(() => withActiveSub(null, () => platform?.setup(state, context)));
        return {
          view: () => scope.run(() => withActiveSub(null, () => view(state, platformState))),
          mount() {
            mounted2 || disposed || (mounted2 = !0, scope.run(() => withActiveSub(null, () => {
              for (let fn of mounts.splice(0)) {
                let cleanup = fn();
                typeof cleanup == "function" && scope.own(cleanup);
              }
            })));
          },
          dispose() {
            disposed = !0, scope.dispose();
          }
        };
      } catch (error) {
        try {
          scope.dispose();
        } catch {
        }
        throw error;
      }
    }
  }), { definition: options });
}
var init_define_component = __esm({
  "../../packages/core/src/define-component.ts"() {
    "use strict";
    init_effect();
    init_inputs();
    init_runtime();
    init_scope();
  }
});

// ../../packages/core/src/capability.ts
var init_capability = __esm({
  "../../packages/core/src/capability.ts"() {
    "use strict";
  }
});

// ../../packages/core/src/component.ts
var init_component = __esm({
  "../../packages/core/src/component.ts"() {
    "use strict";
  }
});

// ../../packages/core/src/lifecycle.ts
var init_lifecycle = __esm({
  "../../packages/core/src/lifecycle.ts"() {
    "use strict";
  }
});

// ../../packages/core/src/ui.ts
function isResponsive(value2) {
  return typeof value2 == "object" && value2 !== null && "base" in value2 && "minWidth" in value2;
}
function node(kind2, props) {
  if (props.grow != null && (!Number.isFinite(props.grow) || props.grow < 0)) throw new Error("grow must be nonnegative");
  return { __spec: !0, kind: kind2, props: { ...props } };
}
var ui, init_ui = __esm({
  "../../packages/core/src/ui.ts"() {
    "use strict";
    ui = {
      Div: (props = {}) => node("ui:Div", props),
      Flex: (props = {}) => node("ui:Flex", props),
      VStack: (props = {}) => node("ui:Flex", { ...props, direction: "column" }),
      HStack: (props = {}) => node("ui:Flex", { ...props, direction: "row" })
    };
  }
});

// ../../packages/core/src/dynamic.ts
function For(props) {
  return { __dynamic: !0, kind: "for", props };
}
function Show(props) {
  return { __dynamic: !0, kind: "show", props };
}
function isDynamicNode(value2) {
  return typeof value2 == "object" && value2 !== null && value2.__dynamic === !0;
}
function mountDynamicRegion(node2, adapter) {
  let records = /* @__PURE__ */ new Map(), disposed = !1, watcher;
  function release(record) {
    try {
      record.scope.dispose();
    } finally {
      adapter.remove(record.handle);
    }
  }
  function dispose() {
    if (disposed) return;
    disposed = !0, watcher?.dispose();
    let errors = [];
    for (let record of records.values())
      try {
        release(record);
      } catch (error) {
        errors.push(error);
      }
    if (records.clear(), errors.length) throw new AggregateError(errors, "Dynamic region cleanup failed");
  }
  try {
    return watcher = effect(() => {
      let props = node2.props, items = node2.kind === "for" ? props.each() : [!!props.when()], keys = items.map((item2) => node2.kind === "for" ? props.by(item2) : item2 ? "shown" : "fallback"), unique = /* @__PURE__ */ new Set();
      for (let key of keys) {
        if (typeof key != "string" && typeof key != "number" || typeof key == "number" && !Number.isFinite(key)) throw new Error("[nandomo] List keys must be finite numbers or strings");
        if (unique.has(key)) throw new Error(`[nandomo] Duplicate list key: ${key}`);
        unique.add(key);
      }
      if (node2.disposeBeforeMount)
        for (let [key, record] of records)
          unique.has(key) || (records.delete(key), release(record));
      let created = [], next = /* @__PURE__ */ new Map();
      try {
        items.forEach((value2, index2) => {
          let key = keys[index2], record = records.get(key);
          if (!record) {
            let item2 = signal(value2), position = signal(index2), scope = new Scope();
            try {
              record = { handle: withActiveSub(null, () => scope.run(() => {
                let tree = node2.kind === "for" ? props.children(item2, position) : value2 ? props.children() : props.fallback?.();
                return adapter.mount(tree);
              })), item: item2, index: position, scope }, created.push(record);
            } catch (error) {
              try {
                scope.dispose();
              } catch {
              }
              throw error;
            }
          }
          next.set(key, record);
        }), adapter.order([...next.values()].map((record) => record.handle));
      } catch (error) {
        for (let record of created)
          try {
            release(record);
          } catch {
          }
        throw error;
      }
      let old = records;
      records = next, batch(() => {
        items.forEach((value2, index2) => {
          let record = next.get(keys[index2]);
          record.item.set(value2), record.index.set(index2);
        });
        let errors = [];
        for (let [key, record] of old) if (!next.has(key))
          try {
            release(record);
          } catch (error) {
            errors.push(error);
          }
        if (errors.length) throw new AggregateError(errors, "Dynamic region removal failed");
      });
    }), { dispose };
  } catch (error) {
    try {
      dispose();
    } catch {
    }
    throw error;
  }
}
var init_dynamic = __esm({
  "../../packages/core/src/dynamic.ts"() {
    "use strict";
    init_batch();
    init_effect();
    init_signal();
    init_runtime();
    init_scope();
  }
});

// ../../packages/core/src/forms.ts
var init_forms = __esm({
  "../../packages/core/src/forms.ts"() {
    "use strict";
    init_signal();
    init_computed();
    init_batch();
    init_scope();
  }
});

// ../../packages/core/src/router.ts
var init_router = __esm({
  "../../packages/core/src/router.ts"() {
    "use strict";
    init_signal();
    init_computed();
    init_scope();
    init_dynamic();
  }
});

// ../../packages/core/src/functional-component.ts
function component(name, render) {
  return (props) => defineComponent({
    name,
    setup: (lifecycle) => ({ tree: render(props, lifecycle) }),
    views: {
      html: (state) => state.tree,
      qml: (state) => state.tree,
      gtk: (state) => state.tree,
      compose: (state) => state.tree
    }
  })({});
}
var init_functional_component = __esm({
  "../../packages/core/src/functional-component.ts"() {
    "use strict";
    init_define_component();
  }
});

// ../../packages/core/src/theme.ts
var init_theme = __esm({
  "../../packages/core/src/theme.ts"() {
    "use strict";
    init_computed();
    init_scope();
    init_signal();
  }
});

// ../../packages/core/src/app-meta.ts
var COMPONENT_TARGETS, init_app_meta = __esm({
  "../../packages/core/src/app-meta.ts"() {
    "use strict";
    init_theme();
    COMPONENT_TARGETS = Object.freeze(["html", "qml", "gtk", "compose"]);
  }
});

// ../../packages/core/src/source-origin.ts
function sourceOrigin(value2) {
  return value2 !== null && (typeof value2 == "object" || typeof value2 == "function") ? origins.get(value2) : void 0;
}
function withSourceOrigin(value2, source, component2) {
  if (!source || typeof source != "object") return value2;
  let raw = source;
  return typeof raw.fileName != "string" || !Number.isInteger(raw.lineNumber) || raw.lineNumber < 1 || value2 !== null && (typeof value2 == "object" || typeof value2 == "function") && !origins.has(value2) && origins.set(value2, {
    fileName: raw.fileName,
    lineNumber: raw.lineNumber,
    ...Number.isInteger(raw.columnNumber) && raw.columnNumber > 0 ? { columnNumber: raw.columnNumber } : {},
    ...component2 ? { component: component2 } : {}
  }), value2;
}
function sourceLabel(origin) {
  return `${origin.fileName}:${origin.lineNumber}${origin.columnNumber ? ":" + origin.columnNumber : ""}${origin.component ? " (" + origin.component + ")" : ""}`;
}
function sourceError(error, origin, property) {
  return origin ? error instanceof SourceError ? error : new SourceError(error, origin, property) : error instanceof Error ? error : new Error(String(error));
}
var origins, SourceError, init_source_origin = __esm({
  "../../packages/core/src/source-origin.ts"() {
    "use strict";
    origins = /* @__PURE__ */ new WeakMap();
    SourceError = class extends Error {
      constructor(cause, origin, property) {
        super(`${sourceLabel(origin)}${property ? " [" + property + "]" : ""}: ${cause instanceof Error ? cause.message : String(cause)}`, { cause });
        this.origin = origin;
        this.property = property;
        this.name = "SourceError";
      }
      origin;
      property;
    };
  }
});

// ../../packages/core/src/i18n.ts
function normalizeLocale(raw) {
  let base = (String(raw ?? "").trim().split(".")[0] ?? "").split("@")[0]?.replace(/_/g, "-") ?? "";
  if (!base || /^(?:c|posix)$/i.test(base)) return null;
  try {
    return Intl.getCanonicalLocales(base)[0] ?? null;
  } catch {
    return null;
  }
}
function resolveLocale(raw, available, fallback = DEFAULT_LOCALE) {
  let locales = [.../* @__PURE__ */ new Set([...available, fallback])], wanted = normalizeLocale(raw);
  if (wanted) {
    if (locales.includes(wanted)) return wanted;
    let language = wanted.split("-")[0], candidates = locales.filter((locale) => normalizeLocale(locale)?.split("-")[0] === language), script = new Intl.Locale(wanted).maximize().script, partial = candidates.find((locale) => new Intl.Locale(locale).maximize().script === script) ?? candidates[0];
    if (partial) return partial;
  }
  return fallback;
}
function interpolate(template, params) {
  return params ? template.replace(
    /\{(\w+)\}/g,
    (match, name) => Object.hasOwn(params, name) ? String(params[name]) : match
  ) : template;
}
function pluralForm(locale, count) {
  try {
    return new Intl.PluralRules(locale).select(count);
  } catch {
    return count === 1 ? "one" : "other";
  }
}
function lookup(catalogs2, locale, fallback, key, source) {
  return locale === source ? catalogs2[locale]?.[key] : catalogs2[locale]?.[key] ?? (locale === fallback ? void 0 : catalogs2[fallback]?.[key]);
}
function translate(catalogs2, locale, fallback, key, params, source) {
  let value2 = lookup(catalogs2, locale, fallback, key, source);
  if (value2 === void 0) return interpolate(key, params);
  if (typeof value2 == "string") return interpolate(value2, params);
  let count = Number(params?.count ?? 0);
  return interpolate(value2[pluralForm(locale, count)] ?? value2.other ?? value2.one ?? key, params);
}
function createTranslator(options) {
  let fallback = options.fallback ?? DEFAULT_LOCALE, source = options.source ?? fallback, available = Object.keys(options.catalogs), localeRef = signal(resolveLocale(options.locale, available, fallback));
  return {
    locale: () => localeRef(),
    localeRef,
    fallback,
    available: () => available,
    setLocale: (locale) => localeRef.set(resolveLocale(locale, available, fallback)),
    t: (key, params) => translate(options.catalogs, localeRef(), fallback, key, params, source)
  };
}
var DEFAULT_LOCALE, init_i18n = __esm({
  "../../packages/core/src/i18n.ts"() {
    "use strict";
    init_signal();
    DEFAULT_LOCALE = "en";
  }
});

// ../../packages/core/src/index.ts
var init_src = __esm({
  "../../packages/core/src/index.ts"() {
    "use strict";
    init_signal();
    init_dialog();
    init_computed();
    init_effect();
    init_batch();
    init_define_component();
    init_capability();
    init_component();
    init_lifecycle();
    init_inputs();
    init_ui();
    init_dynamic();
    init_forms();
    init_router();
    init_functional_component();
    init_theme();
    init_app_meta();
    init_source_origin();
    init_i18n();
  }
});

// src/infrastructure/locales/pt-BR.ts
var ptBR, init_pt_BR = __esm({
  "src/infrastructure/locales/pt-BR.ts"() {
    "use strict";
    ptBR = {
      "Desktop clipboard unavailable": "A \xE1rea de transfer\xEAncia do sistema est\xE1 indispon\xEDvel.",
      "Desktop integration unavailable": "A integra\xE7\xE3o com o desktop est\xE1 indispon\xEDvel.",
      "Desktop integration closed": "A integra\xE7\xE3o com o desktop foi encerrada.",
      "Desktop request timed out": "A solicita\xE7\xE3o ao desktop demorou demais.",
      "Invalid file location": "Local de arquivo inv\xE1lido.",
      "Invalid file clipboard": "A \xE1rea de transfer\xEAncia n\xE3o cont\xE9m arquivos v\xE1lidos.",
      "Invalid clipboard action": "A\xE7\xE3o da \xE1rea de transfer\xEAncia inv\xE1lida.",
      "Clipboard too large": "O conte\xFAdo da \xE1rea de transfer\xEAncia excede o limite.",
      "Invalid clipboard format": "Formato da \xE1rea de transfer\xEAncia inv\xE1lido.",
      "{count} itens": { one: "{count} item", other: "{count} itens" },
      "{count} pastas": { one: "{count} pasta", other: "{count} pastas" },
      "{count} selecionados": { one: "{count} selecionado", other: "{count} selecionados" }
    };
  }
});

// src/infrastructure/locales/en.ts
var en, init_en = __esm({
  "src/infrastructure/locales/en.ts"() {
    "use strict";
    en = {
      // window and status bar
      "Dank Files": "Dank Files",
      "Carregando\u2026": "Loading\u2026",
      "Carregando pastas\u2026": "Loading folders\u2026",
      "{count} itens": { one: "{count} item", other: "{count} items" },
      "{count} pastas": { one: "{count} folder", other: "{count} folders" },
      "{count} selecionados": { one: "{count} selected", other: "{count} selected" },
      "Pasta pessoal": "Home",
      Sistema: "System",
      "Tipo: Pasta": "Type: Folder",
      "Tamanho: {size}": "Size: {size}",
      "Modificado: {date}": "Modified: {date}",
      // sidebar
      Aplicativos: "Applications",
      Lixeira: "Trash",
      Recentes: "Recent",
      LUGARES: "PLACES",
      VOLUMES: "VOLUMES",
      JOGOS: "GAMES",
      "Nenhum volume detectado": "No volume detected",
      "Nenhuma instala\xE7\xE3o detectada": "No installation detected",
      "Abrir em nova aba": "Open in new tab",
      "Nova aba": "New tab",
      // toolbar and views
      Nome: "Name",
      Tamanho: "Size",
      Modificado: "Modified",
      Tipo: "Type",
      "Visualiza\xE7\xE3o em lista": "List view",
      "Visualiza\xE7\xE3o em grade": "Grid view",
      "Visualiza\xE7\xE3o em colunas": "Columns view",
      Ordenar: "Sort",
      nome: "name",
      tamanho: "size",
      data: "date",
      tipo: "type",
      decrescente: "descending",
      crescente: "ascending",
      Espa\u00E7o: "Space",
      Ler: "Read",
      Alterar: "Write",
      "Executar/acessar": "Execute/enter",
      Pasta: "Folder",
      Arquivos: "Files",
      // context menus and actions
      "Nova pasta": "New folder",
      "Novo arquivo": "New file",
      "Novo arquivo vazio": "Empty new file",
      "Abrir app": "Open app",
      "Abrir pasta": "Open folder",
      "Abrir no app padr\xE3o": "Open with default app",
      "Abrir .desktop": "Open .desktop",
      "Abrir com\u2026": "Open with\u2026",
      "Abrir terminal aqui": "Open terminal here",
      "Desinstalar\u2026": "Uninstall\u2026",
      Ocultar: "Hide",
      "Adicionar pasta a Locais": "Add folder to Places",
      "Adicionar pasta atual a Locais": "Add current folder to Places",
      "Remover de Locais": "Remove from Places",
      "Cor, emblema e \xEDcone\u2026": "Color, badge and icon\u2026",
      "Pr\xE9-visualizar": "Preview",
      "Pr\xE9-visualiza\xE7\xE3o": "Preview",
      Renomear: "Rename",
      "Renomear\u2026": "Rename\u2026",
      Recortar: "Cut",
      Copiar: "Copy",
      Colar: "Paste",
      "Mover para\u2026": "Move to\u2026",
      "Copiar para\u2026": "Copy to\u2026",
      "Mover para a lixeira": "Move to trash",
      "Copiar caminho": "Copy path",
      Atualizar: "Refresh",
      Propriedades: "Properties",
      Voltar: "Back",
      Avan\u00E7ar: "Forward",
      "Pasta acima": "Parent folder",
      "Arquivos ocultos escondidos": "Hidden files hidden",
      "Arquivos ocultos vis\xEDveis": "Hidden files shown",
      Montar: "Mount",
      Desmontar: "Unmount",
      Abrir: "Open",
      "Volume desmontado \u2014 bot\xE3o direito para montar": "Volume unmounted \u2014 right-click to mount",
      // details panel
      "Fechar detalhes": "Close details",
      "Selecione um item para ver os detalhes.": "Select an item to see its details.",
      Avan\u00E7ado: "Advanced",
      "Editar permiss\xF5es": "Edit permissions",
      "Editar permiss\xF5es\u2026": "Edit permissions\u2026",
      Propriet\u00E1rio: "Owner",
      Grupo: "Group",
      Outros: "Others",
      "Propriet\xE1rio: {owner}": "Owner: {owner}",
      "Propriet\xE1rio: {owner} \xB7 Grupo: {group} \xB7 Outros: {others}": "Owner: {owner} \xB7 Group: {group} \xB7 Others: {others}",
      ler: "read",
      alterar: "write",
      executar: "execute",
      acessar: "enter",
      "sem acesso": "no access",
      // dialogs
      Cancelar: "Cancel",
      Salvar: "Save",
      "Salvando\u2026": "Saving\u2026",
      Fechar: "Close",
      "Escolher esta pasta": "Choose this folder",
      "Pasta de destino (caminho completo)": "Destination folder (full path)",
      "J\xE1 existe um item com esse nome": "An item with that name already exists",
      "Voc\xEA pode escolher outro nome, ignorar este item ou substituir um arquivo comum.": "You can pick another name, skip this item or replace a regular file.",
      "Novo nome": "New name",
      Ignorar: "Skip",
      Substituir: "Replace",
      Prefer\u00EAncias: "Preferences",
      "Escolher aplicativo": "Choose application",
      "Padr\xE3o do sistema": "System default",
      "Posi\xE7\xE3o do v\xEDdeo": "Video position",
      Pausar: "Pause",
      Reproduzir: "Play",
      // folder appearance, icon picker
      "Nenhuma subpasta": "No subfolder",
      "Usar \xEDcone de pasta": "Use folder icon",
      Emblemas: "Badges",
      "Logos e \xEDcones": "Logos and icons",
      "Buscar \xEDcone\u2026": "Search icon\u2026",
      Anterior: "Previous",
      Pr\u00F3xima: "Next",
      "{count} \xEDcones": { one: "{count} icon", other: "{count} icons" },
      "Escolher imagem para o \xEDcone\u2026": "Choose image for the icon\u2026",
      "\xCDcone da pasta": "Folder icon",
      "Personalizar pasta": "Customize folder",
      "Cor da pasta": "Folder color",
      "Restaurar padr\xE3o": "Restore default",
      Nenhum: "None",
      // preferences
      APAR\u00CANCIA: "APPEARANCE",
      COMPORTAMENTO: "BEHAVIOUR",
      "Tamanho dos \xEDcones: {size} px": "Icon size: {size} px",
      "Mostrar miniaturas": "Show thumbnails",
      "Manter painel de detalhes vis\xEDvel": "Keep details panel visible",
      "Reserva espa\xE7o para os detalhes. Desativado: o painel abre por Propriedades.": "Reserves space for details. Disabled: the panel opens from Properties.",
      "Ordenar pastas antes dos arquivos": "Sort folders before files",
      "Abrir com clique \xFAnico": "Open with a single click",
      "Desativado: duplo clique abre; clique simples seleciona.": "Disabled: double click opens, single click selects.",
      "Mostrar a\xE7\xE3o de terminal": "Show terminal action",
      "Mostrar itens especiais na barra lateral": "Show special items in the sidebar",
      "Mostrar lugares na barra lateral": "Show places in the sidebar",
      "Mostrar volumes na barra lateral": "Show volumes in the sidebar",
      "Mostrar jogos na barra lateral": "Show games in the sidebar",
      "Reduzir anima\xE7\xF5es": "Reduce animations",
      "Desativado: transi\xE7\xF5es curtas de foco, sele\xE7\xE3o, painel e di\xE1logos.": "Disabled: short focus, selection, panel and dialog transitions.",
      "Altera\xE7\xF5es s\xE3o salvas automaticamente.": "Changes are saved automatically.",
      // errors
      "Falha ao ler a pasta.": "Could not read the folder.",
      "Falha ao abrir o arquivo.": "Could not open the file.",
      "Falha ao criar o item.": "Could not create the item.",
      "Falha ao renomear.": "Could not rename.",
      "Falha ao mover para a lixeira.": "Could not move to trash.",
      "Falha ao copiar.": "Could not copy.",
      "Falha ao mover.": "Could not move.",
      "Falha ao aplicar as permiss\xF5es.": "Could not apply the permissions.",
      "Falha ao montar o volume.": "Could not mount the volume.",
      "Falha ao desmontar o volume.": "Could not unmount the volume."
    };
  }
});

// src/infrastructure/locales/zh-Hans.ts
var zhHans, init_zh_Hans = __esm({
  "src/infrastructure/locales/zh-Hans.ts"() {
    "use strict";
    zhHans = {
      // window and status bar
      "Dank Files": "Dank Files",
      "Carregando\u2026": "\u6B63\u5728\u52A0\u8F7D\u2026",
      "Carregando pastas\u2026": "\u6B63\u5728\u52A0\u8F7D\u6587\u4EF6\u5939\u2026",
      "{count} itens": "\u5171 {count} \u4E2A\u9879\u76EE",
      "{count} pastas": "\u5171 {count} \u4E2A\u6587\u4EF6\u5939",
      "{count} selecionados": "\u5DF2\u9009\u62E9 {count} \u9879",
      "Pasta pessoal": "\u4E3B\u76EE\u5F55",
      Sistema: "\u7CFB\u7EDF",
      "Tipo: Pasta": "\u7C7B\u578B\uFF1A\u6587\u4EF6\u5939",
      "Tamanho: {size}": "\u5927\u5C0F\uFF1A{size}",
      "Modificado: {date}": "\u4FEE\u6539\u65F6\u95F4\uFF1A{date}",
      // sidebar
      Aplicativos: "\u5E94\u7528\u7A0B\u5E8F",
      Lixeira: "\u56DE\u6536\u7AD9",
      Recentes: "\u6700\u8FD1\u4F7F\u7528",
      LUGARES: "\u4F4D\u7F6E",
      VOLUMES: "\u5377",
      JOGOS: "\u6E38\u620F",
      "Nenhum volume detectado": "\u672A\u68C0\u6D4B\u5230\u5377",
      "Nenhuma instala\xE7\xE3o detectada": "\u672A\u68C0\u6D4B\u5230\u5B89\u88C5\u9879\u76EE",
      "Abrir em nova aba": "\u5728\u65B0\u6807\u7B7E\u9875\u4E2D\u6253\u5F00",
      "Nova aba": "\u65B0\u5EFA\u6807\u7B7E\u9875",
      // toolbar and views
      Nome: "\u540D\u79F0",
      Tamanho: "\u5927\u5C0F",
      Modificado: "\u4FEE\u6539\u65F6\u95F4",
      Tipo: "\u7C7B\u578B",
      "Visualiza\xE7\xE3o em lista": "\u5217\u8868\u89C6\u56FE",
      "Visualiza\xE7\xE3o em grade": "\u7F51\u683C\u89C6\u56FE",
      "Visualiza\xE7\xE3o em colunas": "\u5206\u680F\u89C6\u56FE",
      Ordenar: "\u6392\u5E8F",
      nome: "\u540D\u79F0",
      tamanho: "\u5927\u5C0F",
      data: "\u65E5\u671F",
      tipo: "\u7C7B\u578B",
      decrescente: "\u964D\u5E8F",
      crescente: "\u5347\u5E8F",
      Espa\u00E7o: "\u7A7A\u683C",
      Ler: "\u8BFB\u53D6",
      Alterar: "\u5199\u5165",
      "Executar/acessar": "\u6267\u884C/\u8FDB\u5165",
      Pasta: "\u6587\u4EF6\u5939",
      Arquivos: "\u6587\u4EF6",
      // context menus and actions
      "Nova pasta": "\u65B0\u5EFA\u6587\u4EF6\u5939",
      "Novo arquivo": "\u65B0\u5EFA\u6587\u4EF6",
      "Novo arquivo vazio": "\u65B0\u5EFA\u7A7A\u6587\u4EF6",
      "Abrir app": "\u6253\u5F00\u5E94\u7528",
      "Abrir pasta": "\u6253\u5F00\u6587\u4EF6\u5939",
      "Abrir no app padr\xE3o": "\u7528\u9ED8\u8BA4\u5E94\u7528\u6253\u5F00",
      "Abrir .desktop": "\u6253\u5F00 .desktop",
      "Abrir com\u2026": "\u6253\u5F00\u65B9\u5F0F\u2026",
      "Abrir terminal aqui": "\u5728\u6B64\u5904\u6253\u5F00\u7EC8\u7AEF",
      "Desinstalar\u2026": "\u5378\u8F7D\u2026",
      Ocultar: "\u9690\u85CF",
      "Adicionar pasta a Locais": "\u5C06\u6587\u4EF6\u5939\u6DFB\u52A0\u5230\u4F4D\u7F6E",
      "Adicionar pasta atual a Locais": "\u5C06\u5F53\u524D\u6587\u4EF6\u5939\u6DFB\u52A0\u5230\u4F4D\u7F6E",
      "Remover de Locais": "\u4ECE\u4F4D\u7F6E\u4E2D\u79FB\u9664",
      "Cor, emblema e \xEDcone\u2026": "\u989C\u8272\u3001\u5FBD\u6807\u548C\u56FE\u6807\u2026",
      "Pr\xE9-visualizar": "\u9884\u89C8",
      "Pr\xE9-visualiza\xE7\xE3o": "\u9884\u89C8",
      Renomear: "\u91CD\u547D\u540D",
      "Renomear\u2026": "\u91CD\u547D\u540D\u2026",
      Recortar: "\u526A\u5207",
      Copiar: "\u590D\u5236",
      Colar: "\u7C98\u8D34",
      "Mover para\u2026": "\u79FB\u52A8\u5230\u2026",
      "Copiar para\u2026": "\u590D\u5236\u5230\u2026",
      "Mover para a lixeira": "\u79FB\u5230\u56DE\u6536\u7AD9",
      "Copiar caminho": "\u590D\u5236\u8DEF\u5F84",
      Atualizar: "\u5237\u65B0",
      Propriedades: "\u5C5E\u6027",
      Voltar: "\u540E\u9000",
      Avan\u00E7ar: "\u524D\u8FDB",
      "Pasta acima": "\u4E0A\u4E00\u7EA7\u6587\u4EF6\u5939",
      "Arquivos ocultos escondidos": "\u9690\u85CF\u6587\u4EF6\u5DF2\u9690\u85CF",
      "Arquivos ocultos vis\xEDveis": "\u663E\u793A\u9690\u85CF\u6587\u4EF6",
      Montar: "\u6302\u8F7D",
      Desmontar: "\u5378\u8F7D",
      Abrir: "\u6253\u5F00",
      "Volume desmontado \u2014 bot\xE3o direito para montar": "\u5377\u672A\u6302\u8F7D \u2014 \u53F3\u952E\u53EF\u6302\u8F7D",
      // details panel
      "Fechar detalhes": "\u5173\u95ED\u8BE6\u60C5",
      "Selecione um item para ver os detalhes.": "\u8BF7\u9009\u62E9\u4E00\u4E2A\u9879\u76EE\u4EE5\u67E5\u770B\u8BE6\u60C5\u3002",
      Avan\u00E7ado: "\u9AD8\u7EA7",
      "Editar permiss\xF5es": "\u7F16\u8F91\u6743\u9650",
      "Editar permiss\xF5es\u2026": "\u7F16\u8F91\u6743\u9650\u2026",
      Propriet\u00E1rio: "\u6240\u6709\u8005",
      Grupo: "\u7528\u6237\u7EC4",
      Outros: "\u5176\u4ED6",
      "Propriet\xE1rio: {owner}": "\u6240\u6709\u8005\uFF1A{owner}",
      "Propriet\xE1rio: {owner} \xB7 Grupo: {group} \xB7 Outros: {others}": "\u6240\u6709\u8005\uFF1A{owner} \xB7 \u7528\u6237\u7EC4\uFF1A{group} \xB7 \u5176\u4ED6\uFF1A{others}",
      ler: "\u8BFB\u53D6",
      alterar: "\u5199\u5165",
      executar: "\u6267\u884C",
      acessar: "\u8FDB\u5165",
      "sem acesso": "\u65E0\u6743\u9650",
      // dialogs
      Cancelar: "\u53D6\u6D88",
      Salvar: "\u4FDD\u5B58",
      "Salvando\u2026": "\u6B63\u5728\u4FDD\u5B58\u2026",
      Fechar: "\u5173\u95ED",
      "Escolher esta pasta": "\u9009\u62E9\u6B64\u6587\u4EF6\u5939",
      "Pasta de destino (caminho completo)": "\u76EE\u6807\u6587\u4EF6\u5939\uFF08\u5B8C\u6574\u8DEF\u5F84\uFF09",
      "J\xE1 existe um item com esse nome": "\u540C\u540D\u9879\u76EE\u5DF2\u5B58\u5728",
      "Voc\xEA pode escolher outro nome, ignorar este item ou substituir um arquivo comum.": "\u60A8\u53EF\u4EE5\u6362\u4E00\u4E2A\u540D\u79F0\u3001\u8DF3\u8FC7\u6B64\u9879\u76EE\u6216\u66FF\u6362\u666E\u901A\u6587\u4EF6\u3002",
      "Novo nome": "\u65B0\u540D\u79F0",
      Ignorar: "\u8DF3\u8FC7",
      Substituir: "\u66FF\u6362",
      Prefer\u00EAncias: "\u9996\u9009\u9879",
      "Escolher aplicativo": "\u9009\u62E9\u5E94\u7528",
      "Padr\xE3o do sistema": "\u7CFB\u7EDF\u9ED8\u8BA4",
      "Posi\xE7\xE3o do v\xEDdeo": "\u89C6\u9891\u8FDB\u5EA6",
      Pausar: "\u6682\u505C",
      Reproduzir: "\u64AD\u653E",
      "Nenhuma subpasta": "\u6CA1\u6709\u5B50\u6587\u4EF6\u5939",
      "Usar \xEDcone de pasta": "\u4F7F\u7528\u6587\u4EF6\u5939\u56FE\u6807",
      Emblemas: "\u5FBD\u6807",
      "Logos e \xEDcones": "\u6807\u5FD7\u4E0E\u56FE\u6807",
      "Buscar \xEDcone\u2026": "\u641C\u7D22\u56FE\u6807\u2026",
      Anterior: "\u4E0A\u4E00\u9875",
      Pr\u00F3xima: "\u4E0B\u4E00\u9875",
      "{count} \xEDcones": "\u5171 {count} \u4E2A\u56FE\u6807",
      "Escolher imagem para o \xEDcone\u2026": "\u9009\u62E9\u56FE\u6807\u56FE\u7247\u2026",
      "\xCDcone da pasta": "\u6587\u4EF6\u5939\u56FE\u6807",
      "Personalizar pasta": "\u81EA\u5B9A\u4E49\u6587\u4EF6\u5939",
      "Cor da pasta": "\u6587\u4EF6\u5939\u989C\u8272",
      "Restaurar padr\xE3o": "\u6062\u590D\u9ED8\u8BA4",
      Nenhum: "\u65E0",
      // preferences
      APAR\u00CANCIA: "\u5916\u89C2",
      COMPORTAMENTO: "\u884C\u4E3A",
      "Tamanho dos \xEDcones: {size} px": "\u56FE\u6807\u5927\u5C0F\uFF1A{size} \u50CF\u7D20",
      "Mostrar miniaturas": "\u663E\u793A\u7F29\u7565\u56FE",
      "Manter painel de detalhes vis\xEDvel": "\u59CB\u7EC8\u663E\u793A\u8BE6\u60C5\u9762\u677F",
      "Reserva espa\xE7o para os detalhes. Desativado: o painel abre por Propriedades.": "\u4E3A\u8BE6\u60C5\u9884\u7559\u7A7A\u95F4\u3002\u5173\u95ED\u65F6\uFF1A\u4ECE\u5C5E\u6027\u5BF9\u8BDD\u6846\u6253\u5F00\u9762\u677F\u3002",
      "Ordenar pastas antes dos arquivos": "\u6587\u4EF6\u5939\u6392\u5728\u6587\u4EF6\u4E4B\u524D",
      "Abrir com clique \xFAnico": "\u5355\u51FB\u6253\u5F00",
      "Desativado: duplo clique abre; clique simples seleciona.": "\u5173\u95ED\u65F6\uFF1A\u53CC\u51FB\u6253\u5F00\uFF0C\u5355\u51FB\u9009\u4E2D\u3002",
      "Mostrar a\xE7\xE3o de terminal": "\u663E\u793A\u7EC8\u7AEF\u64CD\u4F5C",
      "Mostrar itens especiais na barra lateral": "\u5728\u4FA7\u8FB9\u680F\u663E\u793A\u7279\u6B8A\u4F4D\u7F6E",
      "Mostrar lugares na barra lateral": "\u5728\u4FA7\u8FB9\u680F\u663E\u793A\u4F4D\u7F6E",
      "Mostrar volumes na barra lateral": "\u5728\u4FA7\u8FB9\u680F\u663E\u793A\u5377",
      "Mostrar jogos na barra lateral": "\u5728\u4FA7\u8FB9\u680F\u663E\u793A\u6E38\u620F",
      "Reduzir anima\xE7\xF5es": "\u51CF\u5C11\u52A8\u753B",
      "Desativado: transi\xE7\xF5es curtas de foco, sele\xE7\xE3o, painel e di\xE1logos.": "\u5173\u95ED\u65F6\uFF1A\u4F7F\u7528\u7B80\u77ED\u7684\u7126\u70B9\u3001\u9009\u4E2D\u3001\u9762\u677F\u548C\u5BF9\u8BDD\u6846\u8FC7\u6E21\u3002",
      "Altera\xE7\xF5es s\xE3o salvas automaticamente.": "\u66F4\u6539\u5C06\u81EA\u52A8\u4FDD\u5B58\u3002",
      // errors
      "Falha ao ler a pasta.": "\u65E0\u6CD5\u8BFB\u53D6\u6587\u4EF6\u5939\u3002",
      "Falha ao abrir o arquivo.": "\u65E0\u6CD5\u6253\u5F00\u6587\u4EF6\u3002",
      "Falha ao criar o item.": "\u65E0\u6CD5\u521B\u5EFA\u9879\u76EE\u3002",
      "Falha ao renomear.": "\u65E0\u6CD5\u91CD\u547D\u540D\u3002",
      "Falha ao mover para a lixeira.": "\u65E0\u6CD5\u79FB\u5230\u56DE\u6536\u7AD9\u3002",
      "Falha ao copiar.": "\u65E0\u6CD5\u590D\u5236\u3002",
      "Falha ao mover.": "\u65E0\u6CD5\u79FB\u52A8\u3002",
      "Falha ao aplicar as permiss\xF5es.": "\u65E0\u6CD5\u5E94\u7528\u6743\u9650\u3002",
      "Falha ao montar o volume.": "\u65E0\u6CD5\u6302\u8F7D\u8BE5\u5377\u3002",
      "Falha ao desmontar o volume.": "\u65E0\u6CD5\u5378\u8F7D\u8BE5\u5377\u3002"
    };
  }
});

// src/infrastructure/i18n.ts
function detectOsLocale(env = typeof process > "u" ? {} : process.env) {
  let effective = env.LC_ALL || env.LC_MESSAGES || env.LANG;
  return effective && !normalizeLocale(effective) ? effective : env.LANGUAGE?.split(":").find(
    (locale) => !!resolveLocale(locale, Object.keys(catalogs), "")
  ) || effective || null;
}
function formattingLocale(category, env = process.env) {
  return normalizeLocale(env.LC_ALL || env[category] || env.LANG) || i18n.locale();
}
function t(key, params) {
  return i18n.t(key, params);
}
var catalogs, FALLBACK_LOCALE, SOURCE_LOCALE, i18n, init_i18n2 = __esm({
  "src/infrastructure/i18n.ts"() {
    "use strict";
    init_fileTools();
    init_src();
    init_pt_BR();
    init_en();
    init_zh_Hans();
    catalogs = { "pt-BR": ptBR, en: { ...en, ...fileToolsEn }, "zh-Hans": { ...zhHans, ...fileToolsZh } }, FALLBACK_LOCALE = "en", SOURCE_LOCALE = "pt-BR";
    i18n = createTranslator({ catalogs, locale: detectOsLocale(), fallback: FALLBACK_LOCALE, source: SOURCE_LOCALE });
  }
});

// src/infrastructure/fileOperations.ts
var fileOperations_exports = {};
__export(fileOperations_exports, {
  createArchive: () => createArchive,
  extractArchive: () => extractArchive,
  fingerprint: () => fingerprint,
  moveNoClobber: () => moveNoClobber,
  renameMany: () => renameMany,
  transferFile: () => transferFile,
  withUndo: () => withUndo
});
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Transform } from "node:stream";
import { lstat, readdir, readlink, symlink, mkdir, mkdtemp, rm, chmod, utimes, realpath } from "node:fs/promises";
import { dirname, join, basename, resolve, isAbsolute, sep } from "node:path";
async function moveNoClobber(source, destination) {
  if (source !== destination) {
    await exec("mv", ["--no-clobber", "--no-target-directory", "--", source, destination]);
    try {
      await lstat(source);
    } catch (error) {
      if (error.code === "ENOENT") return;
      throw error;
    }
    throw new Error("J\xE1 existe um item com esse nome. Nada foi substitu\xEDdo.");
  }
}
async function fingerprint(path3) {
  let rows = [];
  async function visit(path4, relative2) {
    let stat5 = await lstat(path4);
    if (rows.push([relative2, stat5.dev, stat5.ino, stat5.mode, stat5.size, stat5.mtimeMs, stat5.isSymbolicLink() ? await readlink(path4) : ""]), stat5.isDirectory()) for (let name of (await readdir(path4)).sort()) await visit(join(path4, name), relative2 + "/" + name);
  }
  return await visit(path3, ""), JSON.stringify(rows);
}
async function transferFile(source, destination, mode, options = {}) {
  if (source === destination) throw new Error("Origem e destino s\xE3o iguais.");
  let info = await lstat(source), parent2 = await lstat(dirname(destination));
  if (info.isDirectory() && !info.isSymbolicLink()) {
    let origin = await realpath(source), target = await realpath(dirname(destination));
    if (target === origin || target.startsWith(origin + sep)) throw new Error("N\xE3o \xE9 poss\xEDvel transferir uma pasta para dentro dela mesma.");
  }
  if (options.signal?.throwIfAborted(), mode === "move" && info.dev === parent2.dev) {
    await moveNoClobber(source, destination), options.progress?.({ completed: info.size, total: info.size });
    return;
  }
  let initial = await fingerprint(source), total = 0, completed = 0, last = 0;
  async function size(path3) {
    options.signal?.throwIfAborted();
    let s = await lstat(path3);
    if (s.isFile()) total += s.size;
    else if (s.isDirectory()) for (let n of await readdir(path3)) await size(join(path3, n));
  }
  await size(source), options.progress?.({ completed, total });
  let temporary = await mkdtemp(join(dirname(destination), ".nandomo-transfer-"));
  try {
    async function copy(from, to) {
      options.signal?.throwIfAborted();
      let stat5 = await lstat(from);
      if (stat5.isSymbolicLink()) await symlink(await readlink(from), to);
      else if (stat5.isDirectory()) {
        await mkdir(to);
        for (let name of await readdir(from)) await copy(join(from, name), join(to, name));
        await chmod(to, stat5.mode & 511), await utimes(to, stat5.atime, stat5.mtime);
      } else if (stat5.isFile()) {
        let progress = new Transform({ transform(chunk, _encoding, done) {
          completed += chunk.length, Date.now() - last >= 100 && (last = Date.now(), options.progress?.({ completed, total })), done(null, chunk);
        } });
        await pipeline(createReadStream(from), progress, createWriteStream(to, { flags: "wx", mode: stat5.mode & 511 }), { signal: options.signal }), await utimes(to, stat5.atime, stat5.mtime);
      } else throw new Error("Este tipo de arquivo n\xE3o pode ser copiado.");
    }
    let staged = join(temporary, "content");
    if (await copy(source, staged), options.signal?.throwIfAborted(), await fingerprint(source) !== initial) throw new Error("A origem mudou durante a c\xF3pia. Tente novamente.");
    if (await moveNoClobber(staged, destination), mode === "move") {
      if (await fingerprint(source) !== initial) throw new Error("O destino foi copiado, mas a origem mudou e foi preservada.");
      await rm(source, { recursive: !0 });
    }
    options.progress?.({ completed: total, total });
  } finally {
    await rm(temporary, { recursive: !0, force: !0 });
  }
}
async function renameMany(plan) {
  let targets = /* @__PURE__ */ new Set();
  for (let item2 of plan) {
    if (targets.has(item2.destination)) throw new Error("Os novos nomes n\xE3o podem ser repetidos.");
    if (targets.add(item2.destination), item2.source !== item2.destination)
      try {
        throw await lstat(item2.destination), new Error("J\xE1 existe um item com esse nome.");
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
  }
  let changed = [];
  try {
    for (let item2 of plan) item2.source !== item2.destination && (await moveNoClobber(item2.source, item2.destination), changed.push(item2));
  } catch (error) {
    let problems = [];
    for (let item2 of changed.reverse()) try {
      await moveNoClobber(item2.destination, item2.source);
    } catch {
      problems.push(item2.destination);
    }
    throw problems.length ? new Error(t("Renomea\xE7\xE3o incompleta. Arquivos preservados em: {paths}", { paths: problems.join(", ") }), { cause: error }) : error;
  }
}
async function createArchive(paths, destination) {
  if (!paths.length || !paths.every((path3) => dirname(path3) === dirname(paths[0]))) throw new Error("Selecione itens da mesma pasta.");
  let zip = /\.zip$/i.test(destination);
  if (!zip && !/\.tar\.gz$/i.test(destination)) throw new Error("Use .zip ou .tar.gz.");
  let temporary = await mkdtemp(join(dirname(destination), ".nandomo-archive-"));
  try {
    let staged = join(temporary, "archive");
    await exec("bsdtar", zip ? ["--format", "zip", "-cf", staged, "--", ...paths.map((path3) => basename(path3))] : ["-czf", staged, "--", ...paths.map((path3) => basename(path3))], { cwd: dirname(paths[0]), maxBuffer: 1024 * 1024 }), await moveNoClobber(staged, destination);
  } finally {
    await rm(temporary, { recursive: !0, force: !0 });
  }
}
async function extractArchive(source, destination) {
  let temporary = await mkdtemp(join(dirname(destination), ".nandomo-extract-"));
  try {
    let staged = join(temporary, "content");
    await mkdir(staged), await exec("bsdtar", ["-xf", resolve(source), "-C", staged, "--no-same-owner", "--no-same-permissions"], { maxBuffer: 1024 * 1024 }), await assertContained(staged), await moveNoClobber(staged, destination);
  } finally {
    await rm(temporary, { recursive: !0, force: !0 });
  }
}
async function assertContained(root) {
  let base = await realpath(root);
  async function visit(dir) {
    for (let child of await readdir(dir, { withFileTypes: !0 })) {
      let target = join(dir, child.name);
      if (child.isSymbolicLink()) {
        let link = await readlink(target), resolved = resolve(dirname(target), link);
        if (isAbsolute(link) || !resolved.startsWith(base + sep)) throw new Error("O arquivo compactado aponta para fora do destino.");
      } else child.isDirectory() && await visit(target);
    }
  }
  await visit(root);
}
function withUndo(base, recovery) {
  let history = [];
  async function remember(destination, reverse) {
    let saved = await fingerprint(destination);
    history.push(async () => {
      if (!await unchanged(destination, saved)) throw new Error("O item mudou desde a opera\xE7\xE3o. Nada foi desfeito.");
      await reverse();
    }), history.length > 20 && history.shift();
  }
  async function unchanged(path3, saved) {
    try {
      return await fingerprint(path3) === saved;
    } catch {
      return !1;
    }
  }
  return {
    ...base,
    canUndo: () => history.length > 0,
    async undo() {
      let operation = history.at(-1);
      operation && (await operation(), history.pop());
    },
    async renameMany(plan) {
      if (!base.renameMany) throw new Error("Renomea\xE7\xE3o em lote indispon\xEDvel.");
      await base.renameMany(plan);
      let fingerprints = await Promise.all(plan.map((item2) => fingerprint(item2.destination)));
      history.push(async () => {
        for (let [index2, item2] of plan.entries()) if (!await unchanged(item2.destination, fingerprints[index2])) throw new Error("Um item mudou desde a renomea\xE7\xE3o. Nada foi desfeito.");
        await base.renameMany(plan.map((item2) => ({ source: item2.destination, destination: item2.source })).reverse());
      }), history.length > 20 && history.shift();
    },
    async replaceFile(source, destination, mode) {
      if (!base.replaceFile) throw new Error("Substitui\xE7\xE3o indispon\xEDvel.");
      await base.replaceFile(source, destination, mode), history.length = 0;
    },
    async trash(path3) {
      if (!base.trash) throw new Error("Lixeira indispon\xEDvel.");
      let version = recovery ? await fingerprint(path3) : "";
      if (await base.trash(path3), recovery) {
        let trashed = await recovery.locate(path3, version).catch(() => {
        });
        trashed ? history.push(async () => {
          if (!await unchanged(trashed, version)) throw new Error("O item mudou desde a opera\xE7\xE3o. Nada foi desfeito.");
          await recovery.restore([trashed]);
        }) : history.length = 0;
      }
    },
    async create(path3, kind2) {
      await base.create(path3, kind2), await remember(path3, async () => {
        if (!base.trash) throw new Error("Lixeira indispon\xEDvel.");
        await base.trash(path3);
      });
    },
    async rename(source, destination) {
      await base.rename(source, destination), source !== destination && await remember(destination, () => base.rename(destination, source));
    },
    async transfer(source, destination, mode, options) {
      if (!base.transfer) throw new Error("Transfer\xEAncia indispon\xEDvel.");
      await base.transfer(source, destination, mode, options), await remember(destination, mode === "move" ? () => base.rename(destination, source) : async () => {
        if (!base.trash) throw new Error("Lixeira indispon\xEDvel.");
        await base.trash(destination);
      });
    },
    async archive(paths, destination) {
      await createArchive(paths, destination), await remember(destination, async () => {
        if (!base.trash) throw new Error("Lixeira indispon\xEDvel.");
        await base.trash(destination);
      });
    },
    async extract(source, destination) {
      await extractArchive(source, destination), await remember(destination, async () => {
        if (!base.trash) throw new Error("Lixeira indispon\xEDvel.");
        await base.trash(destination);
      });
    }
  };
}
var exec, init_fileOperations = __esm({
  "src/infrastructure/fileOperations.ts"() {
    "use strict";
    init_i18n2();
    exec = promisify(execFile);
  }
});

// src/main.ts
init_i18n2();

// src/infrastructure/linuxDesktop.ts
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
function createLinuxDesktop(onEvent) {
  let child = spawn("python3", [process.env.NANDOMO_FM_LINUX_HELPER || fileURLToPath(new URL("../../scripts/linux-desktop.py", import.meta.url))], { stdio: ["pipe", "pipe", "pipe"] }), sequence = 0, closed = !1, pending3 = /* @__PURE__ */ new Map();
  function fail(error) {
    closed = !0;
    for (let operation of pending3.values())
      clearTimeout(operation.timer), operation.reject(error);
    pending3.clear();
  }
  let input2 = createInterface({ input: child.stdout });
  input2.on("line", (line) => {
    try {
      let message = JSON.parse(line);
      if (typeof message.id == "number") {
        let operation = pending3.get(message.id);
        if (!operation) return;
        pending3.delete(message.id), clearTimeout(operation.timer), message.error ? operation.reject(new Error(String(message.error))) : operation.resolve(message.value);
      } else typeof message.event == "string" && onEvent(message);
    } catch (error) {
      console.error("Desktop response:", error);
    }
  }), child.once("error", fail), child.stdin.on("error", fail), child.once("exit", () => fail(new Error("Desktop integration closed"))), child.stderr.on("data", (data) => console.error(String(data).trim()));
  function request(action, data = {}, timeout = 1e4) {
    if (closed) return Promise.reject(new Error("Desktop integration unavailable"));
    let id = sequence++;
    return new Promise((resolve4, reject) => {
      let timer = setTimeout(() => {
        pending3.delete(id), reject(new Error("Desktop request timed out"));
      }, timeout);
      pending3.set(id, { resolve: resolve4, reject, timer }), child.stdin.write(JSON.stringify({ id, action, ...data }) + `
`, (error) => {
        error && (pending3.delete(id), clearTimeout(timer), reject(error));
      });
    });
  }
  return {
    readFileClipboard: () => request("clipboard-read"),
    writeFileClipboard: (value2) => request("clipboard-write", value2),
    resolveLocation: (uri) => request("resolve", { uri }, 12e4),
    close() {
      closed || (fail(new Error("Desktop integration closed")), input2.close(), child.stdin.end(), child.kill("SIGTERM"));
    }
  };
}

// src/infrastructure/trashActions.ts
init_i18n2();
init_fileOperations();
import { readFile, mkdir as mkdir2, unlink, lstat as lstat2, rm as rm2, realpath as realpath2 } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { basename as basename2, dirname as dirname2, join as join2, resolve as resolve2, isAbsolute as isAbsolute2, sep as sep2 } from "node:path";
var TrashBatchError = class extends Error {
  constructor(restored, failed, cause) {
    super(t("Lixeira parcialmente processada: {count} conclu\xEDdo(s), {reasons}", { count: restored.length, reasons: failed.map((item2) => t(item2.reason)).join("; ") }), { cause });
    this.restored = restored;
    this.failed = failed;
    this.name = "TrashBatchError";
  }
  restored;
  failed;
};
function reason(error) {
  return error instanceof Error ? error.message : String(error);
}
function defaultTrashRoots() {
  let home3 = process.env.XDG_DATA_HOME && isAbsolute2(process.env.XDG_DATA_HOME) ? process.env.XDG_DATA_HOME : join2(process.env.HOME ?? "", ".local", "share"), roots = [join2(home3, "Trash")], uid = typeof process.getuid == "function" ? process.getuid() : null;
  if (uid !== null) for (let mount of mountPoints())
    roots.push(join2(mount, `.Trash-${uid}`)), roots.push(join2(mount, ".Trash", String(uid)));
  return roots;
}
function mountPoints() {
  try {
    return readFileSync("/proc/mounts", "utf8").split(`
`).filter((line) => line.trim() && !line.startsWith("#")).map((line) => line.split(/\s+/)[1] ?? "").map((path3) => path3.replace(/\\([0-7]{3})/g, (_all, digits) => String.fromCharCode(parseInt(digits, 8)))).filter(isAbsolute2);
  } catch {
    return [];
  }
}
async function allowedRoots(extra) {
  let roots = /* @__PURE__ */ new Set();
  for (let candidate of [...extra ?? [], ...defaultTrashRoots()])
    isAbsolute2(candidate) && roots.add(await realpath2(candidate).catch(() => resolve2(candidate)));
  return roots;
}
async function metadata(path3, roots) {
  let files = dirname2(path3), root = dirname2(files), name = basename2(path3);
  if (!name || name === "." || name === ".." || basename2(files) !== "files") throw new Error("Item fora da lixeira.");
  if (!(await lstat2(files).catch(() => null))?.isDirectory() || !(await lstat2(root).catch(() => null))?.isDirectory()) throw new Error("Item fora da lixeira.");
  if (!roots.has(await realpath2(root))) throw new Error("Item fora da lixeira.");
  if (!await lstat2(path3).catch(() => null)) throw new Error("Item da lixeira n\xE3o existe.");
  let info = join2(root, "info", name + ".trashinfo");
  if (!(await lstat2(join2(root, "info")).catch(() => null))?.isDirectory() || !(await lstat2(info).catch(() => null))?.isFile()) throw new Error("Metadados da lixeira inv\xE1lidos.");
  let original = /^Path=(.*)$/m.exec(await readFile(info, "utf8"))?.[1];
  if (!original) throw new Error("Local original indispon\xEDvel.");
  let decoded;
  try {
    decoded = decodeURIComponent(original);
  } catch {
    throw new Error("Local original inv\xE1lido.");
  }
  if (decoded.includes("\0")) throw new Error("Local original inv\xE1lido.");
  let destination = decoded;
  if (!isAbsolute2(decoded)) {
    let mount = basename2(root).startsWith(".Trash-") ? dirname2(root) : basename2(dirname2(root)) === ".Trash" ? dirname2(dirname2(root)) : void 0;
    if (!mount || decoded.split("/").includes("..")) throw new Error("Local original inv\xE1lido.");
    if (destination = resolve2(mount, decoded), !destination.startsWith(mount + sep2)) throw new Error("Local original inv\xE1lido.");
  }
  if ([...roots].some((base) => destination === base || destination.startsWith(base + sep2))) throw new Error("Local original inv\xE1lido.");
  return { info, destination };
}
async function runBatch(paths, roots, step) {
  let allowed = await allowedRoots(roots), done = [], failed = [];
  for (let path3 of paths)
    try {
      done.push(await step(path3, allowed));
    } catch (error) {
      failed.push({ path: path3, reason: reason(error) });
    }
  if (failed.length) throw new TrashBatchError(done, failed);
  return done;
}
async function restoreTrash(paths, roots) {
  return runBatch(paths, roots, async (path3, allowed) => {
    let { info, destination } = await metadata(path3, allowed);
    await mkdir2(dirname2(destination), { recursive: !0 }), await moveNoClobber(path3, destination);
    try {
      await unlink(info);
    } catch (error) {
      throw new Error(t("Restaurado, mas os metadados ficaram: {reason}", { reason: t(reason(error)) }));
    }
    return destination;
  });
}
async function emptyTrash(paths, roots) {
  return runBatch(paths, roots, async (path3, allowed) => {
    let { info } = await metadata(path3, allowed);
    return await rm2(path3, { recursive: !0 }), await unlink(info), path3;
  });
}
async function findTrashed(original, version) {
  let { fingerprint: fingerprint2 } = await Promise.resolve().then(() => (init_fileOperations(), fileOperations_exports)), candidates = defaultTrashRoots().filter((root, index2) => index2 === 0 || original.startsWith((basename2(root).startsWith(".Trash-") ? dirname2(root) : dirname2(dirname2(root))) + sep2)), allowed = /* @__PURE__ */ new Set();
  for (let root of candidates) try {
    allowed.add(await realpath2(root));
  } catch {
  }
  for (let root of candidates) {
    let names2 = await import("node:fs/promises").then((fs) => fs.readdir(join2(root, "files"))).catch(() => []);
    for (let name of names2) try {
      let path3 = join2(root, "files", name);
      if ((await metadata(path3, allowed)).destination === original && await fingerprint2(path3) === version) return path3;
    } catch {
    }
  }
}

// src/main.ts
init_fileOperations();
import { fileURLToPath as fileURLToPath6 } from "node:url";
import { relative, dirname as dirname7 } from "node:path";
import { homedir as homedir2 } from "node:os";

// src/domain/fileActions.ts
function validateName(name) {
  if (!name.trim() || name === "." || name === ".." || /[/\\\0]/.test(name))
    throw new Error("Informe um nome sem separadores de diret\xF3rio.");
  return name;
}
function previewKind(name) {
  return /\.(mp4|mkv|webm|mov|avi|m4v|ogv|mpeg|mpg)$/i.test(name) ? "video" : /\.pdf$/i.test(name) ? "pdf" : /\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(name) ? "image" : "none";
}

// src/application/createFileTools.ts
function createFileTools(options) {
  let { request, files, desktop, mutating } = options;
  return {
    request,
    open(kind2) {
      if (mutating.peek()) return;
      if (options.onError(""), kind2 === "emptyTrash") {
        if (options.path() !== "trash:///") return;
        request.set({ kind: kind2, targets: [...options.entries()], name: "" });
        return;
      }
      if (options.path().includes(":///")) {
        options.onError("Abra a pasta original para esta opera\xE7\xE3o.");
        return;
      }
      let targets = options.selected();
      if (targets.length) {
        if (kind2 === "extract" && (targets.length !== 1 || targets[0].directory)) {
          options.onError("Selecione um arquivo compactado.");
          return;
        }
        request.set({ kind: kind2, targets: [...targets], name: kind2 === "bulk" ? "{name}-{n}" : kind2 === "archive" ? targets[0].name + ".zip" : targets[0].name.replace(/\.(tar\.(gz|bz2|xz)|tgz|zip|tar|7z|rar)$/i, "") + "-extra\xEDdo" });
      }
    },
    close() {
      mutating.peek() || request.set(null);
    },
    async submit(value2) {
      let current = request.peek();
      if (!current || mutating.peek()) return !1;
      mutating.set(!0);
      try {
        if (current.kind === "emptyTrash") {
          if (!desktop.emptyTrash) throw new Error("Lixeira indispon\xEDvel.");
          await desktop.emptyTrash(current.targets.map((item2) => item2.path));
        } else if (current.kind === "bulk") {
          if (!files.renameMany) throw new Error("Renomea\xE7\xE3o em lote indispon\xEDvel.");
          if (!value2.includes("{n}") && !value2.includes("{name}")) throw new Error("Use {name} para o nome original e/ou {n} para a sequ\xEAncia.");
          let plan = current.targets.map((item2, index2) => {
            let split = item2.directory ? -1 : item2.name.lastIndexOf("."), extension2 = split > 0 ? item2.name.slice(split) : "", stem = split > 0 ? item2.name.slice(0, split) : item2.name, name = validateName(value2.replaceAll("{name}", stem).replaceAll("{n}", String(index2 + 1)) + extension2);
            return { source: item2.path, destination: files.child(files.parent(item2.path), name) };
          });
          await files.renameMany(plan);
        } else {
          validateName(value2);
          let destination = files.child(files.parent(current.targets[0].path), value2);
          if (current.kind === "archive") {
            if (!files.archive) throw new Error("Compacta\xE7\xE3o indispon\xEDvel.");
            await files.archive(current.targets.map((item2) => item2.path), destination);
          } else {
            if (!files.extract) throw new Error("Extra\xE7\xE3o indispon\xEDvel.");
            await files.extract(current.targets[0].path, destination);
          }
        }
        return request.set(null), await options.refresh(), !0;
      } catch (problem) {
        return await options.refresh().catch(() => {
        }), options.onError(problem), !1;
      } finally {
        mutating.set(!1);
      }
    }
  };
}

// src/domain/folderAppearance.ts
function normalizeFolderAppearance(value2) {
  let result = {};
  return value2.color && /^#[0-9a-f]{6}$/i.test(value2.color) && (result.color = value2.color), value2.emblem && /^emblem-[a-z0-9-]+$/.test(value2.emblem) && (result.emblem = value2.emblem), value2.icon && (/^file:\/\//.test(value2.icon) || /^[a-z0-9-]+$/.test(value2.icon)) && (result.icon = value2.icon), result;
}

// src/domain/preferences.ts
var defaultPreferences = { gridSize: 96, thumbnails: !0, foldersFirst: !0, singleClick: !1, showTerminal: !0, detailsAlwaysVisible: !1, reduceAnimations: !1, showSidebarSpecial: !0, showSidebarPlaces: !0, showSidebarVolumes: !0, showSidebarGames: !0 };
function normalizePreferences(raw) {
  let value2 = raw && typeof raw == "object" ? raw : {}, result = { ...defaultPreferences };
  typeof value2.gridSize == "number" && Number.isFinite(value2.gridSize) && (result.gridSize = Math.max(48, Math.min(160, Math.round(value2.gridSize))));
  for (let key of ["thumbnails", "foldersFirst", "singleClick", "showTerminal", "detailsAlwaysVisible", "reduceAnimations", "showSidebarSpecial", "showSidebarPlaces", "showSidebarVolumes", "showSidebarGames"]) typeof value2[key] == "boolean" && (result[key] = value2[key]);
  return result;
}

// src/application/createFileManager.ts
init_src();

// src/domain/sortEntries.ts
function extension(name) {
  let index2 = name.lastIndexOf(".");
  return index2 > 0 && name !== ".." ? name.slice(index2) : "";
}
function sortEntries(entries, order, descending, hidden, foldersFirst = !0) {
  let compare = new Intl.Collator(void 0, { numeric: !0, sensitivity: "base" });
  return entries.filter((entry3) => hidden || !entry3.name.startsWith(".")).sort((a, b) => foldersFirst && a.directory !== b.directory ? a.directory ? -1 : 1 : ((order === "size" ? a.size - b.size : order === "modified" ? a.modified - b.modified : order === "type" ? compare.compare(extension(a.name), extension(b.name)) : compare.compare(a.name, b.name)) || compare.compare(a.name, b.name)) * (descending ? -1 : 1));
}

// src/domain/tabs.ts
var virtualTitles = {
  "trash:///": "Lixeira",
  "recent:///": "Recentes",
  "applications:///": "Aplicativos"
};
function tabTitle(path3) {
  let known = virtualTitles[path3];
  if (known) return known;
  let parts = path3.split("/").filter((part) => part.length);
  return parts[parts.length - 1] ?? "/";
}
function emptyTabState(path3, view) {
  return {
    path: path3,
    entries: [],
    columns: [],
    history: [path3],
    historyIndex: 0,
    selection: [],
    selected: null,
    anchor: null,
    remote: !1,
    view,
    navigation: { back: !1, forward: !1 }
  };
}
function cycleTabIndex(order, active, delta) {
  if (!order.length || !Number.isInteger(delta)) return null;
  let at = order.indexOf(active);
  return at < 0 ? null : order[((at + delta) % order.length + order.length) % order.length] ?? null;
}

// src/domain/volumeUsage.ts
function normalizeUsage(value2) {
  if (!value2 || typeof value2 != "object") return null;
  let record = value2, used = record.used, total = record.total;
  return typeof used != "number" || typeof total != "number" || !Number.isFinite(used) || !Number.isFinite(total) || total <= 0 || used < 0 ? null : { used: Math.min(used, total), total };
}
function usageFraction(usage) {
  let normalized = normalizeUsage(usage);
  return normalized ? Math.max(0, Math.min(1, normalized.used / normalized.total)) : null;
}

// src/domain/dragPayload.ts
function uriList(paths, toUrl) {
  let urls = /* @__PURE__ */ new Set();
  for (let path3 of paths)
    if (!(typeof path3 != "string" || !path3))
      try {
        urls.add(toUrl(path3));
      } catch {
      }
  return [...urls];
}

// src/application/createFileManager.ts
function createFileManager(home3, services) {
  let iconCatalog = signal({ emblems: [], logos: [] }), folderAppearances = signal({}), appearanceOpen = signal(!1), decorate = (item2) => {
    let style = item2.directory ? folderAppearances()[item2.path] : void 0;
    return style ? { ...item2, icon: style.icon || item2.icon, folderColor: style.icon ? void 0 : style.color, emblem: style.emblem } : item2;
  }, permissionsTarget = signal(null), preferences = signal({ ...defaultPreferences }), toolsRequest = signal(null), preferencesOpen = signal(!1), chooserOpen = signal(!1), applications = signal([]), chooserTarget, detailsOpen = signal(!1), path3 = signal(home3), searchText = signal(""), searchRecursive = signal(!1), searchBusy = signal(!1), searchResults = signal(null), externalClipboardAvailable = signal(!1), activation = signal(0), operationProgress = signal(null), transferAbort, entries = signal([]), columns = signal([]), places = signal([]), drives = signal([]), games = signal([]), hidden = signal(!1), order = signal("name"), descending = signal(!1), view = signal("grid"), busy = signal(!0), error = signal(""), palette = signal({}), themeReady = signal(!1), videoThumbnails = signal({}), icons = signal({}), navigation = signal({ back: !1, forward: !1 }), selected = signal(null), selection = signal([]), selectionAnchor = null, mutating = signal(!1), remote = signal(!1), transferStatus = signal(""), newMenuOpen = signal(!1), previewOpen = signal(!1), clipboard = signal(null), volumeUsage = signal({}), editRequest = signal(null), destinationPath = signal(home3), destinationFolders = signal([]), destinationBusy = signal(!1), destinationGeneration = 0;
  async function browseDestination(target) {
    let token = ++destinationGeneration;
    destinationBusy.set(!0);
    try {
      let resolved = services.files.resolve(target), listed = await services.files.list(resolved);
      if (disposed || token !== destinationGeneration) return;
      batch(() => {
        destinationPath.set(resolved), destinationFolders.set(listed.filter((entry3) => entry3.directory).sort((a, b) => a.name.localeCompare(b.name))), error.set("");
      });
    } catch (problem) {
      token === destinationGeneration && reportError(problem);
    } finally {
      !disposed && token === destinationGeneration && destinationBusy.set(!1);
    }
  }
  let conflict = signal(null), pendingTransfers = [], transferPath = home3;
  async function runTransfers(tasks, activePath = path3.peek()) {
    if (disposed) return !1;
    transferPath = activePath, transferAbort = new AbortController(), batch(() => {
      mutating.set(!0), operationProgress.set({ completed: 0, total: 0 }), tabReadAt.clear(), error.set("");
    });
    let destinations = [];
    try {
      if (!services.files.transfer) throw new Error("Transfer\xEAncia indispon\xEDvel.");
      for (; tasks.length; ) {
        transferAbort.signal.throwIfAborted();
        let task = tasks[0];
        if (task.source === task.destination) throw new Error("Origem e destino s\xE3o iguais.");
        if (await services.files.exists?.(task.destination))
          return pendingTransfers = tasks.slice(1), batch(() => {
            conflict.set(task), reportError("J\xE1 existe um item com esse nome. Escolha como continuar.");
          }), !1;
        let statusKey = task.mode === "move" ? "Movendo: {name} \u2192 {destination}" : "Copiando: {name} \u2192 {destination}", statusParams = { name: task.source.split("/").pop() ?? task.source, destination: task.destination };
        transferStatus.set(services.translate?.(statusKey, statusParams) ?? `${task.mode === "move" ? "Movendo" : "Copiando"}: ${statusParams.name} \u2192 ${task.destination}`), await services.files.transfer(task.source, task.destination, task.mode, { signal: transferAbort.signal, progress: (value2) => {
          disposed || operationProgress.set(value2);
        } }), destinations.push(task.destination), tasks = tasks.slice(1);
      }
      return editRequest.set(null), conflict.set(null), pendingTransfers = [], clipboard.peek()?.mode === "move" && clipboard.set(null), await reloadAfterEdit("", destinations, activePath), !0;
    } catch (problem) {
      return transferAbort?.signal.aborted ? (!disposed && path3.peek() === activePath && await loadDirectory(activePath, "refresh"), reportError("Opera\xE7\xE3o cancelada. Itens j\xE1 conclu\xEDdos foram preservados.")) : (destinations.length && !disposed && path3.peek() === activePath && await loadDirectory(activePath, "refresh"), reportError(problem)), !1;
    } finally {
      transferAbort = void 0, disposed || (mutating.set(!1), transferStatus.set(""), operationProgress.set(null));
    }
  }
  async function resolveConflict(action, name = "") {
    let task = conflict.peek();
    if (!(!task || mutating.peek() || disposed))
      try {
        if (action === "rename") {
          validateName(name);
          let destination = services.files.child(services.files.parent(task.destination), name);
          if (destination === task.destination) throw new Error("Escolha um nome diferente.");
          batch(() => {
            conflict.set(null), error.set("");
          }), await runTransfers([{ ...task, destination }, ...pendingTransfers], transferPath);
        } else if (action === "replace") {
          if (!services.files.replaceFile) throw new Error("Substitui\xE7\xE3o indispon\xEDvel.");
          mutating.set(!0), tabReadAt.clear(), await services.files.replaceFile(task.source, task.destination, task.mode), batch(() => {
            conflict.set(null), error.set("");
          }), await runTransfers(pendingTransfers, transferPath);
        } else
          batch(() => {
            conflict.set(null), error.set("");
          }), await runTransfers(pendingTransfers, transferPath);
      } catch (problem) {
        reportError(problem);
      } finally {
        disposed || mutating.set(!1);
      }
  }
  let previewSource = computed(() => selected() ? services.files.url(selected().path) : ""), selectedPreviewKind = computed(() => selected() && !selected().directory ? previewKind(selected().name) : "none"), history = [], historyIndex = -1, tabStates = /* @__PURE__ */ new Map(), tabReadAt = /* @__PURE__ */ new Map(), tabRefreshTimer;
  function cancelTabRefresh() {
    clearTimeout(tabRefreshTimer), tabRefreshTimer = void 0;
  }
  function refreshRestoredTab(id, target) {
    Date.now() - (tabReadAt.get(id) ?? 0) < 5e3 || (tabRefreshTimer = setTimeout(() => {
      tabRefreshTimer = void 0, !disposed && activeTab.peek() === id && path3.peek() === target && !tabLocked() && loadDirectory(target, "refresh", 0, !0);
    }, 150), tabRefreshTimer.unref?.());
  }
  let tabOrder = signal([]), activeTab = signal(""), tabSequence = 0, generation = 0, locationsGeneration = 0, usageGeneration = 0, themeGeneration = 0, disposed = !1, stopVideoThumbnails = effect(() => {
    let listed = entries(), enabled = preferences().thumbnails && !remote(), active = !0, index2 = 0;
    if (videoThumbnails.set({}), enabled && services.files.videoThumbnail) {
      let videos = listed.filter((item2) => !item2.directory && previewKind(item2.name) === "video");
      async function worker() {
        for (; active && !disposed && index2 < videos.length; ) {
          let item2 = videos[index2++], source = await services.files.videoThumbnail(item2.path).catch(() => "");
          active && !disposed && source && videoThumbnails.set({ ...videoThumbnails.peek(), [item2.path]: source });
        }
      }
      worker(), worker();
    }
    return () => {
      active = !1;
    };
  }), stopSearch = effect(() => {
    let query = searchText().trim(), folder = path3(), deep = searchRecursive(), showHidden = hidden(), network = remote(), active = !0, controller = new AbortController(), timer;
    return searchResults.set(null), searchBusy.set(!1), query && deep && !folder.includes(":///") && !network && services.files.search && (searchBusy.set(!0), searchResults.set([]), timer = setTimeout(() => {
      services.files.search(folder, query, { signal: controller.signal, hidden: showHidden }).then((items) => {
        active && !disposed && searchResults.set(items);
      }).catch((problem) => {
        active && !disposed && reportError(problem);
      }).finally(() => {
        active && !disposed && searchBusy.set(!1);
      });
    }, 200)), () => {
      active = !1, controller.abort(), clearTimeout(timer);
    };
  }), stopFileWatch = effect(() => {
    let folder = path3(), network = remote(), timer;
    if (folder.includes(":///") || network || !services.files.watch) return;
    function refreshChanged() {
      if (!(disposed || path3.peek() !== folder)) {
        if (busy.peek() || mutating.peek()) {
          timer = setTimeout(refreshChanged, 250);
          return;
        }
        loadDirectory(folder, "refresh", 0, !0);
      }
    }
    let stop2 = services.files.watch(folder, refreshChanged);
    return () => {
      stop2(), clearTimeout(timer);
    };
  }), stopWatching2, visibleEntries = computed(() => sortEntries((searchResults() ?? entries()).filter((item2) => !searchText().trim() || item2.name.toLowerCase().includes(searchText().trim().toLowerCase())), order(), descending(), hidden(), preferences().foldersFirst).map(decorate)), visibleColumns = computed(() => (searchText().trim() ? [{ path: path3(), entries: visibleEntries() }] : columns()).map((column) => ({
    path: column.path,
    entries: sortEntries(column.entries, order(), descending(), hidden(), preferences().foldersFirst).map(decorate)
  }))), candidates = () => {
    let paths = new Set(entries.peek().map((entry3) => entry3.path));
    return [...searchResults.peek() ?? entries.peek(), ...columns.peek().flatMap((column) => column.entries).filter((entry3) => !paths.has(entry3.path))];
  }, browsable = () => {
    let visible2 = view.peek() === "columns" ? visibleColumns.peek().flatMap((column) => column.entries) : visibleEntries.peek(), seen = /* @__PURE__ */ new Set();
    return visible2.filter((entry3) => seen.has(entry3.path) ? !1 : (seen.add(entry3.path), !0));
  }, orderPaths = (paths) => {
    let wanted = new Set(paths), list = browsable().filter((entry3) => wanted.has(entry3.path)).map((entry3) => entry3.path);
    for (let path4 of wanted) list.includes(path4) || list.push(path4);
    return list;
  };
  function applySelection(paths, focus) {
    let list = orderPaths(paths), target = focus ? candidates().find((entry3) => entry3.path === focus) ?? null : null;
    batch(() => {
      selected.set(target), selection.set(target ? list.includes(target.path) ? list : [...list, target.path] : []), previewOpen.set(!1), target || detailsOpen.set(!1);
    });
  }
  let selectedEntries = computed(() => {
    let wanted = new Set(selection());
    return candidates().filter((entry3) => wanted.has(entry3.path));
  }), modalsOpen = computed(() => !!(editRequest() || preferencesOpen() || chooserOpen() || toolsRequest() || appearanceOpen() || newMenuOpen() || previewOpen() || conflict() || permissionsTarget()));
  function currentTabState() {
    return {
      path: path3.peek(),
      entries: entries.peek(),
      columns: columns.peek(),
      history: [...history],
      historyIndex,
      selection: [...selection.peek()],
      selected: selected.peek()?.path ?? null,
      anchor: selectionAnchor,
      remote: remote.peek(),
      view: view.peek(),
      navigation: { ...navigation.peek() }
    };
  }
  function storeTabState(id, state) {
    tabStates.set(id, state);
  }
  function restoreTabState(state) {
    searchText.set(""), history = [...state.history], historyIndex = state.historyIndex, selectionAnchor = state.anchor, batch(() => {
      path3.set(state.path), entries.set(state.entries), columns.set(state.columns), remote.set(state.remote), view.set(state.view), navigation.set(state.navigation), previewOpen.set(!1);
    }), applySelection(state.selection, state.selected);
  }
  function tabLocked() {
    return mutating.peek() || !!conflict.peek() || modalsOpen.peek();
  }
  function refuseTabSwitch() {
    reportError("Aguarde o fim da opera\xE7\xE3o atual.");
  }
  function openTabState(state, view2) {
    let id = `tab-${++tabSequence}`;
    storeTabState(id, state);
    let previous = activeTab.peek();
    return previous && storeTabState(previous, currentTabState()), batch(() => {
      tabOrder.update((order2) => [...order2, id]), activeTab.set(id), restoreTabState({ ...state, view: view2 });
    }), error.set(""), loadDirectory(state.path, "refresh");
  }
  let tabsSummary = computed(() => {
    let active = activeTab(), current = path3();
    return tabOrder().map((id) => {
      let location = id === active ? current : tabStates.get(id)?.path ?? home3, title = location === home3 ? "Pasta pessoal" : tabTitle(location);
      return { id, title: location === home3 || location.includes(":///") ? services.translate?.(title) ?? title : title, path: location, active: id === active };
    });
  });
  {
    let first = `tab-${++tabSequence}`;
    storeTabState(first, emptyTabState(home3, view.peek())), tabOrder.set([first]), activeTab.set(first);
  }
  async function newTab(target) {
    if (disposed) return Promise.resolve();
    if (tabLocked())
      return refuseTabSwitch(), Promise.resolve();
    let base = currentTabState();
    return openTabState(emptyTabState(target ?? base.path, base.view), base.view);
  }
  async function selectTab(id) {
    if (disposed || id === activeTab.peek()) return Promise.resolve();
    let state = tabStates.get(id);
    if (!state) return Promise.resolve();
    if (tabLocked())
      return refuseTabSwitch(), Promise.resolve();
    let previous = activeTab.peek();
    previous && storeTabState(previous, currentTabState()), cancelTabRefresh(), generation++, batch(() => {
      activeTab.set(id), restoreTabState(state), busy.set(!1), error.set("");
    }), refreshRestoredTab(id, state.path);
  }
  async function closeTab(requested) {
    if (disposed) return Promise.resolve();
    let id = requested ?? activeTab.peek(), order2 = tabOrder.peek(), at = order2.indexOf(id);
    if (at < 0) return Promise.resolve();
    if (tabLocked())
      return refuseTabSwitch(), Promise.resolve();
    let closing = id === activeTab.peek() ? currentTabState() : tabStates.get(id);
    tabStates.delete(id), tabReadAt.delete(id);
    let remaining = order2.filter((tab) => tab !== id);
    if (!remaining.length) {
      let fresh = emptyTabState(closing.path, closing.view), replacement = `tab-${++tabSequence}`;
      return storeTabState(replacement, fresh), batch(() => {
        tabOrder.set([replacement]), activeTab.set(replacement), restoreTabState(fresh);
      }), error.set(""), loadDirectory(fresh.path, "refresh");
    }
    let next = remaining[Math.min(at, remaining.length - 1)];
    if (!(id === activeTab.peek())) {
      tabOrder.set(remaining);
      return;
    }
    let state = tabStates.get(next);
    return batch(() => {
      tabOrder.set(remaining), activeTab.set(next), restoreTabState(state);
    }), error.set(""), loadDirectory(state.path, "refresh");
  }
  async function cycleTab(delta) {
    let next = cycleTabIndex(tabOrder.peek(), activeTab.peek(), delta);
    next && await selectTab(next);
  }
  async function loadVolumeUsage() {
    if (disposed || !services.locations.volumeUsage) return;
    let token = ++usageGeneration, targets = drives.peek().filter((place) => place.mounted === !0 && !!place.path).map((place) => place.path);
    if (!targets.length) {
      volumeUsage.set({});
      return;
    }
    try {
      let reported = await services.locations.volumeUsage(targets);
      if (disposed || token !== usageGeneration) return;
      let next = {};
      for (let [mount, value2] of Object.entries(reported)) {
        let usage = normalizeUsage(value2);
        usage && (next[mount] = usage);
      }
      volumeUsage.set(next);
    } catch {
      !disposed && token === usageGeneration && volumeUsage.set({});
    }
  }
  let selectedDetails = signal(null), detailsGeneration = 0, stopDetails = effect(() => {
    let target = selected(), token = ++detailsGeneration;
    selectedDetails.set(null), target && services.files.details && services.files.details(target.path).then((value2) => {
      !disposed && token === detailsGeneration && selectedDetails.set(value2);
    }).catch(() => {
    });
  }), snapshot = computed(() => ({
    locale: services.locale?.(),
    detailsOpen: detailsOpen(),
    detailsVisible: preferences().detailsAlwaysVisible || !!selected() && detailsOpen(),
    remote: remote(),
    transferStatus: transferStatus() + (operationProgress() && operationProgress().total > 0 ? " \xB7 " + Math.round(operationProgress().completed / operationProgress().total * 100) + "%" : ""),
    destinationPath: destinationPath(),
    destinationBusy: destinationBusy(),
    canCancelTransfer: mutating() && !!operationProgress(),
    canUndo: !mutating() && !!services.files.canUndo?.(),
    searchText: searchText(),
    searchBusy: searchBusy(),
    searchRecursive: searchRecursive(),
    activation: activation(),
    operationProgress: operationProgress(),
    canPaste: !!clipboard() || externalClipboardAvailable(),
    themeReady: themeReady(),
    videoThumbnails: videoThumbnails(),
    preferences: preferences(),
    preferencesOpen: preferencesOpen(),
    chooserOpen: chooserOpen(),
    applications: applications(),
    home: home3,
    path: path3(),
    entries: visibleEntries(),
    columns: visibleColumns(),
    drives: drives(),
    games: games(),
    places: places(),
    modalsOpen: modalsOpen(),
    hidden: hidden(),
    order: order(),
    descending: descending(),
    view: view(),
    busy: busy(),
    error: error(),
    palette: palette(),
    icons: { ...icons(), ...Object.fromEntries(iconCatalog().emblems.map((item2) => [item2.name, item2.source])) },
    ...navigation(),
    selected: selected(),
    mutating: mutating(),
    selection: [...selection()],
    selectionCount: selection().length,
    conflict: conflict(),
    clipboard: clipboard(),
    newMenuOpen: newMenuOpen(),
    previewOpen: previewOpen(),
    editRequest: editRequest(),
    previewSource: previewSource(),
    previewKind: selectedPreviewKind(),
    tabs: tabsSummary(),
    activeTab: activeTab(),
    // One URI per selected entry, so the native drag offers the whole selection.
    selectionUris: uriList(selectedEntries().map((entry3) => entry3.path), (path4) => services.files.url(path4)),
    volumeUsage: { ...volumeUsage() }
  }));
  function reportError(problem) {
    disposed || error.set(services.translate?.(problem instanceof Error ? problem.message : String(problem)) ?? (problem instanceof Error ? problem.message : String(problem)));
  }
  async function loadDirectory(target, kind2 = "push", columnIndex = 0, quiet = !1) {
    if (disposed) return;
    kind2 !== "refresh" && searchText.set(""), cancelTabRefresh();
    let token = ++generation;
    batch(() => {
      quiet || busy.set(!0), error.set("");
    });
    try {
      let virtual = ["trash:///", "recent:///", "applications:///"].includes(target), nextPath = virtual ? target : target.includes("://") && !target.startsWith("file://") ? await services.desktop.resolveLocation?.(target) ?? (() => {
        throw new Error("Instale GVfs para abrir locais de rede.");
      })() : services.files.resolve(target.startsWith("file://") && services.files.fromUrl ? services.files.fromUrl(target) : target), nextEntries;
      if (nextPath === "applications:///") {
        if (!services.desktop.applications) throw new Error("Aplicativos indispon\xEDveis.");
        let apps = await services.desktop.applications();
        applications.set(apps), nextEntries = apps.map((app) => ({ name: app.name, path: app.id, directory: !1, symlink: !1, size: 0, modified: 0, icon: app.icon || "package-x-generic" }));
      } else if (virtual) {
        if (!services.desktop.virtualEntries) throw new Error("Local virtual indispon\xEDvel.");
        nextEntries = await services.desktop.virtualEntries(nextPath);
      } else nextEntries = await services.files.list(nextPath);
      let nextRemote = virtual ? !1 : await services.files.remote?.(nextPath).catch(() => !1) ?? !1;
      if (disposed || token !== generation) return;
      tabReadAt.set(activeTab.peek(), Date.now());
      let wanted = new Set(selection.peek()), previousFocus = selected.peek()?.path ?? null;
      batch(() => {
        kind2 === "push" || kind2 === "column" ? (history.splice(historyIndex + 1), history.push(nextPath), historyIndex++) : kind2 === "back" ? historyIndex-- : kind2 === "forward" && historyIndex++, nextPath === "recent:///" && kind2 === "push" && (order.set("modified"), descending.set(!0)), path3.set(nextPath), remote.set(nextRemote), entries.set(nextEntries), previewOpen.set(!1);
        let nextColumn = { path: nextPath, entries: nextEntries };
        columns.set(kind2 === "column" ? [...columns.peek().slice(0, columnIndex + 1), nextColumn] : kind2 === "refresh" && columns.peek().length ? columns.peek().map((column) => column.path === nextPath ? nextColumn : column) : [nextColumn]), navigation.set({ back: historyIndex > 0, forward: historyIndex < history.length - 1 });
      });
      let retained = kind2 === "refresh" ? candidates().filter((entry3) => wanted.has(entry3.path)).map((entry3) => entry3.path) : [];
      applySelection(retained, retained.includes(previousFocus ?? "") ? previousFocus : retained[retained.length - 1] ?? null);
    } catch (problem) {
      token === generation && reportError(problem);
    } finally {
      !disposed && token === generation && busy.set(!1);
    }
  }
  async function refreshLocations() {
    let token = ++locationsGeneration, results = await Promise.allSettled([services.locations.volumes(), services.locations.games(home3), services.locations.places?.(home3) ?? Promise.resolve([])]);
    disposed || token !== locationsGeneration || (batch(() => {
      results[0].status === "fulfilled" ? drives.set(results[0].value) : reportError("N\xE3o foi poss\xEDvel consultar volumes."), results[1].status === "fulfilled" && games.set(results[1].value), results[2].status === "fulfilled" && places.set(results[2].value);
    }), loadVolumeUsage());
  }
  async function refreshTheme() {
    let token = ++themeGeneration;
    try {
      let theme = await services.desktop.theme();
      if (disposed || token !== themeGeneration) return;
      batch(() => {
        palette.set(theme.palette), icons.set(theme.icons);
      });
    } catch {
      !disposed && token === themeGeneration && palette.set({});
    } finally {
      !disposed && token === themeGeneration && themeReady.set(!0);
    }
  }
  async function open(target) {
    if (!disposed)
      try {
        if (path3.peek() === "applications:///") {
          if (!applications.peek().some((app) => app.id === target)) throw new Error("Aplicativo inv\xE1lido.");
          if (!services.desktop.launch) throw new Error("N\xE3o foi poss\xEDvel iniciar o aplicativo.");
          await services.desktop.launch(target);
        } else await services.files.open(services.files.resolve(target));
      } catch (problem) {
        reportError(problem);
      }
  }
  function select(target) {
    selectPath(target, "replace");
  }
  function selectPath(target, mode = "replace") {
    if (target === null) {
      selectionAnchor = null, applySelection([], null);
      return;
    }
    if (!candidates().some((entry3) => entry3.path === target)) return;
    let list = browsable(), index2 = list.findIndex((entry3) => entry3.path === target);
    if (index2 < 0) {
      applySelection([target], target);
      return;
    }
    if (mode === "context") {
      selection.peek().includes(target) ? applySelection(selection.peek(), target) : selectPath(target, "replace");
      return;
    }
    if (mode === "toggle") {
      let current = selection.peek();
      if (current.includes(target)) {
        let remaining = current.filter((path4) => path4 !== target), focus = remaining.length ? remaining.reduce((best, path4) => Math.abs(list.findIndex((entry3) => entry3.path === path4) - index2) < Math.abs(list.findIndex((entry3) => entry3.path === best) - index2) ? path4 : best) : null;
        selectionAnchor = focus, applySelection(remaining, focus);
        return;
      }
      selectionAnchor = target, applySelection([...current, target], target);
      return;
    }
    if (mode === "range") {
      let anchor = selectionAnchor && list.some((entry3) => entry3.path === selectionAnchor) ? selectionAnchor : target, from = list.findIndex((entry3) => entry3.path === anchor), [start, end] = from <= index2 ? [from, index2] : [index2, from];
      applySelection(list.slice(start, end + 1).map((entry3) => entry3.path), target);
      return;
    }
    selectionAnchor = target, applySelection([target], target);
  }
  function selectAll() {
    let list = browsable().filter((entry3) => entries.peek().some((item2) => item2.path === entry3.path));
    list.length && (selection.peek()[0] && list.some((entry3) => entry3.path === selection.peek()[0]) || (selectionAnchor = list[0].path), applySelection(list.map((entry3) => entry3.path), list[list.length - 1].path));
  }
  function navigateSelection(axis, delta, extend = !1) {
    if (!Number.isInteger(delta) || !delta) return;
    let focus = selected.peek();
    if (!focus) {
      selectPath(browsable()[0]?.path ?? null);
      return;
    }
    let flat = browsable();
    if (axis === "index" || flat.length < 2) {
      let at = flat.findIndex((entry3) => entry3.path === focus.path);
      if (at < 0) return;
      selectPath(flat[Math.max(0, Math.min(flat.length - 1, at + delta))].path, extend ? "range" : "replace");
      return;
    }
    let columnsList = visibleColumns.peek(), columnIndex = Math.max(0, columnsList.findIndex((column) => column.entries.some((entry3) => entry3.path === focus.path)));
    if (axis === "row") {
      let entriesList = columnsList[columnIndex]?.entries ?? [], at = entriesList.findIndex((entry3) => entry3.path === focus.path);
      if (at < 0) return;
      selectPath(entriesList[Math.max(0, Math.min(entriesList.length - 1, at + delta))].path, extend ? "range" : "replace");
      return;
    }
    let next = columnIndex + delta;
    if (next < 0 || next >= columnsList.length) return;
    let row = columnsList[columnIndex]?.entries.findIndex((entry3) => entry3.path === focus.path) ?? 0, neighbour = columnsList[next].entries, target = neighbour.find((entry3) => entry3.name === focus.name) ?? neighbour[Math.min(Math.max(row, 0), neighbour.length - 1)];
    target && selectPath(target.path, extend ? "range" : "replace");
  }
  async function trashSelected() {
    let targets = selectedEntries.peek(), activePath = path3.peek();
    if (!targets.length || disposed || mutating.peek() || conflict.peek() || activePath.includes(":///")) return;
    let changed = !1;
    try {
      if (!services.files.trash) throw new Error("Lixeira indispon\xEDvel.");
      mutating.set(!0), tabReadAt.clear(), error.set("");
      for (let target of targets) {
        if (disposed) return;
        await services.files.trash(target.path), changed = !0, clipboard.peek()?.entries.some((entry3) => entry3.path === target.path) && clipboard.set(null);
      }
      if (disposed) return;
      path3.peek() === activePath && await loadDirectory(activePath, "refresh");
    } catch (problem) {
      changed && !disposed && path3.peek() === activePath && await loadDirectory(activePath, "refresh"), reportError(problem);
    } finally {
      disposed || mutating.set(!1);
    }
  }
  function requestCreate(kind2) {
    if (!mutating.peek()) {
      if (path3.peek().includes(":///")) {
        reportError("Abra uma pasta para criar um item.");
        return;
      }
      batch(() => {
        error.set(""), newMenuOpen.set(!1), editRequest.set({ kind: kind2, name: "", targets: [] });
      });
    }
  }
  function requestRename() {
    let targets = selectedEntries.peek();
    if (path3.peek().includes(":///")) {
      reportError("Abra a pasta original para renomear este item.");
      return;
    }
    if (!(!targets.length || mutating.peek())) {
      if (targets.length > 1) {
        tools.open("bulk");
        return;
      }
      batch(() => {
        error.set(""), editRequest.set({ kind: "rename", name: targets[0].name, targets });
      });
    }
  }
  async function reloadAfterEdit(previous, destinations, activePath) {
    if (disposed || path3.peek() !== activePath) return;
    if (activePath.includes(":///")) {
      await loadDirectory(activePath, "refresh");
      return;
    }
    let token = ++generation, refreshed = await Promise.all(columns.peek().map(async (column) => ({ path: column.path, entries: await services.files.list(column.path) })));
    disposed || token !== generation || path3.peek() !== activePath || batch(() => {
      columns.set(refreshed), entries.set(refreshed.find((column) => column.path === activePath)?.entries ?? []);
      let landed = refreshed.flatMap((column) => column.entries).filter((entry3) => destinations.includes(entry3.path));
      (!selected.peek() || selected.peek()?.path === previous || !previous) && applySelection(landed.map((entry3) => entry3.path), landed[landed.length - 1]?.path ?? null);
    });
  }
  async function submitEdit(name) {
    let request = editRequest.peek();
    if (!request || disposed || mutating.peek() || conflict.peek()) return !1;
    let activePath = path3.peek();
    try {
      if (activePath === "applications:///") throw new Error("Aplicativos n\xE3o podem ser alterados nesta visualiza\xE7\xE3o.");
      let transfer = request.kind === "copy" || request.kind === "move";
      if (!transfer) validateName(name);
      else if (!name.trim()) throw new Error("Informe a pasta de destino.");
      let targets = request.targets;
      if (transfer && !targets.length) throw new Error("Selecione um item para transferir.");
      let parent2 = transfer ? services.files.resolve(name) : targets[0] ? services.files.parent(targets[0].path) : activePath;
      if (batch(() => {
        mutating.set(!0), tabReadAt.clear(), error.set("");
      }), transfer) {
        if (!services.files.transfer) throw new Error("Transfer\xEAncia indispon\xEDvel.");
        return editRequest.set(null), await runTransfers(targets.map((target) => ({
          source: target.path,
          destination: services.files.child(parent2, target.name),
          mode: request.kind
        })), activePath);
      }
      let destination = services.files.child(parent2, name);
      return request.kind === "rename" ? await services.files.rename(targets[0].path, destination) : (request.kind === "file" || request.kind === "folder") && await services.files.create(destination, request.kind), disposed ? !1 : (editRequest.set(null), previewOpen.set(!1), await reloadAfterEdit(targets[0]?.path ?? "", [destination], activePath), !0);
    } catch (problem) {
      return reportError(problem), !1;
    } finally {
      disposed || mutating.set(!1);
    }
  }
  let tools = createFileTools({
    request: toolsRequest,
    path: path3,
    selected: selectedEntries,
    entries,
    mutating,
    files: services.files,
    desktop: services.desktop,
    refresh: () => loadDirectory(path3.peek(), "refresh"),
    onError: reportError
  });
  return {
    tools,
    searchText,
    searchRecursive,
    searchBusy,
    operationProgress,
    setSearch: (value2) => searchText.set(value2),
    setSearchRecursive: (value2) => searchRecursive.set(value2),
    setExternalClipboardAvailable: (value2) => externalClipboardAvailable.set(value2),
    canPaste: () => !!clipboard() || externalClipboardAvailable(),
    cancelTransfer: () => transferAbort?.abort(),
    canCancelTransfer: () => mutating() && !!operationProgress(),
    canUndo: () => !mutating() && !!services.files.canUndo?.(),
    undo: async () => {
      if (!(mutating.peek() || !services.files.undo)) {
        mutating.set(!0);
        try {
          await services.files.undo(), tabReadAt.clear(), await loadDirectory(path3.peek(), "refresh");
        } catch (problem) {
          reportError(problem);
        } finally {
          disposed || mutating.set(!1);
        }
      }
    },
    reveal: async (urls, properties2 = !1, folders = !1) => {
      for (let [index2, url] of urls.entries()) try {
        let target = url.startsWith("file:") && services.files.fromUrl ? services.files.fromUrl(url) : await services.desktop.resolveLocation?.(url);
        if (!target) throw new Error("Local indispon\xEDvel.");
        index2 > 0 ? await newTab(folders ? target : services.files.parent(target)) : await loadDirectory(folders ? target : services.files.parent(target)), folders || (selectPath(target, "replace"), properties2 && detailsOpen.set(!0));
      } catch (problem) {
        reportError(problem);
      }
      activation.update((value2) => value2 + 1);
    },
    restoreSelected: async () => {
      if (path3.peek() !== "trash:///" || mutating.peek() || !services.desktop.restoreTrash) return;
      let targets = selectedEntries.peek();
      if (!targets.length) return;
      let failure;
      mutating.set(!0);
      try {
        await services.desktop.restoreTrash(targets.map((item2) => item2.path));
      } catch (problem) {
        failure = problem;
      } finally {
        disposed || (await loadDirectory("trash:///", "refresh"), failure && reportError(failure), mutating.set(!1));
      }
    },
    permissionsTarget,
    editPermissions: () => {
      selected.peek() && path3.peek() !== "applications:///" && permissionsTarget.set(selected.peek());
    },
    closePermissions: () => {
      mutating.peek() || permissionsTarget.set(null);
    },
    savePermissions: async (mode) => {
      let target = permissionsTarget.peek();
      if (!(!target || mutating.peek()))
        try {
          if (!services.files.setPermissions) throw new Error("Edi\xE7\xE3o de permiss\xF5es indispon\xEDvel.");
          if (mutating.set(!0), tabReadAt.clear(), error.set(""), await services.files.setPermissions(target.path, mode), disposed) return;
          selected.peek()?.path === target.path && services.files.details && selectedDetails.set(await services.files.details(target.path)), permissionsTarget.set(null);
        } catch (problem) {
          reportError(problem);
        } finally {
          disposed || mutating.set(!1);
        }
    },
    iconCatalog,
    locationAction: async (action, place) => {
      try {
        if (action === "addCurrent") {
          if (path3.peek().includes(":///")) throw new Error("Abra uma pasta para adicion\xE1-la a Locais.");
          if (!services.locations.bookmark) throw new Error("Favoritos indispon\xEDveis.");
          await services.locations.bookmark(home3, path3.peek());
        } else if (action === "remove" || action === "add") {
          if (!services.locations.bookmark) throw new Error("Favoritos indispon\xEDveis.");
          await services.locations.bookmark(home3, place.path, action === "remove");
        } else if (action === "mount" || action === "unmount") {
          if (!services.locations.volumeAction) throw new Error("Volumes indispon\xEDveis.");
          await services.locations.volumeAction(action, place);
        }
        await refreshLocations();
      } catch (problem) {
        reportError(problem);
      }
    },
    addSelectedPlace: async () => {
      let target = selected.peek();
      if (target?.directory)
        try {
          await services.locations.bookmark?.(home3, target.path), await refreshLocations();
        } catch (problem) {
          reportError(problem);
        }
    },
    folderAppearances,
    appearanceOpen,
    customizeFolder: () => {
      services.desktop.iconCatalog?.().then((value2) => {
        disposed || iconCatalog.set(value2);
      }).catch(reportError), selected.peek()?.directory && !path3.peek().includes(":///") && !mutating.peek() && appearanceOpen.set(!0);
    },
    closeAppearance: () => appearanceOpen.set(!1),
    saveFolderAppearance: async (value2) => {
      let target = selected.peek();
      if (!target?.directory) return;
      let next = { ...folderAppearances.peek(), [target.path]: normalizeFolderAppearance(value2) };
      try {
        if (!services.desktop.writeFolderAppearances) throw new Error("Personaliza\xE7\xE3o indispon\xEDvel.");
        if (await services.desktop.writeFolderAppearances(next), disposed) return;
        folderAppearances.set(next), appearanceOpen.set(!1);
      } catch (problem) {
        reportError(problem);
      }
    },
    preferences,
    preferencesOpen,
    chooserOpen,
    applications,
    showPreferences: () => preferencesOpen.set(!0),
    closePreferences: () => preferencesOpen.set(!1),
    setPreference: (key, value2) => {
      let next = normalizePreferences({ ...preferences.peek(), [key]: value2 });
      preferences.set(next), services.desktop.writePreferences?.(next).catch(reportError);
    },
    chooseApplication: async (target) => {
      try {
        if (!services.desktop.applications) throw new Error("Seletor indispon\xEDvel.");
        chooserTarget = target, applications.set(await services.desktop.applications(target)), chooserOpen.set(!0);
      } catch (e) {
        reportError(e);
      }
    },
    closeChooser: () => chooserOpen.set(!1),
    launchApplication: async (id) => {
      try {
        if (!applications.peek().some((app) => app.id === id)) throw new Error("Aplicativo inv\xE1lido.");
        await services.desktop.launch?.(id, chooserTarget), chooserOpen.set(!1);
      } catch (e) {
        reportError(e);
      }
    },
    special: (uri) => loadDirectory(uri),
    openDesktopFile: async () => {
      let item2 = selected.peek();
      if (!(path3.peek() !== "applications:///" || !item2))
        try {
          if (!services.desktop.openDesktopFile) throw new Error("Editor de texto indispon\xEDvel.");
          await services.desktop.openDesktopFile(item2.path);
        } catch (problem) {
          reportError(problem);
        }
    },
    manageApplication: async () => {
      let item2 = selected.peek();
      if (!(path3.peek() !== "applications:///" || !item2))
        try {
          if (!services.desktop.manageApplication) throw new Error("Gerenciador de aplicativos indispon\xEDvel.");
          await services.desktop.manageApplication(item2.path);
        } catch (problem) {
          reportError(problem);
        }
    },
    hideApplication: async () => {
      let item2 = selected.peek();
      if (!(path3.peek() !== "applications:///" || !item2))
        try {
          if (!services.desktop.hideApplication) throw new Error("Ocultar indispon\xEDvel.");
          await services.desktop.hideApplication(item2.path), await loadDirectory("applications:///", "refresh");
        } catch (problem) {
          reportError(problem);
        }
    },
    showApplications: () => loadDirectory("applications:///"),
    terminal: async () => {
      try {
        await services.desktop.terminal?.(path3.peek());
      } catch (e) {
        reportError(e);
      }
    },
    home: home3,
    path: path3,
    places,
    drives,
    games,
    hidden,
    order,
    descending,
    view,
    busy,
    error,
    navigation,
    palette,
    icons,
    visibleEntries,
    visibleColumns,
    snapshot,
    reportError,
    remote,
    transferStatus,
    selected,
    selection,
    selectedEntries,
    selectionAnchor: () => selectionAnchor,
    selectedDetails,
    mutating,
    editRequest,
    previewOpen,
    previewSource,
    selectedPreviewKind,
    detailsOpen,
    openDetails: (target) => {
      target && selectPath(target), selected.peek() && detailsOpen.set(!0);
    },
    closeDetails: () => detailsOpen.set(!1),
    trashSelected,
    select,
    selectPath,
    selectAll,
    navigateSelection,
    requestCreate,
    requestRename,
    submitEdit,
    tabs: tabsSummary,
    activeTab,
    newTab,
    selectTab,
    closeTab,
    nextTab: () => cycleTab(1),
    prevTab: () => cycleTab(-1),
    volumeUsage,
    conflict,
    resolveConflict,
    cancelConflict: () => {
      mutating.peek() || (conflict.set(null), pendingTransfers = [], editRequest.set(null));
    },
    destinationPath,
    destinationFolders,
    destinationBusy,
    browseDestination,
    destinationUp: () => browseDestination(services.files.parent(destinationPath.peek())),
    confirmDestination: () => destinationBusy.peek() ? Promise.resolve(!1) : submitEdit(destinationPath.peek()),
    dropFiles: async (urls, folder, mode) => {
      if (disposed || mutating.peek() || conflict.peek()) return !1;
      let activePath = path3.peek();
      try {
        if (!services.files.fromUrl || !services.files.transfer) throw new Error("Arrastar arquivos indispon\xEDvel.");
        let sources = [...new Set(urls.map((url) => services.files.fromUrl(url)))];
        return sources.length ? await runTransfers(sources.map((source) => {
          let name = source.split("/").pop();
          return validateName(name), { source, destination: services.files.child(folder, name), mode };
        }), activePath) : !1;
      } catch (e) {
        return reportError(e), !1;
      } finally {
        disposed || mutating.set(!1);
      }
    },
    copy: () => {
      let targets = selectedEntries.peek();
      path3.peek() === "applications:///" || !targets.length || (clipboard.set({ entries: [...targets], mode: "copy" }), services.desktop.writeFileClipboard?.({ urls: targets.map((item2) => services.files.url(item2.path)), mode: "copy" }).catch(reportError));
    },
    cut: () => {
      let targets = selectedEntries.peek();
      if (path3.peek().includes(":///")) {
        reportError("Abra a pasta original para recortar este item.");
        return;
      }
      targets.length && (clipboard.set({ entries: [...targets], mode: "move" }), services.desktop.writeFileClipboard?.({ urls: targets.map((item2) => services.files.url(item2.path)), mode: "move" }).catch(reportError));
    },
    requestTransfer: (kind2) => {
      if (path3.peek() === "applications:///" || path3.peek() === "trash:///" && kind2 === "move") {
        reportError("Abra uma pasta para transferir este item.");
        return;
      }
      let targets = selectedEntries.peek();
      targets.length && !mutating.peek() && !conflict.peek() && (error.set(""), editRequest.set({ kind: kind2, targets: [...targets], name: path3.peek() }), browseDestination(path3.peek().includes(":///") ? home3 : path3.peek()));
    },
    paste: async () => {
      if (!conflict.peek()) {
        if (mutating.peek() || path3.peek().includes(":///")) {
          reportError("Escolha uma pasta de destino.");
          return;
        }
        try {
          let destinationPath2 = path3.peek();
          if (services.desktop.readFileClipboard) {
            let external = await services.desktop.readFileClipboard();
            if (!external) {
              clipboard.set(null);
              return;
            }
            let targets = external.urls.map((url) => {
              if (!services.files.fromUrl || !url.startsWith("file:")) throw new Error("Copie arquivos de uma localiza\xE7\xE3o local ou montada.");
              let path4 = services.files.fromUrl(url);
              return { path: path4, name: path4.split("/").pop(), directory: !1, symlink: !1, size: 0, modified: 0, icon: "text-x-generic" };
            });
            clipboard.set({ entries: targets, mode: external.mode });
          }
          if (path3.peek() !== destinationPath2 || mutating.peek() || disposed) return;
          let held = clipboard.peek();
          held?.entries.length && await runTransfers(held.entries.map((target) => ({
            source: target.path,
            destination: services.files.child(destinationPath2, target.name),
            mode: held.mode
          })), destinationPath2);
        } catch (problem) {
          reportError(problem);
        }
      }
    },
    requestNew: () => newMenuOpen.set(!0),
    closeNewMenu: () => newMenuOpen.set(!1),
    cancelEdit: () => {
      mutating.peek() || (editRequest.set(null), conflict.set(null), pendingTransfers = []);
    },
    requestPreview: () => {
      selected.peek() && selectedPreviewKind() !== "none" && previewOpen.set(!0);
    },
    closePreview: () => previewOpen.set(!1),
    navigate: (target) => loadDirectory(target),
    back: () => historyIndex > 0 ? loadDirectory(history[historyIndex - 1], "back") : Promise.resolve(),
    forward: () => historyIndex < history.length - 1 ? loadDirectory(history[historyIndex + 1], "forward") : Promise.resolve(),
    up: () => loadDirectory(path3.peek().includes(":///") ? home3 : services.files.parent(path3.peek())),
    refresh: () => Promise.all([loadDirectory(path3.peek(), "refresh"), refreshLocations()]),
    open,
    openColumn: (target, index2) => !Number.isInteger(index2) || index2 < 0 || index2 >= columns.peek().length ? Promise.resolve() : loadDirectory(target, "column", index2),
    toggleHidden: () => hidden.update((value2) => !value2),
    toggleDescending: () => descending.update((value2) => !value2),
    setOrder: (value2) => order.set(value2),
    setView: (value2) => view.set(value2),
    async initialize(startPath = home3) {
      if (disposed) return;
      if (services.desktop.readFolderAppearances) {
        let saved = await services.desktop.readFolderAppearances();
        if (disposed) return;
        folderAppearances.set(saved);
      }
      if (services.desktop.readPreferences) {
        let saved = await services.desktop.readPreferences();
        if (disposed) return;
        preferences.set(normalizePreferences(saved));
      }
      stopWatching2 ??= services.desktop.watchTheme(() => {
        refreshTheme();
      });
      let seed = activeTab.peek();
      seed && storeTabState(seed, emptyTabState(startPath, view.peek())), await Promise.all([loadDirectory(startPath), refreshLocations(), refreshTheme(), services.desktop.iconCatalog?.().then((value2) => {
        disposed || iconCatalog.set(value2);
      }).catch(reportError)]);
    },
    dispose() {
      disposed || (disposed = !0, destinationGeneration++, usageGeneration++, pendingTransfers = [], cancelTabRefresh(), generation++, tabStates.clear(), tabReadAt.clear(), transferAbort?.abort(), stopWatching2?.(), stopDetails.dispose(), stopVideoThumbnails.dispose(), stopSearch.dispose(), stopFileWatch.dispose(), snapshot.dispose(), tabsSummary.dispose(), visibleColumns.dispose(), visibleEntries.dispose(), previewSource.dispose(), selectedPreviewKind.dispose(), selectedEntries.dispose(), modalsOpen.dispose());
    }
  };
}

// src/components/FileTools.tsx
init_i18n2();
init_src();

// ../../packages/bridge-qml/src/qml.ts
function createQmlRef(_component) {
  let current = null;
  return {
    get current() {
      return current;
    },
    attach(object) {
      current = object;
    }
  };
}
function tag(type) {
  return (props) => ({ __spec: !0, kind: `qml:${type}`, props: { ...props } });
}
var qml = {
  Item: tag("Item"),
  ScrollView: tag("ScrollView"),
  Column: tag("Column"),
  Row: tag("Row"),
  Text: tag("Text"),
  Label: tag("Label"),
  Button: tag("Button"),
  TextField: tag("TextField"),
  Dialog: tag("Dialog")
};

// ../../packages/bridge-qml/src/native-component.ts
var identifier = /^[A-Za-z_][A-Za-z0-9_]*$/, path2 = /^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/;
function defineQmlComponent(definition) {
  if (!identifier.test(definition.type) || !path2.test(definition.module)) throw new TypeError("Invalid QML type or module");
  for (let property of definition.properties) if (!path2.test(property)) throw new TypeError("Invalid QML property");
  for (let [event, args] of Object.entries(definition.events ?? {}))
    if (!/^(?:[A-Za-z_][A-Za-z0-9_]*\.)*on[A-Z][A-Za-z0-9_]*$/.test(event) || args.some((arg) => !path2.test(arg))) throw new TypeError("Invalid QML event contract");
  let nativeQmlType = Object.freeze({
    ...definition,
    properties: Object.freeze([...definition.properties]),
    events: Object.freeze(Object.fromEntries(Object.entries(definition.events ?? {}).map(([key, args]) => [key, Object.freeze([...args])])))
  });
  return (props) => ({ __spec: !0, kind: `qml:${nativeQmlType.type}`, props: { ...props }, nativeQmlType });
}

// ../../packages/bridge-runtime/src/native-updates.ts
function createWireValueCache() {
  let values = /* @__PURE__ */ new Map();
  return {
    changed(key, value2) {
      let next = JSON.stringify(value2);
      return values.has(key) && values.get(key) === next ? !1 : (values.set(key, next), !0);
    },
    forget(key) {
      values.delete(key);
    },
    clear() {
      values.clear();
    }
  };
}

// ../../packages/bridge-qml/src/native-scene.ts
init_src();

// ../../packages/bridge-qml/src/native-value.ts
function qmlEnum(reference) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)+$/.test(reference)) throw new TypeError("Invalid QML enum reference");
  return Object.freeze({ __qmlEnum: reference });
}
function isQmlEnum(value2) {
  return typeof value2 == "object" && value2 !== null && "__qmlEnum" in value2 && typeof value2.__qmlEnum == "string" && /^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)+$/.test(value2.__qmlEnum);
}

// ../../packages/bridge-qml/src/native-composition.ts
var nextScope = 0;
function createQmlScope(stableIds = {}) {
  let prefix = `ndScope${nextScope++}_`, ids = { ...stableIds };
  if (Object.values(ids).some((id) => !/^[a-z_][A-Za-z0-9_]*$/.test(id))) throw new TypeError("Invalid native id");
  return { ids, id(name) {
    if (!/^[a-z_][A-Za-z0-9_]*$/.test(name)) throw new TypeError("Invalid native id");
    return ids[name] ??= prefix + name;
  } };
}
var closures = /* @__PURE__ */ new WeakMap(), projected = /* @__PURE__ */ new WeakMap();
function qmlReadEvent(properties2, handler) {
  if (properties2.some((name) => !/^[A-Za-z_][A-Za-z0-9_]*$/.test(name))) throw new TypeError("Invalid event property");
  let forwarded = ((...args) => handler(...args));
  return projected.set(forwarded, properties2), forwarded;
}
function projectedEvent(value2) {
  return typeof value2 == "function" ? projected.get(value2) : void 0;
}
function qmlExpression(scope, fn) {
  let expression = () => {
    throw new Error("A native QML expression cannot execute in Node");
  };
  return closures.set(expression, { scope, fn, kind: "expression" }), expression;
}
function qmlHandler(scope, fn) {
  let handler = () => {
    throw new Error("A native QML handler cannot execute in Node");
  };
  return closures.set(handler, { scope, fn, kind: "handler" }), handler;
}
function nativeClosure(value2) {
  return typeof value2 == "function" ? closures.get(value2) : void 0;
}
function emitNativeClosure(value2, args = "") {
  let closure = closures.get(value2);
  if (!closure) throw new TypeError("Expected an explicit native closure");
  let source = closure.fn.toString(), parameter = /^\s*(?:function[^ (]*\s*\(\s*|\(?\s*)([$A-Za-z_][\w$]*)/.exec(source)?.[1], noParameters = /^\s*(?:\(\s*\)\s*=>|function[^ (]*\s*\(\s*\))/.test(source);
  if (!parameter && !noParameters) throw new TypeError("Native closures require a named scope parameter or no parameters");
  let escaped = parameter?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), used = new Set(escaped ? [...source.matchAll(new RegExp(`${escaped}\\.([A-Za-z_][A-Za-z0-9_]*)`, "g"))].map((match) => match[1]) : []), objects = Object.entries(closure.scope.ids).filter(([name]) => used.has(name)).map(([name, id]) => `${JSON.stringify(name)}: ${id}`).join(", ");
  return `(() => { const __name = function(fn) { return fn; }; return (${source})({${objects}}${args ? ", " + args : ""}); })()`;
}

// ../../packages/bridge-qml/src/native-scene.ts
init_src();

// ../../packages/bridge-qml/src/primitives/types.ts
function isSpecNode(value2) {
  return typeof value2 == "object" && value2 !== null && value2.__spec === !0 && typeof value2.kind == "string";
}

// ../../packages/bridge-qml/src/native-scene.ts
var primitives = {
  View: "Column",
  Container: "Item",
  Text: "Text",
  Input: "TextField",
  Button: "Button",
  Image: "Image"
}, types = /* @__PURE__ */ new Set(["ScrollView", "Item", "Column", "Row", "Text", "Label", "Button", "TextField", "Dialog", "Image"]), events = {
  onTap: "onClicked",
  onClicked: "onClicked",
  onAccepted: "onAccepted",
  onRejected: "onRejected",
  onTextEdited: "onTextEdited",
  onEditingFinished: "onEditingFinished",
  onChange: "onTextEdited"
}, properties = /* @__PURE__ */ new Set(["width", "height", "visible", "enabled", "spacing", "text", "title", "modal", "placeholderText", "source"]);
function createNativeScene(tree, update, patch = async () => {
}, onError = console.error, options = {}) {
  let context = options.context ?? "Nandomo";
  if (!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(context)) throw new TypeError("Invalid QML binding context");
  let imports = /* @__PURE__ */ new Set(["QtQuick", "QtQuick.Controls", "QtQuick.Layouts"]);
  for (let module of options.imports ?? []) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(module)) throw new TypeError("Invalid QML module");
    imports.add(module);
  }
  let bindings = {}, previousValues = createWireValueCache(), handlers = /* @__PURE__ */ new Map(), makeFrame = () => ({ cleanups: [], mounts: [], refs: [], disposed: !1, mounted: !1, ready: !0 }), rootFrame = makeFrame(), frame = rootFrame, resolver, freeBindings = [];
  function inFrame(next, fn) {
    let previous = frame;
    frame = next;
    try {
      return fn();
    } finally {
      frame = previous;
    }
  }
  function disposeFrame(target) {
    if (target.disposed) return;
    target.disposed = !0;
    let errors = [];
    for (let cleanup of target.cleanups.splice(0).reverse())
      try {
        cleanup();
      } catch (error) {
        errors.push(error);
      }
    for (let ref of target.refs.splice(0))
      try {
        ref.fn(null);
      } catch (error) {
        errors.push(error);
      }
    if (target.mounts.length = 0, errors.length) throw new AggregateError(errors, "QML frame cleanup failed");
  }
  function mountFrame(target) {
    if (!(target.disposed || target.mounted || !target.ready || !resolver)) {
      target.mounted = !0;
      try {
        for (let ref of target.refs) ref.fn(resolver(ref.name));
        for (let fn of target.mounts) fn();
      } catch (error) {
        try {
          disposeFrame(target);
        } catch {
        }
        throw error;
      }
    }
  }
  let names2 = /* @__PURE__ */ new Set(["appWindow"]), bindingId = 0, handlerId = 0, nodeId = 0, mounted2 = !1, disposed = !1, currentOrigin;
  function value2(raw, property) {
    let origin = currentOrigin;
    if (nativeClosure(raw)) return emitNativeClosure(raw);
    if (isQmlEnum(raw)) return raw.__qmlEnum;
    if (typeof raw != "function") return JSON.stringify(raw ?? null);
    let key = freeBindings.pop() ?? `b${bindingId++}`, handle = effect(() => {
      let next;
      try {
        next = raw();
      } catch (error) {
        throw sourceError(error, origin, property);
      }
      try {
        let changed = previousValues.changed(key, next);
        bindings[key] = next, changed && update(key, next);
      } catch (error) {
        throw sourceError(error, origin, property);
      }
    });
    return frame.cleanups.push(() => {
      handle.dispose(), delete bindings[key], previousValues.forget(key), freeBindings.push(key);
    }), `${context}.${key}`;
  }
  function layoutValue(raw, width2) {
    if (nativeClosure(raw)) return value2(raw);
    if (typeof raw == "function") {
      let resolve4 = (pick) => value2(() => pick(raw())), initial = raw();
      if (!isResponsive(initial)) return value2(raw);
      let expression2 = resolve4((v) => isResponsive(v) ? v.base : v);
      for (let point of Object.keys(initial.minWidth).map(Number).sort((a, b) => a - b))
        expression2 = `(${width2} >= ${point} ? ${resolve4((v) => isResponsive(v) ? v.minWidth[point] : v)} : ${expression2})`;
      return expression2;
    }
    if (!isResponsive(raw)) return value2(raw);
    let expression = value2(raw.base);
    for (let point of Object.keys(raw.minWidth).map(Number).sort((a, b) => a - b))
      expression = `(${width2} >= ${point} ? ${value2(raw.minWidth[point])} : ${expression})`;
    return expression;
  }
  function sizing(props, grid) {
    let lines = [];
    if (grid) {
      let grow = Number(props.grow ?? 0);
      lines.push(`property real ndGrow: ${grow}`);
      let row = `${grid}.ndDirection === "row"`, align = `${grid}.ndAlign`;
      lines.push(`Layout.fillWidth: (${row} ? ${grow > 0} : ${align} === "stretch")`), lines.push(`Layout.fillHeight: (${row} ? ${align} === "stretch" : ${grow > 0})`), grow > 0 && (lines.push(`Layout.horizontalStretchFactor: ${grow}`, `Layout.verticalStretchFactor: ${grow}`), lines.push(`Layout.preferredWidth: (${row} ? 0 : implicitWidth)`, `Layout.preferredHeight: (${row} ? implicitHeight : 0)`), lines.push("Layout.minimumWidth: 0", "Layout.minimumHeight: 0")), lines.push(`Layout.alignment: (${row} ? (${align} === "center" ? Qt.AlignVCenter : ${align} === "end" ? Qt.AlignBottom : Qt.AlignTop) : (${align} === "center" ? Qt.AlignHCenter : ${align} === "end" ? Qt.AlignRight : Qt.AlignLeft))`);
    }
    for (let key of ["width", "height"]) {
      let raw = props[key];
      raw != null && (grid ? raw === "fill" ? lines.push(`Layout.fill${key === "width" ? "Width" : "Height"}: true`) : lines.push(`Layout.preferred${key === "width" ? "Width" : "Height"}: ${value2(raw)}`) : lines.push(`${key}: ${raw === "fill" ? `(parent ? parent.${key} : 0)` : value2(raw)}`));
    }
    return [...new Map(lines.map((line) => [line.slice(0, line.indexOf(":")), line])).values()];
  }
  function emitLayout(kind2, props, parentGrid) {
    let id = props.qmlId ?? `n${nodeId++}`, name = props.objectName ?? id;
    if (names2.has(name)) throw new Error(`[nandomo/qml] Duplicate objectName: ${name}`);
    names2.add(name), frame.cleanups.push(() => names2.delete(name));
    let lines = ["Item {", `id: ${id}`, `objectName: ${JSON.stringify(name)}`, ...sizing(props, parentGrid)];
    if (kind2 === "ui:Div") {
      if (typeof props.children == "function") throw new Error("[nandomo/qml] Dynamic structural children are not implemented");
      return lines.push(emit(props.children), "}"), lines.join(`
`);
    }
    let grid = `g${nodeId++}`;
    lines.push(`implicitWidth: ${grid}.implicitWidth`, `implicitHeight: ${grid}.implicitHeight`), lines.push("GridLayout {", `id: ${grid}`), lines.push(`property string ndDirection: ${layoutValue(props.direction ?? "column", `${id}.width`)}`), lines.push(`property string ndAlign: ${layoutValue(props.align ?? "stretch", `${id}.width`)}`), lines.push(`property string ndJustify: ${layoutValue(props.justify ?? "start", `${id}.width`)}`), lines.push("property bool ndHasGrow: { for (var i = 0; i < children.length; i++) { if (children[i].ndGrow > 0) return true; } return false; }"), lines.push('columns: ndDirection === "row" ? Math.max(1, children.length) : 1');
    let gap = layoutValue(props.gap ?? 0, `${id}.width`);
    if (lines.push(`rowSpacing: ${gap}`, `columnSpacing: ${gap}`), lines.push(`width: ndDirection === "column" || ndHasGrow ? ${id}.width : implicitWidth`), lines.push(`height: ndDirection === "row" || ndHasGrow ? ${id}.height : implicitHeight`), lines.push(`x: ndDirection === "row" ? (ndJustify === "center" ? (${id}.width - width) / 2 : ndJustify === "end" ? ${id}.width - width : 0) : 0`), lines.push(`y: ndDirection === "column" ? (ndJustify === "center" ? (${id}.height - height) / 2 : ndJustify === "end" ? ${id}.height - height : 0) : 0`), typeof props.children == "function") throw new Error("[nandomo/qml] Dynamic structural children are not implemented");
    return lines.push(emit(props.children, grid), "}", "}"), lines.join(`
`);
  }
  function emit(node2, parentGrid) {
    let previous = currentOrigin, location = sourceOrigin(node2), origin = location ? { ...location, component: location.component ?? (isSpecNode(node2) ? node2.kind : void 0) } : previous;
    currentOrigin = origin;
    try {
      let result = emitNode(node2, parentGrid);
      return origin ? `
// @nandomo-source ${JSON.stringify(origin)}
${result}` : result;
    } catch (error) {
      throw sourceError(error, origin);
    } finally {
      currentOrigin = previous;
    }
  }
  function emitNode(node2, parentGrid) {
    if (node2 == null || typeof node2 == "boolean") return "";
    if (Array.isArray(node2)) return node2.map((child) => emit(child, parentGrid)).join(`
`);
    if (isDialogNode(node2)) return emitDialog(node2);
    if (isDynamicNode(node2)) {
      if (options.fragment && !options.dynamicFragments) throw new Error("[nandomo/qml] Fragment transport requires dynamicFragments support");
      let id2 = `r${nodeId++}`, owner = frame, initial = !0, ordered = [], region = mountDynamicRegion(node2, {
        mount(tree2) {
          let name2 = `fragment${nodeId++}`, childFrame = makeFrame();
          childFrame.ready = initial;
          let source;
          try {
            source = inFrame(childFrame, () => `Column { objectName: ${JSON.stringify(name2)}; width: parent ? parent.width : 0; ${options.fragment ? "onHeightChanged: { if (parent && parent.ndReflow) parent.ndReflow(); }" : ""} ${emit(tree2)} }`);
          } catch (error) {
            try {
              disposeFrame(childFrame);
            } catch {
            }
            throw error;
          }
          let fragment = { name: name2, source, frame: childFrame };
          if (!initial) {
            let compiled = options.fragment ? `${[...imports].map((module) => `import ${module}`).join(`
`)}
${source}` : source;
            patch({ cmd: "create_fragment", parent: id2, source: compiled, bindings: { ...bindings } }).then(() => {
              childFrame.ready = !0, mountFrame(childFrame);
            }).catch(onError);
          }
          return fragment;
        },
        order(handles) {
          let changed = ordered.length !== handles.length || ordered.some((handle, index2) => handle !== handles[index2]);
          ordered = handles, !initial && changed && patch({ cmd: "order_fragments", parent: id2, objects: handles.map((handle) => handle.name) }).catch(onError);
        },
        remove(handle) {
          try {
            disposeFrame(handle.frame);
          } finally {
            disposed || patch({ cmd: "destroy_fragment", object: handle.name }).catch(onError);
          }
        }
      });
      initial = !1, owner.cleanups.push(() => region.dispose()), owner.mounts.push(() => {
        for (let fragment of ordered) mountFrame(fragment.frame);
      });
      let positioning = options.fragment ? `property var ndItems: []
function ndReflow() { var offset = 0; for (var i = 0; i < ndItems.length; i++) { var item = ndItems[i]; if (item && item.parent === this) { item.y = offset; offset += item.height; } } implicitHeight = offset; }
Component.onCompleted: { ndItems = Array.prototype.slice.call(children); ndReflow(); }` : "";
      return `${options.fragment ? "Item" : "Column"} { id: ${id2}; objectName: ${JSON.stringify(id2)}; ${(parentGrid ? sizing({}, parentGrid) : ["width: parent ? parent.width : 0"]).join(`
`)}
${positioning}
${ordered.map((handle) => handle.source).join(`
`)}
}`;
    }
    if (isDefinedComponentRef(node2)) {
      let instance = node2.instantiate("qml");
      frame.cleanups.push(() => instance.dispose());
      let source = emit(instance.view(), parentGrid);
      return frame.mounts.push(() => instance.mount()), source;
    }
    if (typeof node2 == "string" || typeof node2 == "number") return emit({ __spec: !0, kind: "qml:Text", props: { text: String(node2) } }, parentGrid);
    if (!isSpecNode(node2)) throw new TypeError("[nandomo/qml] Expected a component or SpecNode");
    if (node2.kind.startsWith("ui:")) return emitLayout(node2.kind, node2.props, parentGrid);
    let type = node2.kind.startsWith("qml:") ? node2.kind.slice(4) : primitives[node2.kind], native = node2.nativeQmlType;
    if (!type || !native && !types.has(type)) throw new Error(`[nandomo/qml] Unsupported native type: ${node2.kind}`);
    native && imports.add(native.module);
    let props = node2.props, autoName = `n${nodeId++}`, id = props.qmlId ?? autoName, name = typeof props.objectName == "string" ? props.objectName : autoName;
    if (names2.has(name)) throw new Error(`[nandomo/qml] Duplicate objectName: ${name}`);
    names2.add(name), frame.cleanups.push(() => names2.delete(name));
    let composition = props;
    for (let module of composition.qmlImports ?? []) {
      if (!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(module)) throw new TypeError("Invalid QML module");
      imports.add(module);
    }
    let nativeId = composition.qmlId ?? id;
    if (!/^[a-z_][A-Za-z0-9_]*$/.test(nativeId)) throw new TypeError("Invalid native id");
    let on = composition.qmlOn;
    if (on !== void 0 && (!native || typeof on != "string" || !/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(on)))
      throw new TypeError("Invalid native property target");
    let lines = [`${type}${on ? " on " + on : ""} {`, `id: ${nativeId}`, ...type === "Component" ? [] : [`objectName: ${typeof props.objectName == "function" ? value2(props.objectName) : JSON.stringify(name)}`], ...sizing(props, parentGrid)];
    for (let [key, declaration] of Object.entries(composition.qmlDeclarations ?? {})) {
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key) || !/^[A-Za-z_][A-Za-z0-9_.]*(<[^<>]+>)?$/.test(declaration.type) || declaration.type === "alias" || declaration.required && declaration.readonly) throw new TypeError("Invalid native declaration");
      lines.push(`${declaration.required ? "required " : ""}${declaration.readonly ? "readonly " : ""}property ${declaration.type} ${key}${declaration.required ? "" : ": " + value2(Object.hasOwn(props, key) ? props[key] : declaration.value)}`);
    }
    for (let [key, arguments_] of Object.entries(composition.qmlSignals ?? {})) {
      if (!/^[a-z_][A-Za-z0-9_]*$/.test(key) || arguments_.some((arg) => !/^[A-Za-z_][A-Za-z0-9_]*$/.test(arg.name) || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(arg.type))) throw new TypeError("Invalid native signal");
      lines.push(`signal ${key}(${arguments_.map((arg) => `${arg.type} ${arg.name}`).join(", ")})`);
    }
    for (let [key, method] of Object.entries(composition.qmlMethods ?? {})) {
      if (!/^[a-z_][A-Za-z0-9_]*$/.test(key)) throw new TypeError("Invalid native method");
      lines.push(`function ${key}() { return ${emitNativeClosure(method, "...arguments")}; }`);
    }
    for (let [key, raw] of Object.entries(props)) {
      if (currentOrigin && lines.push(`// @nandomo-source ${JSON.stringify({ ...currentOrigin, property: key })}`), raw === void 0 || key === "children" || key === "objectName" || key === "width" || key === "height" || key === "grow" || key.startsWith("qml") || composition.qmlDeclarations?.[key]) continue;
      if (/(^|\.)on[A-Z]/.test(key) && nativeClosure(raw)?.kind === "handler") {
        lines.push(`${key}: function() { ${emitNativeClosure(raw, "...arguments")}; }`);
        continue;
      }
      if (key === "ref") {
        if (typeof raw != "function") throw new TypeError("[nandomo/qml] ref must be a function");
        frame.refs.push({ name, fn: raw });
        continue;
      }
      if (native ? Object.hasOwn(native.events ?? {}, key) : events[key]) {
        if (typeof raw != "function") throw new TypeError(`[nandomo/qml] ${key} must be a handler`);
        let handler = `h${handlerId++}`, origin = currentOrigin;
        handlers.set(handler, (...args2) => {
          try {
            let result = raw(...args2);
            return result && typeof result.then == "function" ? Promise.resolve(result).catch((error) => onError(sourceError(error, origin, key))) : result;
          } catch (error) {
            throw sourceError(error, origin, key);
          }
        }), frame.cleanups.push(() => handlers.delete(handler));
        let args = native ? `[${native.events[key].map((property) => `${id}.${property}`).join(", ")}]` : events[key] === "onTextEdited" ? `[${id}.text]` : "[]", projected2 = projectedEvent(raw);
        projected2 ? lines.push(`${key}: function() { ${context}.dispatch(${JSON.stringify(handler)}, [${projected2.map((property) => `${id}.${property}`).join(", ")}]) }`) : native?.signalArguments ? lines.push(`${key}: function() { ${context}.dispatch(${JSON.stringify(handler)}, Array.prototype.slice.call(arguments)) }`) : lines.push(`${native ? key : events[key]}: ${context}.dispatch(${JSON.stringify(handler)}, ${args})`);
        continue;
      }
      let renamed = native ? key : key === "label" || key === "value" ? "text" : key === "placeholder" ? "placeholderText" : key === "src" ? "source" : key;
      if (!native && key === "disabled")
        lines.push(`enabled: !(${value2(raw)})`);
      else if (native ? native.properties.includes(renamed) : properties.has(renamed))
        lines.push(`${renamed}: ${isSpecNode(raw) ? emit(raw) : value2(raw, key)}`);
      else throw new Error(`[nandomo/qml] Unsupported ${type} property: ${key}`);
    }
    if (props.children != null)
      if (type === "Text" || type === "Label") lines.push(`text: ${value2(props.children)}`);
      else {
        if (typeof props.children == "function") throw new Error("[nandomo/qml] Dynamic structural children are not implemented");
        lines.push(emit(props.children));
      }
    return lines.push("}"), lines.join(`
`);
  }
  function emitDialog(node2) {
    let props = node2.props, id = `d${nodeId++}`, name = props.objectName ?? id;
    if (names2.has(name)) throw new Error(`[nandomo/qml] Duplicate objectName: ${name}`);
    names2.add(name), frame.cleanups.push(() => names2.delete(name));
    let handler = `h${handlerId++}`;
    return handlers.set(handler, (reason2) => requestDialogClose(props, reason2)), frame.cleanups.push(() => handlers.delete(handler)), `Dialog {
      id: ${id}
      objectName: ${JSON.stringify(name)}
      parent: Overlay.overlay
      anchors.centerIn: parent
      modal: true
      focus: true
      closePolicy: Popup.NoAutoClose
      property bool ndControlledOpen: ${value2(props.open)}
      visible: ndControlledOpen
      title: ${value2(props.title)}
      ${options.dialogAppearance ? `padding: ${options.dialogAppearance.padding ?? 20}
      background: Rectangle { radius: ${options.dialogAppearance.radius ?? 16}; color: ${value2(options.dialogAppearance.background)}; border.width: 1; border.color: "#1fffffff" }
      header: Text { text: ${id}.title; font.pixelSize: 20; font.weight: Font.DemiBold; color: ${value2(options.dialogAppearance.foreground)}; leftPadding: 20; topPadding: 16; bottomPadding: 12 }` : ""}
      property var ndOpener: null
      property var ndWindow: ApplicationWindow.window
      property bool ndDestroying: false
      function ndInside(item) { while (item) { if (item === contentItem) return true; item = item.parent; } return false; }
      function ndFind(item, name) {
        if (name && item.objectName === name) return item;
        if (!name && item.activeFocusOnTab && item.visible && item.enabled) return item;
        for (var i = 0; i < item.children.length; i++) { var found = ndFind(item.children[i], name); if (found) return found; }
        return null;
      }
      function ndEscape() { ${context}.dispatch(${JSON.stringify(handler)}, ["escape"]); }
      function ndOutside() { ${context}.dispatch(${JSON.stringify(handler)}, ["outside"]); }
      function ndDismiss() { ${context}.dispatch(${JSON.stringify(handler)}, ["dismiss"]); }
      function ndTab(forward) {
        var current = (ndWindow ? ndWindow.activeFocusItem : null) || contentItem;
        var next = current.nextItemInFocusChain(forward);
        for (var n = 0; next && n < 1000; n++) {
          if (ndInside(next) && next.activeFocusOnTab && next.visible && next.enabled) { next.forceActiveFocus(Qt.TabFocusReason); return; }
          next = next.nextItemInFocusChain(forward);
          if (next === current) break;
        }
        contentItem.forceActiveFocus();
      }
      onAboutToShow: { if (ndWindow && !ndInside(ndWindow.activeFocusItem)) ndOpener = ndWindow.activeFocusItem; }
      onOpened: {
        var target = ndFind(contentItem, ${JSON.stringify(props.initialFocus ?? "")}) || ndFind(contentItem, "");
        if (target) target.forceActiveFocus(); else contentItem.forceActiveFocus();
      }
      onClosed: {
        if (ndDestroying) return;
        if (ndControlledOpen) { ndDismiss(); visible = Qt.binding(function() { return ndControlledOpen; }); return; }
        if (ndOpener && ndOpener.visible && ndOpener.enabled) ndOpener.forceActiveFocus(); ndOpener = null;
      }
      Component.onDestruction: { ndDestroying = true; if (visible && ndOpener && ndOpener.visible && ndOpener.enabled) ndOpener.forceActiveFocus(); }
      Overlay.onPressed: { if (visible && ndWindow && ndInside(ndWindow.activeFocusItem)) ndOutside(); }
      Shortcut { sequence: "Escape"; enabled: ${id}.visible && ${id}.ndWindow && ${id}.ndInside(${id}.ndWindow.activeFocusItem); context: Qt.WindowShortcut; onActivated: ${id}.ndEscape() }
      contentItem: FocusScope {
        implicitWidth: ndContent${id}.implicitWidth
        implicitHeight: ndContent${id}.implicitHeight
        Keys.onPressed: function(event) {
          if (event.key === Qt.Key_Tab || event.key === Qt.Key_Backtab) {
            event.accepted = true; ${id}.ndTab(event.key !== Qt.Key_Backtab && !(event.modifiers & Qt.ShiftModifier));
          }
        }
        Column { id: ndContent${id}; spacing: 12; ${emit(props.children)} }
      }
    }`;
  }
  function dispose() {
    disposed || (disposed = !0, handlers.clear(), disposeFrame(rootFrame));
  }
  try {
    let body = emit(tree);
    return {
      source: `${[...imports].map((module) => `import ${module}`).join(`
`)}
${options.fragment ? body : `ApplicationWindow {
id: appWindow
objectName: "appWindow"
visible: true
width: 640
height: 480
title: "Nandomo"
${body}
}`}`,
      bindings,
      dispatch(handler, args) {
        if (disposed) return;
        let fn = handlers.get(handler);
        if (!fn) {
          if (/^h\d+$/.test(handler) && Number(handler.slice(1)) < handlerId) return;
          throw new Error(`[nandomo/qml] Unknown handler: ${handler}`);
        }
        fn(...args);
      },
      mount(resolve4) {
        if (!(mounted2 || disposed)) {
          mounted2 = !0;
          try {
            resolver = resolve4, mountFrame(rootFrame);
          } catch (error) {
            try {
              dispose();
            } catch {
            }
            throw error;
          }
        }
      },
      dispose
    };
  } catch (error) {
    try {
      dispose();
    } catch {
    }
    throw error;
  }
}

// ../../packages/bridge-qml/src/diagnostics.ts
init_src();
function formatQmlDiagnostic(message, source, url = "file:///nandomo.qml") {
  let escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return message.replace(new RegExp(`${escaped}:(\\d+)(?::\\d+)?`, "g"), (original, line) => {
    let number = Number(line), lines = source.split(`
`);
    if (number < 1 || number > lines.length) return original;
    for (let index2 = number - 1; index2 >= 0; index2--) {
      let marker = lines[index2].trim().match(/^\/\/ @nandomo-source (.+)$/);
      if (marker)
        try {
          let origin = JSON.parse(marker[1]);
          return typeof origin.fileName != "string" || !Number.isInteger(origin.lineNumber) ? original : `${sourceLabel(origin)}${origin.property ? " [" + origin.property + "]" : ""} (QML ${original})`;
        } catch {
          return original;
        }
    }
    return original;
  });
}

// ../../packages/bridge-qml/src/component-ref.ts
var COMPONENT_REF_BRAND = "__componentRef";
function createComponentRef(ctor, props) {
  return {
    [COMPONENT_REF_BRAND]: !0,
    ctor,
    props
  };
}

// ../../packages/bridge-qml/src/import-qml.ts
function importQml(module) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(module))
    throw new TypeError(`Invalid QML module: ${module}`);
  let factories = /* @__PURE__ */ new Map();
  return new Proxy(/* @__PURE__ */ Object.create(null), {
    get(_target, type) {
      if (typeof type != "string" || type === "then") return;
      if (!/^[A-Z][A-Za-z0-9_]*$/.test(type)) throw new TypeError(`Invalid QML type: ${module}.${type}`);
      let factory = factories.get(type);
      return factory || (factory = (props) => {
        let properties2 = [], events2 = {};
        for (let key of Object.keys(props))
          ["children", "objectName", "width", "height", "grow", "ref"].includes(key) || (/(^|\.)on[A-Z]/.test(key) ? events2[key] = [] : properties2.push(key));
        let node2 = defineQmlComponent({ type, module, properties: properties2, events: events2 })(props);
        return { ...node2, nativeQmlType: { ...node2.nativeQmlType, signalArguments: !0 } };
      }, factories.set(type, factory)), factory;
    }
  });
}

// src/components/NativeTextField.tsx
init_src();

// ../../packages/bridge-qml/src/jsx-runtime.ts
init_src();
var COMPONENT_NAME2 = "__componentName";
function isComponentClass(tag2) {
  if (typeof tag2 != "function") return !1;
  let marker = tag2[COMPONENT_NAME2];
  return typeof marker == "string" && marker.length > 0;
}
function route(tag2, props) {
  if (tag2 == null) return tag2;
  let safeProps = props ?? {};
  return isComponentClass(tag2) ? createComponentRef(
    tag2,
    safeProps
  ) : tag2(safeProps);
}
function jsxDEV(tag2, props, _key, _isStatic, _source, _self) {
  try {
    return withSourceOrigin(route(tag2, props), _source);
  } catch (error) {
    let probe = withSourceOrigin({}, _source);
    throw sourceError(error, sourceOrigin(probe));
  }
}

// src/components/NativeTextField.tsx
var dms = importQml("qs.DankCommon.Widgets"), NativeTextField = component(
  "NativeTextField",
  ({ onTextEdited, onAccepted, ...props }) => /* @__PURE__ */ jsxDEV(
    dms.DankTextField,
    {
      ...props,
      ...onTextEdited ? { onTextEdited: qmlReadEvent(["text"], onTextEdited) } : {},
      ...onAccepted ? { onAccepted: qmlReadEvent(["text"], onAccepted) } : {}
    },
    void 0,
    !1,
    {
      fileName: "src/components/NativeTextField.tsx",
      lineNumber: 9,
      columnNumber: 3
    }
  )
);

// src/native/QuietButton.tsx
init_src();
var controls = importQml("QtQuick.Controls"), qml2 = importQml("QtQuick"), layouts = importQml("QtQuick.Layouts"), dms2 = importQml("qs.DankCommon.Widgets"), QuietButton = component(
  "QuietButton",
  (props) => {
    let { qmlDeclarations: inheritedDeclarations, ...rest } = props;
    props = rest;
    let scope = createQmlScope({ ...props.qmlId ? { root: props.qmlId } : {}, app: "app" });
    return scope.id("root"), /* @__PURE__ */ jsxDEV(
      controls.Button,
      {
        qmlImports: ["Quickshell", "qs.DankCommon.Common"],
        qmlId: scope.id("root"),
        qmlDeclarations: {
          iconName: { type: "string", value: "" },
          selected: { type: "bool", value: !1 },
          statusIcon: { type: "string", value: "" },
          actionIcon: {
            type: "string",
            readonly: !0,
            value: qmlExpression(
              scope,
              ($qml) => ({
                "applications-other": "apps",
                "list-add": "add",
                trash: "delete",
                recent: "history",
                settings: "settings",
                "edit-copy": "content_copy",
                "edit-cut": "content_cut",
                move: "drive_file_move",
                "copy-to": "file_copy",
                "visibility-off": "visibility_off",
                visibility: "visibility",
                sort: "sort",
                "go-previous": "chevron_left",
                "go-next": "chevron_right",
                "go-up": "arrow_upward",
                "view-refresh": "refresh",
                search: "search",
                "edit-undo": "undo",
                "view-list-details": "view_list",
                "view-grid": "grid_view",
                "view-column": "view_column",
                "window-close": "close",
                "document-preview": "visibility",
                "document-open": "open_in_new",
                "edit-rename": "edit",
                "applications-games": "sports_esports"
              })[iconName] || ""
            )
          },
          iconMap: {
            type: "var",
            readonly: !0,
            value: qmlExpression(
              scope,
              ($qml) => ApplicationWindow.window ? ApplicationWindow.window.osIcons : {}
            )
          },
          ...inheritedDeclarations
        },
        implicitWidth: qmlExpression(
          scope,
          ($qml) => text.length ? Math.max(64, contentItem.implicitWidth + 24) : 36
        ),
        implicitHeight: 36,
        leftPadding: qmlExpression(scope, ($qml) => text.length ? 12 : 9),
        rightPadding: qmlExpression(
          scope,
          ($qml) => (text.length ? 12 : 9) + (statusIcon ? 24 : 0)
        ),
        topPadding: 9,
        bottomPadding: 9,
        activeFocusOnTab: !0,
        "Accessible.name": qmlExpression(
          scope,
          ($qml) => $qml.app.tr(
            text || {
              "visibility-off": "Arquivos ocultos escondidos",
              visibility: "Arquivos ocultos vis\xEDveis",
              sort: "Ordenar",
              "go-previous": "Voltar",
              "go-next": "Avan\xE7ar",
              "go-up": "Pasta acima",
              "view-refresh": "Atualizar",
              settings: "Prefer\xEAncias",
              "list-add": "Nova aba",
              "window-close": "Fechar detalhes",
              "applications-other": "Aplicativos",
              "view-list-details": "Visualiza\xE7\xE3o em lista",
              "view-grid": "Visualiza\xE7\xE3o em grade",
              "view-column": "Visualiza\xE7\xE3o em colunas",
              "document-open": "Abrir pasta",
              "document-preview": "Pr\xE9-visualizar",
              "edit-rename": "Renomear",
              "edit-copy": "Copiar",
              "edit-cut": "Recortar",
              "copy-to": "Copiar para\u2026",
              move: "Mover para\u2026",
              trash: "Mover para a lixeira",
              recent: "Recentes",
              "drive-harddisk": "Abrir pasta"
            }[iconName] || iconName
          )
        ),
        "ToolTip.visible": qmlExpression(
          scope,
          ($qml) => hovered && (text.length === 0 || contentItem.implicitWidth > availableWidth)
        ),
        "ToolTip.text": qmlExpression(scope, ($qml) => Accessible.name),
        background: /* @__PURE__ */ jsxDEV(
          qml2.Rectangle,
          {
            radius: 7,
            color: qmlExpression(
              scope,
              ($qml) => $qml.root.selected ? Style.withAlpha(Style.primary, 0.14) : $qml.root.down ? Style.withAlpha(Style.surfaceText, 0.16) : $qml.root.hovered || $qml.root.activeFocus ? Style.withAlpha(Style.surfaceText, 0.08) : "transparent"
            ),
            children: /* @__PURE__ */ jsxDEV(qml2.Behavior, { qmlOn: "color", animation: /* @__PURE__ */ jsxDEV(qml2.ColorAnimation, { duration: qmlExpression(scope, () => ApplicationWindow.window && ApplicationWindow.window.reduceAnimations ? 0 : 90) }, void 0, !1, {
              fileName: "src/native/QuietButton.tsx",
              lineNumber: 169,
              columnNumber: 15
            }) }, void 0, !1, {
              fileName: "src/native/QuietButton.tsx",
              lineNumber: 168,
              columnNumber: 13
            })
          },
          void 0,
          !1,
          {
            fileName: "src/native/QuietButton.tsx",
            lineNumber: 155,
            columnNumber: 11
          }
        ),
        contentItem: /* @__PURE__ */ jsxDEV(
          layouts.RowLayout,
          {
            spacing: 10,
            opacity: qmlExpression(
              scope,
              ($qml) => $qml.root.enabled ? 1 : 0.4
            ),
            children: [
              /* @__PURE__ */ jsxDEV(
                qml2.Image,
                {
                  visible: qmlExpression(
                    scope,
                    ($qml) => $qml.root.iconName.length > 0 && !$qml.root.actionIcon
                  ),
                  source: qmlExpression(
                    scope,
                    ($qml) => visible ? $qml.root.iconName.indexOf("file://") === 0 ? $qml.root.iconName : $qml.root.iconMap && $qml.root.iconMap[$qml.root.iconName] ? $qml.root.iconMap[$qml.root.iconName] : Quickshell.iconPath($qml.root.iconName, "folder") : ""
                  ),
                  "Layout.preferredWidth": 18,
                  "Layout.preferredHeight": 18,
                  "Layout.alignment": qmlExpression(
                    scope,
                    ($qml) => Qt.AlignCenter
                  ),
                  fillMode: qmlExpression(scope, ($qml) => Image.PreserveAspectFit)
                },
                void 0,
                !1,
                {
                  fileName: "src/native/QuietButton.tsx",
                  lineNumber: 181,
                  columnNumber: 13
                }
              ),
              /* @__PURE__ */ jsxDEV(
                dms2.DankIcon,
                {
                  visible: qmlExpression(
                    scope,
                    ($qml) => $qml.root.actionIcon.length > 0
                  ),
                  name: qmlExpression(scope, ($qml) => $qml.root.actionIcon),
                  color: qmlExpression(scope, ($qml) => Style.surfaceText),
                  size: 18,
                  "Layout.preferredWidth": 18,
                  "Layout.preferredHeight": 18,
                  "Layout.alignment": qmlExpression(
                    scope,
                    ($qml) => Qt.AlignCenter
                  )
                },
                void 0,
                !1,
                {
                  fileName: "src/native/QuietButton.tsx",
                  lineNumber: 206,
                  columnNumber: 13
                }
              ),
              /* @__PURE__ */ jsxDEV(
                dms2.StyledText,
                {
                  visible: qmlExpression(
                    scope,
                    ($qml) => $qml.root.text.length > 0
                  ),
                  text: qmlExpression(scope, ($qml) => $qml.root.text),
                  color: qmlExpression(scope, ($qml) => Style.surfaceText),
                  elide: qmlExpression(scope, ($qml) => Text.ElideRight),
                  wrapMode: qmlExpression(scope, ($qml) => Text.NoWrap),
                  "font.pixelSize": 14,
                  "Layout.fillWidth": !0,
                  verticalAlignment: qmlExpression(
                    scope,
                    ($qml) => Text.AlignVCenter
                  )
                },
                void 0,
                !1,
                {
                  fileName: "src/native/QuietButton.tsx",
                  lineNumber: 223,
                  columnNumber: 13
                }
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "src/native/QuietButton.tsx",
            lineNumber: 175,
            columnNumber: 11
          }
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxDEV(
            dms2.DankIcon,
            {
              "anchors.right": qmlExpression(scope, ($qml) => parent.right),
              "anchors.rightMargin": 8,
              "anchors.verticalCenter": qmlExpression(
                scope,
                ($qml) => parent.verticalCenter
              ),
              name: qmlExpression(scope, ($qml) => $qml.root.statusIcon),
              size: 16,
              color: qmlExpression(scope, ($qml) => Style.surfaceText),
              visible: qmlExpression(
                scope,
                ($qml) => $qml.root.statusIcon.length > 0
              )
            },
            void 0,
            !1,
            {
              fileName: "src/native/QuietButton.tsx",
              lineNumber: 243,
              columnNumber: 9
            }
          ),
          props.children
        ]
      },
      void 0,
      !0,
      {
        fileName: "src/native/QuietButton.tsx",
        lineNumber: 41,
        columnNumber: 7
      }
    );
  }
);

// src/components/FileTools.tsx
var qml3 = importQml("QtQuick"), layouts2 = importQml("QtQuick.Layouts"), controls2 = importQml("QtQuick.Controls"), FileToolsDialog = component("FileToolsDialog", ({ manager: manager2 }) => {
  let value2 = signal("");
  return effect(() => {
    value2.set(manager2.tools.request()?.name ?? "");
  }), /* @__PURE__ */ jsxDEV(Dialog, { objectName: "fileToolsDialog", open: () => !!manager2.tools.request(), title: () => t({ archive: "Compactar", extract: "Extrair", bulk: "Renomear em lote", emptyTrash: "Esvaziar lixeira" }[manager2.tools.request()?.kind ?? "archive"]), onCloseRequest: manager2.tools.close, children: /* @__PURE__ */ jsxDEV(qml3.Column, { width: 440, spacing: 14, children: [
    /* @__PURE__ */ jsxDEV(controls2.Label, { width: "fill", wrapMode: qmlEnum("Text.Wrap"), text: () => manager2.tools.request()?.kind === "emptyTrash" ? t("Excluir permanentemente {count} itens da lixeira? Esta a\xE7\xE3o n\xE3o pode ser desfeita.", { count: manager2.tools.request().targets.length }) : manager2.tools.request()?.kind === "bulk" ? t("Use {name} para o nome original e {n} para numerar. A extens\xE3o \xE9 preservada.") : t("Informe o nome no diret\xF3rio atual. ZIP e TAR.GZ s\xE3o suportados para compacta\xE7\xE3o.") }, void 0, !1, {
      fileName: "src/components/FileTools.tsx",
      lineNumber: 13,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(NativeTextField, { objectName: "fileToolName", width: "fill", text: value2, visible: () => manager2.tools.request()?.kind !== "emptyTrash", onTextEdited: (text2) => value2.set(text2), onAccepted: () => {
      manager2.tools.submit(value2());
    } }, void 0, !1, {
      fileName: "src/components/FileTools.tsx",
      lineNumber: 16,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(controls2.Label, { width: "fill", wrapMode: qmlEnum("Text.Wrap"), visible: () => !!manager2.error(), text: manager2.error }, void 0, !1, {
      fileName: "src/components/FileTools.tsx",
      lineNumber: 17,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(layouts2.RowLayout, { width: "fill", children: [
      /* @__PURE__ */ jsxDEV(QuietButton, { text: t("Cancelar"), enabled: () => !manager2.mutating(), onClicked: manager2.tools.close }, void 0, !1, {
        fileName: "src/components/FileTools.tsx",
        lineNumber: 19,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(qml3.Item, { "Layout.fillWidth": !0 }, void 0, !1, {
        fileName: "src/components/FileTools.tsx",
        lineNumber: 20,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(controls2.Button, { objectName: "fileToolSubmit", text: () => manager2.tools.request()?.kind === "emptyTrash" ? t("Excluir permanentemente") : t("Confirmar"), enabled: () => !manager2.mutating(), onClicked: () => {
        manager2.tools.submit(value2());
      } }, void 0, !1, {
        fileName: "src/components/FileTools.tsx",
        lineNumber: 21,
        columnNumber: 9
      })
    ] }, void 0, !0, {
      fileName: "src/components/FileTools.tsx",
      lineNumber: 18,
      columnNumber: 7
    })
  ] }, void 0, !0, {
    fileName: "src/components/FileTools.tsx",
    lineNumber: 12,
    columnNumber: 5
  }) }, void 0, !1, {
    fileName: "src/components/FileTools.tsx",
    lineNumber: 11,
    columnNumber: 10
  });
});

// src/components/SortMenu.tsx
init_src();

// src/native/ContextAction.tsx
init_src();
var controls3 = importQml("QtQuick.Controls"), layouts3 = importQml("QtQuick.Layouts"), dms3 = importQml("qs.DankCommon.Widgets"), qml4 = importQml("QtQuick"), ContextAction = component(
  "ContextAction",
  (props) => {
    let scope = createQmlScope({ ...props.qmlId ? { root: props.qmlId } : {}, app: "app" });
    return scope.id("root"), /* @__PURE__ */ jsxDEV(
      controls3.MenuItem,
      {
        qmlImports: ["Quickshell", "qs.DankCommon.Common"],
        qmlId: scope.id("root"),
        qmlDeclarations: {
          hint: { type: "string", value: "" }
        },
        implicitHeight: qmlExpression(scope, ($qml) => visible ? 36 : 0),
        indicator: /* @__PURE__ */ jsxDEV(qml4.Item, { width: 0, height: 0 }, void 0, !1, {
          fileName: "src/native/ContextAction.tsx",
          lineNumber: 30,
          columnNumber: 20
        }),
        leftPadding: 12,
        rightPadding: 12,
        contentItem: /* @__PURE__ */ jsxDEV(
          layouts3.RowLayout,
          {
            opacity: qmlExpression(
              scope,
              ($qml) => $qml.root.enabled ? 1 : 0.35
            ),
            children: [
              /* @__PURE__ */ jsxDEV(
                dms3.StyledText,
                {
                  text: qmlExpression(scope, ($qml) => $qml.root.checked ? "\u2713" : ""),
                  visible: qmlExpression(scope, ($qml) => $qml.root.checkable),
                  "Layout.minimumWidth": 16,
                  "Layout.maximumWidth": 16,
                  color: qmlExpression(scope, () => Style.primary)
                },
                void 0,
                !1,
                {
                  fileName: "src/native/ContextAction.tsx",
                  lineNumber: 39,
                  columnNumber: 13
                }
              ),
              /* @__PURE__ */ jsxDEV(
                dms3.StyledText,
                {
                  text: qmlExpression(scope, ($qml) => $qml.root.text),
                  color: qmlExpression(scope, ($qml) => Style.surfaceText),
                  "font.pixelSize": 14,
                  "Layout.fillWidth": !0
                },
                void 0,
                !1,
                {
                  fileName: "src/native/ContextAction.tsx",
                  lineNumber: 45,
                  columnNumber: 13
                }
              ),
              /* @__PURE__ */ jsxDEV(
                dms3.StyledText,
                {
                  text: qmlExpression(scope, ($qml) => $qml.root.hint),
                  color: qmlExpression(scope, ($qml) => Style.surfaceVariantText),
                  "font.pixelSize": 12
                },
                void 0,
                !1,
                {
                  fileName: "src/native/ContextAction.tsx",
                  lineNumber: 51,
                  columnNumber: 13
                }
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "src/native/ContextAction.tsx",
            lineNumber: 34,
            columnNumber: 11
          }
        ),
        background: /* @__PURE__ */ jsxDEV(
          qml4.Rectangle,
          {
            radius: 7,
            color: qmlExpression(
              scope,
              ($qml) => $qml.root.highlighted ? Style.withAlpha(Style.primary, 0.15) : "transparent"
            )
          },
          void 0,
          !1,
          {
            fileName: "src/native/ContextAction.tsx",
            lineNumber: 59,
            columnNumber: 11
          }
        ),
        ...props
      },
      void 0,
      !1,
      {
        fileName: "src/native/ContextAction.tsx",
        lineNumber: 23,
        columnNumber: 7
      }
    );
  }
);

// src/native/AppMenu.tsx
init_src();
var controls4 = importQml("QtQuick.Controls"), qml5 = importQml("QtQuick"), AppMenu = component("AppMenu", (props) => {
  let scope = createQmlScope(props.qmlId ? { root: props.qmlId } : {});
  return /* @__PURE__ */ jsxDEV(
    controls4.Menu,
    {
      qmlImports: ["Quickshell", "qs.DankCommon.Common"],
      padding: 6,
      overlap: 0,
      implicitWidth: 260,
      background: /* @__PURE__ */ jsxDEV(
        qml5.Rectangle,
        {
          color: qmlExpression(scope, ($qml) => Style.surfaceContainerHigh),
          radius: 12,
          "border.width": 1,
          "border.color": qmlExpression(
            scope,
            ($qml) => Style.withAlpha(Style.surfaceText, 0.1)
          )
        },
        void 0,
        !1,
        {
          fileName: "src/native/AppMenu.tsx",
          lineNumber: 22,
          columnNumber: 9
        }
      ),
      ...props
    },
    void 0,
    !1,
    {
      fileName: "src/native/AppMenu.tsx",
      lineNumber: 16,
      columnNumber: 5
    }
  );
});

// src/components/SortMenu.tsx
init_i18n2();
var controls5 = importQml("QtQuick.Controls"), SortMenu = component("SortMenu", ({ objectName, currentIndex, onActivated, onError }) => {
  let menu = createQmlRef(controls5.Menu);
  return /* @__PURE__ */ jsxDEV(
    QuietButton,
    {
      objectName,
      text: "",
      iconName: "sort",
      "Accessible.name": t("Ordenar"),
      onClicked: () => {
        menu.current?.invoke("open").catch(onError);
      },
      children: /* @__PURE__ */ jsxDEV(AppMenu, { objectName: `${objectName || "sort"}Popup`, ref: menu.attach, children: ["Nome", "Tamanho", "Modificado", "Tipo"].map((label, index2) => /* @__PURE__ */ jsxDEV(
        ContextAction,
        {
          objectName: `sortOption:${index2}`,
          text: t(label),
          checkable: !0,
          checked: () => currentIndex() === index2,
          onTriggered: () => onActivated(index2)
        },
        void 0,
        !1,
        {
          fileName: "src/components/SortMenu.tsx",
          lineNumber: 15,
          columnNumber: 66
        }
      )) }, void 0, !1, {
        fileName: "src/components/SortMenu.tsx",
        lineNumber: 14,
        columnNumber: 5
      })
    },
    void 0,
    !1,
    {
      fileName: "src/components/SortMenu.tsx",
      lineNumber: 12,
      columnNumber: 10
    }
  );
});

// src/components/ViewGroup.tsx
init_src();
init_i18n2();
var qml6 = importQml("QtQuick"), ViewGroup = component("ViewGroup", ({ view, surface, onChanged }) => /* @__PURE__ */ jsxDEV(qml6.Rectangle, { width: 112, height: 38, radius: 9, color: surface, children: /* @__PURE__ */ jsxDEV(qml6.Row, { x: 1, y: 1, spacing: 1, children: [
  /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "toolbarList", text: "", iconName: "view-list-details", "Accessible.name": t("Visualiza\xE7\xE3o em lista"), selected: () => view() === "list", onClicked: () => onChanged("list") }, void 0, !1, {
    fileName: "src/components/ViewGroup.tsx",
    lineNumber: 11,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "toolbarGrid", text: "", iconName: "view-grid", "Accessible.name": t("Visualiza\xE7\xE3o em grade"), selected: () => view() === "grid", onClicked: () => onChanged("grid") }, void 0, !1, {
    fileName: "src/components/ViewGroup.tsx",
    lineNumber: 12,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "toolbarColumns", text: "", iconName: "view-column", "Accessible.name": t("Visualiza\xE7\xE3o em colunas"), selected: () => view() === "columns", onClicked: () => onChanged("columns") }, void 0, !1, {
    fileName: "src/components/ViewGroup.tsx",
    lineNumber: 13,
    columnNumber: 5
  })
] }, void 0, !0, {
  fileName: "src/components/ViewGroup.tsx",
  lineNumber: 10,
  columnNumber: 3
}) }, void 0, !1, {
  fileName: "src/components/ViewGroup.tsx",
  lineNumber: 9,
  columnNumber: 44
}));

// src/components/Toolbar.tsx
init_src();

// src/native/PathBar.tsx
init_src();
var qml7 = importQml("QtQuick"), qt = importQml("QtQml"), dms4 = importQml("qs.DankCommon.Widgets"), PathBar = component("PathBar", (props) => {
  props = {
    ...props,
    onNavigate: props.onNavigate ? qmlReadEvent(["target"], props.onNavigate) : void 0,
    onTextEdited: props.onTextEdited ? qmlReadEvent(["draft"], props.onTextEdited) : void 0,
    onAccepted: props.onAccepted ? qmlReadEvent(["draft"], props.onAccepted) : void 0
  };
  let scope = createQmlScope({ ...props.qmlId ? { root: props.qmlId } : {}, app: "app" });
  return scope.id("root"), scope.id("crumbs"), scope.id("crumb"), scope.id("click"), scope.id("editor"), /* @__PURE__ */ jsxDEV(
    qml7.Rectangle,
    {
      qmlImports: ["Quickshell", "qs.DankCommon.Common"],
      qmlId: scope.id("root"),
      qmlDeclarations: {
        text: { type: "string", value: "" },
        path: { type: "string", value: "" },
        home: { type: "string", value: "" },
        target: { type: "string", value: "" },
        draft: { type: "string", value: "" },
        editing: { type: "bool", value: !1 }
      },
      qmlSignals: { navigate: [], textEdited: [], accepted: [] },
      qmlMethods: {
        clear: qmlHandler(scope, ($qml) => {
          editing = !0, $qml.editor.clear();
        }),
        insertText: qmlHandler(scope, ($qml, value2) => {
          $qml.editor.insertText(value2);
        }),
        edit: qmlHandler(scope, ($qml) => {
          editing = !0, $qml.editor.forceActiveFocus(), $qml.editor.selectAll();
        }),
        segment: qmlHandler(scope, ($qml, destination) => {
          for (var i = 0; i < $qml.crumbs.children.length; i++)
            for (var row = $qml.crumbs.children[i], j = 0; j < row.children.length; j++)
              if (row.children[j].objectName === "breadcrumb:" + destination)
                return row.children[j];
          return null;
        }),
        parts: qmlHandler(scope, ($qml) => {
          var virtualName = {
            "trash:///": "Lixeira",
            "recent:///": "Recentes",
            "applications:///": "Aplicativos"
          }[path];
          if (virtualName)
            return [{ name: $qml.app.tr(virtualName), path }];
          var inside = path === home || path.indexOf(home + "/") === 0, base = inside ? home : "/", result = [
            { name: $qml.app.tr(inside ? "Pasta pessoal" : "Sistema"), path: base }
          ], remaining = inside ? path.slice(home.length) : path;
          return remaining.split("/").filter(function(p) {
            return p.length;
          }).forEach(function(p) {
            base = base === "/" ? "/" + p : base + "/" + p, result.push({ name: p, path: base });
          }), result;
        })
      },
      implicitWidth: 300,
      implicitHeight: 40,
      radius: 10,
      color: qmlExpression(scope, ($qml) => Style.surfaceContainerHigh),
      onActiveFocusChanged: qmlHandler(scope, ($qml) => {
        activeFocus && edit();
      }),
      ...props,
      children: [
        /* @__PURE__ */ jsxDEV(
          qml7.Flickable,
          {
            "anchors.fill": qmlExpression(scope, ($qml) => parent),
            "anchors.margins": 4,
            visible: qmlExpression(scope, ($qml) => !$qml.root.editing),
            contentWidth: qmlExpression(scope, ($qml) => $qml.crumbs.width),
            contentHeight: qmlExpression(scope, ($qml) => height),
            clip: !0,
            children: /* @__PURE__ */ jsxDEV(
              qml7.Row,
              {
                qmlId: scope.id("crumbs"),
                height: qmlExpression(scope, ($qml) => parent.height),
                children: [
                  /* @__PURE__ */ jsxDEV(
                    qml7.Repeater,
                    {
                      model: qmlExpression(scope, ($qml) => $qml.root.parts()),
                      children: /* @__PURE__ */ jsxDEV(
                        qml7.Row,
                        {
                          qmlId: scope.id("crumb"),
                          qmlDeclarations: {
                            modelData: { type: "var", required: !0 },
                            index: { type: "int", required: !0 }
                          },
                          height: qmlExpression(scope, ($qml) => $qml.crumbs.height),
                          children: [
                            /* @__PURE__ */ jsxDEV(
                              QuietButton,
                              {
                                objectName: qmlExpression(
                                  scope,
                                  ($qml) => "breadcrumb:" + $qml.crumb.modelData.path
                                ),
                                height: qmlExpression(scope, ($qml) => $qml.crumb.height),
                                text: qmlExpression(scope, ($qml) => $qml.crumb.modelData.name),
                                iconName: qmlExpression(
                                  scope,
                                  ($qml) => $qml.crumb.index === 0 ? "user-home" : ""
                                ),
                                onClicked: qmlHandler(scope, ($qml) => {
                                  $qml.root.editing || ($qml.click.pendingPath = $qml.crumb.modelData.path, $qml.click.restart());
                                }),
                                children: [
                                  /* @__PURE__ */ jsxDEV(
                                    qt.Timer,
                                    {
                                      qmlId: scope.id("click"),
                                      qmlDeclarations: {
                                        pendingPath: { type: "string", value: "" }
                                      },
                                      interval: 250,
                                      onTriggered: qmlHandler(scope, ($qml) => {
                                        $qml.root.target = $qml.click.pendingPath, $qml.root.navigate();
                                      })
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName: "src/native/PathBar.tsx",
                                      lineNumber: 163,
                                      columnNumber: 17
                                    }
                                  ),
                                  /* @__PURE__ */ jsxDEV(
                                    qml7.TapHandler,
                                    {
                                      onDoubleTapped: qmlHandler(scope, ($qml) => {
                                        $qml.click.stop(), $qml.root.edit();
                                      })
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName: "src/native/PathBar.tsx",
                                      lineNumber: 174,
                                      columnNumber: 17
                                    }
                                  )
                                ]
                              },
                              void 0,
                              !0,
                              {
                                fileName: "src/native/PathBar.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                              }
                            ),
                            /* @__PURE__ */ jsxDEV(
                              qml7.Text,
                              {
                                text: "/",
                                color: qmlExpression(scope, ($qml) => Style.surfaceText),
                                opacity: 0.4,
                                "anchors.verticalCenter": qmlExpression(
                                  scope,
                                  ($qml) => parent.verticalCenter
                                ),
                                visible: qmlExpression(
                                  scope,
                                  ($qml) => index < $qml.root.parts().length - 1
                                )
                              },
                              void 0,
                              !1,
                              {
                                fileName: "src/native/PathBar.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                              }
                            )
                          ]
                        },
                        void 0,
                        !0,
                        {
                          fileName: "src/native/PathBar.tsx",
                          lineNumber: 138,
                          columnNumber: 13
                        }
                      )
                    },
                    void 0,
                    !1,
                    {
                      fileName: "src/native/PathBar.tsx",
                      lineNumber: 135,
                      columnNumber: 11
                    }
                  ),
                  /* @__PURE__ */ jsxDEV(
                    qml7.MouseArea,
                    {
                      width: 60,
                      height: qmlExpression(scope, ($qml) => $qml.crumbs.height),
                      onDoubleClicked: qmlHandler(scope, ($qml) => {
                        $qml.root.edit();
                      })
                    },
                    void 0,
                    !1,
                    {
                      fileName: "src/native/PathBar.tsx",
                      lineNumber: 198,
                      columnNumber: 11
                    }
                  )
                ]
              },
              void 0,
              !0,
              {
                fileName: "src/native/PathBar.tsx",
                lineNumber: 131,
                columnNumber: 9
              }
            )
          },
          void 0,
          !1,
          {
            fileName: "src/native/PathBar.tsx",
            lineNumber: 123,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          dms4.DankTextField,
          {
            qmlId: scope.id("editor"),
            "anchors.fill": qmlExpression(scope, ($qml) => parent),
            visible: qmlExpression(scope, ($qml) => $qml.root.editing),
            text: qmlExpression(scope, ($qml) => $qml.root.text),
            onTextEdited: qmlHandler(scope, ($qml) => {
              $qml.root.draft = $qml.editor.text, $qml.root.textEdited();
            }),
            onAccepted: qmlHandler(scope, ($qml) => {
              $qml.root.draft = $qml.editor.text, $qml.root.accepted(), $qml.root.editing = !1;
            }),
            "Keys.onEscapePressed": qmlHandler(scope, ($qml) => {
              $qml.root.editing = !1, $qml.editor.text = $qml.root.path;
            }),
            onActiveFocusChanged: qmlHandler(scope, ($qml) => {
              activeFocus || ($qml.root.editing = !1);
            })
          },
          void 0,
          !1,
          {
            fileName: "src/native/PathBar.tsx",
            lineNumber: 207,
            columnNumber: 7
          }
        ),
        props.children
      ]
    },
    void 0,
    !0,
    {
      fileName: "src/native/PathBar.tsx",
      lineNumber: 52,
      columnNumber: 5
    }
  );
});

// src/components/TabBar.tsx
init_src();
init_i18n2();
var qml8 = importQml("QtQuick"), layouts4 = importQml("QtQuick.Layouts"), TabBar = component("TabBar", ({ manager: manager2 }) => {
  let scope = createQmlScope(), ids = signal(manager2.tabs().map((tab) => tab.id));
  return effect(() => {
    let next = manager2.tabs().map((tab) => tab.id), previous = ids.peek();
    (next.length !== previous.length || next.some((id, index2) => id !== previous[index2])) && ids.set(next);
  }), /* @__PURE__ */ jsxDEV(
    layouts4.RowLayout,
    {
      qmlId: scope.id("bar"),
      width: "fill",
      spacing: 4,
      qmlDeclarations: {
        titles: { type: "var", value: () => Object.fromEntries(manager2.tabs().map((tab) => [tab.id, tab.title])) },
        activeTab: { type: "string", value: () => manager2.tabs().find((tab) => tab.active)?.id ?? "" }
      },
      children: [
        /* @__PURE__ */ jsxDEV(
          qml8.Flickable,
          {
            objectName: "tabViewport",
            clip: !0,
            "Layout.fillWidth": !0,
            "Layout.minimumWidth": 0,
            "Layout.preferredWidth": 0,
            "Layout.preferredHeight": 40,
            contentWidth: qmlExpression(scope, (q) => q.tabsStrip.width),
            contentHeight: 40,
            children: /* @__PURE__ */ jsxDEV(qml8.Row, { qmlId: scope.id("tabsStrip"), height: 40, spacing: 4, width: qmlExpression(scope, () => implicitWidth), children: /* @__PURE__ */ jsxDEV(qml8.Repeater, { model: ids, delegate: /* @__PURE__ */ jsxDEV(qml8.Item, { width: 200, height: 40, qmlDeclarations: { modelData: { type: "var", required: !0 } }, children: /* @__PURE__ */ jsxDEV(layouts4.RowLayout, { "anchors.fill": qmlExpression(scope, () => parent), spacing: 0, children: [
              /* @__PURE__ */ jsxDEV(
                QuietButton,
                {
                  objectName: qmlExpression(scope, () => `tab:${modelData}`),
                  "Layout.fillWidth": !0,
                  "Layout.minimumWidth": 0,
                  qmlDeclarations: { tabId: { type: "string", value: qmlExpression(scope, () => modelData) } },
                  text: qmlExpression(scope, (q) => q.bar.titles[modelData]),
                  selected: qmlExpression(scope, (q) => q.bar.activeTab === modelData),
                  onClicked: qmlReadEvent(["tabId"], (id) => {
                    manager2.selectTab(id);
                  })
                },
                void 0,
                !1,
                {
                  fileName: "src/components/TabBar.tsx",
                  lineNumber: 33,
                  columnNumber: 15
                }
              ),
              /* @__PURE__ */ jsxDEV(
                QuietButton,
                {
                  objectName: qmlExpression(scope, () => `tabClose:${modelData}`),
                  text: "",
                  iconName: "window-close",
                  "Accessible.name": t("Fechar"),
                  enabled: () => manager2.tabs().length > 1,
                  qmlDeclarations: { tabId: { type: "string", value: qmlExpression(scope, () => modelData) } },
                  onClicked: qmlReadEvent(["tabId"], (id) => {
                    manager2.closeTab(id);
                  })
                },
                void 0,
                !1,
                {
                  fileName: "src/components/TabBar.tsx",
                  lineNumber: 38,
                  columnNumber: 15
                }
              )
            ] }, void 0, !0, {
              fileName: "src/components/TabBar.tsx",
              lineNumber: 32,
              columnNumber: 13
            }) }, void 0, !1, {
              fileName: "src/components/TabBar.tsx",
              lineNumber: 31,
              columnNumber: 11
            }) }, void 0, !1, {
              fileName: "src/components/TabBar.tsx",
              lineNumber: 30,
              columnNumber: 9
            }) }, void 0, !1, {
              fileName: "src/components/TabBar.tsx",
              lineNumber: 29,
              columnNumber: 7
            })
          },
          void 0,
          !1,
          {
            fileName: "src/components/TabBar.tsx",
            lineNumber: 26,
            columnNumber: 5
          }
        ),
        /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "tabNew", text: t("Nova aba"), iconName: "list-add", onClicked: () => {
          manager2.newTab();
        } }, void 0, !1, {
          fileName: "src/components/TabBar.tsx",
          lineNumber: 47,
          columnNumber: 5
        })
      ]
    },
    void 0,
    !0,
    {
      fileName: "src/components/TabBar.tsx",
      lineNumber: 21,
      columnNumber: 10
    }
  );
});

// src/components/Toolbar.tsx
init_i18n2();
var layouts5 = importQml("QtQuick.Layouts"), Toolbar = component("Toolbar", ({ manager: manager2 }) => {
  let scope = createQmlScope(), searchOpen = signal(!1), address = signal(manager2.path());
  effect(() => {
    address.set(manager2.path()), searchOpen.set(!1);
  });
  let canGoBack = computed(() => manager2.navigation().back && !manager2.busy()), canGoForward = computed(() => manager2.navigation().forward && !manager2.busy()), sorts = ["name", "size", "modified", "type"];
  return /* @__PURE__ */ jsxDEV(layouts5.ColumnLayout, { width: "fill", spacing: 6, children: [
    /* @__PURE__ */ jsxDEV(TabBar, { manager: manager2 }, void 0, !1, {
      fileName: "src/components/Toolbar.tsx",
      lineNumber: 26,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(layouts5.RowLayout, { "Layout.fillWidth": !0, children: [
      /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "toolbarBack", text: "", iconName: "go-previous", "Accessible.name": t("Voltar"), enabled: canGoBack, onClicked: () => {
        manager2.back();
      } }, void 0, !1, {
        fileName: "src/components/Toolbar.tsx",
        lineNumber: 28,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "toolbarForward", text: "", iconName: "go-next", "Accessible.name": t("Avan\xE7ar"), enabled: canGoForward, onClicked: () => {
        manager2.forward();
      } }, void 0, !1, {
        fileName: "src/components/Toolbar.tsx",
        lineNumber: 29,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "toolbarUp", text: "", iconName: "go-up", "Accessible.name": t("Pasta acima"), onClicked: () => {
        manager2.up();
      } }, void 0, !1, {
        fileName: "src/components/Toolbar.tsx",
        lineNumber: 30,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(
        PathBar,
        {
          objectName: "toolbarAddress",
          visible: () => !searchOpen(),
          text: address,
          path: manager2.path,
          home: manager2.home,
          onNavigate: (target) => {
            manager2.navigate(target);
          },
          "Layout.fillWidth": !0,
          onTextEdited: (text2) => address.set(text2),
          onAccepted: (text2) => {
            manager2.navigate(text2);
          }
        },
        void 0,
        !1,
        {
          fileName: "src/components/Toolbar.tsx",
          lineNumber: 31,
          columnNumber: 9
        }
      ),
      /* @__PURE__ */ jsxDEV(
        NativeTextField,
        {
          qmlId: scope.id("search"),
          objectName: "fileSearch",
          visible: searchOpen,
          text: manager2.searchText,
          placeholderText: t("Buscar nesta pasta\u2026"),
          "Layout.fillWidth": !0,
          "Accessible.name": t("Buscar arquivos"),
          onTextEdited: manager2.setSearch,
          onVisibleChanged: qmlHandler(scope, (q) => {
            q.search.visible && (q.search.forceActiveFocus(), q.search.selectAll());
          }),
          "Keys.onEscapePressed": qmlHandler(scope, (q) => {
            q.searchToggle.clicked();
          })
        },
        void 0,
        !1,
        {
          fileName: "src/components/Toolbar.tsx",
          lineNumber: 34,
          columnNumber: 9
        }
      ),
      /* @__PURE__ */ jsxDEV(
        QuietButton,
        {
          qmlId: scope.id("searchToggle"),
          objectName: "toolbarSearch",
          text: "",
          iconName: () => searchOpen() ? "window-close" : "search",
          selected: searchOpen,
          "Accessible.name": () => t(searchOpen() ? "Fechar busca" : "Buscar arquivos"),
          onClicked: () => {
            searchOpen.set(!searchOpen()), searchOpen() || manager2.setSearch("");
          }
        },
        void 0,
        !1,
        {
          fileName: "src/components/Toolbar.tsx",
          lineNumber: 39,
          columnNumber: 9
        }
      ),
      /* @__PURE__ */ jsxDEV(
        QuietButton,
        {
          objectName: "trashRestore",
          text: t("Restaurar"),
          iconName: "edit-undo",
          visible: () => manager2.path() === "trash:///",
          enabled: () => manager2.selection().length > 0 && !manager2.mutating(),
          onClicked: () => {
            manager2.restoreSelected();
          }
        },
        void 0,
        !1,
        {
          fileName: "src/components/Toolbar.tsx",
          lineNumber: 42,
          columnNumber: 9
        }
      ),
      /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "toolbarRefresh", text: "", iconName: "view-refresh", "Accessible.name": t("Atualizar"), onClicked: () => {
        manager2.refresh();
      } }, void 0, !1, {
        fileName: "src/components/Toolbar.tsx",
        lineNumber: 44,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(ViewGroup, { view: manager2.view, surface: () => manager2.palette().surface_container_high || "#25282b", onChanged: (value2) => {
        (value2 === "list" || value2 === "grid" || value2 === "columns") && manager2.setView(value2);
      } }, void 0, !1, {
        fileName: "src/components/Toolbar.tsx",
        lineNumber: 46,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(
        SortMenu,
        {
          onError: manager2.reportError,
          objectName: "toolbarSort",
          currentIndex: () => sorts.indexOf(manager2.order()),
          onActivated: (index2) => {
            let sort = sorts[index2];
            sort && manager2.setOrder(sort);
          }
        },
        void 0,
        !1,
        {
          fileName: "src/components/Toolbar.tsx",
          lineNumber: 48,
          columnNumber: 9
        }
      ),
      /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "toolbarDescending", "Accessible.name": () => t(manager2.descending() ? "Ordem decrescente" : "Ordem crescente"), text: () => manager2.descending() ? "\u2193" : "\u2191", onClicked: manager2.toggleDescending }, void 0, !1, {
        fileName: "src/components/Toolbar.tsx",
        lineNumber: 50,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { text: "", iconName: "settings", "Accessible.name": t("Prefer\xEAncias"), onClicked: manager2.showPreferences }, void 0, !1, {
        fileName: "src/components/Toolbar.tsx",
        lineNumber: 51,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "toolbarHidden", text: "", iconName: () => manager2.hidden() ? "visibility" : "visibility-off", "Accessible.name": () => manager2.hidden() ? t("Arquivos ocultos vis\xEDveis") : t("Arquivos ocultos escondidos"), selected: manager2.hidden, onClicked: manager2.toggleHidden }, void 0, !1, {
        fileName: "src/components/Toolbar.tsx",
        lineNumber: 52,
        columnNumber: 9
      })
    ] }, void 0, !0, {
      fileName: "src/components/Toolbar.tsx",
      lineNumber: 27,
      columnNumber: 7
    })
  ] }, void 0, !0, {
    fileName: "src/components/Toolbar.tsx",
    lineNumber: 25,
    columnNumber: 5
  });
});

// src/components/Sidebar.tsx
init_i18n2();
init_src();

// src/components/SectionTitle.tsx
init_src();
var qml9 = importQml("QtQuick"), dms5 = importQml("qs.DankCommon.Widgets"), SectionTitle = component("SectionTitle", ({ text: text2, width: width2 = "fill", objectName }) => /* @__PURE__ */ jsxDEV(qml9.Item, { objectName, width: width2, height: 30, children: /* @__PURE__ */ jsxDEV(
  dms5.StyledText,
  {
    width: "fill",
    y: 10,
    text: text2,
    opacity: 0.65,
    "font.pixelSize": 10,
    "font.letterSpacing": 1.2
  },
  void 0,
  !1,
  {
    fileName: "src/components/SectionTitle.tsx",
    lineNumber: 7,
    columnNumber: 5
  }
) }, void 0, !1, {
  fileName: "src/components/SectionTitle.tsx",
  lineNumber: 6,
  columnNumber: 3
}));

// src/components/GameSection.tsx
init_src();
var qml10 = importQml("QtQuick"), GameSection = component("GameSection", ({ objectName, title, iconName: iconName2 = "applications-games", width: width2 = "fill", visible: visible2 = !0, children }) => {
  let expanded = signal(!1), name = objectName || "advancedSection";
  return /* @__PURE__ */ jsxDEV(qml10.Column, { objectName: name, width: width2, spacing: 4, visible: visible2, children: [
    /* @__PURE__ */ jsxDEV(
      QuietButton,
      {
        objectName: `groupToggle:${name}`,
        width: "fill",
        iconName: iconName2,
        text: () => `${expanded() ? "\u25BE" : "\u25B8"}  ${typeof title == "function" ? title() : title}`,
        onClicked: () => expanded.update((value2) => !value2)
      },
      void 0,
      !1,
      {
        fileName: "src/components/GameSection.tsx",
        lineNumber: 12,
        columnNumber: 5
      }
    ),
    /* @__PURE__ */ jsxDEV(Show, { when: expanded, children: () => /* @__PURE__ */ jsxDEV(ui.HStack, { width: "fill", gap: 0, children: [
      /* @__PURE__ */ jsxDEV(qml10.Item, { width: 18, height: 1 }, void 0, !1, {
        fileName: "src/components/GameSection.tsx",
        lineNumber: 17,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(ui.VStack, { grow: 1, gap: 4, children }, void 0, !1, {
        fileName: "src/components/GameSection.tsx",
        lineNumber: 18,
        columnNumber: 9
      })
    ] }, void 0, !0, {
      fileName: "src/components/GameSection.tsx",
      lineNumber: 16,
      columnNumber: 13
    }) }, void 0, !1, {
      fileName: "src/components/GameSection.tsx",
      lineNumber: 15,
      columnNumber: 5
    })
  ] }, void 0, !0, {
    fileName: "src/components/GameSection.tsx",
    lineNumber: 11,
    columnNumber: 10
  });
});

// src/components/PlaceItem.tsx
init_src();

// src/native/PlaceButton.tsx
init_src();
var qml11 = importQml("QtQuick"), PlaceButton = component(
  "PlaceButton",
  (props) => {
    props = {
      ...props,
      onActionChosen: props.onActionChosen ? qmlReadEvent(["chosenAction"], props.onActionChosen) : void 0
    };
    let scope = createQmlScope({ ...props.qmlId ? { root: props.qmlId } : {}, app: "app" });
    return scope.id("root"), scope.id("menu"), /* @__PURE__ */ jsxDEV(
      QuietButton,
      {
        qmlImports: ["Quickshell", "qs.DankCommon.Common"],
        qmlId: scope.id("root"),
        qmlDeclarations: {
          drive: { type: "bool", value: !1 },
          favorite: { type: "bool", value: !1 },
          mounted: { type: "bool", value: !0 },
          chosenAction: { type: "string", value: "" }
        },
        qmlSignals: { actionChosen: [] },
        statusIcon: qmlExpression(
          scope,
          ($qml) => drive && !mounted ? "usb_off" : ""
        ),
        "ToolTip.visible": qmlExpression(
          scope,
          ($qml) => hovered && drive && !mounted
        ),
        "ToolTip.text": qmlExpression(
          scope,
          ($qml) => $qml.app.tr("Volume desmontado \u2014 bot\xE3o direito para montar")
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxDEV(
            qml11.TapHandler,
            {
              acceptedButtons: qmlExpression(scope, ($qml) => Qt.RightButton),
              onTapped: qmlHandler(scope, ($qml) => {
                $qml.menu.popup();
              })
            },
            void 0,
            !1,
            {
              fileName: "src/native/PlaceButton.tsx",
              lineNumber: 61,
              columnNumber: 9
            }
          ),
          /* @__PURE__ */ jsxDEV(AppMenu, { qmlId: scope.id("menu"), children: [
            /* @__PURE__ */ jsxDEV(
              ContextAction,
              {
                text: qmlExpression(
                  scope,
                  ($qml) => $qml.app.tr(
                    $qml.root.drive ? $qml.root.mounted ? "Abrir" : "Montar" : "Abrir pasta"
                  )
                ),
                onTriggered: qmlHandler(scope, ($qml) => {
                  $qml.root.chosenAction = $qml.root.drive && !$qml.root.mounted ? "mount" : "open", $qml.root.actionChosen();
                })
              },
              void 0,
              !1,
              {
                fileName: "src/native/PlaceButton.tsx",
                lineNumber: 68,
                columnNumber: 11
              }
            ),
            /* @__PURE__ */ jsxDEV(
              ContextAction,
              {
                text: qmlExpression(
                  scope,
                  ($qml) => $qml.app.tr("Adicionar pasta atual a Locais")
                ),
                visible: qmlExpression(scope, ($qml) => $qml.root.favorite),
                onTriggered: qmlHandler(scope, ($qml) => {
                  $qml.root.chosenAction = "addCurrent", $qml.root.actionChosen();
                })
              },
              void 0,
              !1,
              {
                fileName: "src/native/PlaceButton.tsx",
                lineNumber: 84,
                columnNumber: 11
              }
            ),
            /* @__PURE__ */ jsxDEV(
              ContextAction,
              {
                text: qmlExpression(scope, ($qml) => $qml.app.tr("Remover de Locais")),
                visible: qmlExpression(scope, ($qml) => $qml.root.favorite),
                onTriggered: qmlHandler(scope, ($qml) => {
                  $qml.root.chosenAction = "remove", $qml.root.actionChosen();
                })
              },
              void 0,
              !1,
              {
                fileName: "src/native/PlaceButton.tsx",
                lineNumber: 94,
                columnNumber: 11
              }
            ),
            /* @__PURE__ */ jsxDEV(
              ContextAction,
              {
                text: qmlExpression(scope, ($qml) => $qml.app.tr("Desmontar")),
                visible: qmlExpression(
                  scope,
                  ($qml) => $qml.root.drive && $qml.root.mounted
                ),
                onTriggered: qmlHandler(scope, ($qml) => {
                  $qml.root.chosenAction = "unmount", $qml.root.actionChosen();
                })
              },
              void 0,
              !1,
              {
                fileName: "src/native/PlaceButton.tsx",
                lineNumber: 102,
                columnNumber: 11
              }
            )
          ] }, void 0, !0, {
            fileName: "src/native/PlaceButton.tsx",
            lineNumber: 67,
            columnNumber: 9
          }),
          props.children
        ]
      },
      void 0,
      !0,
      {
        fileName: "src/native/PlaceButton.tsx",
        lineNumber: 35,
        columnNumber: 7
      }
    );
  }
);

// src/components/VolumeUsageBar.tsx
init_src();
var qml12 = importQml("QtQuick"), VolumeUsageBar = component("VolumeUsageBar", ({ usage, shown }) => {
  let scope = createQmlScope(), fraction = () => usageFraction(usage());
  return /* @__PURE__ */ jsxDEV(
    qml12.Item,
    {
      qmlId: scope.id("usageBar"),
      width: "fill",
      height: () => (shown?.() ?? !0) && fraction() !== null ? 4 : 0,
      visible: () => (shown?.() ?? !0) && fraction() !== null,
      qmlDeclarations: {
        share: { type: "real", readonly: !0, value: () => fraction() ?? 0 }
      },
      children: [
        /* @__PURE__ */ jsxDEV(
          qml12.Rectangle,
          {
            width: "fill",
            height: 3,
            radius: 1.5,
            color: qmlExpression(scope, ($qml) => Style.withAlpha(Style.surfaceText, 0.16))
          },
          void 0,
          !1,
          {
            fileName: "src/components/VolumeUsageBar.tsx",
            lineNumber: 30,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          qml12.Rectangle,
          {
            height: 3,
            radius: 1.5,
            color: qmlExpression(scope, ($qml) => Style.withAlpha(Style.primary, 0.75)),
            width: qmlExpression(scope, ($qml) => {
              let share = $qml.usageBar.share;
              return share <= 0 ? 0 : Math.max(3, Math.round(parent.width * share));
            })
          },
          void 0,
          !1,
          {
            fileName: "src/components/VolumeUsageBar.tsx",
            lineNumber: 36,
            columnNumber: 7
          }
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "src/components/VolumeUsageBar.tsx",
      lineNumber: 21,
      columnNumber: 5
    }
  );
});

// src/components/PlaceItem.tsx
var nativeQuick = importQml("QtQuick"), PlaceItem = component("PlaceItem", ({ place, navigate, drive: drive2 = !1, currentPath, action, usage }) => /* @__PURE__ */ jsxDEV(nativeQuick.Column, { width: "fill", children: [
  /* @__PURE__ */ jsxDEV(
    PlaceButton,
    {
      objectName: drive2 ? `drive:${place().id ?? `${place().path}:${place().name}`}` : `game:${place().path}`,
      width: "fill",
      iconName: () => place().icon ?? (drive2 ? "drive-harddisk" : "folder"),
      selected: () => currentPath?.() === place().path,
      text: () => place().name.replace(/ — não montado$/, ""),
      drive: drive2,
      favorite: !!action && !drive2,
      mounted: () => !drive2 || place().mounted === !0,
      onActionChosen: (value2) => {
        value2 === "open" ? navigate(place().path) : action?.(value2, place());
      },
      enabled: !0,
      onClicked: () => {
        (!drive2 || place().mounted) && navigate(place().path);
      }
    },
    void 0,
    !1,
    {
      fileName: "src/components/PlaceItem.tsx",
      lineNumber: 19,
      columnNumber: 5
    }
  ),
  /* @__PURE__ */ jsxDEV(VolumeUsageBar, { shown: () => drive2 && place().mounted === !0, usage: () => usage?.()[place().path] }, void 0, !1, {
    fileName: "src/components/PlaceItem.tsx",
    lineNumber: 30,
    columnNumber: 5
  }),
  /* @__PURE__ */ jsxDEV(nativeQuick.Item, { width: 1, height: 2 }, void 0, !1, {
    fileName: "src/components/PlaceItem.tsx",
    lineNumber: 31,
    columnNumber: 5
  })
] }, void 0, !0, {
  fileName: "src/components/PlaceItem.tsx",
  lineNumber: 18,
  columnNumber: 3
}));

// src/components/Sidebar.tsx
var nativeWidgets = importQml("qs.DankCommon.Widgets"), nativeQuick2 = importQml("QtQuick"), Sidebar = component("Sidebar", ({ manager: manager2 }) => {
  let hasDrives = computed(() => manager2.drives().length > 0), hasGames = computed(() => manager2.games().length > 0), showSidebarSpecial = () => manager2.preferences?.().showSidebarSpecial ?? !0, showSidebarPlaces = () => manager2.preferences?.().showSidebarPlaces ?? !0, showSidebarVolumes = () => manager2.preferences?.().showSidebarVolumes ?? !0, showSidebarGames = () => manager2.preferences?.().showSidebarGames ?? !0;
  return /* @__PURE__ */ jsxDEV(nativeQuick2.Column, { width: "fill", spacing: 4, children: [
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarSpecial, children: () => /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", iconName: "applications-other", selected: () => manager2.path?.() === "applications:///", text: t("Aplicativos"), onClicked: () => {
      manager2.showApplications?.();
    } }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 24,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 23,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarSpecial, children: () => /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", iconName: "trash", selected: () => manager2.path?.() === "trash:///", text: t("Lixeira"), onClicked: () => {
      manager2.special?.("trash:///");
    } }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 27,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 26,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarSpecial, children: () => /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", iconName: "recent", selected: () => manager2.path?.() === "recent:///", text: t("Recentes"), onClicked: () => {
      manager2.special?.("recent:///");
    } }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 30,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 29,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarPlaces, children: () => /* @__PURE__ */ jsxDEV(SectionTitle, { width: "fill", text: t("LUGARES") }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 33,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 32,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarPlaces, children: () => /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "sidebarHome", width: "fill", iconName: "user-home", selected: () => manager2.path?.() === manager2.home, text: t("Pasta pessoal"), onClicked: () => {
      manager2.navigate(manager2.home);
    } }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 36,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 35,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarPlaces, children: () => /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "sidebarRoot", width: "fill", iconName: "drive-harddisk", text: t("Sistema"), onClicked: () => {
      manager2.navigate("/");
    } }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 39,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 38,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarPlaces, children: () => /* @__PURE__ */ jsxDEV(For, { each: () => manager2.places?.() ?? [], by: (place) => place.path, children: (place) => /* @__PURE__ */ jsxDEV(PlaceItem, { action: manager2.locationAction, place, navigate: manager2.navigate, currentPath: manager2.path }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 43,
      columnNumber: 19
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 42,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 41,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarVolumes, children: () => /* @__PURE__ */ jsxDEV(SectionTitle, { objectName: "sidebarVolumesTitle", width: "fill", text: t("VOLUMES") }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 47,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 46,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarVolumes, children: () => /* @__PURE__ */ jsxDEV(For, { each: manager2.drives, by: (place) => place.id ?? `${place.path}:${place.name}`, children: (place) => /* @__PURE__ */ jsxDEV(PlaceItem, { action: manager2.locationAction, place, navigate: manager2.navigate, currentPath: manager2.path, usage: manager2.volumeUsage, drive: !0 }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 51,
      columnNumber: 21
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 50,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 49,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: () => showSidebarVolumes() && !hasDrives(), children: () => /* @__PURE__ */ jsxDEV(nativeWidgets.StyledText, { width: "fill", text: t("Nenhum volume detectado") }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 55,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 54,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarGames, children: () => /* @__PURE__ */ jsxDEV(SectionTitle, { width: "fill", text: t("JOGOS") }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 58,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 57,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: showSidebarGames, children: () => /* @__PURE__ */ jsxDEV(For, { each: manager2.games, by: (group) => group.name, children: (group) => /* @__PURE__ */ jsxDEV(GameSection, { objectName: `gameGroup:${group().name}`, width: "fill", title: () => group().name, children: /* @__PURE__ */ jsxDEV(For, { each: () => group().places, by: (place) => place.path, children: (place) => /* @__PURE__ */ jsxDEV(PlaceItem, { place, navigate: manager2.navigate }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 65,
      columnNumber: 27
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 64,
      columnNumber: 15
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 63,
      columnNumber: 13
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 61,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 60,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Show, { when: () => showSidebarGames() && !hasGames(), children: () => /* @__PURE__ */ jsxDEV(nativeWidgets.StyledText, { width: "fill", text: t("Nenhuma instala\xE7\xE3o detectada") }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 72,
      columnNumber: 16
    }) }, void 0, !1, {
      fileName: "src/components/Sidebar.tsx",
      lineNumber: 71,
      columnNumber: 7
    })
  ] }, void 0, !0, {
    fileName: "src/components/Sidebar.tsx",
    lineNumber: 22,
    columnNumber: 5
  });
});

// src/components/DetailsPanel.tsx
init_i18n2();
init_src();

// src/native/VideoPreview.tsx
init_src();
var qml13 = importQml("QtQuick"), controls6 = importQml("QtQuick.Controls"), layouts6 = importQml("QtQuick.Layouts"), media = importQml("QtMultimedia"), VideoPreview = component("VideoPreview", (props) => {
  let scope = createQmlScope({ ...props.qmlId ? { root: props.qmlId } : {}, app: "app" });
  return scope.id("root"), scope.id("video"), /* @__PURE__ */ jsxDEV(
    qml13.Item,
    {
      qmlId: scope.id("root"),
      qmlDeclarations: {
        source: { type: "url", value: "" },
        previewStatus: { type: "string", readonly: !0, value: qmlExpression(scope, ($qml) => $qml.video.error !== MediaPlayer.NoError ? "error" : $qml.video.hasVideo ? "ready" : "loading") },
        aspectRatio: { type: "real", readonly: !0, value: qmlExpression(scope, ($qml) => $qml.video.implicitHeight > 0 ? $qml.video.implicitWidth / $qml.video.implicitHeight : 16 / 9) }
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxDEV(
          media.Video,
          {
            qmlId: scope.id("video"),
            objectName: "previewVideo",
            width: qmlExpression(scope, () => parent.width),
            height: qmlExpression(scope, () => Math.max(0, parent.height - 44)),
            source: qmlExpression(scope, ($qml) => $qml.root.source),
            autoPlay: !1
          },
          void 0,
          !1,
          {
            fileName: "src/native/VideoPreview.tsx",
            lineNumber: 15,
            columnNumber: 5
          }
        ),
        /* @__PURE__ */ jsxDEV(
          layouts6.RowLayout,
          {
            height: 40,
            width: qmlExpression(scope, () => parent.width),
            "anchors.bottom": qmlExpression(scope, () => parent.bottom),
            children: [
              /* @__PURE__ */ jsxDEV(
                controls6.Button,
                {
                  objectName: "videoPlayPause",
                  text: qmlExpression(scope, ($qml) => $qml.app.tr($qml.video.playbackState === MediaPlayer.PlayingState ? "Pausar" : "Reproduzir")),
                  enabled: qmlExpression(scope, ($qml) => $qml.root.previewStatus === "ready"),
                  onClicked: qmlHandler(scope, ($qml) => {
                    $qml.video.playbackState === MediaPlayer.PlayingState ? $qml.video.pause() : $qml.video.play();
                  })
                },
                void 0,
                !1,
                {
                  fileName: "src/native/VideoPreview.tsx",
                  lineNumber: 21,
                  columnNumber: 7
                }
              ),
              /* @__PURE__ */ jsxDEV(
                controls6.Slider,
                {
                  objectName: "videoSeek",
                  from: 0,
                  to: qmlExpression(scope, ($qml) => $qml.video.duration),
                  value: qmlExpression(scope, ($qml) => $qml.video.position),
                  enabled: qmlExpression(scope, ($qml) => $qml.video.seekable),
                  "Layout.fillWidth": !0,
                  "Accessible.name": qmlExpression(scope, ($qml) => $qml.app.tr("Posi\xE7\xE3o do v\xEDdeo")),
                  onMoved: qmlHandler(scope, ($qml) => {
                    $qml.video.seek(value);
                  })
                },
                void 0,
                !1,
                {
                  fileName: "src/native/VideoPreview.tsx",
                  lineNumber: 25,
                  columnNumber: 7
                }
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "src/native/VideoPreview.tsx",
            lineNumber: 19,
            columnNumber: 5
          }
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "src/native/VideoPreview.tsx",
      lineNumber: 10,
      columnNumber: 10
    }
  );
});

// src/native/PdfPreview.tsx
init_src();
var qml14 = importQml("QtQuick"), pdf = importQml("QtQuick.Pdf"), PdfPreview = component("PdfPreview", (props) => {
  let scope = createQmlScope(props.qmlId ? { root: props.qmlId } : {});
  return scope.id("root"), scope.id("document"), scope.id("view"), /* @__PURE__ */ jsxDEV(
    qml14.Item,
    {
      qmlImports: ["Quickshell", "qs.DankCommon.Common"],
      qmlId: scope.id("root"),
      qmlDeclarations: {
        source: { type: "url", value: "" },
        expanded: { type: "bool", value: !1 },
        previewStatus: {
          type: "string",
          readonly: !0,
          value: qmlExpression(
            scope,
            ($qml) => $qml.document.status === PdfDocument.Ready ? "ready" : $qml.document.status === PdfDocument.Error ? "error" : "loading"
          )
        },
        aspectRatio: {
          type: "real",
          readonly: !0,
          value: qmlExpression(
            scope,
            ($qml) => $qml.document.status === PdfDocument.Ready ? $qml.document.pagePointSize(0).width / $qml.document.pagePointSize(0).height : 0.707
          )
        }
      },
      qmlMethods: { resetView: qmlHandler(scope, ($qml) => {
        $qml.view.resetScale(), $qml.view.goToLocation(0, Qt.point(0, 0), 1);
      }) },
      ...props,
      children: [
        /* @__PURE__ */ jsxDEV(
          qml14.Rectangle,
          {
            "anchors.fill": qmlExpression(scope, ($qml) => parent),
            color: "white",
            visible: qmlExpression(scope, ($qml) => !$qml.root.expanded)
          },
          void 0,
          !1,
          {
            fileName: "src/native/PdfPreview.tsx",
            lineNumber: 55,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          pdf.PdfDocument,
          {
            qmlId: scope.id("document"),
            source: qmlExpression(scope, ($qml) => $qml.root.source)
          },
          void 0,
          !1,
          {
            fileName: "src/native/PdfPreview.tsx",
            lineNumber: 60,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          pdf.PdfPageImage,
          {
            "anchors.fill": qmlExpression(scope, ($qml) => parent),
            document: qmlExpression(scope, ($qml) => $qml.document),
            currentFrame: 0,
            visible: qmlExpression(scope, ($qml) => !$qml.root.expanded),
            fillMode: qmlExpression(scope, ($qml) => Image.PreserveAspectFit),
            "sourceSize.width": qmlExpression(
              scope,
              ($qml) => $qml.root.width * 2
            )
          },
          void 0,
          !1,
          {
            fileName: "src/native/PdfPreview.tsx",
            lineNumber: 64,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          pdf.PdfMultiPageView,
          {
            qmlId: scope.id("view"),
            objectName: "pdfPages",
            "anchors.fill": qmlExpression(scope, ($qml) => parent),
            document: qmlExpression(scope, ($qml) => $qml.document),
            visible: qmlExpression(scope, ($qml) => $qml.root.expanded)
          },
          void 0,
          !1,
          {
            fileName: "src/native/PdfPreview.tsx",
            lineNumber: 77,
            columnNumber: 7
          }
        ),
        props.children
      ]
    },
    void 0,
    !0,
    {
      fileName: "src/native/PdfPreview.tsx",
      lineNumber: 22,
      columnNumber: 5
    }
  );
});

// src/native/FilePreview.tsx
init_src();
var qt2 = importQml("QtQml"), qml15 = importQml("QtQuick"), controls7 = importQml("QtQuick.Controls"), FilePreview = component(
  "FilePreview",
  (props) => {
    let scope = createQmlScope({ ...props.qmlId ? { root: props.qmlId } : {}, app: "app" });
    return scope.id("root"), scope.id("image"), scope.id("pdf"), scope.id("video"), scope.id("pan"), /* @__PURE__ */ jsxDEV(
      qml15.Rectangle,
      {
        qmlImports: ["Quickshell", "qs.DankCommon.Common"],
        qmlId: scope.id("root"),
        qmlDeclarations: {
          source: { type: "url", value: "" },
          kind: { type: "string", value: "none" },
          expanded: { type: "bool", value: !1 },
          zoom: { type: "real", value: 1 },
          angle: { type: "real", value: 0 },
          resetToken: { type: "int", value: 0 },
          panX: { type: "real", value: 0 },
          panY: { type: "real", value: 0 },
          previewStatus: {
            type: "string",
            readonly: !0,
            value: qmlExpression(
              scope,
              ($qml) => kind === "image" ? $qml.image.status === Image.Ready ? "ready" : $qml.image.status === Image.Error ? "error" : "loading" : kind === "pdf" ? $qml.pdf.status === Loader.Error ? "error" : $qml.pdf.item ? $qml.pdf.item.previewStatus : "loading" : kind === "video" ? $qml.video.status === Loader.Error ? "error" : $qml.video.item ? $qml.video.item.previewStatus : "loading" : "unsupported"
            )
          },
          aspectRatio: {
            type: "real",
            readonly: !0,
            value: qmlExpression(
              scope,
              ($qml) => kind === "image" && $qml.image.implicitHeight > 0 ? $qml.image.implicitWidth / $qml.image.implicitHeight : kind === "pdf" && $qml.pdf.item ? $qml.pdf.item.aspectRatio : kind === "video" && $qml.video.item ? $qml.video.item.aspectRatio : 1.4
            )
          }
        },
        qmlMethods: {
          panTo: qmlHandler(scope, ($qml, x, y) => {
            var rotated = $qml.root.angle % 180 !== 0, limitX = Math.max(0, ((rotated ? $qml.root.height : $qml.root.width) * $qml.root.zoom - $qml.root.width) / 2), limitY = Math.max(0, ((rotated ? $qml.root.width : $qml.root.height) * $qml.root.zoom - $qml.root.height) / 2);
            $qml.root.panX = Math.max(-limitX, Math.min(limitX, x)), $qml.root.panY = Math.max(-limitY, Math.min(limitY, y));
          }),
          resetView: qmlHandler(scope, ($qml) => {
            $qml.root.panX = 0, $qml.root.panY = 0, $qml.pdf.item && $qml.pdf.item.resetView();
          })
        },
        onResetTokenChanged: qmlHandler(scope, ($qml) => {
          $qml.root.resetView();
        }),
        onSourceChanged: qmlHandler(scope, ($qml) => {
          $qml.root.resetView();
        }),
        onZoomChanged: qmlHandler(scope, ($qml) => {
          $qml.root.panTo($qml.root.panX, $qml.root.panY);
        }),
        onAngleChanged: qmlHandler(scope, ($qml) => {
          $qml.root.panTo($qml.root.panX, $qml.root.panY);
        }),
        color: qmlExpression(scope, ($qml) => Style.surfaceContainerHigh),
        radius: qmlExpression(scope, ($qml) => Style.cornerRadius),
        clip: !0,
        ...props,
        children: [
          /* @__PURE__ */ jsxDEV(
            qml15.Image,
            {
              "anchors.centerIn": qmlExpression(scope, ($qml) => parent),
              width: 96,
              height: 96,
              source: qmlExpression(
                scope,
                ($qml) => $qml.root.kind === "folder" ? Quickshell.iconPath("folder") : ""
              ),
              visible: qmlExpression(scope, ($qml) => $qml.root.kind === "folder"),
              fillMode: qmlExpression(scope, ($qml) => Image.PreserveAspectFit)
            },
            void 0,
            !1,
            {
              fileName: "src/native/FilePreview.tsx",
              lineNumber: 107,
              columnNumber: 9
            }
          ),
          /* @__PURE__ */ jsxDEV(
            qml15.Image,
            {
              qmlId: scope.id("image"),
              objectName: "previewImage",
              scale: props.zoom ?? 1,
              rotation: props.angle ?? 0,
              transform: /* @__PURE__ */ jsxDEV(qml15.Translate, { x: qmlExpression(scope, ($qml) => $qml.root.panX), y: qmlExpression(scope, ($qml) => $qml.root.panY) }, void 0, !1, {
                fileName: "src/native/FilePreview.tsx",
                lineNumber: 122,
                columnNumber: 26
              }),
              "anchors.fill": qmlExpression(scope, ($qml) => parent),
              "anchors.margins": 8,
              visible: qmlExpression(scope, ($qml) => $qml.root.kind === "image"),
              source: qmlExpression(
                scope,
                ($qml) => visible ? $qml.root.source : ""
              ),
              asynchronous: !0,
              autoTransform: !0,
              fillMode: qmlExpression(scope, ($qml) => Image.PreserveAspectFit),
              sourceSize: qmlExpression(
                scope,
                ($qml) => $qml.root.expanded ? Qt.size(-1, -1) : Qt.size($qml.root.width * 2, $qml.root.height * 2)
              )
            },
            void 0,
            !1,
            {
              fileName: "src/native/FilePreview.tsx",
              lineNumber: 117,
              columnNumber: 9
            }
          ),
          /* @__PURE__ */ jsxDEV(
            qml15.Loader,
            {
              qmlId: scope.id("pdf"),
              objectName: "previewPdf",
              scale: props.zoom ?? 1,
              rotation: props.angle ?? 0,
              transform: /* @__PURE__ */ jsxDEV(qml15.Translate, { x: qmlExpression(scope, ($qml) => $qml.root.panX), y: qmlExpression(scope, ($qml) => $qml.root.panY) }, void 0, !1, {
                fileName: "src/native/FilePreview.tsx",
                lineNumber: 143,
                columnNumber: 26
              }),
              "anchors.fill": qmlExpression(scope, ($qml) => parent),
              "anchors.margins": 8,
              active: qmlExpression(
                scope,
                ($qml) => $qml.root.kind === "pdf" && String($qml.root.source).length > 0
              ),
              sourceComponent: /* @__PURE__ */ jsxDEV(qt2.Component, { children: /* @__PURE__ */ jsxDEV(PdfPreview, {}, void 0, !1, {
                fileName: "src/native/FilePreview.tsx",
                lineNumber: 153,
                columnNumber: 15
              }) }, void 0, !1, {
                fileName: "src/native/FilePreview.tsx",
                lineNumber: 152,
                columnNumber: 13
              }),
              onLoaded: qmlHandler(scope, ($qml) => {
                item.source = Qt.binding(function() {
                  return $qml.root.source;
                }), item.expanded = Qt.binding(function() {
                  return $qml.root.expanded;
                });
              })
            },
            void 0,
            !1,
            {
              fileName: "src/native/FilePreview.tsx",
              lineNumber: 138,
              columnNumber: 9
            }
          ),
          /* @__PURE__ */ jsxDEV(
            qml15.Loader,
            {
              qmlId: scope.id("video"),
              objectName: "previewVideoLoader",
              "anchors.fill": qmlExpression(scope, () => parent),
              "anchors.margins": 8,
              active: qmlExpression(scope, ($qml) => $qml.root.visible && $qml.root.kind === "video" && String($qml.root.source).length > 0),
              sourceComponent: /* @__PURE__ */ jsxDEV(qt2.Component, { children: /* @__PURE__ */ jsxDEV(VideoPreview, {}, void 0, !1, {
                fileName: "src/native/FilePreview.tsx",
                lineNumber: 168,
                columnNumber: 42
              }) }, void 0, !1, {
                fileName: "src/native/FilePreview.tsx",
                lineNumber: 168,
                columnNumber: 28
              }),
              onLoaded: qmlHandler(scope, ($qml) => {
                item.source = Qt.binding(function() {
                  return $qml.root.source;
                });
              })
            },
            void 0,
            !1,
            {
              fileName: "src/native/FilePreview.tsx",
              lineNumber: 165,
              columnNumber: 9
            }
          ),
          /* @__PURE__ */ jsxDEV(
            controls7.Label,
            {
              "anchors.centerIn": qmlExpression(scope, ($qml) => parent),
              width: qmlExpression(scope, ($qml) => parent.width - 24),
              wrapMode: qmlExpression(scope, ($qml) => Text.Wrap),
              horizontalAlignment: qmlExpression(
                scope,
                ($qml) => Text.AlignHCenter
              ),
              color: qmlExpression(scope, ($qml) => Style.surfaceText),
              visible: qmlExpression(
                scope,
                ($qml) => $qml.root.kind !== "folder" && $qml.root.previewStatus !== "ready"
              ),
              text: qmlExpression(
                scope,
                ($qml) => $qml.root.previewStatus === "unsupported" ? $qml.app.tr("Sem pr\xE9via para este formato") : $qml.root.previewStatus === "error" ? $qml.app.tr("N\xE3o foi poss\xEDvel carregar a pr\xE9via") : $qml.app.tr("Carregando pr\xE9via\u2026")
              )
            },
            void 0,
            !1,
            {
              fileName: "src/native/FilePreview.tsx",
              lineNumber: 170,
              columnNumber: 9
            }
          ),
          /* @__PURE__ */ jsxDEV(
            qml15.MouseArea,
            {
              qmlId: scope.id("pan"),
              objectName: "previewPan",
              "anchors.fill": qmlExpression(scope, () => parent),
              enabled: qmlExpression(scope, ($qml) => $qml.root.expanded && $qml.root.previewStatus === "ready" && ($qml.root.kind === "image" || $qml.root.kind === "pdf") && ($qml.root.zoom > 1 || $qml.root.angle !== 0)),
              cursorShape: qmlExpression(scope, ($qml) => $qml.pan.pressed ? Qt.ClosedHandCursor : Qt.OpenHandCursor),
              qmlDeclarations: { originX: { type: "real", value: 0 }, originY: { type: "real", value: 0 }, startX: { type: "real", value: 0 }, startY: { type: "real", value: 0 } },
              onPressed: qmlHandler(scope, ($qml, mouse) => {
                $qml.pan.originX = mouse.x, $qml.pan.originY = mouse.y, $qml.pan.startX = $qml.root.panX, $qml.pan.startY = $qml.root.panY;
              }),
              onPositionChanged: qmlHandler(scope, ($qml, mouse) => {
                $qml.pan.pressed && $qml.root.panTo($qml.pan.startX + mouse.x - $qml.pan.originX, $qml.pan.startY + mouse.y - $qml.pan.originY);
              })
            },
            void 0,
            !1,
            {
              fileName: "src/native/FilePreview.tsx",
              lineNumber: 193,
              columnNumber: 9
            }
          ),
          props.children
        ]
      },
      void 0,
      !0,
      {
        fileName: "src/native/FilePreview.tsx",
        lineNumber: 42,
        columnNumber: 7
      }
    );
  }
);

// src/components/DetailsPanel.tsx
var nativeWidgets2 = importQml("qs.DankCommon.Widgets"), nativeQuick3 = importQml("QtQuick"), DetailsPanel = component("DetailsPanel", ({ manager: manager2 }) => {
  let application = computed(() => manager2.path() === "applications:///"), file = computed(() => manager2.selected()), permissions = computed(() => {
    let mode = parseInt(manager2.selectedDetails()?.permissions ?? "0", 8), describe = (bits) => [bits & 4 ? t("ler") : "", bits & 2 ? t("alterar") : "", bits & 1 ? file()?.directory ? t("acessar") : t("executar") : ""].filter(Boolean).join(", ") || t("sem acesso");
    return manager2.selectedDetails() ? t("Propriet\xE1rio: {owner} \xB7 Grupo: {group} \xB7 Outros: {others}", { owner: describe(mode >> 6 & 7), group: describe(mode >> 3 & 7), others: describe(mode & 7) }) : "";
  }), size = computed(() => file()?.directory ? "\u2014" : file() ? `${new Intl.NumberFormat(formattingLocale("LC_NUMERIC"), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(file().size / 1024)} KB` : ""), modified = computed(() => file() ? new Date(file().modified).toLocaleString(formattingLocale("LC_TIME")) : "");
  return /* @__PURE__ */ jsxDEV(nativeQuick3.Column, { width: "fill", spacing: 12, children: [
    /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", visible: () => !manager2.preferences().detailsAlwaysVisible, iconName: "window-close", text: t("Fechar detalhes"), onClicked: manager2.closeDetails }, void 0, !1, {
      fileName: "src/components/DetailsPanel.tsx",
      lineNumber: 22,
      columnNumber: 5
    }),
    /* @__PURE__ */ jsxDEV(nativeWidgets2.StyledText, { objectName: "detailsEmpty", width: "fill", visible: () => !file(), text: t("Selecione um item para ver os detalhes.") }, void 0, !1, {
      fileName: "src/components/DetailsPanel.tsx",
      lineNumber: 23,
      columnNumber: 5
    }),
    /* @__PURE__ */ jsxDEV(nativeQuick3.Column, { width: "fill", spacing: 12, visible: () => !!file(), children: [
      /* @__PURE__ */ jsxDEV(nativeWidgets2.StyledText, { width: "fill", text: () => file()?.name ?? "" }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 25,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(nativeWidgets2.StyledText, { width: "fill", text: () => file()?.path ?? "" }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 26,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(FilePreview, { visible: () => !application() && !manager2.previewOpen(), objectName: "detailsPreview", width: "fill", height: 200, source: manager2.previewSource, kind: () => file()?.directory ? "folder" : manager2.remote() ? "none" : manager2.selectedPreviewKind() }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 27,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(nativeWidgets2.StyledText, { visible: () => !application(), width: "fill", text: () => file()?.directory ? t("Tipo: Pasta") : t("Tamanho: {size}", { size: size() }) }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 28,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(nativeWidgets2.StyledText, { visible: () => !application(), width: "fill", text: () => t("Modificado: {date}", { date: modified() }) }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 29,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(nativeWidgets2.StyledText, { visible: () => !application(), width: "fill", text: () => manager2.selectedDetails()?.items !== void 0 ? `${t("{count} itens", { count: manager2.selectedDetails().items ?? 0 })} \xB7 ${t("{count} pastas", { count: manager2.selectedDetails().folders ?? 0 })}` : "" }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 30,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", visible: () => !application(), iconName: "document-preview", text: t("Pr\xE9-visualizar"), enabled: () => manager2.selectedPreviewKind() !== "none", onClicked: manager2.requestPreview }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 31,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", iconName: "document-open", objectName: "detailsOpen", text: () => t(application() ? "Abrir app" : file()?.directory ? "Abrir pasta" : "Abrir no app padr\xE3o"), onClicked: () => {
        let entry3 = file();
        entry3 && (entry3.directory ? manager2.navigate(entry3.path) : manager2.open(entry3.path));
      } }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 32,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", visible: application, text: t("Abrir .desktop"), iconName: "document-open", onClicked: () => {
        manager2.openDesktopFile();
      } }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 33,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", visible: application, text: t("Desinstalar\u2026"), iconName: "trash", onClicked: () => {
        manager2.manageApplication();
      } }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 34,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", visible: application, text: t("Ocultar"), iconName: "visibility-off", onClicked: () => {
        manager2.hideApplication();
      } }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 35,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", objectName: "detailsRestore", visible: () => manager2.path() === "trash:///", iconName: "edit-undo", text: t("Restaurar"), enabled: () => !manager2.mutating(), onClicked: () => {
        manager2.restoreSelected();
      } }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 36,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", objectName: "detailsCopy", visible: () => !application(), iconName: "edit-copy", text: t("Copiar"), onClicked: manager2.copy }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 37,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", objectName: "detailsCut", visible: () => !application(), iconName: "edit-cut", text: t("Recortar"), onClicked: manager2.cut }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 38,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", visible: () => !application(), iconName: "move", text: t("Mover para\u2026"), enabled: () => !manager2.mutating(), onClicked: () => manager2.requestTransfer("move") }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 39,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", visible: () => !application(), iconName: "copy-to", text: t("Copiar para\u2026"), enabled: () => !manager2.mutating(), onClicked: () => manager2.requestTransfer("copy") }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 40,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", visible: () => !application(), iconName: "edit-rename", text: t("Renomear"), enabled: () => !manager2.mutating(), onClicked: manager2.requestRename }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 41,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", visible: () => !application() && !manager2.path().includes(":///"), iconName: "trash", text: t("Mover para a lixeira"), enabled: () => !manager2.mutating(), onClicked: () => {
        manager2.trashSelected();
      } }, void 0, !1, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 42,
        columnNumber: 5
      }),
      /* @__PURE__ */ jsxDEV(GameSection, { visible: () => !application(), width: "fill", title: t("Avan\xE7ado"), iconName: "settings", children: [
        /* @__PURE__ */ jsxDEV(nativeWidgets2.StyledText, { width: "fill", text: permissions }, void 0, !1, {
          fileName: "src/components/DetailsPanel.tsx",
          lineNumber: 44,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(nativeWidgets2.StyledText, { width: "fill", text: () => manager2.selectedDetails() ? t("Propriet\xE1rio: {owner}", { owner: manager2.selectedDetails().owner }) : "" }, void 0, !1, {
          fileName: "src/components/DetailsPanel.tsx",
          lineNumber: 45,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(QuietButton, { width: "fill", text: t("Editar permiss\xF5es\u2026"), iconName: "settings", onClicked: manager2.editPermissions }, void 0, !1, {
          fileName: "src/components/DetailsPanel.tsx",
          lineNumber: 46,
          columnNumber: 7
        })
      ] }, void 0, !0, {
        fileName: "src/components/DetailsPanel.tsx",
        lineNumber: 43,
        columnNumber: 5
      })
    ] }, void 0, !0, {
      fileName: "src/components/DetailsPanel.tsx",
      lineNumber: 24,
      columnNumber: 5
    })
  ] }, void 0, !0, {
    fileName: "src/components/DetailsPanel.tsx",
    lineNumber: 21,
    columnNumber: 10
  });
});

// src/components/PreferencesContent.tsx
init_i18n2();
init_src();
var qml16 = importQml("QtQuick"), dms6 = importQml("qs.DankCommon.Widgets"), PreferencesContent = component("PreferencesContent", ({ preferences, onChanged }) => /* @__PURE__ */ jsxDEV(qml16.Column, { width: 480, spacing: 18, children: [
  /* @__PURE__ */ jsxDEV(SectionTitle, { text: t("APAR\xCANCIA") }, void 0, !1, {
    fileName: "src/components/PreferencesContent.tsx",
    lineNumber: 11,
    columnNumber: 3
  }),
  /* @__PURE__ */ jsxDEV(dms6.StyledText, { text: () => t("Tamanho dos \xEDcones: {size} px", { size: preferences().gridSize }) }, void 0, !1, {
    fileName: "src/components/PreferencesContent.tsx",
    lineNumber: 12,
    columnNumber: 3
  }),
  /* @__PURE__ */ jsxDEV(
    dms6.DankSlider,
    {
      objectName: "preferencesGrid",
      width: "fill",
      minimum: 48,
      maximum: 160,
      step: 8,
      unit: " px",
      value: () => preferences().gridSize,
      onSliderDragFinished: (value2) => onChanged("gridSize", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 13,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(
    dms6.DankToggle,
    {
      objectName: "preferencesThumbnails",
      width: "fill",
      text: t("Mostrar miniaturas"),
      checked: () => preferences().thumbnails,
      onToggled: (value2) => onChanged("thumbnails", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 15,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(
    dms6.DankToggle,
    {
      objectName: "preferencesDetailsAlwaysVisible",
      width: "fill",
      text: t("Manter painel de detalhes vis\xEDvel"),
      description: t("Reserva espa\xE7o para os detalhes. Desativado: o painel abre por Propriedades."),
      checked: () => preferences().detailsAlwaysVisible,
      onToggled: (value2) => onChanged("detailsAlwaysVisible", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 17,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(SectionTitle, { text: t("COMPORTAMENTO") }, void 0, !1, {
    fileName: "src/components/PreferencesContent.tsx",
    lineNumber: 20,
    columnNumber: 3
  }),
  /* @__PURE__ */ jsxDEV(
    dms6.DankToggle,
    {
      width: "fill",
      text: t("Ordenar pastas antes dos arquivos"),
      checked: () => preferences().foldersFirst,
      onToggled: (value2) => onChanged("foldersFirst", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 21,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(
    dms6.DankToggle,
    {
      width: "fill",
      text: t("Abrir com clique \xFAnico"),
      description: t("Desativado: duplo clique abre; clique simples seleciona."),
      checked: () => preferences().singleClick,
      onToggled: (value2) => onChanged("singleClick", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 23,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(
    dms6.DankToggle,
    {
      width: "fill",
      text: t("Mostrar a\xE7\xE3o de terminal"),
      checked: () => preferences().showTerminal,
      onToggled: (value2) => onChanged("showTerminal", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 25,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(
    dms6.DankToggle,
    {
      objectName: "preferencesShowSidebarSpecial",
      width: "fill",
      text: t("Mostrar itens especiais na barra lateral"),
      checked: () => preferences().showSidebarSpecial,
      onToggled: (value2) => onChanged("showSidebarSpecial", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 27,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(
    dms6.DankToggle,
    {
      objectName: "preferencesShowSidebarPlaces",
      width: "fill",
      text: t("Mostrar lugares na barra lateral"),
      checked: () => preferences().showSidebarPlaces,
      onToggled: (value2) => onChanged("showSidebarPlaces", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 29,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(
    dms6.DankToggle,
    {
      objectName: "preferencesShowSidebarVolumes",
      width: "fill",
      text: t("Mostrar volumes na barra lateral"),
      checked: () => preferences().showSidebarVolumes,
      onToggled: (value2) => onChanged("showSidebarVolumes", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 31,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(
    dms6.DankToggle,
    {
      objectName: "preferencesShowSidebarGames",
      width: "fill",
      text: t("Mostrar jogos na barra lateral"),
      checked: () => preferences().showSidebarGames,
      onToggled: (value2) => onChanged("showSidebarGames", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 33,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(
    dms6.DankToggle,
    {
      objectName: "preferencesReduceAnimations",
      width: "fill",
      text: t("Reduzir anima\xE7\xF5es"),
      description: t("Desativado: transi\xE7\xF5es curtas de foco, sele\xE7\xE3o, painel e di\xE1logos."),
      checked: () => preferences().reduceAnimations,
      onToggled: (value2) => onChanged("reduceAnimations", value2)
    },
    void 0,
    !1,
    {
      fileName: "src/components/PreferencesContent.tsx",
      lineNumber: 35,
      columnNumber: 3
    }
  ),
  /* @__PURE__ */ jsxDEV(dms6.StyledText, { width: "fill", text: t("Altera\xE7\xF5es s\xE3o salvas automaticamente.") }, void 0, !1, {
    fileName: "src/components/PreferencesContent.tsx",
    lineNumber: 38,
    columnNumber: 3
  })
] }, void 0, !0, {
  fileName: "src/components/PreferencesContent.tsx",
  lineNumber: 10,
  columnNumber: 52
}));

// src/components/FolderList.tsx
init_i18n2();
init_src();
var nativeWidgets3 = importQml("qs.DankCommon.Widgets"), FolderList = component("FolderList", ({ folders, enabled, onChosen }) => /* @__PURE__ */ jsxDEV(qml.ScrollView, { objectName: "destinationFolders", width: 480, height: 300, children: /* @__PURE__ */ jsxDEV(qml.Column, { width: "fill", spacing: 4, children: [
  /* @__PURE__ */ jsxDEV(For, { each: folders, by: (folder) => folder.path, children: (folder) => /* @__PURE__ */ jsxDEV(
    QuietButton,
    {
      objectName: `destination:${folder().path}`,
      width: "fill",
      text: () => folder().name,
      iconName: "folder",
      enabled,
      onClicked: () => onChosen(folder().path)
    },
    void 0,
    !1,
    {
      fileName: "src/components/FolderList.tsx",
      lineNumber: 18,
      columnNumber: 20
    }
  ) }, void 0, !1, {
    fileName: "src/components/FolderList.tsx",
    lineNumber: 17,
    columnNumber: 7
  }),
  /* @__PURE__ */ jsxDEV(Show, { when: () => !folders().length, children: () => /* @__PURE__ */ jsxDEV(nativeWidgets3.StyledText, { text: t("Nenhuma subpasta") }, void 0, !1, {
    fileName: "src/components/FolderList.tsx",
    lineNumber: 23,
    columnNumber: 16
  }) }, void 0, !1, {
    fileName: "src/components/FolderList.tsx",
    lineNumber: 22,
    columnNumber: 7
  })
] }, void 0, !0, {
  fileName: "src/components/FolderList.tsx",
  lineNumber: 16,
  columnNumber: 5
}) }, void 0, !1, {
  fileName: "src/components/FolderList.tsx",
  lineNumber: 15,
  columnNumber: 3
}));

// src/components/AppearancePalette.tsx
init_i18n2();
init_src();

// src/native/EntryIcon.tsx
init_src();
var qml17 = importQml("QtQuick"), effects = importQml("QtQuick.Effects"), EntryIcon = component("EntryIcon", (props) => {
  let scope = createQmlScope(props.qmlId ? { root: props.qmlId } : {});
  return scope.id("root"), scope.id("image"), /* @__PURE__ */ jsxDEV(
    qml17.Item,
    {
      qmlImports: ["Quickshell", "qs.DankCommon.Common"],
      qmlId: scope.id("root"),
      qmlDeclarations: {
        source: { type: "url", value: "" },
        fallbackSource: { type: "url", value: "" },
        tint: { type: "color", value: "transparent" },
        emblem: { type: "url", value: "" }
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxDEV(
          qml17.Image,
          {
            qmlId: scope.id("image"),
            "anchors.fill": qmlExpression(scope, ($qml) => parent),
            source: qmlExpression(scope, ($qml) => $qml.root.source),
            sourceSize: qmlExpression(scope, ($qml) => Qt.size(192, 192)),
            fillMode: qmlExpression(scope, ($qml) => Image.PreserveAspectFit),
            visible: qmlExpression(scope, ($qml) => $qml.root.tint.a === 0 && !($qml.image.status === Image.Error && String($qml.root.fallbackSource).length > 0))
          },
          void 0,
          !1,
          {
            fileName: "src/native/EntryIcon.tsx",
            lineNumber: 34,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          qml17.Image,
          {
            "anchors.fill": qmlExpression(scope, () => parent),
            source: qmlExpression(scope, (q) => q.image.status === Image.Error || !String(q.root.source).length ? q.root.fallbackSource : ""),
            sourceSize: qmlExpression(scope, () => Qt.size(192, 192)),
            fillMode: qmlExpression(scope, () => Image.PreserveAspectFit)
          },
          void 0,
          !1,
          {
            fileName: "src/native/EntryIcon.tsx",
            lineNumber: 42,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          effects.MultiEffect,
          {
            "anchors.fill": qmlExpression(scope, ($qml) => $qml.image),
            source: qmlExpression(scope, ($qml) => $qml.image),
            visible: qmlExpression(scope, ($qml) => $qml.root.tint.a > 0),
            colorization: 1,
            colorizationColor: qmlExpression(scope, ($qml) => $qml.root.tint)
          },
          void 0,
          !1,
          {
            fileName: "src/native/EntryIcon.tsx",
            lineNumber: 47,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(
          qml17.Image,
          {
            "anchors.right": qmlExpression(scope, ($qml) => parent.right),
            "anchors.bottom": qmlExpression(scope, ($qml) => parent.bottom),
            width: qmlExpression(scope, ($qml) => Math.max(14, parent.width * 0.3)),
            height: qmlExpression(scope, ($qml) => width),
            source: qmlExpression(scope, ($qml) => $qml.root.emblem),
            visible: qmlExpression(
              scope,
              ($qml) => String($qml.root.emblem).length > 0
            ),
            fillMode: qmlExpression(scope, ($qml) => Image.PreserveAspectFit)
          },
          void 0,
          !1,
          {
            fileName: "src/native/EntryIcon.tsx",
            lineNumber: 54,
            columnNumber: 7
          }
        ),
        props.children
      ]
    },
    void 0,
    !0,
    {
      fileName: "src/native/EntryIcon.tsx",
      lineNumber: 23,
      columnNumber: 5
    }
  );
});

// src/components/AppearancePalette.tsx
var nativeWidgets4 = importQml("qs.DankCommon.Widgets"), qml18 = importQml("QtQuick"), controls8 = importQml("QtQuick.Controls"), colors = ["", "#448aff", "#66bb6a", "#ffb74d", "#ef5350", "#ab47bc", "#26a69a", "#ec407a"], pageSize = 35, AppearancePalette = component("AppearancePalette", (props) => {
  let { manager: manager2, colorValue, emblemValue, iconValue, onColorChosen, onEmblemChosen, onIconChosen } = props, tab = signal("emblems"), search = signal(""), page = signal(0), palette = (key, fallback) => manager2.palette()[key] || fallback, filtered = computed(() => [{ name: t("Nenhum"), source: "" }, ...manager2.iconCatalog()[tab()]].filter((item2) => item2.name.toLocaleLowerCase().includes(search().toLocaleLowerCase())));
  effect(() => {
    tab(), search(), manager2.iconCatalog(), page.set(0);
  });
  let rows = computed(() => {
    let items = filtered().slice(page() * pageSize, (page() + 1) * pageSize);
    return Array.from({ length: Math.ceil(items.length / 7) }, (_, i) => items.slice(i * 7, i * 7 + 7));
  }), selected = (item2) => tab() === "emblems" ? emblemValue() === (item2.source ? item2.name : "") : iconValue() === item2.source;
  return /* @__PURE__ */ jsxDEV(qml18.Column, { width: 420, spacing: 10, children: [
    /* @__PURE__ */ jsxDEV(
      EntryIcon,
      {
        width: 64,
        height: 64,
        source: () => iconValue() || manager2.icons().folder || manager2.iconCatalog().logos.find((item2) => item2.name === "folder")?.source || "",
        tint: () => iconValue() ? "transparent" : colorValue() || "transparent",
        emblem: () => manager2.iconCatalog().emblems.find((item2) => item2.name === emblemValue())?.source || ""
      },
      void 0,
      !1,
      {
        fileName: "src/components/AppearancePalette.tsx",
        lineNumber: 33,
        columnNumber: 5
      }
    ),
    /* @__PURE__ */ jsxDEV(QuietButton, { text: t("Usar \xEDcone de pasta"), visible: () => !!iconValue(), onClicked: () => onIconChosen("") }, void 0, !1, {
      fileName: "src/components/AppearancePalette.tsx",
      lineNumber: 37,
      columnNumber: 5
    }),
    /* @__PURE__ */ jsxDEV(qml18.Row, { spacing: 12, children: colors.map((color) => /* @__PURE__ */ jsxDEV(
      controls8.Button,
      {
        objectName: `appearanceColor:${color || "default"}`,
        width: 38,
        height: 38,
        padding: 0,
        "Accessible.name": color || t("Padr\xE3o do sistema"),
        background: /* @__PURE__ */ jsxDEV(
          qml18.Rectangle,
          {
            radius: 19,
            color: () => color || palette("surface_container_high", "#25282b"),
            "border.width": () => colorValue() === color ? 3 : 1,
            "border.color": () => palette("on_surface", "#eeeeee")
          },
          void 0,
          !1,
          {
            fileName: "src/components/AppearancePalette.tsx",
            lineNumber: 41,
            columnNumber: 21
          }
        ),
        contentItem: /* @__PURE__ */ jsxDEV(
          qml18.Text,
          {
            text: () => color ? colorValue() === color ? "\u2713" : "" : "\u21BA",
            color: () => palette("on_surface", "#eeeeee"),
            horizontalAlignment: qmlEnum("Text.AlignHCenter"),
            verticalAlignment: qmlEnum("Text.AlignVCenter")
          },
          void 0,
          !1,
          {
            fileName: "src/components/AppearancePalette.tsx",
            lineNumber: 43,
            columnNumber: 22
          }
        ),
        onClicked: () => onColorChosen(color)
      },
      void 0,
      !1,
      {
        fileName: "src/components/AppearancePalette.tsx",
        lineNumber: 39,
        columnNumber: 26
      }
    )) }, void 0, !1, {
      fileName: "src/components/AppearancePalette.tsx",
      lineNumber: 38,
      columnNumber: 5
    }),
    /* @__PURE__ */ jsxDEV(qml18.Row, { spacing: 4, children: [
      /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "appearanceEmblemsTab", width: 208, text: t("Emblemas"), selected: () => tab() === "emblems", onClicked: () => tab.set("emblems") }, void 0, !1, {
        fileName: "src/components/AppearancePalette.tsx",
        lineNumber: 48,
        columnNumber: 7
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "appearanceLogosTab", width: 208, text: t("Logos e \xEDcones"), selected: () => tab() === "logos", onClicked: () => tab.set("logos") }, void 0, !1, {
        fileName: "src/components/AppearancePalette.tsx",
        lineNumber: 49,
        columnNumber: 7
      })
    ] }, void 0, !0, {
      fileName: "src/components/AppearancePalette.tsx",
      lineNumber: 47,
      columnNumber: 5
    }),
    /* @__PURE__ */ jsxDEV(NativeTextField, { objectName: "appearanceSearch", width: "fill", text: search, placeholderText: t("Buscar \xEDcone\u2026"), onTextEdited: search.set }, void 0, !1, {
      fileName: "src/components/AppearancePalette.tsx",
      lineNumber: 51,
      columnNumber: 5
    }),
    /* @__PURE__ */ jsxDEV(qml18.Column, { width: "fill", height: 300, spacing: 6, children: /* @__PURE__ */ jsxDEV(For, { each: rows, by: (row) => row.map((item2) => item2.name).join("|"), children: (row) => /* @__PURE__ */ jsxDEV(qml18.Row, { spacing: 6, children: row().map((entry3, index2) => {
      let item2 = () => row()[index2] ?? entry3;
      return /* @__PURE__ */ jsxDEV(
        controls8.Button,
        {
          width: 54,
          height: 54,
          padding: 8,
          "Accessible.name": () => item2().name,
          background: /* @__PURE__ */ jsxDEV(qml18.Rectangle, { radius: 9, color: () => selected(item2()) ? palette("primary_container", "#27445a") : "transparent" }, void 0, !1, {
            fileName: "src/components/AppearancePalette.tsx",
            lineNumber: 57,
            columnNumber: 25
          }),
          contentItem: entry3.source ? /* @__PURE__ */ jsxDEV(qml18.Image, { source: () => item2().source, fillMode: qmlEnum("Image.PreserveAspectFit"), asynchronous: !0 }, void 0, !1, {
            fileName: "src/components/AppearancePalette.tsx",
            lineNumber: 58,
            columnNumber: 39
          }) : /* @__PURE__ */ jsxDEV(qml18.Text, { text: "\u2205", color: () => palette("on_surface", "#eeeeee"), horizontalAlignment: qmlEnum("Text.AlignHCenter"), verticalAlignment: qmlEnum("Text.AlignVCenter") }, void 0, !1, {
            fileName: "src/components/AppearancePalette.tsx",
            lineNumber: 59,
            columnNumber: 16
          }),
          onClicked: () => tab() === "emblems" ? onEmblemChosen(item2().source ? item2().name : "") : onIconChosen(item2().source)
        },
        void 0,
        !1,
        {
          fileName: "src/components/AppearancePalette.tsx",
          lineNumber: 55,
          columnNumber: 82
        }
      );
    }) }, void 0, !1, {
      fileName: "src/components/AppearancePalette.tsx",
      lineNumber: 54,
      columnNumber: 15
    }) }, void 0, !1, {
      fileName: "src/components/AppearancePalette.tsx",
      lineNumber: 53,
      columnNumber: 7
    }) }, void 0, !1, {
      fileName: "src/components/AppearancePalette.tsx",
      lineNumber: 52,
      columnNumber: 5
    }),
    /* @__PURE__ */ jsxDEV(qml18.Row, { spacing: 8, children: [
      /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "appearancePrevious", text: t("Anterior"), enabled: () => page() > 0, onClicked: () => page.update((value2) => value2 - 1) }, void 0, !1, {
        fileName: "src/components/AppearancePalette.tsx",
        lineNumber: 65,
        columnNumber: 7
      }),
      /* @__PURE__ */ jsxDEV(nativeWidgets4.StyledText, { text: () => `${page() + 1} / ${Math.max(1, Math.ceil(filtered().length / pageSize))} \xB7 ${t("{count} \xEDcones", { count: filtered().length })}` }, void 0, !1, {
        fileName: "src/components/AppearancePalette.tsx",
        lineNumber: 66,
        columnNumber: 7
      }),
      /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "appearanceNext", text: t("Pr\xF3xima"), enabled: () => (page() + 1) * pageSize < filtered().length, onClicked: () => page.update((value2) => value2 + 1) }, void 0, !1, {
        fileName: "src/components/AppearancePalette.tsx",
        lineNumber: 67,
        columnNumber: 7
      })
    ] }, void 0, !0, {
      fileName: "src/components/AppearancePalette.tsx",
      lineNumber: 64,
      columnNumber: 5
    })
  ] }, void 0, !0, {
    fileName: "src/components/AppearancePalette.tsx",
    lineNumber: 32,
    columnNumber: 10
  });
});

// src/components/IconPicker.tsx
init_i18n2();
init_src();
var dialogs = importQml("QtQuick.Dialogs"), IconPicker = component(
  "IconPicker",
  ({ onChosen, onError }) => {
    let picker = createQmlRef(dialogs.FileDialog);
    return /* @__PURE__ */ jsxDEV(qml.Column, { width: 420, spacing: 8, children: [
      /* @__PURE__ */ jsxDEV(
        QuietButton,
        {
          width: "fill",
          text: t("Escolher imagem para o \xEDcone\u2026"),
          iconName: "folder-pictures",
          onClicked: () => {
            picker.current && picker.current.invoke("open").catch(onError);
          }
        },
        void 0,
        !1,
        {
          fileName: "src/components/IconPicker.tsx",
          lineNumber: 12,
          columnNumber: 7
        }
      ),
      /* @__PURE__ */ jsxDEV(
        dialogs.FileDialog,
        {
          objectName: "folderIconPicker",
          title: t("\xCDcone da pasta"),
          nameFilters: ["Imagens (*.png *.jpg *.jpeg *.svg *.webp *.ico)"],
          ref: picker.attach,
          onAccepted: () => {
            picker.current && picker.current.inspect(["selectedFile"]).then((values) => {
              if (typeof values.selectedFile == "string") onChosen(values.selectedFile);
              else throw new Error("O seletor n\xE3o retornou uma URL de arquivo.");
            }).catch(onError);
          }
        },
        void 0,
        !1,
        {
          fileName: "src/components/IconPicker.tsx",
          lineNumber: 14,
          columnNumber: 7
        }
      )
    ] }, void 0, !0, {
      fileName: "src/components/IconPicker.tsx",
      lineNumber: 11,
      columnNumber: 12
    });
  }
);

// src/components/FolderAppearanceDialog.tsx
init_i18n2();
init_src();
var nativeLayouts = importQml("QtQuick.Layouts"), nativeQuick4 = importQml("QtQuick"), nativeWidgets5 = importQml("qs.DankCommon.Widgets"), FolderAppearanceDialog = component("FolderAppearanceDialog", ({ manager: manager2 }) => {
  let color = signal(""), emblem = signal(""), icon = signal("");
  return effect(() => {
    if (manager2.appearanceOpen()) {
      let style = manager2.folderAppearances()[manager2.selected()?.path ?? ""] ?? {};
      color.set(style.color ?? ""), emblem.set(style.emblem ?? ""), icon.set(style.icon ?? "");
    }
  }), /* @__PURE__ */ jsxDEV(Dialog, { objectName: "appearanceDialog", open: manager2.appearanceOpen, title: t("Personalizar pasta"), onCloseRequest: manager2.closeAppearance, children: /* @__PURE__ */ jsxDEV(nativeQuick4.Column, { width: 420, spacing: 12, children: [
    /* @__PURE__ */ jsxDEV(nativeWidgets5.StyledText, { width: "fill", text: () => manager2.selected()?.name ?? "" }, void 0, !1, {
      fileName: "src/components/FolderAppearanceDialog.tsx",
      lineNumber: 16,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(nativeWidgets5.StyledText, { text: t("Cor da pasta") }, void 0, !1, {
      fileName: "src/components/FolderAppearanceDialog.tsx",
      lineNumber: 17,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(AppearancePalette, { manager: manager2, colorValue: color, emblemValue: emblem, iconValue: icon, onColorChosen: color.set, onEmblemChosen: emblem.set, onIconChosen: icon.set }, void 0, !1, {
      fileName: "src/components/FolderAppearanceDialog.tsx",
      lineNumber: 18,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(IconPicker, { onChosen: icon.set, onError: manager2.reportError }, void 0, !1, {
      fileName: "src/components/FolderAppearanceDialog.tsx",
      lineNumber: 19,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(nativeWidgets5.StyledText, { width: "fill", text: manager2.error }, void 0, !1, {
      fileName: "src/components/FolderAppearanceDialog.tsx",
      lineNumber: 20,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(nativeLayouts.RowLayout, { width: "fill", children: [
      /* @__PURE__ */ jsxDEV(QuietButton, { text: t("Restaurar padr\xE3o"), onClicked: () => {
        color.set(""), emblem.set(""), icon.set("");
      } }, void 0, !1, {
        fileName: "src/components/FolderAppearanceDialog.tsx",
        lineNumber: 22,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(nativeQuick4.Item, { "Layout.fillWidth": !0 }, void 0, !1, {
        fileName: "src/components/FolderAppearanceDialog.tsx",
        lineNumber: 23,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(nativeWidgets5.DankButton, { objectName: "appearanceSave", text: t("Salvar"), onClicked: () => {
        manager2.saveFolderAppearance({ color: color(), emblem: emblem(), icon: icon() });
      } }, void 0, !1, {
        fileName: "src/components/FolderAppearanceDialog.tsx",
        lineNumber: 24,
        columnNumber: 9
      })
    ] }, void 0, !0, {
      fileName: "src/components/FolderAppearanceDialog.tsx",
      lineNumber: 21,
      columnNumber: 7
    })
  ] }, void 0, !0, {
    fileName: "src/components/FolderAppearanceDialog.tsx",
    lineNumber: 15,
    columnNumber: 5
  }) }, void 0, !1, {
    fileName: "src/components/FolderAppearanceDialog.tsx",
    lineNumber: 14,
    columnNumber: 10
  });
});

// src/components/FileDialogs.tsx
init_i18n2();
init_src();

// src/components/DialogBody.tsx
init_src();
var qml19 = importQml("QtQuick"), DialogBody = component("DialogBody", ({ open, children }) => {
  let scope = createQmlScope();
  return /* @__PURE__ */ jsxDEV(qml19.Item, { qmlImports: ["QtQuick.Controls"], implicitWidth: qmlExpression(scope, () => childrenRect.width), implicitHeight: qmlExpression(scope, () => childrenRect.height), opacity: () => open() ? 1 : 0, children: [
    /* @__PURE__ */ jsxDEV(qml19.Behavior, { qmlOn: "opacity", animation: /* @__PURE__ */ jsxDEV(qml19.NumberAnimation, { duration: qmlExpression(scope, () => ApplicationWindow.window && ApplicationWindow.window.reduceAnimations ? 0 : 120) }, void 0, !1, {
      fileName: "src/components/DialogBody.tsx",
      lineNumber: 20,
      columnNumber: 48
    }) }, void 0, !1, {
      fileName: "src/components/DialogBody.tsx",
      lineNumber: 20,
      columnNumber: 7
    }),
    children
  ] }, void 0, !0, {
    fileName: "src/components/DialogBody.tsx",
    lineNumber: 19,
    columnNumber: 5
  });
});

// src/native/PermissionEditor.tsx
init_src();
var qml20 = importQml("QtQuick"), layouts7 = importQml("QtQuick.Layouts"), controls9 = importQml("QtQuick.Controls"), PermissionEditor = component(
  "PermissionEditor",
  (props) => {
    props = {
      ...props,
      onModeChanged: props.onModeChanged ? qmlReadEvent(["mode"], props.onModeChanged) : void 0
    };
    let scope = createQmlScope({ ...props.qmlId ? { root: props.qmlId } : {}, app: "app" });
    return scope.id("root"), /* @__PURE__ */ jsxDEV(
      qml20.Column,
      {
        qmlImports: ["Quickshell", "qs.DankCommon.Common"],
        qmlId: scope.id("root"),
        qmlDeclarations: {
          mode: { type: "int", value: 420 }
        },
        width: 440,
        spacing: 10,
        ...props,
        children: [
          /* @__PURE__ */ jsxDEV(
            qml20.Repeater,
            {
              model: qmlExpression(scope, ($qml) => [
                { name: "Propriet\xE1rio", shift: 6 },
                { name: "Grupo", shift: 3 },
                { name: "Outros", shift: 0 }
              ]),
              delegate: /* @__PURE__ */ jsxDEV(
                layouts7.RowLayout,
                {
                  qmlDeclarations: {
                    modelData: { type: "var", required: !0 }
                  },
                  width: qmlExpression(scope, ($qml) => $qml.root.width),
                  children: [
                    /* @__PURE__ */ jsxDEV(
                      qml20.Text,
                      {
                        text: qmlExpression(scope, ($qml) => $qml.app.tr(modelData.name)),
                        color: qmlExpression(scope, ($qml) => Style.surfaceText),
                        "Layout.preferredWidth": 100
                      },
                      void 0,
                      !1,
                      {
                        fileName: "src/native/PermissionEditor.tsx",
                        lineNumber: 54,
                        columnNumber: 15
                      }
                    ),
                    /* @__PURE__ */ jsxDEV(
                      qml20.Repeater,
                      {
                        model: qmlExpression(scope, ($qml) => [
                          { name: "Ler", bit: 4 },
                          { name: "Alterar", bit: 2 },
                          { name: "Executar/acessar", bit: 1 }
                        ]),
                        delegate: /* @__PURE__ */ jsxDEV(
                          controls9.CheckBox,
                          {
                            qmlDeclarations: {
                              modelData: { type: "var", required: !0 },
                              mask: {
                                type: "int",
                                readonly: !0,
                                value: qmlExpression(
                                  scope,
                                  ($qml) => modelData.bit << parent.modelData.shift
                                )
                              }
                            },
                            text: qmlExpression(scope, ($qml) => $qml.app.tr(modelData.name)),
                            checked: qmlExpression(
                              scope,
                              ($qml) => !!($qml.root.mode & mask)
                            ),
                            onClicked: qmlHandler(scope, ($qml) => {
                              $qml.root.mode = checked ? $qml.root.mode | mask : $qml.root.mode & ~mask;
                            })
                          },
                          void 0,
                          !1,
                          {
                            fileName: "src/native/PermissionEditor.tsx",
                            lineNumber: 66,
                            columnNumber: 19
                          }
                        )
                      },
                      void 0,
                      !1,
                      {
                        fileName: "src/native/PermissionEditor.tsx",
                        lineNumber: 59,
                        columnNumber: 15
                      }
                    )
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "src/native/PermissionEditor.tsx",
                  lineNumber: 48,
                  columnNumber: 13
                }
              )
            },
            void 0,
            !1,
            {
              fileName: "src/native/PermissionEditor.tsx",
              lineNumber: 41,
              columnNumber: 9
            }
          ),
          props.children
        ]
      },
      void 0,
      !0,
      {
        fileName: "src/native/PermissionEditor.tsx",
        lineNumber: 31,
        columnNumber: 7
      }
    );
  }
);

// src/native/PreviewContent.tsx
init_i18n2();
init_src();
var qml21 = importQml("QtQuick"), layouts8 = importQml("QtQuick.Layouts"), dms7 = importQml("qs.DankCommon.Widgets"), PreviewContent = component(
  "PreviewContent",
  (props) => {
    let scope = createQmlScope({ ...props.qmlId ? { root: props.qmlId } : {}, app: "app" });
    scope.id("root"), scope.id("preview");
    let zoom = signal(1), angle = signal(0), resetToken = signal(0), supported = () => {
      let kind2 = typeof props.kind == "function" ? props.kind() : props.kind;
      return kind2 === "image" || kind2 === "pdf";
    };
    return effect(() => {
      typeof props.source == "function" && props.source(), zoom.set(1), angle.set(0), resetToken.set(resetToken.peek() + 1);
    }), /* @__PURE__ */ jsxDEV(
      qml21.Item,
      {
        qmlImports: ["Quickshell", "qs.DankCommon.Common"],
        qmlId: scope.id("root"),
        qmlDeclarations: {
          source: { type: "url", value: "" },
          kind: { type: "string", value: "none" },
          previewStatus: {
            type: "string",
            readonly: !0,
            value: qmlExpression(scope, ($qml) => $qml.preview.previewStatus)
          },
          ratio: {
            type: "real",
            readonly: !0,
            value: qmlExpression(
              scope,
              ($qml) => $qml.preview.aspectRatio > 0 ? $qml.preview.aspectRatio : 1.4
            )
          },
          maxWidth: {
            type: "real",
            readonly: !0,
            value: qmlExpression(
              scope,
              ($qml) => Math.max(
                180,
                (ApplicationWindow.window ? ApplicationWindow.window.width : 1100) - 96
              )
            )
          },
          maxHeight: {
            type: "real",
            readonly: !0,
            value: qmlExpression(
              scope,
              ($qml) => Math.max(
                180,
                (ApplicationWindow.window ? ApplicationWindow.window.height : 720) - 240
              )
            )
          },
          imageWidth: {
            type: "real",
            readonly: !0,
            value: qmlExpression(
              scope,
              ($qml) => Math.min(maxWidth, maxHeight * ratio, 1e3)
            )
          }
        },
        qmlSignals: { opened: [], closed: [] },
        implicitWidth: qmlExpression(
          scope,
          ($qml) => Math.max(360, imageWidth)
        ),
        implicitHeight: qmlExpression(
          scope,
          ($qml) => Math.min(maxHeight, imageWidth / ratio) + ($qml.root.kind === "video" ? 48 : 96)
        ),
        width: qmlExpression(scope, ($qml) => implicitWidth),
        height: qmlExpression(scope, ($qml) => implicitHeight),
        ...props,
        children: [
          /* @__PURE__ */ jsxDEV(
            FilePreview,
            {
              qmlId: scope.id("preview"),
              objectName: "expandedPreview",
              source: qmlExpression(scope, ($qml) => $qml.root.source),
              kind: qmlExpression(scope, ($qml) => $qml.root.kind),
              expanded: !0,
              zoom,
              angle,
              resetToken,
              width: qmlExpression(scope, ($qml) => $qml.root.width),
              height: qmlExpression(scope, ($qml) => $qml.root.height - ($qml.root.kind === "video" ? 48 : 96))
            },
            void 0,
            !1,
            {
              fileName: "src/native/PreviewContent.tsx",
              lineNumber: 101,
              columnNumber: 9
            }
          ),
          /* @__PURE__ */ jsxDEV(
            layouts8.RowLayout,
            {
              visible: supported,
              width: qmlExpression(scope, ($qml) => $qml.root.width),
              y: qmlExpression(scope, ($qml) => $qml.root.height - 88),
              spacing: 4,
              children: [
                /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "previewZoomOut", "Accessible.name": t("Diminuir zoom"), text: "\u2212", enabled: () => supported() && zoom() > 0.25, onClicked: () => zoom.set(Math.max(0.25, zoom() / 1.25)) }, void 0, !1, {
                  fileName: "src/native/PreviewContent.tsx",
                  lineNumber: 117,
                  columnNumber: 11
                }),
                /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "previewZoomIn", "Accessible.name": t("Aumentar zoom"), text: "+", enabled: () => supported() && zoom() < 8, onClicked: () => zoom.set(Math.min(8, zoom() * 1.25)) }, void 0, !1, {
                  fileName: "src/native/PreviewContent.tsx",
                  lineNumber: 118,
                  columnNumber: 11
                }),
                /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "previewZoomReset", "Accessible.name": t("Restaurar visualiza\xE7\xE3o"), text: () => t("Restaurar") + " \xB7 " + Math.round(zoom() * 100) + "%", enabled: supported, onClicked: () => {
                  zoom.set(1), angle.set(0), resetToken.set(resetToken.peek() + 1);
                } }, void 0, !1, {
                  fileName: "src/native/PreviewContent.tsx",
                  lineNumber: 119,
                  columnNumber: 11
                }),
                /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "previewRotateLeft", "Accessible.name": t("Girar \xE0 esquerda"), text: "\u21B6", enabled: supported, onClicked: () => angle.set((angle() + 270) % 360) }, void 0, !1, {
                  fileName: "src/native/PreviewContent.tsx",
                  lineNumber: 120,
                  columnNumber: 11
                }),
                /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "previewRotateRight", "Accessible.name": t("Girar \xE0 direita"), text: "\u21B7", enabled: supported, onClicked: () => angle.set((angle() + 90) % 360) }, void 0, !1, {
                  fileName: "src/native/PreviewContent.tsx",
                  lineNumber: 121,
                  columnNumber: 11
                })
              ]
            },
            void 0,
            !0,
            {
              fileName: "src/native/PreviewContent.tsx",
              lineNumber: 113,
              columnNumber: 9
            }
          ),
          /* @__PURE__ */ jsxDEV(
            QuietButton,
            {
              text: t("Abrir no app padr\xE3o"),
              "anchors.bottom": qmlExpression(scope, ($qml) => parent.bottom),
              "anchors.left": qmlExpression(scope, ($qml) => parent.left),
              onClicked: qmlHandler(scope, ($qml) => {
                $qml.root.opened();
              })
            },
            void 0,
            !1,
            {
              fileName: "src/native/PreviewContent.tsx",
              lineNumber: 123,
              columnNumber: 9
            }
          ),
          /* @__PURE__ */ jsxDEV(
            dms7.DankButton,
            {
              objectName: "previewClose",
              text: t("Fechar"),
              "anchors.bottom": qmlExpression(scope, ($qml) => parent.bottom),
              "anchors.right": qmlExpression(scope, ($qml) => parent.right),
              onClicked: qmlHandler(scope, ($qml) => {
                $qml.root.closed();
              })
            },
            void 0,
            !1,
            {
              fileName: "src/native/PreviewContent.tsx",
              lineNumber: 133,
              columnNumber: 9
            }
          ),
          props.children
        ]
      },
      void 0,
      !0,
      {
        fileName: "src/native/PreviewContent.tsx",
        lineNumber: 39,
        columnNumber: 7
      }
    );
  }
);

// src/native/ApplicationChooser.tsx
init_i18n2();
init_src();
var qml22 = importQml("QtQuick"), qt3 = importQml("QtQml"), dms8 = importQml("qs.DankCommon.Widgets"), controls10 = importQml("QtQuick.Controls"), ApplicationChooser = component(
  "ApplicationChooser",
  (props) => {
    props = {
      ...props,
      onChosen: props.onChosen ? qmlReadEvent(["selectedId"], props.onChosen) : void 0
    };
    let scope = createQmlScope({ ...props.qmlId ? { root: props.qmlId } : {}, app: "app" });
    scope.id("root"), scope.id("search");
    let query = signal(""), filtered = computed(() => {
      let apps = typeof props.applications == "function" ? props.applications() : props.applications ?? [], search = query().trim().toLocaleLowerCase();
      return apps.filter((app) => app.name.toLocaleLowerCase().includes(search)).sort((a, b) => +!!b.associated - +!!a.associated).map((app) => ({ ...app, category: t(app.associated ? "Associados ao tipo de arquivo" : "Todos os aplicativos") }));
    });
    return /* @__PURE__ */ jsxDEV(
      qml22.Column,
      {
        qmlImports: ["Quickshell", "qs.DankCommon.Common"],
        qmlId: scope.id("root"),
        qmlDeclarations: {
          applications: {
            type: "var",
            value: qmlExpression(scope, ($qml) => [])
          },
          selectedId: { type: "string", value: "" }
        },
        qmlSignals: { chosen: [] },
        width: 480,
        spacing: 12,
        ...props,
        children: [
          /* @__PURE__ */ jsxDEV(
            dms8.DankTextField,
            {
              qmlId: scope.id("search"),
              objectName: "chooserSearch",
              width: qmlExpression(scope, ($qml) => parent.width),
              placeholderText: t("Buscar aplicativo"),
              onTextEdited: qmlReadEvent(["text"], query.set)
            },
            void 0,
            !1,
            {
              fileName: "src/native/ApplicationChooser.tsx",
              lineNumber: 64,
              columnNumber: 9
            }
          ),
          /* @__PURE__ */ jsxDEV(
            qml22.ListView,
            {
              width: qmlExpression(scope, ($qml) => parent.width),
              height: 340,
              clip: !0,
              objectName: "chooserList",
              model: filtered,
              "section.property": "category",
              "section.delegate": /* @__PURE__ */ jsxDEV(
                qml22.Text,
                {
                  qmlDeclarations: {
                    section: { type: "string", required: !0 }
                  },
                  text: qmlExpression(scope, ($qml) => section),
                  width: 480,
                  topPadding: 10,
                  bottomPadding: 8,
                  color: qmlExpression(scope, ($qml) => Style.surfaceVariantText),
                  "font.pixelSize": 12
                },
                void 0,
                !1,
                {
                  fileName: "src/native/ApplicationChooser.tsx",
                  lineNumber: 80,
                  columnNumber: 15
                }
              ),
              "ScrollBar.vertical": /* @__PURE__ */ jsxDEV(controls10.ScrollBar, {}, void 0, !1, {
                fileName: "src/native/ApplicationChooser.tsx",
                lineNumber: 93,
                columnNumber: 39
              }),
              delegate: /* @__PURE__ */ jsxDEV(qt3.Component, { children: /* @__PURE__ */ jsxDEV(
                QuietButton,
                {
                  qmlDeclarations: {
                    modelData: { type: "var", required: !0 }
                  },
                  width: qmlExpression(scope, ($qml) => ListView.view.width),
                  text: qmlExpression(scope, ($qml) => modelData.name),
                  iconName: qmlExpression(
                    scope,
                    ($qml) => modelData.icon || "application-x-executable"
                  ),
                  onClicked: qmlHandler(scope, ($qml) => {
                    $qml.root.selectedId = modelData.id, $qml.root.chosen();
                  })
                },
                void 0,
                !1,
                {
                  fileName: "src/native/ApplicationChooser.tsx",
                  lineNumber: 95,
                  columnNumber: 27
                }
              ) }, void 0, !1, {
                fileName: "src/native/ApplicationChooser.tsx",
                lineNumber: 95,
                columnNumber: 13
              })
            },
            void 0,
            !1,
            {
              fileName: "src/native/ApplicationChooser.tsx",
              lineNumber: 71,
              columnNumber: 9
            }
          ),
          props.children
        ]
      },
      void 0,
      !0,
      {
        fileName: "src/native/ApplicationChooser.tsx",
        lineNumber: 49,
        columnNumber: 7
      }
    );
  }
);

// src/components/FileDialogs.tsx
var nativeLayouts2 = importQml("QtQuick.Layouts"), nativeControls = importQml("QtQuick.Controls"), nativeQuick5 = importQml("QtQuick"), nativeWidgets6 = importQml("qs.DankCommon.Widgets"), NameDialog = component("NameDialog", ({ manager: manager2 }) => {
  let name = signal("");
  return effect(() => {
    name.set(manager2.editRequest()?.name ?? "");
  }), /* @__PURE__ */ jsxDEV(
    Dialog,
    {
      objectName: "nameDialog",
      open: () => !!manager2.editRequest() && !["copy", "move"].includes(manager2.editRequest().kind),
      title: () => manager2.editRequest()?.kind === "copy" ? t("Copiar para\u2026") : manager2.editRequest()?.kind === "move" ? t("Mover para\u2026") : manager2.editRequest()?.kind === "rename" ? t("Renomear") : manager2.editRequest()?.kind === "folder" ? t("Nova pasta") : t("Novo arquivo"),
      initialFocus: "editName",
      closeOnEscape: () => !manager2.mutating(),
      onCloseRequest: manager2.cancelEdit,
      children: /* @__PURE__ */ jsxDEV(DialogBody, { open: () => !!manager2.editRequest() && !["copy", "move"].includes(manager2.editRequest().kind), children: /* @__PURE__ */ jsxDEV(nativeQuick5.Column, { width: 360, spacing: 12, children: [
        /* @__PURE__ */ jsxDEV(nativeWidgets6.StyledText, { text: () => ["copy", "move"].includes(manager2.editRequest()?.kind ?? "") ? t("Pasta de destino (caminho completo)") : t("Nome") }, void 0, !1, {
          fileName: "src/components/FileDialogs.tsx",
          lineNumber: 28,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(
          NativeTextField,
          {
            objectName: "editName",
            width: "fill",
            text: name,
            placeholderText: t("Nome"),
            enabled: () => !manager2.mutating(),
            onTextEdited: (text2) => name.set(text2),
            onAccepted: () => {
              manager2.submitEdit(name());
            }
          },
          void 0,
          !1,
          {
            fileName: "src/components/FileDialogs.tsx",
            lineNumber: 29,
            columnNumber: 7
          }
        ),
        /* @__PURE__ */ jsxDEV(nativeWidgets6.StyledText, { width: "fill", text: manager2.error }, void 0, !1, {
          fileName: "src/components/FileDialogs.tsx",
          lineNumber: 31,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(nativeLayouts2.RowLayout, { width: "fill", children: [
          /* @__PURE__ */ jsxDEV(nativeWidgets6.DankButton, { objectName: "editCancel", text: t("Cancelar"), enabled: () => !manager2.mutating(), onClicked: manager2.cancelEdit }, void 0, !1, {
            fileName: "src/components/FileDialogs.tsx",
            lineNumber: 33,
            columnNumber: 9
          }),
          /* @__PURE__ */ jsxDEV(nativeWidgets6.DankButton, { objectName: "editSave", text: () => manager2.mutating() ? t("Salvando\u2026") : t("Salvar"), enabled: () => !manager2.mutating(), onClicked: () => {
            manager2.submitEdit(name());
          } }, void 0, !1, {
            fileName: "src/components/FileDialogs.tsx",
            lineNumber: 34,
            columnNumber: 9
          })
        ] }, void 0, !0, {
          fileName: "src/components/FileDialogs.tsx",
          lineNumber: 32,
          columnNumber: 7
        })
      ] }, void 0, !0, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 27,
        columnNumber: 5
      }) }, void 0, !1, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 26,
        columnNumber: 5
      })
    },
    void 0,
    !1,
    {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 23,
      columnNumber: 10
    }
  );
}), DestinationDialog = component(
  "DestinationDialog",
  ({ manager: manager2 }) => /* @__PURE__ */ jsxDEV(
    Dialog,
    {
      objectName: "destinationDialog",
      open: () => !manager2.conflict() && ["copy", "move"].includes(manager2.editRequest()?.kind ?? ""),
      title: () => manager2.editRequest()?.kind === "move" ? t("Mover para\u2026") : t("Copiar para\u2026"),
      onCloseRequest: manager2.cancelEdit,
      children: /* @__PURE__ */ jsxDEV(DialogBody, { open: () => !manager2.conflict() && ["copy", "move"].includes(manager2.editRequest()?.kind ?? ""), children: /* @__PURE__ */ jsxDEV(nativeQuick5.Column, { width: 480, spacing: 10, children: [
        /* @__PURE__ */ jsxDEV(nativeWidgets6.StyledText, { width: "fill", text: manager2.destinationPath }, void 0, !1, {
          fileName: "src/components/FileDialogs.tsx",
          lineNumber: 45,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(QuietButton, { text: t("Pasta acima"), iconName: "go-up", enabled: () => !manager2.destinationBusy() && !manager2.mutating(), onClicked: () => {
          manager2.destinationUp();
        } }, void 0, !1, {
          fileName: "src/components/FileDialogs.tsx",
          lineNumber: 46,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(FolderList, { folders: manager2.destinationFolders, enabled: () => !manager2.destinationBusy() && !manager2.mutating(), onChosen: (target) => {
          manager2.browseDestination(target);
        } }, void 0, !1, {
          fileName: "src/components/FileDialogs.tsx",
          lineNumber: 47,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(nativeWidgets6.StyledText, { width: "fill", text: () => manager2.destinationBusy() ? t("Carregando pastas\u2026") : manager2.error() }, void 0, !1, {
          fileName: "src/components/FileDialogs.tsx",
          lineNumber: 48,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV(nativeLayouts2.RowLayout, { width: "fill", children: [
          /* @__PURE__ */ jsxDEV(nativeWidgets6.DankButton, { text: t("Cancelar"), enabled: () => !manager2.mutating(), onClicked: manager2.cancelEdit }, void 0, !1, {
            fileName: "src/components/FileDialogs.tsx",
            lineNumber: 50,
            columnNumber: 9
          }),
          /* @__PURE__ */ jsxDEV(nativeWidgets6.DankButton, { objectName: "destinationConfirm", text: t("Escolher esta pasta"), enabled: () => !manager2.destinationBusy() && !manager2.mutating(), onClicked: () => {
            manager2.confirmDestination();
          } }, void 0, !1, {
            fileName: "src/components/FileDialogs.tsx",
            lineNumber: 51,
            columnNumber: 9
          })
        ] }, void 0, !0, {
          fileName: "src/components/FileDialogs.tsx",
          lineNumber: 49,
          columnNumber: 7
        })
      ] }, void 0, !0, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 44,
        columnNumber: 5
      }) }, void 0, !1, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 43,
        columnNumber: 5
      })
    },
    void 0,
    !1,
    {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 41,
      columnNumber: 3
    }
  )
), ConflictDialog = component("ConflictDialog", ({ manager: manager2 }) => {
  let name = signal("");
  return effect(() => {
    name.set(manager2.conflict()?.destination.split("/").pop() ?? "");
  }), /* @__PURE__ */ jsxDEV(Dialog, { objectName: "conflictDialog", open: () => !!manager2.conflict(), title: t("J\xE1 existe um item com esse nome"), onCloseRequest: manager2.cancelConflict, children: /* @__PURE__ */ jsxDEV(DialogBody, { open: () => !!manager2.conflict(), children: /* @__PURE__ */ jsxDEV(nativeQuick5.Column, { width: 480, spacing: 12, children: [
    /* @__PURE__ */ jsxDEV(nativeWidgets6.StyledText, { width: "fill", text: () => manager2.conflict()?.destination ?? "" }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 63,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(nativeWidgets6.StyledText, { width: "fill", text: t("Voc\xEA pode escolher outro nome, ignorar este item ou substituir um arquivo comum.") }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 64,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(NativeTextField, { objectName: "conflictName", text: name, placeholderText: t("Novo nome"), enabled: () => !manager2.mutating(), onTextEdited: name.set }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 65,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(nativeWidgets6.StyledText, { width: "fill", text: manager2.error }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 66,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(nativeLayouts2.RowLayout, { width: "fill", children: [
      /* @__PURE__ */ jsxDEV(nativeWidgets6.DankButton, { text: t("Cancelar"), enabled: () => !manager2.mutating(), onClicked: manager2.cancelConflict }, void 0, !1, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 68,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(nativeWidgets6.DankButton, { text: t("Ignorar"), enabled: () => !manager2.mutating(), onClicked: () => {
        manager2.resolveConflict("skip");
      } }, void 0, !1, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 69,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(nativeWidgets6.DankButton, { objectName: "conflictRename", text: t("Renomear"), enabled: () => !manager2.mutating(), onClicked: () => {
        manager2.resolveConflict("rename", name());
      } }, void 0, !1, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 70,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(nativeWidgets6.DankButton, { text: t("Substituir"), enabled: () => !manager2.mutating(), onClicked: () => {
        manager2.resolveConflict("replace");
      } }, void 0, !1, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 71,
        columnNumber: 9
      })
    ] }, void 0, !0, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 67,
      columnNumber: 7
    })
  ] }, void 0, !0, {
    fileName: "src/components/FileDialogs.tsx",
    lineNumber: 62,
    columnNumber: 5
  }) }, void 0, !1, {
    fileName: "src/components/FileDialogs.tsx",
    lineNumber: 61,
    columnNumber: 5
  }) }, void 0, !1, {
    fileName: "src/components/FileDialogs.tsx",
    lineNumber: 60,
    columnNumber: 10
  });
}), PermissionsDialog = component("PermissionsDialog", ({ manager: manager2 }) => {
  let mode = signal(420);
  return effect(() => {
    manager2.permissionsTarget() && mode.set(parseInt(manager2.selectedDetails()?.permissions ?? "644", 8) & 511);
  }), /* @__PURE__ */ jsxDEV(Dialog, { objectName: "permissionsDialog", open: () => !!manager2.permissionsTarget(), title: t("Editar permiss\xF5es"), onCloseRequest: manager2.closePermissions, children: /* @__PURE__ */ jsxDEV(DialogBody, { open: () => !!manager2.permissionsTarget(), children: /* @__PURE__ */ jsxDEV(nativeQuick5.Column, { width: 440, spacing: 12, children: [
    /* @__PURE__ */ jsxDEV(nativeWidgets6.StyledText, { width: "fill", text: () => manager2.permissionsTarget()?.name ?? "" }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 83,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(PermissionEditor, { objectName: "permissionsEditor", mode, enabled: () => !manager2.mutating(), onModeChanged: mode.set }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 84,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(nativeWidgets6.StyledText, { width: "fill", text: manager2.error }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 85,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(nativeLayouts2.RowLayout, { width: "fill", children: [
      /* @__PURE__ */ jsxDEV(QuietButton, { text: t("Cancelar"), enabled: () => !manager2.mutating(), onClicked: manager2.closePermissions }, void 0, !1, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 86,
        columnNumber: 45
      }),
      /* @__PURE__ */ jsxDEV(nativeWidgets6.DankButton, { objectName: "permissionsSave", text: t("Salvar"), enabled: () => !manager2.mutating(), onClicked: () => {
        manager2.savePermissions(mode());
      } }, void 0, !1, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 86,
        columnNumber: 152
      })
    ] }, void 0, !0, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 86,
      columnNumber: 7
    })
  ] }, void 0, !0, {
    fileName: "src/components/FileDialogs.tsx",
    lineNumber: 82,
    columnNumber: 5
  }) }, void 0, !1, {
    fileName: "src/components/FileDialogs.tsx",
    lineNumber: 81,
    columnNumber: 5
  }) }, void 0, !1, {
    fileName: "src/components/FileDialogs.tsx",
    lineNumber: 80,
    columnNumber: 10
  });
}), dialogScope = createQmlScope(), PreviewDialog = component(
  "PreviewDialog",
  ({ manager: manager2 }) => /* @__PURE__ */ jsxDEV(Dialog, { objectName: "previewDialog", open: manager2.previewOpen, title: () => manager2.selected()?.name ?? t("Pr\xE9-visualiza\xE7\xE3o"), onCloseRequest: manager2.closePreview, children: /* @__PURE__ */ jsxDEV(PreviewContent, { source: manager2.previewSource, kind: manager2.selectedPreviewKind, onClosed: manager2.closePreview, onOpened: () => {
    let file = manager2.selected();
    file && manager2.open(file.path);
  } }, void 0, !1, {
    fileName: "src/components/FileDialogs.tsx",
    lineNumber: 95,
    columnNumber: 5
  }) }, void 0, !1, {
    fileName: "src/components/FileDialogs.tsx",
    lineNumber: 94,
    columnNumber: 3
  })
), FileDialogs = component(
  "FileDialogs",
  ({ manager: manager2 }) => /* @__PURE__ */ jsxDEV(qml.Item, { children: [
    /* @__PURE__ */ jsxDEV(NameDialog, { manager: manager2 }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 99,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(DestinationDialog, { manager: manager2 }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 99,
      columnNumber: 45
    }),
    /* @__PURE__ */ jsxDEV(ConflictDialog, { manager: manager2 }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 99,
      columnNumber: 84
    }),
    /* @__PURE__ */ jsxDEV(FolderAppearanceDialog, { manager: manager2 }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 99,
      columnNumber: 120
    }),
    /* @__PURE__ */ jsxDEV(PermissionsDialog, { manager: manager2 }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 99,
      columnNumber: 164
    }),
    /* @__PURE__ */ jsxDEV(PreviewDialog, { manager: manager2 }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 99,
      columnNumber: 203
    }),
    /* @__PURE__ */ jsxDEV(Dialog, { objectName: "preferencesDialog", open: manager2.preferencesOpen, title: t("Prefer\xEAncias"), onCloseRequest: manager2.closePreferences, children: /* @__PURE__ */ jsxDEV(DialogBody, { open: manager2.preferencesOpen, children: /* @__PURE__ */ jsxDEV(nativeQuick5.Column, { width: 520, spacing: 12, children: [
      /* @__PURE__ */ jsxDEV(
        nativeControls.ScrollView,
        {
          objectName: "preferencesScroll",
          width: 520,
          height: qmlExpression(dialogScope, () => Math.max(180, Math.min(620, (ApplicationWindow.window ? ApplicationWindow.window.height : 800) - 180))),
          clip: !0,
          children: /* @__PURE__ */ jsxDEV(PreferencesContent, { preferences: manager2.preferences, onChanged: manager2.setPreference }, void 0, !1, {
            fileName: "src/components/FileDialogs.tsx",
            lineNumber: 105,
            columnNumber: 11
          })
        },
        void 0,
        !1,
        {
          fileName: "src/components/FileDialogs.tsx",
          lineNumber: 103,
          columnNumber: 9
        }
      ),
      /* @__PURE__ */ jsxDEV(nativeWidgets6.DankButton, { objectName: "preferencesClose", text: t("Fechar"), onClicked: manager2.closePreferences }, void 0, !1, {
        fileName: "src/components/FileDialogs.tsx",
        lineNumber: 107,
        columnNumber: 9
      })
    ] }, void 0, !0, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 102,
      columnNumber: 7
    }) }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 101,
      columnNumber: 7
    }) }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 100,
      columnNumber: 5
    }),
    /* @__PURE__ */ jsxDEV(Dialog, { objectName: "chooserDialog", open: manager2.chooserOpen, title: t("Escolher aplicativo"), onCloseRequest: manager2.closeChooser, children: /* @__PURE__ */ jsxDEV(ApplicationChooser, { objectName: "applicationChooser", applications: manager2.applications, onChosen: (id) => {
      manager2.launchApplication(id);
    }, children: /* @__PURE__ */ jsxDEV(QuietButton, { objectName: "chooserClose", text: t("Fechar"), onClicked: manager2.closeChooser }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 112,
      columnNumber: 158
    }) }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 112,
      columnNumber: 7
    }) }, void 0, !1, {
      fileName: "src/components/FileDialogs.tsx",
      lineNumber: 111,
      columnNumber: 5
    })
  ] }, void 0, !0, {
    fileName: "src/components/FileDialogs.tsx",
    lineNumber: 99,
    columnNumber: 3
  })
);

// src/app.tsx
var qml23 = importQml("QtQuick");
function App({ manager: manager2 }) {
  return {
    toolbar: /* @__PURE__ */ jsxDEV(Toolbar, { manager: manager2 }, void 0, !1, {
      fileName: "src/app.tsx",
      lineNumber: 13,
      columnNumber: 14
    }, this),
    sidebar: /* @__PURE__ */ jsxDEV(Sidebar, { manager: manager2 }, void 0, !1, {
      fileName: "src/app.tsx",
      lineNumber: 14,
      columnNumber: 14
    }, this),
    details: /* @__PURE__ */ jsxDEV(DetailsPanel, { manager: manager2 }, void 0, !1, {
      fileName: "src/app.tsx",
      lineNumber: 15,
      columnNumber: 14
    }, this),
    dialogs: /* @__PURE__ */ jsxDEV(qml23.Item, { children: [
      /* @__PURE__ */ jsxDEV(FileDialogs, { manager: manager2 }, void 0, !1, {
        fileName: "src/app.tsx",
        lineNumber: 16,
        columnNumber: 24
      }, this),
      /* @__PURE__ */ jsxDEV(FileToolsDialog, { manager: manager2 }, void 0, !1, {
        fileName: "src/app.tsx",
        lineNumber: 16,
        columnNumber: 57
      }, this)
    ] }, void 0, !0, {
      fileName: "src/app.tsx",
      lineNumber: 16,
      columnNumber: 14
    }, this)
  };
}

// src/infrastructure/search.ts
import { readdir as readdir3, lstat as lstat3 } from "node:fs/promises";
import { join as join4 } from "node:path";

// src/infrastructure/filesystem.ts
init_i18n2();
import { readdir as readdir2, stat, readFile as readFile2, realpath as realpath3 } from "node:fs/promises";
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { join as join3, dirname as dirname3, basename as basename3, extname } from "node:path";
import { execFile as execFile2 } from "node:child_process";
import { promisify as promisify2 } from "node:util";
var exec2 = promisify2(execFile2);
function entryIcon(name, directory) {
  if (directory) return { Downloads: "folder-download", Documentos: "folder-documents", Documents: "folder-documents", Imagens: "folder-pictures", Pictures: "folder-pictures", M\u00FAsicas: "folder-music", Music: "folder-music", V\u00EDdeos: "folder-videos", Videos: "folder-videos", "\xC1rea de trabalho": "user-desktop", Desktop: "user-desktop" }[name] ?? "folder";
  let extension2 = extname(name).toLowerCase();
  return [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].includes(extension2) ? "image-x-generic" : previewKind(name) === "video" ? "video-x-generic" : [".mp3", ".flac", ".ogg", ".wav"].includes(extension2) ? "audio-x-generic" : [".zip", ".tar", ".gz", ".7z", ".rar"].includes(extension2) ? "package-x-generic" : extension2 === ".pdf" ? "application-pdf" : "text-x-generic";
}
async function listDirectory(path3) {
  let children = await readdir2(path3, { withFileTypes: !0 }), entries = [], index2 = 0;
  return await Promise.all(Array.from({ length: Math.min(16, children.length) }, async () => {
    for (; index2 < children.length; ) {
      let child = children[index2++], childPath = join3(path3, child.name);
      try {
        let info = await stat(childPath);
        entries.push({ name: child.name, path: childPath, directory: info.isDirectory(), symlink: child.isSymbolicLink(), size: info.size, modified: info.mtimeMs, icon: entryIcon(child.name, info.isDirectory()) });
      } catch {
        entries.push({ name: child.name, path: childPath, directory: child.isDirectory(), symlink: child.isSymbolicLink(), size: 0, modified: 0, icon: entryIcon(child.name, child.isDirectory()) });
      }
    }
  })), entries;
}
function parseDrives(data) {
  let places = [];
  function walk(nodes) {
    if (Array.isArray(nodes))
      for (let raw of nodes) {
        if (!raw || typeof raw != "object") continue;
        let node2 = raw, mounts = Array.isArray(node2.mountpoints) ? node2.mountpoints.filter((path3) => typeof path3 == "string" && path3.startsWith("/")) : [];
        if (node2.fstype && !["swap", "squashfs"].includes(String(node2.fstype)) && ["disk", "part", "crypt", "lvm"].includes(String(node2.type)))
          if (mounts.length) for (let path3 of mounts.filter((path4) => !["/boot", "/boot/efi", "/efi"].includes(path4.replace(/\/+$/, "")))) places.push({ id: `${node2.name}:${path3}`, device: String(node2.path || "/dev/" + node2.name), name: String(node2.label || node2.name) + ` (${path3})`, path: path3, mounted: !0 });
          else places.push({ id: `${node2.name}:unmounted`, device: String(node2.path || "/dev/" + node2.name), name: String(node2.label || node2.name), path: "", mounted: !1 });
        walk(node2.children);
      }
  }
  return walk(data?.blockdevices), [...new Map(places.map((place) => [place.id, place])).values()];
}
async function discoverDrives() {
  let { stdout } = await exec2("lsblk", ["--json", "--output", "NAME,PATH,LABEL,FSTYPE,TYPE,MOUNTPOINTS"], { timeout: 5e3, maxBuffer: 1048576 });
  return parseDrives(JSON.parse(stdout));
}
async function discoverGames(home3) {
  let groups = [], seen = /* @__PURE__ */ new Set(), add = async (places, name, path3) => {
    try {
      if (!(await stat(path3)).isDirectory()) return;
      let resolved = await realpath3(path3);
      if (seen.has(resolved)) return;
      seen.add(resolved), places.push({ name, path: path3 });
    } catch {
    }
  }, steam = [], roots = [join3(home3, ".local/share/Steam"), join3(home3, ".steam/steam"), join3(home3, ".var/app/com.valvesoftware.Steam/.local/share/Steam")];
  for (let root of roots) {
    let libraries = [root];
    try {
      let vdf = await readFile2(join3(root, "steamapps/libraryfolders.vdf"), "utf8");
      for (let match of vdf.matchAll(/"path"\s+"((?:\\.|[^"\\])*)"/g)) libraries.push(match[1].replace(/\\\\/g, "\\").replace(/\\"/g, '"'));
    } catch {
    }
    for (let library of libraries)
      await add(steam, t("Biblioteca \xB7 {name}", { name: basename3(library) }), join3(library, "steamapps/common")), await add(steam, `Proton \xB7 ${basename3(library)}`, join3(library, "steamapps/compatdata"));
  }
  steam.length && groups.push({ name: "Steam / Proton", places: steam });
  let heroic = [];
  for (let root of [join3(home3, ".config/heroic"), join3(home3, ".var/app/com.heroicgameslauncher.hgl/config/heroic")]) {
    await add(heroic, t("Configura\xE7\xF5es"), root);
    let titles = /* @__PURE__ */ new Map();
    for (let file of ["store_cache/legendary_library.json", "store_cache/gog_library.json", "store_cache/nile_library.json", "legendaryConfig/legendary/installed.json"])
      try {
        let data = JSON.parse(await readFile2(join3(root, file), "utf8")), rows = Array.isArray(data.library) ? data.library : Array.isArray(data) ? data : Object.values(data);
        for (let row of rows) if (row && typeof row == "object") {
          let id = row.app_name ?? row.appName ?? row.id, title = row.title ?? row.name;
          typeof id == "string" && typeof title == "string" && titles.set(id, title);
        }
      } catch {
      }
    try {
      for (let filename of await readdir2(join3(root, "GamesConfig")))
        if (filename.endsWith(".json"))
          try {
            let config = JSON.parse(await readFile2(join3(root, "GamesConfig", filename), "utf8"));
            for (let game of Object.values(config)) game && typeof game == "object" && typeof game.winePrefix == "string" && await add(heroic, t("Prefixo \xB7 {name}", { name: titles.get(filename.replace(/\.json$/, "")) ?? (typeof game.title == "string" ? game.title : basename3(game.winePrefix)) }), game.winePrefix);
          } catch {
          }
    } catch {
    }
  }
  await add(heroic, t("Jogos"), join3(home3, "Games/Heroic")), heroic.length && groups.push({ name: "Heroic", places: heroic });
  let lutris = [];
  for (let root of [join3(home3, ".config/lutris"), join3(home3, ".var/app/net.lutris.Lutris/config/lutris")]) {
    await add(lutris, t("Configura\xE7\xF5es"), root);
    try {
      for (let filename of await readdir2(join3(root, "games"))) {
        if (!/\.ya?ml$/.test(filename)) continue;
        let match = (await readFile2(join3(root, "games", filename), "utf8")).match(/^\s*prefix:\s*(.+)$/m);
        match && await add(lutris, t("Prefixo \xB7 {name}", { name: filename.replace(/\.ya?ml$/, "") }), match[1].trim().replace(/^['"]|['"]$/g, ""));
      }
    } catch {
    }
  }
  return await add(lutris, t("Jogos"), join3(home3, "Games")), lutris.length && groups.push({ name: "Lutris", places: lutris }), groups;
}
async function discoverPlaces(home3, config = join3(process.env.XDG_CONFIG_HOME || join3(home3, ".config"), "user-dirs.dirs")) {
  for (let bookmarks of [join3(dirname3(config), "gtk-3.0/bookmarks"), join3(home3, ".gtk-bookmarks")])
    try {
      let saved = await readFile2(bookmarks, "utf8"), result = [], seen2 = /* @__PURE__ */ new Set();
      for (let line of saved.split(`
`)) {
        let match = line.match(/^(\S+)(?:\s+(.*))?$/);
        if (match)
          try {
            let path3 = fileURLToPath2(match[1]);
            if (seen2.has(path3) || path3 === home3 || !(await stat(path3)).isDirectory()) continue;
            seen2.add(path3), result.push({ id: path3, path: path3, name: match[2]?.trim() || basename3(path3), icon: entryIcon(basename3(path3), !0) });
          } catch {
          }
      }
      return result;
    } catch {
    }
  let text2 = "";
  try {
    text2 = await readFile2(config, "utf8");
  } catch {
  }
  let labels = { DESKTOP: ["\xC1rea de trabalho", "user-desktop"], DOWNLOAD: ["Downloads", "folder-download"], DOCUMENTS: ["Documentos", "folder-documents"], PICTURES: ["Imagens", "folder-pictures"], MUSIC: ["M\xFAsicas", "folder-music"], VIDEOS: ["V\xEDdeos", "folder-videos"], PROJECTS: ["Projetos", "folder-development"] }, places = [], seen = /* @__PURE__ */ new Set([home3]);
  for (let match of text2.matchAll(/^XDG_([A-Z]+)_DIR="((?:\\.|[^"\\])*)"\s*$/gm)) {
    let label = labels[match[1]];
    if (!label) continue;
    let path3 = match[2].replace(/\\([\\"$`])/g, "$1");
    if (path3 = path3.replace(/^\$HOME(?=\/|$)/, () => home3), !(!path3.startsWith("/") || seen.has(path3))) {
      try {
        if (!(await stat(path3)).isDirectory()) continue;
      } catch {
        continue;
      }
      seen.add(path3), places.push({ id: match[1], name: t(label[0]), icon: label[1], path: path3 });
    }
  }
  return places;
}

// src/infrastructure/search.ts
var SEARCH_RESULT_LIMIT = 1e4;
async function searchFiles(root, query, options = {}) {
  let result = [], wanted = query.toLowerCase();
  async function visit(path3, first = !1) {
    options.signal?.throwIfAborted();
    let children = await readdir3(path3, { withFileTypes: !0 }).catch((error) => {
      if (first) throw error;
      return [];
    });
    for (let child of children) {
      if (options.signal?.throwIfAborted(), result.length >= SEARCH_RESULT_LIMIT) return;
      if (!options.hidden && child.name.startsWith(".")) continue;
      let target = join4(path3, child.name);
      if (child.name.toLowerCase().includes(wanted)) try {
        let info = await lstat3(target);
        result.push({ path: target, name: child.name, directory: info.isDirectory(), symlink: info.isSymbolicLink(), size: info.size, modified: info.mtimeMs, icon: entryIcon(child.name, info.isDirectory()) });
      } catch {
      }
      child.isDirectory() && await visit(target);
    }
  }
  return await visit(root, !0), result;
}

// src/infrastructure/nodeServices.ts
init_fileOperations();
import { watch } from "node:fs";

// src/infrastructure/videoThumbnail.ts
import { mkdir as mkdir3, mkdtemp as mkdtemp2, stat as stat2, access, rename, rm as rm3 } from "node:fs/promises";
import { execFile as execFile3 } from "node:child_process";
import { promisify as promisify3 } from "node:util";
import { createHash } from "node:crypto";
import { join as join5 } from "node:path";
import { homedir } from "node:os";
import { pathToFileURL as pathToFileURL2 } from "node:url";
var exec3 = promisify3(execFile3), pending = /* @__PURE__ */ new Map(), running = 0, waiting = [];
function videoThumbnail(path3) {
  let existing = pending.get(path3);
  if (existing) return existing;
  let task = create(path3).catch(() => "").finally(() => {
    pending.delete(path3);
  });
  return pending.set(path3, task), task;
}
async function create(path3) {
  running >= 2 ? await new Promise((resolve4) => waiting.push(resolve4)) : running++;
  let temporary;
  try {
    let info = await stat2(path3);
    if (!info.isFile()) return "";
    let cache = join5(process.env.XDG_CACHE_HOME || join5(homedir(), ".cache"), "nandomo", "video-thumbnails"), key = createHash("sha256").update(JSON.stringify([path3, info.size, info.mtimeMs])).digest("hex"), target = join5(cache, key + ".png");
    try {
      return await access(target), pathToFileURL2(target).href;
    } catch {
    }
    await mkdir3(cache, { recursive: !0 }), temporary = await mkdtemp2(join5(cache, ".pending-"));
    let image = join5(temporary, "frame.png");
    await exec3("ffmpegthumbnailer", ["-i", path3, "-o", image, "-s", "384", "-q", "8", "-t", "10%"], { timeout: 1e4, maxBuffer: 64 * 1024 });
    let after = await stat2(path3);
    return after.size !== info.size || after.mtimeMs !== info.mtimeMs ? "" : (await rename(image, target), pathToFileURL2(target).href);
  } finally {
    try {
      temporary && await rm3(temporary, { recursive: !0, force: !0 });
    } finally {
      let next = waiting.shift();
      next ? next() : running--;
    }
  }
}

// src/infrastructure/bookmarks.ts
import { readFile as readFile3, mkdir as mkdir4, writeFile, rename as rename2, stat as stat3 } from "node:fs/promises";
import { join as join6, dirname as dirname4 } from "node:path";
import { pathToFileURL as pathToFileURL3, fileURLToPath as fileURLToPath3 } from "node:url";
var pending2 = Promise.resolve();
function updateBookmark(home3, path3, remove = !1) {
  return pending2 = pending2.catch(() => {
  }).then(async () => {
    if (!remove && !(await stat3(path3)).isDirectory()) throw new Error("Escolha uma pasta.");
    let config = process.env.XDG_CONFIG_HOME || join6(home3, ".config"), target = join6(config, "gtk-3.0/bookmarks"), contents;
    try {
      contents = await readFile3(target, "utf8");
    } catch {
      try {
        target = join6(home3, ".gtk-bookmarks"), contents = await readFile3(target, "utf8");
      } catch {
        target = join6(config, "gtk-3.0/bookmarks"), contents = (await discoverPlaces(home3)).map((place) => pathToFileURL3(place.path).href + " " + place.name).join(`
`);
      }
    }
    let lines = contents.split(`
`).filter((line) => {
      if (!line) return !1;
      try {
        return fileURLToPath3(line.split(/\s/)[0]) !== path3;
      } catch {
        return !0;
      }
    });
    remove || lines.push(pathToFileURL3(path3).href), await mkdir4(dirname4(target), { recursive: !0 });
    let temp = target + `.${process.pid}.tmp`;
    await writeFile(temp, lines.join(`
`) + `
`), await rename2(temp, target);
  }), pending2;
}

// src/infrastructure/mountPolicy.ts
import { readFile as readFile4 } from "node:fs/promises";
function isRemoteMount(path3, mountinfo) {
  let decode = (value2) => value2.replace(/\\([0-7]{3})/g, (_, octal) => String.fromCharCode(parseInt(octal, 8))), longest = -1, remote = !1;
  for (let line of mountinfo.split(`
`)) {
    let [record, kind2] = line.split(" - "), target = decode(record?.split(" ")[4] ?? "");
    !target || !(path3 === target || path3.startsWith(target === "/" ? "/" : target + "/")) || target.length <= longest || (longest = target.length, remote = /^(fuse\.|nfs|cifs|smb|davfs|9p)/.test(kind2 ?? ""));
  }
  return remote;
}
async function remotePath(path3) {
  return isRemoteMount(path3, await readFile4("/proc/self/mountinfo", "utf8"));
}

// src/infrastructure/nodeServices.ts
import { dirname as dirname5, resolve as resolve3, join as join7 } from "node:path";
import { spawn as spawn2, execFile as execFile4 } from "node:child_process";
import { mkdir as mkdir5, writeFile as writeFile2, lstat as lstat4, readdir as readdir4, copyFile, chmod as chmod2, readFile as readFile5, mkdtemp as mkdtemp3, rename as rename3, unlink as unlink2, rm as rm4, statfs } from "node:fs/promises";
import { constants } from "node:fs";
import { pathToFileURL as pathToFileURL4, fileURLToPath as fileURLToPath4 } from "node:url";
import { promisify as promisify4 } from "node:util";
async function statfsUsage(paths) {
  let usage = {};
  return await Promise.all(paths.map(async (path3) => {
    try {
      let info = await statfs(path3, { bigint: !0 }), total = Number(info.blocks) * Number(info.bsize), free = Number(info.bavail) * Number(info.bsize);
      if (!Number.isFinite(total) || total <= 0) return;
      usage[path3] = { used: Math.max(0, total - free), total };
    } catch {
    }
  })), usage;
}
var nodeFiles = {
  videoThumbnail,
  search: searchFiles,
  list: listDirectory,
  async trash(path3) {
    await promisify4(execFile4)("gio", ["trash", "--", path3]);
  },
  remote: remotePath,
  async setPermissions(path3, mode) {
    if (!Number.isInteger(mode) || mode < 0 || mode > 511) throw new Error("Permiss\xF5es inv\xE1lidas.");
    let info = await lstat4(path3);
    if (info.isSymbolicLink()) throw new Error("Abra o arquivo original para editar permiss\xF5es.");
    await chmod2(path3, info.mode & 3584 | mode);
  },
  async details(path3) {
    let info = await lstat4(path3), children = info.isDirectory() ? await readdir4(path3, { withFileTypes: !0 }) : void 0;
    return { permissions: (info.mode & 4095).toString(8), owner: (await readFile5("/etc/passwd", "utf8").catch(() => "")).split(`
`).find((line) => line.split(":")[2] === String(info.uid))?.split(":")[0] || String(info.uid), items: children?.length, folders: children?.filter((child) => child.isDirectory()).length };
  },
  resolve: resolve3,
  parent: dirname5,
  child: join7,
  fromUrl: fileURLToPath4,
  url: (path3) => pathToFileURL4(path3).href,
  async exists(path3) {
    try {
      return await lstat4(path3), !0;
    } catch (error) {
      if (error.code === "ENOENT") return !1;
      throw error;
    }
  },
  async replaceFile(source, destination, mode) {
    if (source === destination) throw new Error("Origem e destino s\xE3o iguais.");
    let from = await lstat4(source), to = await lstat4(destination);
    if (!from.isFile() || !to.isFile()) throw new Error("Substitui\xE7\xE3o dispon\xEDvel somente entre arquivos comuns. Renomeie pastas ou links.");
    let temporary = await mkdtemp3(join7(dirname5(destination), ".nandomo-replace-"));
    try {
      let staged = join7(temporary, "content");
      await copyFile(source, staged, constants.COPYFILE_EXCL);
      let current = await lstat4(destination);
      if (current.dev !== to.dev || current.ino !== to.ino || current.mtimeMs !== to.mtimeMs || current.size !== to.size) throw new Error("O destino mudou. Tente novamente.");
      if (await rename3(staged, destination), mode === "move") {
        let remaining = await lstat4(source);
        if (remaining.dev !== from.dev || remaining.ino !== from.ino || remaining.mtimeMs !== from.mtimeMs || remaining.size !== from.size) throw new Error("O destino foi copiado, mas a origem mudou e foi preservada.");
        await unlink2(source);
      }
    } finally {
      await rm4(temporary, { recursive: !0, force: !0 });
    }
  },
  async create(path3, kind2) {
    kind2 === "folder" ? await mkdir5(path3) : await writeFile2(path3, "", { flag: "wx" });
  },
  transfer: transferFile,
  rename: moveNoClobber,
  renameMany,
  archive: createArchive,
  extract: extractArchive,
  watch(path3, changed) {
    let timer;
    try {
      let watcher = watch(path3, () => {
        clearTimeout(timer), timer = setTimeout(changed, 180);
      });
      return watcher.on("error", () => {
        watcher.close();
      }), () => {
        clearTimeout(timer), watcher.close();
      };
    } catch {
      return () => {
      };
    }
  },
  open(path3) {
    return new Promise((done, reject) => {
      let child = spawn2("xdg-open", [path3], { stdio: "ignore" });
      child.once("error", reject), child.once("exit", (code) => code === 0 ? done() : reject(new Error("N\xE3o foi poss\xEDvel abrir o arquivo.")));
    });
  }
}, nodeLocations = { bookmark: updateBookmark, volumeAction: async (action, place) => {
  if (!place.device?.startsWith("/dev/")) throw new Error("Dispositivo indispon\xEDvel.");
  await promisify4(execFile4)("udisksctl", [action, "-b", place.device]);
}, volumeUsage: statfsUsage, volumes: discoverDrives, games: discoverGames, places: discoverPlaces };

// src/infrastructure/dmsDesktop.ts
import { readFile as readFile10 } from "node:fs/promises";
import { watch as watch2 } from "node:fs";
import { dirname as dirname6, join as join12 } from "node:path";

// src/infrastructure/iconCatalog.ts
import { readFile as readFile6, readdir as readdir5 } from "node:fs/promises";
import { join as join8, basename as basename4 } from "node:path";
import { pathToFileURL as pathToFileURL5 } from "node:url";
async function discoverIconCatalog(home3) {
  let theme = "Adwaita";
  try {
    theme = JSON.parse(await readFile6(join8(process.env.XDG_CONFIG_HOME || join8(home3, ".config"), "DankMaterialShell/settings.json"), "utf8")).iconThemeDark || theme;
  } catch {
  }
  let roots = [join8(home3, ".icons"), join8(process.env.XDG_DATA_HOME || join8(home3, ".local/share"), "icons"), ...(process.env.XDG_DATA_DIRS || "/usr/local/share:/usr/share").split(":").map((root) => join8(root, "icons"))], emblems = /* @__PURE__ */ new Map(), logos = /* @__PURE__ */ new Map();
  for (let name of [.../* @__PURE__ */ new Set([theme, "Adwaita", "hicolor"])].filter((name2) => /^[\w .-]+$/.test(name2)))
    for (let root of roots) {
      let ini = "";
      try {
        ini = await readFile6(join8(root, name, "index.theme"), "utf8");
      } catch {
        continue;
      }
      let directories = [...ini.matchAll(/^(?:ScaledDirectories|Directories)=(.+)$/gm)].flatMap((match) => match[1].trim().split(",")).filter((dir) => !dir.startsWith("/") && !dir.split("/").includes("..") && /(?:emblems|apps|places)/.test(dir));
      directories.sort((a, b) => (b.includes("scalable") ? 1e3 : parseInt(b) || 0) - (a.includes("scalable") ? 1e3 : parseInt(a) || 0));
      for (let directory of directories) {
        let files = [];
        try {
          files = await readdir5(join8(root, name, directory));
        } catch {
        }
        for (let file of files) {
          if (!/\.(svg|png)$/i.test(file)) continue;
          let id = basename4(file).replace(/\.(svg|png)$/i, ""), map = id.startsWith("emblem-") ? emblems : logos;
          map.has(id) || map.size >= 1500 || map.set(id, { name: id, source: pathToFileURL5(join8(root, name, directory, file)).href });
        }
      }
    }
  return { emblems: [...emblems.values()].sort((a, b) => a.name.localeCompare(b.name)), logos: [...logos.values()].sort((a, b) => a.name.localeCompare(b.name)) };
}

// src/infrastructure/desktopActions.ts
import { readFile as readFile8, writeFile as writeFile3, mkdir as mkdir6, rename as rename4, readdir as readdir7 } from "node:fs/promises";
import { pathToFileURL as pathToFileURL6 } from "node:url";
import { join as join10, basename as basename6 } from "node:path";
import { execFile as execFile6, spawn as spawn3 } from "node:child_process";
import { promisify as promisify6 } from "node:util";

// src/infrastructure/virtualLocations.ts
import { readdir as readdir6, readFile as readFile7, stat as stat4 } from "node:fs/promises";
import { join as join9, basename as basename5 } from "node:path";
import { fileURLToPath as fileURLToPath5 } from "node:url";
import { execFile as execFile5 } from "node:child_process";
import { promisify as promisify5 } from "node:util";
var exec4 = promisify5(execFile5);
async function entry(path3, name = basename5(path3)) {
  try {
    let info = await stat4(path3);
    return { path: path3, name, directory: info.isDirectory(), symlink: !1, size: info.size, modified: info.mtimeMs, icon: entryIcon(name, info.isDirectory()) };
  } catch {
    return null;
  }
}
function virtualLocations(home3) {
  let data = process.env.XDG_DATA_HOME || join9(home3, ".local/share");
  return async function(uri) {
    if (uri === "recent:///") {
      let script = `import sys,json,xml.etree.ElementTree as ET
try:
 root=ET.parse(sys.argv[1]).getroot()
 print(json.dumps([{ "url":b.get("href"),"modified":b.get("modified","") } for b in root.findall("bookmark")]))
except FileNotFoundError:
 print("[]")`, { stdout } = await exec4("python3", ["-c", script, join9(data, "recently-used.xbel")], { timeout: 5e3, maxBuffer: 8388608 }), records = JSON.parse(stdout), result = await Promise.all(records.filter((record) => record.url?.startsWith("file://")).map(async (record) => {
        try {
          let item2 = await entry(fileURLToPath5(record.url));
          return item2 && (item2.modified = Date.parse(record.modified) || item2.modified), item2;
        } catch {
          return null;
        }
      }));
      return [...new Map(result.filter((item2) => !!item2).map((item2) => [item2.path, item2])).values()].sort((a, b) => b.modified - a.modified);
    }
    if (uri === "trash:///") {
      let roots = /* @__PURE__ */ new Set([join9(data, "Trash")]);
      for (let volume of await discoverDrives().catch(() => [])) volume.mounted && volume.path !== "/" && (roots.add(join9(volume.path, `.Trash-${process.getuid?.()}`)), roots.add(join9(volume.path, ".Trash", String(process.getuid?.()))));
      let result = [];
      for (let root of roots) {
        let names2;
        try {
          names2 = await readdir6(join9(root, "files"));
        } catch {
          continue;
        }
        for (let name of names2) {
          let display = name;
          try {
            let text2 = await readFile7(join9(root, "info", name + ".trashinfo"), "utf8"), original = /^Path=(.*)$/m.exec(text2)?.[1];
            original && (display = basename5(decodeURIComponent(original)));
          } catch {
          }
          let item2 = await entry(join9(root, "files", name), display);
          item2 && result.push(item2);
        }
      }
      return result;
    }
    throw new Error("Local virtual desconhecido.");
  };
}

// src/infrastructure/desktopActions.ts
var exec5 = promisify6(execFile6);
function desktopActions(home3) {
  let config = process.env.NANDOMO_FM_CONFIG_DIR || join10(process.env.XDG_CONFIG_HOME || join10(home3, ".config"), "nandomo-file-manager"), pending3 = Promise.resolve();
  return {
    iconCatalog: () => discoverIconCatalog(home3),
    virtualEntries: virtualLocations(home3),
    async readFolderAppearances() {
      try {
        let data = JSON.parse(await readFile8(join10(config, "folders.json"), "utf8"));
        return Object.fromEntries(Object.entries(data).filter(([path3]) => path3.startsWith("/")).map(([path3, value2]) => [path3, normalizeFolderAppearance(value2 || {})]));
      } catch {
        return {};
      }
    },
    writeFolderAppearances(value2) {
      return pending3 = pending3.catch(() => {
      }).then(async () => {
        await mkdir6(config, { recursive: !0 });
        let temp = join10(config, `folders.json.${process.pid}.tmp`);
        await writeFile3(temp, JSON.stringify(value2, null, 2) + `
`), await rename4(temp, join10(config, "folders.json"));
      }), pending3;
    },
    async readPreferences() {
      try {
        return normalizePreferences(JSON.parse(await readFile8(join10(config, "preferences.json"), "utf8")));
      } catch {
        return normalizePreferences(null);
      }
    },
    writePreferences(value2) {
      return pending3 = pending3.catch(() => {
      }).then(async () => {
        await mkdir6(config, { recursive: !0 });
        let temp = join10(config, `preferences.json.${process.pid}.tmp`);
        await writeFile3(temp, JSON.stringify(normalizePreferences(value2), null, 2) + `
`), await rename4(temp, join10(config, "preferences.json"));
      }), pending3;
    },
    async applications(target) {
      let hidden = [];
      try {
        hidden = JSON.parse(await readFile8(join10(config, "hidden-apps.json"), "utf8"));
      } catch {
      }
      let apps = [], seen = /* @__PURE__ */ new Set(), lang = process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || "", nameLocales = /^(C|POSIX)(\.|$)/i.test(lang) ? [] : (process.env.LANGUAGE || lang).split(":").flatMap((value2) => {
        let locale = value2.split(".")[0].replaceAll("-", "_");
        return [locale, locale.split("@")[0], locale.split("_")[0].split("@")[0]];
      });
      for (let root of [join10(process.env.XDG_DATA_HOME || join10(home3, ".local/share"), "applications"), ...(process.env.XDG_DATA_DIRS || "/usr/local/share:/usr/share").split(":").map((path3) => join10(path3, "applications"))]) {
        let names2 = [];
        try {
          names2 = await readdir7(root);
        } catch {
        }
        for (let name of names2.filter((name2) => name2.endsWith(".desktop")))
          if (!hidden.includes(name) && !seen.has(name)) {
            seen.add(name);
            try {
              let section2 = (await readFile8(join10(root, name), "utf8")).split("[Desktop Entry]")[1]?.split(/\n\[/)[0] ?? "";
              if (/^Hidden=true/m.test(section2) || !target && /^NoDisplay=true/m.test(section2) || !/^Type=Application$/m.test(section2)) continue;
              let values = Object.fromEntries(section2.split(`
`).filter((line) => line.includes("=")).map((line) => {
                let i = line.indexOf("=");
                return [line.slice(0, i), line.slice(i + 1)];
              }));
              apps.push({ id: join10(root, name), icon: values.Icon?.startsWith("/") ? pathToFileURL6(values.Icon).href : values.Icon, name: nameLocales.map((locale) => values[`Name[${locale}]`]).find(Boolean) || values.Name || basename6(name, ".desktop") });
            } catch {
            }
          }
      }
      let associated = /* @__PURE__ */ new Set();
      if (target)
        try {
          let { stdout: type } = await exec5("xdg-mime", ["query", "filetype", target], { timeout: 5e3 });
          if (type.trim()) {
            let { stdout } = await exec5("gio", ["mime", type.trim()], { timeout: 5e3, env: { ...process.env, LC_ALL: "C" } }), defaultApp = /Default application[^\n]*: (.+)/.exec(stdout)?.[1]?.trim();
            defaultApp && associated.add(defaultApp);
            let recommended = stdout.split("Recommended applications:")[1] || "";
            for (let line of recommended.split(`
`)) /^\s+\S/.test(line) && associated.add(line.trim());
          }
        } catch {
        }
      return apps.map((app) => ({ ...app, associated: associated.has(basename6(app.id)) })).sort((a, b) => Number(b.associated) - Number(a.associated) || a.name.localeCompare(b.name));
    },
    async openDesktopFile(id) {
      let { stdout } = await exec5("xdg-mime", ["query", "default", "text/plain"], { timeout: 5e3 }), editor = stdout.trim();
      if (!editor || basename6(editor) !== editor) throw new Error("Configure um editor padr\xE3o para arquivos de texto.");
      let roots = [process.env.XDG_DATA_HOME || join10(home3, ".local/share"), ...(process.env.XDG_DATA_DIRS || "/usr/local/share:/usr/share").split(":")];
      for (let root of roots) {
        let path3 = join10(root, "applications", editor);
        try {
          await readFile8(path3);
        } catch {
          continue;
        }
        await exec5("gio", ["launch", path3, id], { timeout: 15e3 });
        return;
      }
      throw new Error("Editor padr\xE3o n\xE3o encontrado.");
    },
    hideApplication(id) {
      return pending3 = pending3.catch(() => {
      }).then(async () => {
        let hidden = [];
        try {
          hidden = JSON.parse(await readFile8(join10(config, "hidden-apps.json"), "utf8"));
        } catch {
        }
        await mkdir6(config, { recursive: !0 });
        let temp = join10(config, `hidden-apps.${process.pid}.tmp`);
        await writeFile3(temp, JSON.stringify([.../* @__PURE__ */ new Set([...hidden, basename6(id)])])), await rename4(temp, join10(config, "hidden-apps.json"));
      }), pending3;
    },
    async manageApplication(id) {
      let text2 = await readFile8(id, "utf8"), appId = /^X-Flatpak=(.+)$/m.exec(text2)?.[1]?.trim() || basename6(id, ".desktop");
      await exec5("gio", ["open", "appstream://" + encodeURIComponent(appId)], { timeout: 15e3 });
    },
    async launch(id, target) {
      await exec5("gio", ["launch", id, ...target ? [target] : []], { timeout: 15e3 });
    },
    async special(uri) {
      await exec5("gio", ["open", uri], { timeout: 15e3 });
    },
    async terminal(path3) {
      for (let [binary, args] of [["xdg-terminal-exec", ["--dir", path3]], ["kgx", ["--working-directory", path3]], ["gnome-terminal", ["--working-directory", path3]], ["konsole", ["--workdir", path3]], ["xfce4-terminal", ["--working-directory", path3]], ["alacritty", ["--working-directory", path3]], ["kitty", ["--directory", path3]]])
        try {
          await exec5("which", [binary]), await new Promise((resolve4, reject) => {
            let child = spawn3(binary, args, { cwd: path3, stdio: "ignore", detached: !0 });
            child.once("error", reject), child.once("spawn", () => {
              child.unref(), resolve4();
            });
          });
          return;
        } catch (error) {
          if (error.code !== "ENOENT" && error.code !== 1) throw error;
        }
      throw new Error("Nenhum terminal compat\xEDvel encontrado.");
    }
  };
}

// src/infrastructure/icons.ts
import { readFile as readFile9, access as access2, readdir as readdir8 } from "node:fs/promises";
import { join as join11 } from "node:path";
import { pathToFileURL as pathToFileURL7 } from "node:url";
var names = ["folder", "text-x-generic", "image-x-generic", "video-x-generic", "audio-x-generic", "package-x-generic", "application-pdf", "user-home", "user-desktop", "folder-download", "folder-documents", "folder-pictures", "folder-music", "folder-videos", "folder-development", "drive-harddisk", "applications-games", "go-previous", "go-next", "go-up", "view-refresh", "view-list-details", "view-grid", "view-column", "list-add", "document-open", "edit-rename", "window-close", "document-preview"];
async function discoverIcons(home3, light, requested = []) {
  let wanted = [.../* @__PURE__ */ new Set([...names, ...requested])].filter((name) => /^[\w .+-]+$/.test(name)), theme = "";
  try {
    let settings = JSON.parse(await readFile9(join11(process.env.XDG_CONFIG_HOME || join11(home3, ".config"), "DankMaterialShell/settings.json"), "utf8"));
    theme = settings.iconThemePerMode && light ? settings.iconThemeLight : settings.iconThemeDark;
  } catch {
  }
  if (!theme || theme === "System Default")
    try {
      theme = (await readFile9(join11(home3, ".config/qt6ct/qt6ct.conf"), "utf8")).match(/^icon_theme=(.+)$/m)?.[1]?.trim() || "";
    } catch {
    }
  if (!theme || !/^[\w .-]+$/.test(theme)) return {};
  let dataHome = process.env.XDG_DATA_HOME || join11(home3, ".local/share"), roots = [join11(home3, ".icons"), join11(dataHome, "icons"), ...(process.env.XDG_DATA_DIRS || "/usr/local/share:/usr/share").split(":").map((root) => join11(root, "icons"))], result = {}, seen = /* @__PURE__ */ new Set();
  async function visit(name) {
    if (seen.has(name) || seen.size >= 12 || !/^[\w .-]+$/.test(name)) return;
    seen.add(name);
    let inherited = /* @__PURE__ */ new Set();
    for (let root of roots)
      try {
        let ini = await readFile9(join11(root, name, "index.theme"), "utf8"), directories = [...ini.matchAll(/^(?:ScaledDirectories|Directories)=(.+)$/gm)].flatMap((match) => match[1].trim().split(","));
        for (let inherit of (ini.match(/^Inherits=(.+)$/m)?.[1] || "").trim().split(",")) inherit && inherited.add(inherit);
        directories.sort((a, b) => (b.includes("scalable") ? 1e3 : parseInt(b) || 0) - (a.includes("scalable") ? 1e3 : parseInt(a) || 0));
        for (let directory of directories) {
          if (directory.startsWith("/") || directory.split("/").includes("..")) continue;
          let files = new Set(await readdir8(join11(root, name, directory)).catch(() => []));
          for (let icon of wanted)
            if (!result[icon])
              for (let file of /\.(svg|png|xpm)$/i.test(icon) ? [icon] : ["svg", "png", "xpm"].map((extension2) => `${icon}.${extension2}`)) {
                if (!files.has(file)) continue;
                let path3 = join11(root, name, directory, file);
                try {
                  await access2(path3), result[icon] = pathToFileURL7(path3).href;
                  break;
                } catch {
                }
              }
        }
      } catch {
      }
    for (let inheritedTheme of inherited) await visit(inheritedTheme);
  }
  return await visit(theme), await visit("hicolor"), result;
}

// src/infrastructure/dmsDesktop.ts
function createDmsDesktop(home3) {
  let colorsPath = join12(process.env.XDG_CACHE_HOME || join12(home3, ".cache"), "DankMaterialShell/dms-colors.json"), desktop = desktopActions(home3);
  return {
    ...desktop,
    async applications(target) {
      let apps = await desktop.applications(target), light = await readFile10(colorsPath, "utf8").then((text2) => JSON.parse(text2).mode === "light").catch(() => !1), icons = await discoverIcons(home3, light, apps.map((app) => app.icon || "").filter((icon) => !icon.startsWith("file:")));
      return apps.map((app) => ({ ...app, icon: app.icon ? icons[app.icon] || app.icon : icons["package-x-generic"] || "package-x-generic" }));
    },
    async theme() {
      let data = JSON.parse(await readFile10(colorsPath, "utf8")), light = data.mode === "light", colors2 = data.colors?.[light ? "light" : "dark"];
      return { palette: Object.fromEntries([
        "background",
        "surface",
        "on_surface",
        "on_surface_variant",
        "primary",
        "on_primary",
        "primary_container",
        "secondary",
        "surface_variant",
        "surface_container",
        "surface_container_high",
        "outline",
        "error"
      ].filter((key) => typeof colors2?.[key] == "string" && /^#[0-9a-fA-F]{6,8}$/.test(colors2[key])).map((key) => [key, colors2[key]])), icons: await discoverIcons(home3, light) };
    },
    watchTheme(changed) {
      try {
        let watcher = watch2(dirname6(colorsPath), (_, file) => {
          String(file) === "dms-colors.json" && changed();
        });
        return () => watcher.close();
      } catch {
        return () => {
        };
      }
    }
  };
}

// src/infrastructure/quickshell.ts
init_src();
import { createInterface as createInterface2 } from "node:readline";

// src/infrastructure/ui-transport.ts
function createUiTransport(send, timeoutMs = 5e3) {
  let sequence = 0, closed = !1, tail = Promise.resolve(), pending3 = /* @__PURE__ */ new Map();
  function sendRequest(command) {
    if (closed) return Promise.reject(new Error("UI transport closed"));
    let request2 = sequence++;
    return new Promise((resolve4, reject) => {
      let timer = setTimeout(() => {
        pending3.delete(request2), reject(new Error("Quickshell UI patch timed out"));
      }, timeoutMs);
      pending3.set(request2, { resolve: resolve4, reject, timer });
      try {
        send({ uiPatch: { request: request2, command } });
      } catch (error) {
        pending3.delete(request2), clearTimeout(timer), reject(error);
      }
    });
  }
  function request(command) {
    let operation = tail.then(() => sendRequest(command));
    return tail = operation.then(() => {
    }, () => {
    }), operation;
  }
  return {
    request,
    patch: (command) => request(command).then(() => {
    }),
    acknowledge(result) {
      let operation = pending3.get(result.request);
      operation && (pending3.delete(result.request), clearTimeout(operation.timer), result.error ? operation.reject(new Error(result.error)) : operation.resolve(result.value));
    },
    close() {
      closed = !0;
      for (let operation of pending3.values())
        clearTimeout(operation.timer), operation.reject(new Error("UI transport closed"));
      pending3.clear();
    }
  };
}

// src/infrastructure/quickshellScene.ts
init_src();
function createQuickshellScene(tree, context, onError, patch, request) {
  let bindings = signal({}), scene = createNativeScene(
    tree,
    (key, value2) => bindings.set({ ...bindings.peek(), [key]: value2 }),
    patch,
    onError,
    {
      fragment: !0,
      dynamicFragments: !!patch,
      context,
      imports: ["qs.DankCommon.Common"],
      dialogAppearance: { background: qmlExpression(createQmlScope(), (_objects) => Style.surfaceContainerHigh), foreground: qmlExpression(createQmlScope(), (_objects) => Style.surfaceText) }
    }
  );
  return {
    snapshot: () => ({ source: scene.source, bindings: bindings() }),
    dispatch: scene.dispatch,
    mount: () => scene.mount((name) => {
      if (!request) throw new Error("Native reference transport unavailable");
      let call = (operation, args) => request({ cmd: "native_object", object: name, operation, ...args });
      return {
        objectName: name,
        inspect: (properties2) => call("inspect", { properties: properties2 }),
        set: (property, value2) => call("set", { property, value: value2 }).then(() => {
        }),
        invoke: (method, ...args) => call("invoke", { method, args })
      };
    }),
    dispose: scene.dispose
  };
}

// src/infrastructure/quickshell.ts
var ViewReloadError = class extends Error {
  constructor(message, committed, cause) {
    super(message, { cause });
    this.committed = committed;
    this.name = "ViewReloadError";
  }
  committed;
};
function runQuickshell(manager2, regions, options = {}) {
  let send = options.send ?? ((message) => {
    process.stdout.write(JSON.stringify(message) + `
`);
  }), transport = createUiTransport(send), generation = 0, reloading = !1, revision = signal(0);
  function createScenes(regions2, version) {
    let built = {}, contexts = { toolbar: "app.uiBridge", sidebar: "app.sidebarBridge", details: "app.detailsBridge", dialogs: "app.dialogsBridge" };
    try {
      for (let name of Object.keys(contexts))
        built[name] = createQuickshellScene(
          regions2[name],
          contexts[name],
          manager2.reportError,
          (command) => transport.patch({ ...command, scene: name, generation: version }),
          (command) => transport.request({ ...command, scene: name, generation: version })
        );
      return built;
    } catch (error) {
      for (let scene of Object.values(built)) scene.dispose();
      throw error;
    }
  }
  let scenes = createScenes(regions, generation), output2 = effect(() => {
    revision();
    let message = { ...manager2.snapshot(), ui: scenes.toolbar.snapshot(), sidebarUi: scenes.sidebar.snapshot(), detailsUi: scenes.details.snapshot(), dialogsUi: scenes.dialogs.snapshot() };
    reloading || send(message);
  }), input2 = createInterface2({ input: options.input ?? process.stdin }), disposed = !1, resolveClosed, closed = new Promise((resolve4) => {
    resolveClosed = resolve4;
  });
  function handle(command) {
    switch (command.action) {
      case "uiEvent": {
        if (reloading) return;
        let event = command.value;
        if (!event || typeof event.handler != "string" || !Array.isArray(event.args)) throw new Error("Evento de UI inv\xE1lido.");
        let eventGeneration = event.generation;
        if (typeof eventGeneration == "number" && eventGeneration !== generation) return;
        (event.scene === "sidebar" ? scenes.sidebar : event.scene === "details" ? scenes.details : event.scene === "dialogs" ? scenes.dialogs : scenes.toolbar).dispatch(event.handler, event.args);
        break;
      }
      case "uiMounted": {
        if (reloading) break;
        (command.value === "toolbar" || command.value === "sidebar" || command.value === "details" || command.value === "dialogs") && scenes[command.value].mount();
        break;
      }
      case "uiResult": {
        let result = command.value;
        result && typeof result.request == "number" && transport.acknowledge({ request: result.request, error: typeof result.error == "string" ? result.error : void 0, value: result.value });
        break;
      }
      case "properties":
        manager2.openDetails(typeof command.value == "string" ? command.value : void 0);
        break;
      case "closeDetails":
        manager2.closeDetails();
        break;
      case "trash":
        manager2.trashSelected();
        break;
      case "select":
        (command.value === null || typeof command.value == "string") && manager2.select(command.value);
        break;
      case "selectPath": {
        let value2 = command.value;
        value2 && (typeof value2.path == "string" || value2.path === null) && ["replace", "toggle", "range", "context"].includes(String(value2.mode)) && manager2.selectPath(value2.path, value2.mode);
        break;
      }
      case "selectAll":
        manager2.selectAll();
        break;
      case "selectStep": {
        let value2 = command.value;
        value2 && ["index", "row", "column"].includes(String(value2.axis)) && typeof value2.delta == "number" && manager2.navigateSelection(value2.axis, value2.delta, value2.extend === !0);
        break;
      }
      case "newMenu":
        manager2.requestNew();
        break;
      case "closeNewMenu":
        manager2.closeNewMenu();
        break;
      case "create":
        (command.value === "file" || command.value === "folder") && manager2.requestCreate(command.value);
        break;
      case "drop": {
        let value2 = command.value;
        value2 && Array.isArray(value2.urls) && value2.urls.every((url) => typeof url == "string") && typeof value2.folder == "string" && (value2.mode === "copy" || value2.mode === "move") && manager2.dropFiles(value2.urls, value2.folder, value2.mode);
        break;
      }
      case "openDesktop":
        manager2.openDesktopFile();
        break;
      case "manageApplication":
        manager2.manageApplication();
        break;
      case "hideApplication":
        manager2.hideApplication();
        break;
      case "applications":
        manager2.showApplications();
        break;
      case "special":
        (command.value === "trash:///" || command.value === "recent:///") && manager2.special(command.value);
        break;
      case "editPermissions":
        manager2.editPermissions();
        break;
      case "addPlace":
        manager2.addSelectedPlace();
        break;
      case "customizeFolder":
        manager2.customizeFolder();
        break;
      case "preferences":
        manager2.showPreferences();
        break;
      case "closePreferences":
        manager2.closePreferences();
        break;
      case "closeChooser":
        manager2.closeChooser();
        break;
      case "openWith":
        manager2.chooseApplication(typeof command.value == "string" ? command.value : void 0);
        break;
      case "terminal":
        manager2.terminal();
        break;
      case "copy":
        manager2.copy();
        break;
      case "cut":
        manager2.cut();
        break;
      case "paste":
        manager2.paste();
        break;
      case "undo":
        manager2.undo();
        break;
      case "cancelTransfer":
        manager2.cancelTransfer();
        break;
      case "restoreTrash":
        manager2.restoreSelected();
        break;
      case "fileTool":
        (command.value === "archive" || command.value === "extract" || command.value === "bulk" || command.value === "emptyTrash") && manager2.tools.open(command.value);
        break;
      case "browseDestination":
        typeof command.value == "string" && manager2.browseDestination(command.value);
        break;
      case "transfer":
        (command.value === "copy" || command.value === "move") && manager2.requestTransfer(command.value);
        break;
      case "rename":
        manager2.requestRename();
        break;
      case "preview":
        manager2.requestPreview();
        break;
      case "closePreview":
        manager2.closePreview();
        break;
      case "cancelEdit":
        manager2.cancelEdit();
        break;
      case "navigate":
        typeof command.value == "string" && manager2.navigate(command.value);
        break;
      case "column":
        typeof command.value == "string" && typeof command.index == "number" && manager2.openColumn(command.value, command.index);
        break;
      case "back":
        manager2.back();
        break;
      case "forward":
        manager2.forward();
        break;
      case "up":
        manager2.up();
        break;
      case "refresh":
        manager2.refresh();
        break;
      case "hidden":
        manager2.toggleHidden();
        break;
      case "descending":
        manager2.toggleDescending();
        break;
      case "sort":
        ["name", "size", "modified", "type"].includes(String(command.value)) && manager2.setOrder(command.value);
        break;
      case "view":
        ["list", "grid", "columns"].includes(String(command.value)) && manager2.setView(command.value);
        break;
      case "newTab":
        manager2.newTab(typeof command.value == "string" ? command.value : void 0);
        break;
      case "closeTab":
        manager2.closeTab(typeof command.value == "string" ? command.value : void 0);
        break;
      case "selectTab":
        typeof command.value == "string" && manager2.selectTab(command.value);
        break;
      case "nextTab":
        manager2.nextTab();
        break;
      case "prevTab":
        manager2.prevTab();
        break;
      case "open":
        typeof command.value == "string" && manager2.open(command.value);
        break;
      default:
        manager2.reportError("Comando desconhecido.");
    }
  }
  input2.on("line", (line) => {
    try {
      handle(JSON.parse(line));
    } catch {
      manager2.reportError("Comando inv\xE1lido.");
    }
  });
  function dispose() {
    if (!disposed) {
      disposed = !0, output2.dispose();
      for (let scene of Object.values(scenes)) scene.dispose();
      transport.close(), input2.close(), resolveClosed();
    }
  }
  input2.once("close", dispose);
  async function replaceRegions(regions2) {
    if (disposed) throw new Error("UI runtime closed");
    if (reloading) throw new Error("UI reload already in progress");
    let nextGeneration = generation + 1, next = createScenes(regions2, nextGeneration);
    reloading = !0;
    let committed = !1;
    try {
      if (await transport.request({
        cmd: "replace_scenes",
        generation: nextGeneration,
        scenes: Object.fromEntries(Object.entries(next).map(([name, scene]) => [name, scene.snapshot()]))
      }), disposed) throw new Error("UI runtime closed");
      let previous = scenes;
      scenes = next, generation = nextGeneration, committed = !0;
      for (let scene of Object.values(previous))
        try {
          scene.dispose();
        } catch (error) {
          manager2.reportError(error);
        }
      for (let scene of Object.values(next)) scene.mount();
    } catch (error) {
      let message = error instanceof Error ? error.message : String(error);
      for (let [name, scene] of Object.entries(next)) {
        let pattern = new RegExp("file:\\/\\/\\/[^\\s]*\\/NandomoReload" + name + "\\.tsx", "g"), urls = message.match(pattern) ?? [];
        for (let url of new Set(urls)) message = formatQmlDiagnostic(message, scene.snapshot().source, url);
      }
      throw new ViewReloadError(message, committed, error);
    } finally {
      if (!committed) for (let scene of Object.values(next)) scene.dispose();
      reloading = !1, disposed || revision.update((value2) => value2 + 1);
    }
  }
  return { closed, dispose, replaceRegions };
}

// src/main.ts
var home2 = homedir2(), markReady, initialized = new Promise((resolve4) => {
  markReady = resolve4;
}), linux = process.env.NANDOMO_FM_DESKTOP_INTEGRATION === "0" ? void 0 : createLinuxDesktop((event) => {
  event.event === "clipboard" && manager.setExternalClipboardAvailable(!!event.available), event.event === "reveal" && Array.isArray(event.urls) && initialized.then(() => manager.reveal(event.urls, event.method === "ShowItemProperties", event.method === "ShowFolders"));
}), manager = createFileManager(home2, {
  locale: i18n.locale,
  translate: t,
  files: withUndo(nodeFiles, { locate: findTrashed, restore: restoreTrash }),
  locations: nodeLocations,
  desktop: { ...createDmsDesktop(home2), restoreTrash, emptyTrash, ...linux ? { readFileClipboard: linux.readFileClipboard, writeFileClipboard: linux.writeFileClipboard, resolveLocation: linux.resolveLocation } : {} }
}), project = fileURLToPath6(new URL("../", import.meta.url)), entry2 = process.env.NANDOMO_FM_DEV_ENTRY || fileURLToPath6(new URL("./app.tsx", import.meta.url)), devTools = void 0, loader = devTools ? await devTools.createViewLoader({ entry: entry2, tsconfig: fileURLToPath6(new URL("../tsconfig.json", import.meta.url)) }) : void 0, runtime;
try {
  let initial = loader ? (await loader.load()).App : App;
  if (typeof initial != "function") throw new Error("A entrada de views deve exportar App.");
  runtime = runQuickshell(manager, initial({ manager }));
} catch (error) {
  throw await loader?.dispose(), manager.dispose(), linux?.close(), error;
}
var stopWatching;
loader && (console.error("[dev] Hot reload das regi\xF5es TSX ativo. Estado de aplica\xE7\xE3o preservado; estado local dos componentes reinicia."), stopWatching = devTools.watchViewSources(process.env.NANDOMO_FM_DEV_ENTRY ? dirname7(entry2) : fileURLToPath6(new URL("./", import.meta.url)), async (files) => {
  let changed = files.map((file) => relative(project, file)), reload = files.includes(entry2) || changed.some((file) => file.startsWith("src/components/")), restart = files.filter((file) => file !== entry2 && !relative(project, file).startsWith("src/components/")).map((file) => relative(project, file));
  if (restart.length && console.error("[dev] Rein\xEDcio necess\xE1rio para: " + restart.join(", ")), !!reload)
    try {
      let module = await loader.load();
      if (typeof module.App != "function") throw new Error("A entrada de views deve exportar App.");
      await runtime.replaceRegions(module.App({ manager })), console.error("[dev] UI atualizada: " + changed.join(", "));
    } catch (error) {
      error instanceof ViewReloadError && error.committed ? (manager.reportError(error), console.error("[dev] UI trocada, mas o lifecycle de montagem falhou:", error)) : console.error("[dev] Recarga falhou; UI anterior mantida:", error);
    }
}));
var stop = () => {
  stopWatching?.(), runtime.dispose(), manager.dispose(), linux?.close();
};
process.once("SIGTERM", stop);
try {
  await Promise.race([manager.initialize(process.env.NANDOMO_FM_START_PATH || home2).then(markReady), runtime.closed]), await runtime.closed;
} finally {
  stop(), await loader?.dispose();
}
