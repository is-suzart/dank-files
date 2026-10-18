import { t } from '../infrastructure/i18n.js';
import { component, signal, computed } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
  qmlReadEvent,
} from "@nandomo/bridge-qml";
const qml = importQml("QtQuick");
const qt = importQml("QtQml");
const dms = importQml("qs.DankCommon.Widgets");
const controls = importQml("QtQuick.Controls");
import { QuietButton } from "./QuietButton.js";
declare let parent: any,
  section: any,
  Style: any,
  ListView: any,
  modelData: any;
type Binding<T> = T | (() => T);
export type ApplicationChooserProps = Parameters<typeof qml.Column>[0] & {
  applications?: Binding<
    Array<{ id: string; name: string; icon?: string; associated?: boolean }>
  >;
  onChosen?: (id: string) => void;
};
export const ApplicationChooser = component<ApplicationChooserProps>(
  "ApplicationChooser",
  (props) => {
    props = {
      ...props,
      onChosen: props.onChosen
        ? qmlReadEvent(["selectedId"], props.onChosen)
        : undefined,
    };

    const scope = createQmlScope({ ...(props.qmlId ? { root: props.qmlId } : {}), app: "app" });
    scope.id("root");
    scope.id("search");
    const query = signal("");
    const filtered = computed(() => {
      const apps = typeof props.applications === "function" ? props.applications() : props.applications ?? [];
      const search = query().trim().toLocaleLowerCase();
      return apps.filter(app => app.name.toLocaleLowerCase().includes(search))
        .sort((a,b) => Number(!!b.associated) - Number(!!a.associated))
        .map(app => ({...app, category:t(app.associated ? "Associados ao tipo de arquivo" : "Todos os aplicativos")}));
    });
    return (
      <qml.Column
        qmlImports={["Quickshell", "qs.DankCommon.Common"]}
        qmlId={scope.id("root")}
        qmlDeclarations={{
          applications: {
            type: "var",
            value: qmlExpression(scope, ($qml) => []),
          },
          selectedId: { type: "string", value: "" },
        }}
        qmlSignals={{ chosen: [] }}
        width={480}
        spacing={12}
        {...props}
      >
        <dms.DankTextField
          qmlId={scope.id("search")}
          objectName="chooserSearch"
          width={qmlExpression(scope, ($qml) => parent.width)}
          placeholderText={t('Buscar aplicativo')}
          onTextEdited={qmlReadEvent(["text"], query.set)}
        />
        <qml.ListView
          width={qmlExpression(scope, ($qml) => parent.width)}
          height={340}
          clip={true}
          objectName="chooserList"
          model={filtered}
          {...{ "section.property": "category" }}
          {...{
            "section.delegate": (
              <qml.Text
                qmlDeclarations={{
                  section: { type: "string", required: true },
                }}
                text={qmlExpression(scope, ($qml) => section)}
                width={480}
                topPadding={10}
                bottomPadding={8}
                color={qmlExpression(scope, ($qml) => Style.surfaceVariantText)}
                {...{ "font.pixelSize": 12 }}
              />
            ),
          }}
          {...{ "ScrollBar.vertical": <controls.ScrollBar /> }}
          delegate={
            <qt.Component><QuietButton
              qmlDeclarations={{
                modelData: { type: "var", required: true },
              }}
              width={qmlExpression(scope, ($qml) => ListView.view.width)}
              text={qmlExpression(scope, ($qml) => modelData.name)}
              iconName={qmlExpression(
                scope,
                ($qml) => modelData.icon || "application-x-executable",
              )}
              onClicked={qmlHandler(scope, ($qml) => {
                $qml.root.selectedId = modelData.id;
                $qml.root.chosen();
              })}
            /></qt.Component>
          }
        />
        {props.children}
      </qml.Column>
    );
  },
);
