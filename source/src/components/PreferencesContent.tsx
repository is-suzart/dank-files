import { t } from '../infrastructure/i18n.js';
import { component } from '@nandomo/core';
import { importQml } from '@nandomo/bridge-qml';
import type { Preferences } from '../domain/preferences.js';
import { SectionTitle } from './SectionTitle.js';
const qml=importQml('QtQuick');
const dms=importQml('qs.DankCommon.Widgets');
export const PreferencesContent=component<{
  preferences:()=>Preferences;onChanged:(key:string,value:unknown)=>void;
}>('PreferencesContent',({preferences,onChanged})=><qml.Column width={480} spacing={18}>
  <SectionTitle text={t("APARÊNCIA")} />
  <dms.StyledText text={()=>t('Tamanho dos ícones: {size} px',{size:preferences().gridSize})} />
  <dms.DankSlider objectName="preferencesGrid" width="fill" minimum={48} maximum={160} step={8} unit=" px"
    value={()=>preferences().gridSize} onSliderDragFinished={value=>onChanged('gridSize',value)} />
  <dms.DankToggle objectName="preferencesThumbnails" width="fill" text={t("Mostrar miniaturas")}
    checked={()=>preferences().thumbnails} onToggled={value=>onChanged('thumbnails',value)} />
  <dms.DankToggle objectName="preferencesDetailsAlwaysVisible" width="fill" text={t("Manter painel de detalhes visível")}
    description={t("Reserva espaço para os detalhes. Desativado: o painel abre por Propriedades.")}
    checked={()=>preferences().detailsAlwaysVisible} onToggled={value=>onChanged('detailsAlwaysVisible',value)} />
  <SectionTitle text={t("COMPORTAMENTO")} />
  <dms.DankToggle width="fill" text={t("Ordenar pastas antes dos arquivos")}
    checked={()=>preferences().foldersFirst} onToggled={value=>onChanged('foldersFirst',value)} />
  <dms.DankToggle width="fill" text={t("Abrir com clique único")} description={t("Desativado: duplo clique abre; clique simples seleciona.")}
    checked={()=>preferences().singleClick} onToggled={value=>onChanged('singleClick',value)} />
  <dms.DankToggle width="fill" text={t("Mostrar ação de terminal")}
    checked={()=>preferences().showTerminal} onToggled={value=>onChanged('showTerminal',value)} />
  <dms.DankToggle objectName="preferencesShowSidebarSpecial" width="fill" text={t("Mostrar itens especiais na barra lateral")}
    checked={()=>preferences().showSidebarSpecial} onToggled={value=>onChanged('showSidebarSpecial',value)} />
  <dms.DankToggle objectName="preferencesShowSidebarPlaces" width="fill" text={t("Mostrar lugares na barra lateral")}
    checked={()=>preferences().showSidebarPlaces} onToggled={value=>onChanged('showSidebarPlaces',value)} />
  <dms.DankToggle objectName="preferencesShowSidebarVolumes" width="fill" text={t("Mostrar volumes na barra lateral")}
    checked={()=>preferences().showSidebarVolumes} onToggled={value=>onChanged('showSidebarVolumes',value)} />
  <dms.DankToggle objectName="preferencesShowSidebarGames" width="fill" text={t("Mostrar jogos na barra lateral")}
    checked={()=>preferences().showSidebarGames} onToggled={value=>onChanged('showSidebarGames',value)} />
  <dms.DankToggle objectName="preferencesReduceAnimations" width="fill" text={t("Reduzir animações")}
    description={t("Desativado: transições curtas de foco, seleção, painel e diálogos.")}
    checked={()=>preferences().reduceAnimations} onToggled={value=>onChanged('reduceAnimations',value)} />
  <dms.StyledText width="fill" text={t("Alterações são salvas automaticamente.")} />
</qml.Column>);
