//@ pragma UseQApplication
//@ pragma AppId io.github.is_suzart.DankFiles
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Quickshell
import qs.DCommon.Common
import QtQml
import Quickshell.Io
import qs.DCommon.Widgets
import QtQuick.Effects
import QtQuick.Pdf
import QtMultimedia

// @nandomo-source {"fileName":"src/native/renderShell.tsx","lineNumber":6,"columnNumber":35}

// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":64,"columnNumber":5,"component":"qml:ShellRoot"}
ShellRoot {
id: app
objectName: "n0"
property var state: (() => { const __name = function(fn) { return fn; }; return ($qml=>({path:"",entries:[],columns:[],drives:[],games:[],palette:{},themeReady:false,videoThumbnails:{},home:"",view:"list",busy:true,hidden:false}))({}); })()
property bool applyingBindings: false
property int uiGeneration: 0
property var uiBridge: (() => { const __name = function(fn) { return fn; }; return ($qml=>({dispatch:__name(function(handler,args){if($qml.app.applyingBindings)return;$qml.app.send("uiEvent",{handler,args,generation:$qml.app.uiGeneration})},"dispatch")}))({"app": app}); })()
property var toolbarObject: null
property var sidebarObject: null
property var detailsObject: null
property var dialogsObject: null
property var footerObject: null
property var footerBridge: (() => { const __name = function(fn) { return fn; }; return ($qml=>({dispatch:__name(function(handler,args){if(!$qml.app.applyingBindings)$qml.app.send("uiEvent",{scene:"footer",handler,args,generation:$qml.app.uiGeneration})},"dispatch")}))({"app": app}); })()
property var detailsBridge: (() => { const __name = function(fn) { return fn; }; return ($qml=>({dispatch:__name(function(handler,args){if(!$qml.app.applyingBindings)$qml.app.send("uiEvent",{scene:"details",handler,args,generation:$qml.app.uiGeneration})},"dispatch")}))({"app": app}); })()
property var dialogsBridge: (() => { const __name = function(fn) { return fn; }; return ($qml=>({dispatch:__name(function(handler,args){if(!$qml.app.applyingBindings)$qml.app.send("uiEvent",{scene:"dialogs",handler,args,generation:$qml.app.uiGeneration})},"dispatch")}))({"app": app}); })()
property var contextTarget: null
property var catalog: {"pt-BR":{"Desktop clipboard unavailable":"A área de transferência do sistema está indisponível.","Desktop integration unavailable":"A integração com o desktop está indisponível.","Desktop integration closed":"A integração com o desktop foi encerrada.","Desktop request timed out":"A solicitação ao desktop demorou demais.","Invalid file location":"Local de arquivo inválido.","Invalid file clipboard":"A área de transferência não contém arquivos válidos.","Invalid clipboard action":"Ação da área de transferência inválida.","Clipboard too large":"O conteúdo da área de transferência excede o limite.","Invalid clipboard format":"Formato da área de transferência inválido.","{count} itens":{"one":"{count} item","other":"{count} itens"},"{count} pastas":{"one":"{count} pasta","other":"{count} pastas"},"{count} selecionados":{"one":"{count} selecionado","other":"{count} selecionados"}},"en":{"Dank Files":"Dank Files","Carregando…":"Loading…","Carregando pastas…":"Loading folders…","{count} itens":{"one":"{count} item","other":"{count} items"},"{count} pastas":{"one":"{count} folder","other":"{count} folders"},"{count} selecionados":{"one":"{count} selected","other":"{count} selected"},"Pasta pessoal":"Home","Sistema":"System","Tipo: Pasta":"Type: Folder","Tamanho: {size}":"Size: {size}","Modificado: {date}":"Modified: {date}","Aplicativos":"Applications","Lixeira":"Trash","Recentes":"Recent","LUGARES":"PLACES","VOLUMES":"VOLUMES","JOGOS":"GAMES","Nenhum volume detectado":"No volume detected","Nenhuma instalação detectada":"No installation detected","Abrir em nova aba":"Open in new tab","Nova aba":"New tab","Nome":"Name","Tamanho":"Size","Modificado":"Modified","Tipo":"Type","Visualização em lista":"List view","Visualização em grade":"Grid view","Visualização em colunas":"Columns view","Ordenar":"Sort","nome":"name","tamanho":"size","data":"date","tipo":"type","decrescente":"descending","crescente":"ascending","Espaço":"Space","Ler":"Read","Alterar":"Write","Executar/acessar":"Execute/enter","Pasta":"Folder","Arquivos":"Files","Nova pasta":"New folder","Novo arquivo":"New file","Novo arquivo vazio":"Empty new file","Abrir app":"Open app","Abrir pasta":"Open folder","Abrir no app padrão":"Open with default app","Abrir .desktop":"Open .desktop","Abrir com…":"Open with…","Abrir terminal aqui":"Open terminal here","Desinstalar…":"Uninstall…","Ocultar":"Hide","Adicionar pasta a Locais":"Add folder to Places","Adicionar pasta atual a Locais":"Add current folder to Places","Remover de Locais":"Remove from Places","Cor, emblema e ícone…":"Color, badge and icon…","Pré-visualizar":"Preview","Pré-visualização":"Preview","Renomear":"Rename","Renomear…":"Rename…","Recortar":"Cut","Copiar":"Copy","Colar":"Paste","Mover para…":"Move to…","Copiar para…":"Copy to…","Mover para a lixeira":"Move to trash","Copiar caminho":"Copy path","Atualizar":"Refresh","Propriedades":"Properties","Voltar":"Back","Avançar":"Forward","Pasta acima":"Parent folder","Arquivos ocultos escondidos":"Hidden files hidden","Arquivos ocultos visíveis":"Hidden files shown","Montar":"Mount","Desmontar":"Unmount","Abrir":"Open","Volume desmontado — botão direito para montar":"Volume unmounted — right-click to mount","Fechar detalhes":"Close details","Selecione um item para ver os detalhes.":"Select an item to see its details.","Avançado":"Advanced","Editar permissões":"Edit permissions","Editar permissões…":"Edit permissions…","Proprietário":"Owner","Grupo":"Group","Outros":"Others","Proprietário: {owner}":"Owner: {owner}","Proprietário: {owner} · Grupo: {group} · Outros: {others}":"Owner: {owner} · Group: {group} · Others: {others}","ler":"read","alterar":"write","executar":"execute","acessar":"enter","sem acesso":"no access","Cancelar":"Cancel","Salvar":"Save","Salvando…":"Saving…","Fechar":"Close","Escolher esta pasta":"Choose this folder","Pasta de destino (caminho completo)":"Destination folder (full path)","Já existe um item com esse nome":"An item with that name already exists","Você pode escolher outro nome, ignorar este item ou substituir um arquivo comum.":"You can pick another name, skip this item or replace a regular file.","Novo nome":"New name","Ignorar":"Skip","Substituir":"Replace","Preferências":"Preferences","Escolher aplicativo":"Choose application","Padrão do sistema":"System default","Posição do vídeo":"Video position","Pausar":"Pause","Reproduzir":"Play","Nenhuma subpasta":"No subfolder","Usar ícone de pasta":"Use folder icon","Emblemas":"Badges","Logos e ícones":"Logos and icons","Buscar ícone…":"Search icon…","Anterior":"Previous","Próxima":"Next","{count} ícones":{"one":"{count} icon","other":"{count} icons"},"Escolher imagem para o ícone…":"Choose image for the icon…","Ícone da pasta":"Folder icon","Personalizar pasta":"Customize folder","Cor da pasta":"Folder color","Restaurar padrão":"Restore default","Nenhum":"None","APARÊNCIA":"APPEARANCE","COMPORTAMENTO":"BEHAVIOUR","Tamanho dos ícones: {size} px":"Icon size: {size} px","Mostrar miniaturas":"Show thumbnails","Manter painel de detalhes visível":"Keep details panel visible","Reserva espaço para os detalhes. Desativado: o painel abre por Propriedades.":"Reserves space for details. Disabled: the panel opens from Properties.","Ordenar pastas antes dos arquivos":"Sort folders before files","Abrir com clique único":"Open with a single click","Desativado: duplo clique abre; clique simples seleciona.":"Disabled: double click opens, single click selects.","Mostrar ação de terminal":"Show terminal action","Mostrar itens especiais na barra lateral":"Show special items in the sidebar","Mostrar lugares na barra lateral":"Show places in the sidebar","Mostrar volumes na barra lateral":"Show volumes in the sidebar","Mostrar jogos na barra lateral":"Show games in the sidebar","Reduzir animações":"Reduce animations","Desativado: transições curtas de foco, seleção, painel e diálogos.":"Disabled: short focus, selection, panel and dialog transitions.","Alterações são salvas automaticamente.":"Changes are saved automatically.","Falha ao ler a pasta.":"Could not read the folder.","Falha ao abrir o arquivo.":"Could not open the file.","Falha ao criar o item.":"Could not create the item.","Falha ao renomear.":"Could not rename.","Falha ao mover para a lixeira.":"Could not move to trash.","Falha ao copiar.":"Could not copy.","Falha ao mover.":"Could not move.","Falha ao aplicar as permissões.":"Could not apply the permissions.","Falha ao montar o volume.":"Could not mount the volume.","Falha ao desmontar o volume.":"Could not unmount the volume.","Selecionar":"Select","Subir":"Up","Filtro":"Filter","O arquivo já existe. Substituir?":"The file already exists. Replace it?","não foi possível gerar um nome único":"Could not generate a unique name","requisição do portal ausente":"Missing portal request","Fechar busca":"Close search","Invalid file location":"Invalid file location.","Invalid file clipboard":"The clipboard does not contain valid files.","Invalid clipboard action":"Invalid clipboard action.","Clipboard too large":"The clipboard contents exceed the limit.","Invalid clipboard format":"Invalid clipboard format.","Associados ao tipo de arquivo":"Recommended for this file type","Todos os aplicativos":"All applications","Buscar aplicativo":"Search applications","Diminuir zoom":"Zoom out","Aumentar zoom":"Zoom in","Girar à esquerda":"Rotate left","Girar à direita":"Rotate right","Restaurar visualização":"Reset view","Comando inválido.":"Invalid command.","Evento de UI inválido.":"Invalid UI event.","Configurações":"Settings","Jogos":"Games","Biblioteca · {name}":"Library · {name}","Prefixo · {name}":"Prefix · {name}","Área de trabalho":"Desktop","Downloads":"Downloads","Documentos":"Documents","Imagens":"Pictures","Músicas":"Music","Vídeos":"Videos","Projetos":"Projects","Buscando…":"Searching…","Limite: 10.000 resultados":"Limit: 10,000 results","Ordem decrescente":"Descending order","Ordem crescente":"Ascending order","Sem prévia para este formato":"No preview for this format","Não foi possível carregar a prévia":"Could not load preview","Carregando prévia…":"Loading preview…","Movendo: {name} → {destination}":"Moving: {name} → {destination}","Copiando: {name} → {destination}":"Copying: {name} → {destination}","Transferência indisponível.":"File transfer is unavailable.","Escolha um nome diferente.":"Choose a different name.","Substituição indisponível.":"Replacement is unavailable.","Aplicativos indisponíveis.":"Applications are unavailable.","Local virtual indisponível.":"This virtual location is unavailable.","Não foi possível consultar volumes.":"Could not read volumes.","Aplicativo inválido.":"Invalid application.","Não foi possível iniciar o aplicativo.":"Could not launch the application.","Lixeira indisponível.":"Trash is unavailable.","Aplicativos não podem ser alterados nesta visualização.":"Applications cannot be modified in this view.","Informe a pasta de destino.":"Enter the destination folder.","Local indisponível.":"Location is unavailable.","Edição de permissões indisponível.":"Permission editing is unavailable.","Abra uma pasta para adicioná-la a Locais.":"Open a folder to add it to Places.","Favoritos indisponíveis.":"Bookmarks are unavailable.","Volumes indisponíveis.":"Volumes are unavailable.","Personalização indisponível.":"Customization is unavailable.","Seletor indisponível.":"File picker is unavailable.","Editor de texto indisponível.":"Text editor is unavailable.","Gerenciador de aplicativos indisponível.":"Application manager is unavailable.","Ocultar indisponível.":"Hiding is unavailable.","Arrastar arquivos indisponível.":"File dragging is unavailable.","Copie arquivos de uma localização local ou montada.":"Copy files from a local or mounted location.","Renomeação em lote indisponível.":"Bulk renaming is unavailable.","Compactação indisponível.":"Compression is unavailable.","Extração indisponível.":"Extraction is unavailable.","O seletor não retornou uma URL de arquivo.":"The picker did not return a file URL.","Escolha uma pasta.":"Choose a folder.","Configure um editor padrão para arquivos de texto.":"Set a default editor for text files.","Editor padrão não encontrado.":"Default editor not found.","Nenhum terminal compatível encontrado.":"No supported terminal found.","Este tipo de arquivo não pode ser copiado.":"This file type cannot be copied.","O arquivo compactado aponta para fora do destino.":"The archive points outside the destination.","Permissões inválidas.":"Invalid permissions.","Abra o arquivo original para editar permissões.":"Open the original file to edit permissions.","Substituição disponível somente entre arquivos comuns. Renomeie pastas ou links.":"Only regular files can be replaced. Rename folders or links.","O destino mudou. Tente novamente.":"The destination changed. Try again.","Não foi possível abrir o arquivo.":"Could not open the file.","Dispositivo indisponível.":"Device is unavailable.","Item fora da lixeira.":"Item is outside the trash.","Item da lixeira não existe.":"Trash item no longer exists.","Metadados da lixeira inválidos.":"Invalid trash metadata.","Local original indisponível.":"Original location is unavailable.","Local original inválido.":"Invalid original location.","Local virtual desconhecido.":"Unknown virtual location.","Já existe um item com esse nome. Escolha como continuar.":"An item with this name already exists. Choose how to continue.","Lixeira parcialmente processada: {count} concluído(s), {reasons}":"Trash operation incomplete: {count} completed; {reasons}","Restaurado, mas os metadados ficaram: {reason}":"Restored, but metadata could not be removed: {reason}","Renomeação incompleta. Arquivos preservados em: {paths}":"Rename incomplete. Files were preserved at: {paths}","Desktop clipboard unavailable":"Desktop clipboard is unavailable.","Desktop integration unavailable":"Desktop integration is unavailable.","Desktop integration closed":"Desktop integration has closed.","Desktop request timed out":"The desktop request timed out.","A localização requer um backend GVfs com acesso FUSE.":"This location requires a GVfs backend with FUSE access.","Buscar nesta pasta…":"Search this folder…","Buscar arquivos":"Search files","Subpastas":"Subfolders","Limpar":"Clear","Restaurar":"Restore","Esvaziar…":"Empty…","Desfazer":"Undo","Ações":"Actions","Compactar…":"Compress…","Extrair…":"Extract…","Renomear em lote…":"Bulk rename…","Compactar":"Compress","Extrair":"Extract","Renomear em lote":"Bulk rename","Esvaziar lixeira":"Empty trash","Confirmar":"Confirm","Excluir permanentemente":"Delete permanently","Excluir permanentemente {count} itens da lixeira? Esta ação não pode ser desfeita.":"Permanently delete {count} items from the trash? This cannot be undone.","Use {name} para o nome original e {n} para numerar. A extensão é preservada.":"Use {name} for the original name and {n} for numbering. Extensions are preserved.","Informe o nome no diretório atual. ZIP e TAR.GZ são suportados para compactação.":"Enter a name in the current folder. ZIP and TAR.GZ are supported for compression.","Operação cancelada. Itens já concluídos foram preservados.":"Operation cancelled. Completed items were preserved.","Já existe um item com esse nome. Nada foi substituído.":"An item with this name already exists. Nothing was replaced.","Já existe um item com esse nome.":"An item with this name already exists.","Informe um nome sem separadores de diretório.":"Enter a name without directory separators.","Aguarde o fim da operação atual.":"Wait for the current operation to finish.","Escolha uma pasta de destino.":"Choose a destination folder.","Selecione um item para transferir.":"Select an item to transfer.","A origem mudou durante a cópia. Tente novamente.":"The source changed while copying. Try again.","O item mudou desde a operação. Nada foi desfeito.":"The item changed since the operation. Nothing was undone.","Um item mudou desde a renomeação. Nada foi desfeito.":"An item changed since renaming. Nothing was undone.","Use .zip ou .tar.gz.":"Use .zip or .tar.gz.","Selecione itens da mesma pasta.":"Select items from the same folder.","Abra a pasta original para esta operação.":"Open the original folder for this operation.","Selecione um arquivo compactado.":"Select an archive.","Use {name} para o nome original e/ou {n} para a sequência.":"Use {name} for the original name and/or {n} for numbering.","Os novos nomes não podem ser repetidos.":"The new names must be unique.","O destino foi copiado, mas a origem mudou e foi preservada.":"The destination was copied, but the source changed and was preserved.","Não é possível transferir uma pasta para dentro dela mesma.":"A folder cannot be transferred into itself.","Origem e destino são iguais.":"Source and destination are the same.","Abra uma pasta para criar um item.":"Open a folder to create an item.","Abra a pasta original para renomear este item.":"Open the original folder to rename this item.","Abra uma pasta para transferir este item.":"Open a folder to transfer this item.","Abra a pasta original para recortar este item.":"Open the original folder to cut this item.","Instale GVfs para abrir locais de rede.":"Install GVfs to open network locations."},"zh-Hans":{"Dank Files":"Dank Files","Carregando…":"正在加载…","Carregando pastas…":"正在加载文件夹…","{count} itens":"共 {count} 个项目","{count} pastas":"共 {count} 个文件夹","{count} selecionados":"已选择 {count} 项","Pasta pessoal":"主目录","Sistema":"系统","Tipo: Pasta":"类型：文件夹","Tamanho: {size}":"大小：{size}","Modificado: {date}":"修改时间：{date}","Aplicativos":"应用程序","Lixeira":"回收站","Recentes":"最近使用","LUGARES":"位置","VOLUMES":"卷","JOGOS":"游戏","Nenhum volume detectado":"未检测到卷","Nenhuma instalação detectada":"未检测到安装项目","Abrir em nova aba":"在新标签页中打开","Nova aba":"新建标签页","Nome":"名称","Tamanho":"大小","Modificado":"修改时间","Tipo":"类型","Visualização em lista":"列表视图","Visualização em grade":"网格视图","Visualização em colunas":"分栏视图","Ordenar":"排序","nome":"名称","tamanho":"大小","data":"日期","tipo":"类型","decrescente":"降序","crescente":"升序","Espaço":"空格","Ler":"读取","Alterar":"写入","Executar/acessar":"执行/进入","Pasta":"文件夹","Arquivos":"文件","Nova pasta":"新建文件夹","Novo arquivo":"新建文件","Novo arquivo vazio":"新建空文件","Abrir app":"打开应用","Abrir pasta":"打开文件夹","Abrir no app padrão":"用默认应用打开","Abrir .desktop":"打开 .desktop","Abrir com…":"打开方式…","Abrir terminal aqui":"在此处打开终端","Desinstalar…":"卸载…","Ocultar":"隐藏","Adicionar pasta a Locais":"将文件夹添加到位置","Adicionar pasta atual a Locais":"将当前文件夹添加到位置","Remover de Locais":"从位置中移除","Cor, emblema e ícone…":"颜色、徽标和图标…","Pré-visualizar":"预览","Pré-visualização":"预览","Renomear":"重命名","Renomear…":"重命名…","Recortar":"剪切","Copiar":"复制","Colar":"粘贴","Mover para…":"移动到…","Copiar para…":"复制到…","Mover para a lixeira":"移到回收站","Copiar caminho":"复制路径","Atualizar":"刷新","Propriedades":"属性","Voltar":"后退","Avançar":"前进","Pasta acima":"上一级文件夹","Arquivos ocultos escondidos":"隐藏文件已隐藏","Arquivos ocultos visíveis":"显示隐藏文件","Montar":"挂载","Desmontar":"卸载","Abrir":"打开","Volume desmontado — botão direito para montar":"卷未挂载 — 右键可挂载","Fechar detalhes":"关闭详情","Selecione um item para ver os detalhes.":"请选择一个项目以查看详情。","Avançado":"高级","Editar permissões":"编辑权限","Editar permissões…":"编辑权限…","Proprietário":"所有者","Grupo":"用户组","Outros":"其他","Proprietário: {owner}":"所有者：{owner}","Proprietário: {owner} · Grupo: {group} · Outros: {others}":"所有者：{owner} · 用户组：{group} · 其他：{others}","ler":"读取","alterar":"写入","executar":"执行","acessar":"进入","sem acesso":"无权限","Cancelar":"取消","Salvar":"保存","Salvando…":"正在保存…","Fechar":"关闭","Escolher esta pasta":"选择此文件夹","Pasta de destino (caminho completo)":"目标文件夹（完整路径）","Já existe um item com esse nome":"同名项目已存在","Você pode escolher outro nome, ignorar este item ou substituir um arquivo comum.":"您可以换一个名称、跳过此项目或替换普通文件。","Novo nome":"新名称","Ignorar":"跳过","Substituir":"替换","Preferências":"首选项","Escolher aplicativo":"选择应用","Padrão do sistema":"系统默认","Posição do vídeo":"视频进度","Pausar":"暂停","Reproduzir":"播放","Nenhuma subpasta":"没有子文件夹","Usar ícone de pasta":"使用文件夹图标","Emblemas":"徽标","Logos e ícones":"标志与图标","Buscar ícone…":"搜索图标…","Anterior":"上一页","Próxima":"下一页","{count} ícones":"共 {count} 个图标","Escolher imagem para o ícone…":"选择图标图片…","Ícone da pasta":"文件夹图标","Personalizar pasta":"自定义文件夹","Cor da pasta":"文件夹颜色","Restaurar padrão":"恢复默认","Nenhum":"无","APARÊNCIA":"外观","COMPORTAMENTO":"行为","Tamanho dos ícones: {size} px":"图标大小：{size} 像素","Mostrar miniaturas":"显示缩略图","Manter painel de detalhes visível":"始终显示详情面板","Reserva espaço para os detalhes. Desativado: o painel abre por Propriedades.":"为详情预留空间。关闭时：从属性对话框打开面板。","Ordenar pastas antes dos arquivos":"文件夹排在文件之前","Abrir com clique único":"单击打开","Desativado: duplo clique abre; clique simples seleciona.":"关闭时：双击打开，单击选中。","Mostrar ação de terminal":"显示终端操作","Mostrar itens especiais na barra lateral":"在侧边栏显示特殊位置","Mostrar lugares na barra lateral":"在侧边栏显示位置","Mostrar volumes na barra lateral":"在侧边栏显示卷","Mostrar jogos na barra lateral":"在侧边栏显示游戏","Reduzir animações":"减少动画","Desativado: transições curtas de foco, seleção, painel e diálogos.":"关闭时：使用简短的焦点、选中、面板和对话框过渡。","Alterações são salvas automaticamente.":"更改将自动保存。","Falha ao ler a pasta.":"无法读取文件夹。","Falha ao abrir o arquivo.":"无法打开文件。","Falha ao criar o item.":"无法创建项目。","Falha ao renomear.":"无法重命名。","Falha ao mover para a lixeira.":"无法移到回收站。","Falha ao copiar.":"无法复制。","Falha ao mover.":"无法移动。","Falha ao aplicar as permissões.":"无法应用权限。","Falha ao montar o volume.":"无法挂载该卷。","Falha ao desmontar o volume.":"无法卸载该卷。","Selecionar":"选择","Subir":"上一级","Filtro":"筛选","O arquivo já existe. Substituir?":"文件已存在，是否替换？","não foi possível gerar um nome único":"无法生成唯一名称","requisição do portal ausente":"缺少门户请求","Fechar busca":"关闭搜索","Invalid file location":"无效的文件位置。","Invalid file clipboard":"剪贴板中没有有效文件。","Invalid clipboard action":"无效的剪贴板操作。","Clipboard too large":"剪贴板内容超出上限。","Invalid clipboard format":"无效的剪贴板格式。","Associados ao tipo de arquivo":"此文件类型的推荐应用","Todos os aplicativos":"所有应用程序","Buscar aplicativo":"搜索应用程序","Diminuir zoom":"缩小","Aumentar zoom":"放大","Girar à esquerda":"向左旋转","Girar à direita":"向右旋转","Restaurar visualização":"重置视图","Comando inválido.":"无效的命令。","Evento de UI inválido.":"无效的界面事件。","Configurações":"设置","Jogos":"游戏","Biblioteca · {name}":"游戏库 · {name}","Prefixo · {name}":"前缀 · {name}","Área de trabalho":"桌面","Downloads":"下载","Documentos":"文档","Imagens":"图片","Músicas":"音乐","Vídeos":"视频","Projetos":"项目","Buscando…":"正在搜索…","Limite: 10.000 resultados":"上限：10,000 个结果","Ordem decrescente":"降序","Ordem crescente":"升序","Sem prévia para este formato":"此格式不支持预览","Não foi possível carregar a prévia":"无法加载预览","Carregando prévia…":"正在加载预览…","Movendo: {name} → {destination}":"正在移动：{name} → {destination}","Copiando: {name} → {destination}":"正在复制：{name} → {destination}","Transferência indisponível.":"文件传输不可用。","Escolha um nome diferente.":"请选择其他名称。","Substituição indisponível.":"替换不可用。","Aplicativos indisponíveis.":"应用程序不可用。","Local virtual indisponível.":"此虚拟位置不可用。","Não foi possível consultar volumes.":"无法读取卷。","Aplicativo inválido.":"无效的应用程序。","Não foi possível iniciar o aplicativo.":"无法启动应用程序。","Lixeira indisponível.":"回收站不可用。","Aplicativos não podem ser alterados nesta visualização.":"无法在此视图中修改应用程序。","Informe a pasta de destino.":"请输入目标文件夹。","Local indisponível.":"位置不可用。","Edição de permissões indisponível.":"权限编辑不可用。","Abra uma pasta para adicioná-la a Locais.":"请打开文件夹以将其添加到位置。","Favoritos indisponíveis.":"书签不可用。","Volumes indisponíveis.":"卷不可用。","Personalização indisponível.":"自定义不可用。","Seletor indisponível.":"文件选择器不可用。","Editor de texto indisponível.":"文本编辑器不可用。","Gerenciador de aplicativos indisponível.":"应用程序管理器不可用。","Ocultar indisponível.":"隐藏操作不可用。","Arrastar arquivos indisponível.":"文件拖放不可用。","Copie arquivos de uma localização local ou montada.":"请从本地或已挂载的位置复制文件。","Renomeação em lote indisponível.":"批量重命名不可用。","Compactação indisponível.":"压缩不可用。","Extração indisponível.":"解压不可用。","O seletor não retornou uma URL de arquivo.":"选择器未返回文件 URL。","Escolha uma pasta.":"请选择文件夹。","Configure um editor padrão para arquivos de texto.":"请为文本文件设置默认编辑器。","Editor padrão não encontrado.":"未找到默认编辑器。","Nenhum terminal compatível encontrado.":"未找到支持的终端。","Este tipo de arquivo não pode ser copiado.":"无法复制此类型的文件。","O arquivo compactado aponta para fora do destino.":"压缩文件指向目标文件夹之外。","Permissões inválidas.":"无效的权限。","Abra o arquivo original para editar permissões.":"请打开原文件以编辑权限。","Substituição disponível somente entre arquivos comuns. Renomeie pastas ou links.":"只能替换普通文件。请重命名文件夹或链接。","O destino mudou. Tente novamente.":"目标发生变化，请重试。","Não foi possível abrir o arquivo.":"无法打开文件。","Dispositivo indisponível.":"设备不可用。","Item fora da lixeira.":"项目不在回收站中。","Item da lixeira não existe.":"回收站中的项目已不存在。","Metadados da lixeira inválidos.":"回收站元数据无效。","Local original indisponível.":"原位置不可用。","Local original inválido.":"原位置无效。","Local virtual desconhecido.":"未知的虚拟位置。","Já existe um item com esse nome. Escolha como continuar.":"已存在同名项目，请选择如何继续。","Lixeira parcialmente processada: {count} concluído(s), {reasons}":"回收站操作未完成：已完成 {count} 项；{reasons}","Restaurado, mas os metadados ficaram: {reason}":"已还原，但无法删除元数据：{reason}","Renomeação incompleta. Arquivos preservados em: {paths}":"重命名未完成。文件保留于：{paths}","Desktop clipboard unavailable":"桌面剪贴板不可用。","Desktop integration unavailable":"桌面集成不可用。","Desktop integration closed":"桌面集成已关闭。","Desktop request timed out":"桌面请求超时。","A localização requer um backend GVfs com acesso FUSE.":"此位置需要支持 FUSE 访问的 GVfs 后端。","Buscar nesta pasta…":"搜索此文件夹…","Buscar arquivos":"搜索文件","Subpastas":"子文件夹","Limpar":"清除","Restaurar":"还原","Esvaziar…":"清空…","Desfazer":"撤销","Ações":"操作","Compactar…":"压缩…","Extrair…":"解压…","Renomear em lote…":"批量重命名…","Compactar":"压缩","Extrair":"解压","Renomear em lote":"批量重命名","Esvaziar lixeira":"清空回收站","Confirmar":"确认","Excluir permanentemente":"永久删除","Excluir permanentemente {count} itens da lixeira? Esta ação não pode ser desfeita.":"永久删除回收站中的 {count} 个项目？此操作无法撤销。","Use {name} para o nome original e {n} para numerar. A extensão é preservada.":"使用 {name} 表示原名称，{n} 表示序号。保留文件扩展名。","Informe o nome no diretório atual. ZIP e TAR.GZ são suportados para compactação.":"输入当前文件夹中的名称。支持 ZIP 和 TAR.GZ 压缩。","Operação cancelada. Itens já concluídos foram preservados.":"操作已取消。已完成的项目已保留。","Já existe um item com esse nome. Nada foi substituído.":"已存在同名项目，未替换任何内容。","Já existe um item com esse nome.":"已存在同名项目。","Informe um nome sem separadores de diretório.":"请输入不含目录分隔符的名称。","Aguarde o fim da operação atual.":"请等待当前操作完成。","Escolha uma pasta de destino.":"请选择目标文件夹。","Selecione um item para transferir.":"请选择要传输的项目。","A origem mudou durante a cópia. Tente novamente.":"源文件在复制过程中发生变化，请重试。","O item mudou desde a operação. Nada foi desfeito.":"项目在操作后发生变化，未撤销任何内容。","Um item mudou desde a renomeação. Nada foi desfeito.":"项目在重命名后发生变化，未撤销任何内容。","Use .zip ou .tar.gz.":"请使用 .zip 或 .tar.gz。","Selecione itens da mesma pasta.":"请选择同一文件夹中的项目。","Abra a pasta original para esta operação.":"请打开原文件夹以执行此操作。","Selecione um arquivo compactado.":"请选择压缩文件。","Use {name} para o nome original e/ou {n} para a sequência.":"使用 {name} 表示原名称，{n} 表示序号。","Os novos nomes não podem ser repetidos.":"新名称不能重复。","O destino foi copiado, mas a origem mudou e foi preservada.":"目标已复制，但源文件发生变化，因此已保留。","Não é possível transferir uma pasta para dentro dela mesma.":"无法将文件夹传输到其自身内部。","Origem e destino são iguais.":"源位置和目标位置相同。","Abra uma pasta para criar um item.":"请打开文件夹以创建项目。","Abra a pasta original para renomear este item.":"请打开原文件夹以重命名此项目。","Abra uma pasta para transferir este item.":"请打开文件夹以传输此项目。","Abra a pasta original para recortar este item.":"请打开原文件夹以剪切此项目。","Instale GVfs para abrir locais de rede.":"请安装 GVfs 以打开网络位置。"}}
property string locale: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.state.locale||"en")({"app": app}); })()
property string fallbackLocale: "en"
property string sourceLocale: "pt-BR"
property var sidebarBridge: (() => { const __name = function(fn) { return fn; }; return ($qml=>({dispatch:__name(function(handler,args){if($qml.app.applyingBindings)return;$qml.app.send("uiEvent",{scene:"sidebar",handler,args,generation:$qml.app.uiGeneration})},"dispatch")}))({"app": app}); })()
function tr() { return (() => { const __name = function(fn) { return fn; }; return (($qml,text,params)=>{const catalog=$qml.app.catalog||{};var entry=(catalog[$qml.app.locale]||{})[text];if(entry===void 0&&$qml.app.locale!==$qml.app.sourceLocale)entry=(catalog[$qml.app.fallbackLocale]||{})[text];if(entry===void 0)entry=text;var count=params?Number(params.count):NaN;var singular=$qml.app.locale==="pt-BR"?count>=0&&count<2:$qml.app.locale==="en"&&count===1;var template=typeof entry==="string"?entry:singular&&entry.one?entry.one:entry.other||entry.one||text;return String(template).replace(/\{(\w+)\}/g,function(match,name){return params&&Object.prototype.hasOwnProperty.call(params,name)?String(params[name]):match})})({"app": app}, ...arguments); })(); }
function revealSelection() { return (() => { const __name = function(fn) { return fn; }; return ($qml=>{if($qml.app.state.detailsVisible)$qml.selectionReveal.schedule()})({"app": app, "selectionReveal": ndScope0_selectionReveal}, ...arguments); })(); }
function revealKeyboard() { return (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.selectionReveal.schedule(true)})({"selectionReveal": ndScope0_selectionReveal}, ...arguments); })(); }
function fileIcon() { return (() => { const __name = function(fn) { return fn; }; return (($qml,name)=>{const fallback=$qml.app.state.path==="applications:///"?"package-x-generic":"text-x-generic";if(String(name).indexOf("file://")===0)return name;return $qml.app.state.icons&&$qml.app.state.icons[name]?$qml.app.state.icons[name]:Quickshell.hasThemeIcon(name||fallback)?Quickshell.iconPath(name||fallback):($qml.app.state.icons||{})[fallback]||Quickshell.iconPath(fallback,"application-x-executable")})({"app": app}, ...arguments); })(); }
function context() { return (() => { const __name = function(fn) { return fn; }; return (($qml,entry,x,y)=>{$qml.app.contextTarget=entry;$qml.app.send("selectPath",{path:entry?entry.path:null,mode:"context"});if($qml.app.state.path==="applications:///"&&entry)$qml.applicationMenu.popup(x,y);else $qml.contextMenu.popup(x,y)})({"app": app, "applicationMenu": ndScope0_applicationMenu, "contextMenu": ndScope0_contextMenu}, ...arguments); })(); }
function patchScene() { return (() => { const __name = function(fn) { return fn; }; return (($qml,message)=>{try{var command=message.command;if(command.cmd==="replace_scenes"){var slots={toolbar:$qml.toolbarSlot,sidebar:$qml.sidebarSlot,details:$qml.detailsSlot,dialogs:$qml.dialogsSlot,footer:$qml.footerSlot};var objectKeys={toolbar:"toolbarObject",sidebar:"sidebarObject",details:"detailsObject",dialogs:"dialogsObject",footer:"footerObject"};var bridgeKeys={toolbar:"uiBridge",sidebar:"sidebarBridge",details:"detailsBridge",dialogs:"dialogsBridge",footer:"footerBridge"};var previousBridges={},candidates={};var previousApplying=$qml.app.applyingBindings;$qml.app.applyingBindings=true;try{["toolbar","sidebar","details","dialogs","footer"].forEach(function(name){var descriptor=command.scenes[name];if(!descriptor||typeof descriptor.source!=="string")throw new Error("Invalid replacement scene: "+name);var bridgeKey=bridgeKeys[name];previousBridges[name]=$qml.app[bridgeKey];$qml.app[bridgeKey]=Object.assign({dispatch:previousBridges[name].dispatch},descriptor.bindings);candidates[name]=Qt.createQmlObject(descriptor.source,slots[name],"NandomoReload"+name+".tsx")});["toolbar","sidebar","details","dialogs","footer"].forEach(function(name){var old=$qml.app[objectKeys[name]];$qml.app[objectKeys[name]]=candidates[name];if(old){old.visible=false;old.parent=null;old.destroy()}});$qml.app.uiGeneration=command.generation}catch(error){Object.keys(candidates).forEach(function(name){candidates[name].visible=false;candidates[name].parent=null;candidates[name].destroy()});Object.keys(previousBridges).forEach(function(name){$qml.app[bridgeKeys[name]]=previousBridges[name]});throw error}finally{$qml.app.applyingBindings=previousApplying}$qml.app.send("uiResult",{request:message.request,value:null});return}if(typeof command.generation==="number"&&command.generation!==$qml.app.uiGeneration){$qml.app.send("uiResult",{request:message.request,value:null});return}var scene=command.scene||"sidebar";var roots={toolbar:$qml.app.toolbarObject,sidebar:$qml.app.sidebarObject,details:$qml.app.detailsObject,dialogs:$qml.app.dialogsObject,footer:$qml.app.footerObject};var bridges={toolbar:"uiBridge",sidebar:"sidebarBridge",details:"detailsBridge",dialogs:"dialogsBridge",footer:"footerBridge"};var root=roots[scene],bridge=bridges[scene];if(!root||!bridge)throw new Error("Scene not mounted: "+scene);var result=null;if(command.cmd==="native_object"){var object=$qml.app.findUi(command.object,root);if(!object)throw new Error("Native object missing: "+command.object);var identifier=/^[A-Za-z_][A-Za-z0-9_]*$/;if(command.operation==="inspect"){result={};command.properties.forEach(function(property){if(!identifier.test(property))throw new Error("Invalid property");var value=object[property];result[property]=value===void 0?null:value})}else if(command.operation==="set"){if(!identifier.test(command.property))throw new Error("Invalid property");object[command.property]=command.value}else if(command.operation==="invoke"){if(!identifier.test(command.method)||typeof object[command.method]!=="function")throw new Error("Invalid native method");result=object[command.method].apply(object,command.args||[])}else throw new Error("Unknown native operation")}else if(command.cmd==="create_fragment"){var parent=$qml.app.findUi(command.parent,root);if(!parent)throw new Error("Fragment parent missing: "+command.parent);$qml.app[bridge]=Object.assign({},command.bindings,$qml.app[bridge]);Qt.createQmlObject(command.source,parent,"Nandomo"+scene+"Fragment.tsx")}else if(command.cmd==="order_fragments"){var parent=$qml.app.findUi(command.parent,root);if(!parent||!parent.ndReflow)throw new Error("Region missing: "+command.parent);var ordered=[];for(var i=0;i<command.objects.length;i++){var object=$qml.app.findUi(command.objects[i],parent);if(!object||object.parent!==parent)throw new Error("Fragment missing: "+command.objects[i]);ordered.push(object)}parent.ndItems=ordered;parent.ndReflow()}else if(command.cmd==="destroy_fragment"){var object=$qml.app.findUi(command.object,root);if(!object)throw new Error("Removed fragment missing: "+command.object);var parent=object.parent;object.visible=false;object.parent=null;object.destroy();if(parent&&parent.ndReflow)parent.ndReflow()}else throw new Error("Unknown UI patch");$qml.app.send("uiResult",{request:message.request,value:result})}catch(error){$qml.app.send("uiResult",{request:message.request,error:String(error)});console.warn("Scene patch failed",error)}})({"app": app, "dialogsSlot": ndScope0_dialogsSlot, "footerSlot": ndScope0_footerSlot, "toolbarSlot": ndScope0_toolbarSlot, "sidebarSlot": ndScope0_sidebarSlot, "detailsSlot": ndScope0_detailsSlot}, ...arguments); })(); }
function findUi() { return (() => { const __name = function(fn) { return fn; }; return (($qml,name,object)=>{if(!object)return null;if(object.objectName===name)return object;var children=object.data||object.children||[];for(var i=0;i<children.length;i++){var found=findUi(name,children[i]);if(found)return found}if(object.contentItem&&object.contentItem!==object){var found=findUi(name,object.contentItem);if(found)return found}return null})({}, ...arguments); })(); }
function receive() { return (() => { const __name = function(fn) { return fn; }; return (($qml,next)=>{if(next.uiPatch){$qml.app.patchScene(next.uiPatch);return}$qml.app.applyingBindings=true;try{if(JSON.stringify(next.entries)===JSON.stringify($qml.app.state.entries))next.entries=$qml.app.state.entries;if(JSON.stringify(next.columns)===JSON.stringify($qml.app.state.columns))next.columns=$qml.app.state.columns;var selectionChanged=(next.selected?next.selected.path:"")!==($qml.app.state.selected?$qml.app.state.selected.path:"")||(next.selection||[]).join("\0")!==($qml.app.state.selection||[]).join("\0");var entriesChanged=next.entries!==$qml.app.state.entries;var activate=Number(next.activation||0)>Number($qml.app.state.activation||0);$qml.app.state=next;if(activate){$qml.window.showNormal();$qml.window.requestActivate()}if(selectionChanged||entriesChanged)$qml.app.revealSelection();if(next.sidebarUi){$qml.app.sidebarBridge=Object.assign({},$qml.app.sidebarBridge,next.sidebarUi.bindings);if(!$qml.app.sidebarObject){$qml.app.sidebarObject=Qt.createQmlObject(next.sidebarUi.source,$qml.sidebarSlot,"NandomoSidebar.tsx");$qml.app.send("uiMounted","sidebar")}}if(next.ui){$qml.app.uiBridge=Object.assign({},$qml.app.uiBridge,next.ui.bindings);if(!$qml.app.toolbarObject){$qml.app.toolbarObject=Qt.createQmlObject(next.ui.source,$qml.toolbarSlot,"NandomoToolbar.tsx");$qml.app.send("uiMounted","toolbar")}}if(next.detailsUi){$qml.app.detailsBridge=Object.assign({},$qml.app.detailsBridge,next.detailsUi.bindings);if(!$qml.app.detailsObject){$qml.app.detailsObject=Qt.createQmlObject(next.detailsUi.source,$qml.detailsSlot,"DetailsPanel.tsx");$qml.app.send("uiMounted","details")}}if(next.dialogsUi){$qml.app.dialogsBridge=Object.assign({},$qml.app.dialogsBridge,next.dialogsUi.bindings);if(!$qml.app.dialogsObject){$qml.app.dialogsObject=Qt.createQmlObject(next.dialogsUi.source,$qml.dialogsSlot,"FileDialogs.tsx");$qml.app.send("uiMounted","dialogs")}}if(next.footerUi){$qml.app.footerBridge=Object.assign({},$qml.app.footerBridge,next.footerUi.bindings);if(!$qml.app.footerObject){$qml.app.footerObject=Qt.createQmlObject(next.footerUi.source,$qml.footerSlot,"ChooserFooter.tsx");$qml.app.send("uiMounted","footer")}}if(next.newMenuOpen&&!$qml.newMenu.visible){var button=$qml.app.findUi("sidebarNew",$qml.app.sidebarObject);var point=button?button.mapToItem($qml.window.contentItem,0,button.height):Qt.point(16,130);$qml.newMenu.popup(point.x,point.y)}}finally{$qml.app.applyingBindings=false}})({"app": app, "window": ndScope0_window, "dialogsSlot": ndScope0_dialogsSlot, "footerSlot": ndScope0_footerSlot, "newMenu": ndScope0_newMenu, "toolbarSlot": ndScope0_toolbarSlot, "sidebarSlot": ndScope0_sidebarSlot, "detailsSlot": ndScope0_detailsSlot}, ...arguments); })(); }
function send() { return (() => { const __name = function(fn) { return fn; }; return (($qml,action,value,index)=>{$qml.backend.write(JSON.stringify({action,value,index})+"\n")})({"backend": ndScope0_backend}, ...arguments); })(); }
function open() { return (() => { const __name = function(fn) { return fn; }; return (($qml,entry,index)=>{if(entry.directory)send(index===void 0?"navigate":"column",entry.path,index);else send("open",entry.path)})({}, ...arguments); })(); }
function dropFiles() { return (() => { const __name = function(fn) { return fn; }; return (($qml,drop,folder)=>{if(!drop.hasUrls||$qml.app.state.mutating)return;var urls=[];for(var i=0;i<drop.urls.length;i++)urls.push(String(drop.urls[i]));var mode=drop.proposedAction===Qt.MoveAction?"move":"copy";$qml.app.send("drop",{urls,folder,mode});drop.accept(mode==="move"?Qt.MoveAction:Qt.CopyAction)})({"app": app}, ...arguments); })(); }
function sizeText() { return (() => { const __name = function(fn) { return fn; }; return (($qml,bytes)=>{return bytes<1024?bytes+" B":bytes<1048576?(bytes/1024).toFixed(1)+" KB":(bytes/1048576).toFixed(1)+" MB"})({}, ...arguments); })(); }
function dragPayload() { return (() => { const __name = function(fn) { return fn; }; return (($qml,path)=>{var selection=$qml.app.state.selection||[];var uris=$qml.app.state.selectionUris||[];if(uris.length&&selection.indexOf(path)>=0)return uris.join("\r\n")+"\r\n";return"file://"+String(path).split("/").map(encodeURIComponent).join("/")+"\r\n"})({"app": app}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":64,"columnNumber":5,"component":"qml:ShellRoot","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":64,"columnNumber":5,"component":"qml:ShellRoot","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":64,"columnNumber":5,"component":"qml:ShellRoot","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":64,"columnNumber":5,"component":"qml:ShellRoot","property":"qmlMethods"}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":64,"columnNumber":5,"component":"qml:ShellRoot","property":"Component.onCompleted"}
Component.onCompleted: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{Style.theme=$qml.theme})({"theme": ndScope0_theme}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":64,"columnNumber":5,"component":"qml:ShellRoot","property":"children"}

// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":64,"columnNumber":5,"component":"qml:ShellRoot"}

// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":516,"columnNumber":7,"component":"qml:Timer"}
Timer {
id: ndScope0_selectionReveal
objectName: "n1"
property int remaining: 0
property bool keyboardReveal: false
function schedule() { return (() => { const __name = function(fn) { return fn; }; return (($qml,keyboard)=>{keyboardReveal=!!keyboard;remaining=3;restart()})({}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":516,"columnNumber":7,"component":"qml:Timer","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":516,"columnNumber":7,"component":"qml:Timer","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":516,"columnNumber":7,"component":"qml:Timer","property":"qmlMethods"}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":516,"columnNumber":7,"component":"qml:Timer","property":"interval"}
interval: 80
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":516,"columnNumber":7,"component":"qml:Timer","property":"repeat"}
repeat: true
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":516,"columnNumber":7,"component":"qml:Timer","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{if(--remaining<=0)stop();if(!$qml.app.state.detailsVisible&&!keyboardReveal||!$qml.app.state.selected){stop();return}var index=$qml.app.state.entries.findIndex(function(entry){return entry.path===$qml.app.state.selected.path});if(index<0)return;var view=$qml.app.state.view==="grid"?$qml.filesGrid:$qml.app.state.view==="list"?$qml.filesList:null;if(!view)return;view.forceLayout();view.currentIndex=index;view.positionViewAtIndex(index,$qml.app.state.view==="grid"?GridView.Center:ListView.Contain)})({"app": app, "filesList": ndScope0_filesList, "filesGrid": ndScope0_filesGrid}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":558,"columnNumber":7,"component":"qml:SystemPalette"}
SystemPalette {
id: ndScope0_osPalette
objectName: "n2"
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":558,"columnNumber":7,"component":"qml:SystemPalette","property":"qmlId"}
}

// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":559,"columnNumber":7,"component":"qml:QtObject"}
QtObject {
id: ndScope0_theme
objectName: "n3"
property color background: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.background||$qml.osPalette.window)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color surface: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.surface||$qml.osPalette.window)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color surfaceText: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.on_surface||$qml.osPalette.windowText)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color surfaceVariantText: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.on_surface_variant||$qml.osPalette.windowText)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color primary: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.primary||$qml.osPalette.highlight)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color primaryText: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.on_primary||$qml.osPalette.highlightedText)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color primaryContainer: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.primary_container||$qml.osPalette.highlight)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color secondary: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.secondary||$qml.osPalette.highlight)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color surfaceVariant: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.surface_variant||$qml.osPalette.base)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color surfaceContainer: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.surface_container||$qml.osPalette.base)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color surfaceContainerHigh: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.surface_container_high||$qml.osPalette.alternateBase)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color outline: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.outline||$qml.osPalette.mid)({"app": app, "osPalette": ndScope0_osPalette}); })()
property color error: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.palette.error||"#b3261e")({"app": app}); })()
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":559,"columnNumber":7,"component":"qml:QtObject","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":559,"columnNumber":7,"component":"qml:QtObject","property":"qmlDeclarations"}
}

// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":669,"columnNumber":7,"component":"qml:Process"}
Process {
id: ndScope0_backend
objectName: "n4"
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":669,"columnNumber":7,"component":"qml:Process","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":669,"columnNumber":7,"component":"qml:Process","property":"command"}
command: (() => { const __name = function(fn) { return fn; }; return ($qml=>[Quickshell.env("NANDOMO_FM_NODE"),Quickshell.env("NANDOMO_FM_BACKEND")])({}); })()
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":669,"columnNumber":7,"component":"qml:Process","property":"stdinEnabled"}
stdinEnabled: true
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":669,"columnNumber":7,"component":"qml:Process","property":"running"}
running: true
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":669,"columnNumber":7,"component":"qml:Process","property":"stdout"}
stdout: 
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":678,"columnNumber":11,"component":"qml:SplitParser"}
SplitParser {
id: n5
objectName: "n5"
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":678,"columnNumber":11,"component":"qml:SplitParser","property":"onRead"}
onRead: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(data=>{try{$qml.app.receive(JSON.parse(data))}catch(error){console.warn("Resposta inv\xE1lida",error)}})(...args))({"app": app}, ...arguments); })(); }
}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":669,"columnNumber":7,"component":"qml:Process","property":"stderr"}
stderr: 
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":693,"columnNumber":11,"component":"qml:SplitParser"}
SplitParser {
id: n6
objectName: "n6"
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":693,"columnNumber":11,"component":"qml:SplitParser","property":"onRead"}
onRead: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(data=>console.warn("backend:",data))(...args))({}, ...arguments); })(); }
}
// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":669,"columnNumber":7,"component":"qml:Process","property":"onExited"}
onExited: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>((code,status)=>{if(code!==0)console.warn("Backend encerrado",code)})(...args))({}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":711,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":24,"columnNumber":3}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow"}
ApplicationWindow {
id: ndScope0_window
objectName: "n7"
width: 1200
height: 800
property bool reduceAnimations: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!($qml.app.state.preferences&&$qml.app.state.preferences.reduceAnimations))({"app": app}); })()
property var osIcons: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.icons||{})({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.themeReady===true)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"title"}
title: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Dank Files"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"width"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"height"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"minimumWidth"}
minimumWidth: 760
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"minimumHeight"}
minimumHeight: 480
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.background)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"palette.window"}
palette.window: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceContainer)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"palette.windowText"}
palette.windowText: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceText)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"palette.base"}
palette.base: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surface)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"palette.text"}
palette.text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceText)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"palette.button"}
palette.button: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceContainerHigh)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"palette.buttonText"}
palette.buttonText: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceText)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"palette.highlight"}
palette.highlight: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.primary)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"palette.highlightedText"}
palette.highlightedText: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.primaryText)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"onClosing"}
onClosing: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{Qt.quit()})({}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow","property":"children"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":25,"columnNumber":5,"component":"qml:ApplicationWindow"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":84,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n8
objectName: "n8"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":84,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Alt+Left"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":84,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("back")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":90,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n9
objectName: "n9"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":90,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Alt+Right"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":90,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("forward")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":96,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n10
objectName: "n10"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":96,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Alt+Up"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":96,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("up")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":102,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n11
objectName: "n11"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":102,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+H"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":102,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("hidden")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":108,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n12
objectName: "n12"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":108,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+L"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":108,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{var address=$qml.app.findUi("toolbarAddress",$qml.app.toolbarObject);if(address)address.forceActiveFocus()})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":118,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n13
objectName: "n13"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":118,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "F5"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":118,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("refresh")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":124,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n14
objectName: "n14"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":124,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+T"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":124,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.modalsOpen&&!$qml.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":124,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("newTab")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":131,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n15
objectName: "n15"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":131,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+W"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":131,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.modalsOpen&&!$qml.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":131,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("closeTab")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":138,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n16
objectName: "n16"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":138,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+Tab"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":138,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.modalsOpen&&!$qml.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":138,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("nextTab")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":145,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n17
objectName: "n17"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":145,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+Shift+Tab"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":145,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.modalsOpen&&!$qml.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":145,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("prevTab")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":152,"columnNumber":7,"component":"qml:Item"}
Item {
id: ndScope0_dialogsSlot
objectName: "n18"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":152,"columnNumber":7,"component":"qml:Item","property":"qmlId"}
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":153,"columnNumber":7,"component":"qml:TextEdit"}
TextEdit {
id: ndScope0_clipboard
objectName: "n19"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":153,"columnNumber":7,"component":"qml:TextEdit","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":153,"columnNumber":7,"component":"qml:TextEdit","property":"visible"}
visible: false
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":154,"columnNumber":7,"component":"qml:Item"}
Item {
id: n20
objectName: "n20"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":154,"columnNumber":7,"component":"qml:Item","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.chooser)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":154,"columnNumber":7,"component":"qml:Item","property":"children"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":157,"columnNumber":9}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":20,"columnNumber":3}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":21,"columnNumber":5}

// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu"}
Menu {
id: ndScope0_newMenu
objectName: "n21"
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"padding"}
padding: 6
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"overlap"}
overlap: 0
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"implicitWidth"}
implicitWidth: 260
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle"}
Rectangle {
id: n22
objectName: "n22"
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceContainerHigh)({}); })()
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"radius"}
radius: 12
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"border.width"}
border.width: 1
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"border.color"}
border.color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.withAlpha(Style.surfaceText,.1))({}); })()
}
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"onClosed"}
onClosed: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("closeNewMenu")})({"app": app}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"children"}

// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu"}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":27,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope2_root
objectName: "n23"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n24
objectName: "n24"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n25
objectName: "n25"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope2_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n26
objectName: "n26"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope2_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope2_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n27
objectName: "n27"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope2_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n28
objectName: "n28"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope2_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n29
objectName: "n29"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope2_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Nova pasta"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("create","folder")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":33,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope3_root
objectName: "n30"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n31
objectName: "n31"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n32
objectName: "n32"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope3_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n33
objectName: "n33"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope3_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope3_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n34
objectName: "n34"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope3_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n35
objectName: "n35"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope3_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n36
objectName: "n36"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope3_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Novo arquivo vazio"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("create","file")})({"app": app}, ...arguments); })(); }
}
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":40,"columnNumber":5}

// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu"}
Menu {
id: ndScope0_applicationMenu
objectName: "n37"
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"padding"}
padding: 6
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"overlap"}
overlap: 0
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"implicitWidth"}
implicitWidth: 260
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle"}
Rectangle {
id: n38
objectName: "n38"
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceContainerHigh)({}); })()
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"radius"}
radius: 12
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"border.width"}
border.width: 1
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"border.color"}
border.color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.withAlpha(Style.surfaceText,.1))({}); })()
}
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"children"}

// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu"}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":41,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope5_root
objectName: "n39"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n40
objectName: "n40"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n41
objectName: "n41"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope5_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n42
objectName: "n42"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope5_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope5_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n43
objectName: "n43"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope5_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n44
objectName: "n44"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope5_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n45
objectName: "n45"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope5_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Abrir app"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.open($qml.app.contextTarget)})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":47,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope6_root
objectName: "n46"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n47
objectName: "n47"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n48
objectName: "n48"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope6_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n49
objectName: "n49"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope6_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope6_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n50
objectName: "n50"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope6_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n51
objectName: "n51"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope6_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n52
objectName: "n52"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope6_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Abrir .desktop"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("openDesktop")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":53,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope7_root
objectName: "n53"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n54
objectName: "n54"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n55
objectName: "n55"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope7_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n56
objectName: "n56"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope7_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope7_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n57
objectName: "n57"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope7_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n58
objectName: "n58"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope7_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n59
objectName: "n59"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope7_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Desinstalar\u2026"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("manageApplication")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":59,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope8_root
objectName: "n60"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n61
objectName: "n61"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n62
objectName: "n62"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope8_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n63
objectName: "n63"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope8_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope8_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n64
objectName: "n64"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope8_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n65
objectName: "n65"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope8_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n66
objectName: "n66"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope8_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Ocultar"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("hideApplication")})({"app": app}, ...arguments); })(); }
}
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":66,"columnNumber":5}

// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu"}
Menu {
id: ndScope0_contextMenu
objectName: "n67"
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"padding"}
padding: 6
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"overlap"}
overlap: 0
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"implicitWidth"}
implicitWidth: 260
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle"}
Rectangle {
id: n68
objectName: "n68"
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceContainerHigh)({}); })()
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"radius"}
radius: 12
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"border.width"}
border.width: 1
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":22,"columnNumber":9,"component":"qml:Rectangle","property":"border.color"}
border.color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.withAlpha(Style.surfaceText,.1))({}); })()
}
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu","property":"children"}

// @nandomo-source {"fileName":"src/native/AppMenu.tsx","lineNumber":16,"columnNumber":5,"component":"qml:Menu"}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":67,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope10_root
objectName: "n69"
property string hint: "Enter"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n70
objectName: "n70"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n71
objectName: "n71"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope10_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n72
objectName: "n72"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope10_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope10_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n73
objectName: "n73"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope10_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n74
objectName: "n74"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope10_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n75
objectName: "n75"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope10_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr($qml.app.state.path==="applications:///"?"Abrir app":"Abrir no app padr\xE3o"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"hint"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.open($qml.app.contextTarget)})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":82,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope11_root
objectName: "n76"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n77
objectName: "n77"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n78
objectName: "n78"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope11_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n79
objectName: "n79"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope11_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope11_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n80
objectName: "n80"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope11_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n81
objectName: "n81"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope11_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n82
objectName: "n82"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope11_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Adicionar pasta a Locais"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget&&$qml.app.contextTarget.directory)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("addPlace")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":93,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope12_root
objectName: "n83"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n84
objectName: "n84"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n85
objectName: "n85"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope12_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n86
objectName: "n86"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope12_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope12_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n87
objectName: "n87"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope12_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n88
objectName: "n88"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope12_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n89
objectName: "n89"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope12_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Cor, emblema e \xEDcone\u2026"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget&&$qml.app.contextTarget.directory)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("customizeFolder")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":105,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope13_root
objectName: "n90"
property string hint: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Espa\xE7o"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n91
objectName: "n91"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n92
objectName: "n92"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope13_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n93
objectName: "n93"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope13_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope13_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n94
objectName: "n94"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope13_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n95
objectName: "n95"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope13_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n96
objectName: "n96"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope13_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Pr\xE9-visualizar"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"hint"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget&&!$qml.app.contextTarget.directory&&/\.(pdf|png|jpe?g|webp|gif|bmp|svg|mp4|mkv|webm|mov|avi|m4v|ogv|mpeg|mpg)$/i.test($qml.app.contextTarget.name))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("preview")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":122,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope14_root
objectName: "n97"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n98
objectName: "n98"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n99
objectName: "n99"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope14_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n100
objectName: "n100"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope14_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope14_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n101
objectName: "n101"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope14_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n102
objectName: "n102"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope14_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n103
objectName: "n103"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope14_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Abrir com\u2026"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("openWith",$qml.app.contextTarget?$qml.app.contextTarget.path:$qml.app.state.path)})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":133,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope15_root
objectName: "n104"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n105
objectName: "n105"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n106
objectName: "n106"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope15_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n107
objectName: "n107"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope15_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope15_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n108
objectName: "n108"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope15_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n109
objectName: "n109"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope15_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n110
objectName: "n110"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope15_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Abrir terminal aqui"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.preferences||$qml.app.state.preferences.showTerminal)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("terminal")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":145,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope16_root
objectName: "n111"
property string hint: "F2"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n112
objectName: "n112"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n113
objectName: "n113"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope16_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n114
objectName: "n114"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope16_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope16_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n115
objectName: "n115"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope16_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n116
objectName: "n116"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope16_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n117
objectName: "n117"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope16_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr($qml.app.state.selectionCount>1?"Renomear em lote\u2026":"Renomear\u2026"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"hint"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget&&!$qml.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("rename")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":157,"columnNumber":7,"component":"qml:MenuSeparator"}
MenuSeparator {
id: n118
objectName: "n118"
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":157,"columnNumber":7,"component":"qml:MenuSeparator","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":159,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n119
objectName: "n119"
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":159,"columnNumber":11,"component":"qml:Rectangle","property":"implicitWidth"}
implicitWidth: 236
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":159,"columnNumber":11,"component":"qml:Rectangle","property":"implicitHeight"}
implicitHeight: 1
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":159,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.outline)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":159,"columnNumber":11,"component":"qml:Rectangle","property":"opacity"}
opacity: 0.2
}
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":167,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope17_root
objectName: "n120"
property string hint: "Ctrl+X"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n121
objectName: "n121"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n122
objectName: "n122"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope17_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n123
objectName: "n123"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope17_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope17_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n124
objectName: "n124"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope17_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n125
objectName: "n125"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope17_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n126
objectName: "n126"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope17_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Recortar"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"hint"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.mutating&&$qml.app.state.path.indexOf(":///")<0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("cut")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":180,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope18_root
objectName: "n127"
property string hint: "Ctrl+C"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n128
objectName: "n128"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n129
objectName: "n129"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope18_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n130
objectName: "n130"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope18_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope18_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n131
objectName: "n131"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope18_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n132
objectName: "n132"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope18_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n133
objectName: "n133"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope18_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Copiar"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"hint"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("copy")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":188,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope19_root
objectName: "n134"
property string hint: "Ctrl+V"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n135
objectName: "n135"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n136
objectName: "n136"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope19_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n137
objectName: "n137"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope19_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope19_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n138
objectName: "n138"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope19_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n139
objectName: "n139"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope19_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n140
objectName: "n140"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope19_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Colar"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"hint"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.state.canPaste&&!$qml.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("paste")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":199,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope20_root
objectName: "undoContext"
property string hint: "Ctrl+Z"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n142
objectName: "n142"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n143
objectName: "n143"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope20_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n144
objectName: "n144"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope20_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope20_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n145
objectName: "n145"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope20_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n146
objectName: "n146"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope20_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n147
objectName: "n147"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope20_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"objectName"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.tr("Desfazer"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"hint"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return (q=>!!q.app.state.canUndo&&!q.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return (q=>{q.app.send("undo")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":202,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope21_root
objectName: "emptyTrashContext"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n149
objectName: "n149"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n150
objectName: "n150"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope21_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n151
objectName: "n151"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope21_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope21_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n152
objectName: "n152"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope21_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n153
objectName: "n153"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope21_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n154
objectName: "n154"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope21_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"objectName"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.tr("Esvaziar\u2026"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.state.path==="trash:///")({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return (q=>!q.app.state.mutating&&q.app.state.entries.length>0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return (q=>{q.app.send("fileTool","emptyTrash")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":206,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope22_root
objectName: "trashRestoreContext"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n156
objectName: "n156"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n157
objectName: "n157"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope22_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n158
objectName: "n158"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope22_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope22_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n159
objectName: "n159"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope22_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n160
objectName: "n160"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope22_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n161
objectName: "n161"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope22_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"objectName"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.tr("Restaurar"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.state.path==="trash:///"&&!!q.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return (q=>!q.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return (q=>{q.app.send("restoreTrash")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":209,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope23_root
objectName: "n162"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n163
objectName: "n163"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n164
objectName: "n164"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope23_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n165
objectName: "n165"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope23_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope23_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n166
objectName: "n166"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope23_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n167
objectName: "n167"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope23_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n168
objectName: "n168"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope23_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.tr("Compactar\u2026"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return (q=>!!q.app.contextTarget&&q.app.state.path.indexOf(":///")<0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return (q=>!q.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return (q=>{q.app.send("fileTool","archive")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":212,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope24_root
objectName: "n169"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n170
objectName: "n170"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n171
objectName: "n171"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope24_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n172
objectName: "n172"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope24_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope24_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n173
objectName: "n173"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope24_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n174
objectName: "n174"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope24_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n175
objectName: "n175"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope24_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.tr("Extrair\u2026"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return (q=>!!q.app.contextTarget&&!q.app.contextTarget.directory&&/\.(zip|tar|tgz|gz|xz|bz2|7z|rar)$/i.test(q.app.contextTarget.name))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return (q=>!q.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return (q=>{q.app.send("fileTool","extract")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":215,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope25_root
objectName: "n176"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n177
objectName: "n177"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n178
objectName: "n178"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope25_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n179
objectName: "n179"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope25_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope25_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n180
objectName: "n180"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope25_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n181
objectName: "n181"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope25_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n182
objectName: "n182"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope25_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Mover para\u2026"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.mutating&&$qml.app.state.path.indexOf(":///")<0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("transfer","move")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":227,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope26_root
objectName: "n183"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n184
objectName: "n184"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n185
objectName: "n185"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope26_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n186
objectName: "n186"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope26_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope26_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n187
objectName: "n187"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope26_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n188
objectName: "n188"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope26_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n189
objectName: "n189"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope26_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Copiar para\u2026"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.mutating&&$qml.app.state.path.indexOf(":///")<0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("transfer","copy")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":239,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope27_root
objectName: "n190"
property string hint: "Delete"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n191
objectName: "n191"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n192
objectName: "n192"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope27_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n193
objectName: "n193"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope27_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope27_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n194
objectName: "n194"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope27_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n195
objectName: "n195"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope27_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n196
objectName: "n196"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope27_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Mover para a lixeira"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"hint"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget&&$qml.app.state.path.indexOf(":///")<0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.mutating&&!$qml.app.state.conflict)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("trash")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":246,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope28_root
objectName: "n197"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n198
objectName: "n198"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n199
objectName: "n199"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope28_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n200
objectName: "n200"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope28_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope28_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n201
objectName: "n201"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope28_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n202
objectName: "n202"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope28_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n203
objectName: "n203"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope28_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Copiar caminho"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.clipboard.text=$qml.app.contextTarget.path;$qml.clipboard.selectAll();$qml.clipboard.copy()})({"app": app, "clipboard": ndScope0_clipboard}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":256,"columnNumber":7,"component":"qml:MenuSeparator"}
MenuSeparator {
id: n204
objectName: "n204"
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":256,"columnNumber":7,"component":"qml:MenuSeparator","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":258,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n205
objectName: "n205"
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":258,"columnNumber":11,"component":"qml:Rectangle","property":"implicitWidth"}
implicitWidth: 236
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":258,"columnNumber":11,"component":"qml:Rectangle","property":"implicitHeight"}
implicitHeight: 1
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":258,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.outline)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":258,"columnNumber":11,"component":"qml:Rectangle","property":"opacity"}
opacity: 0.2
}
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":266,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope29_root
objectName: "n206"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n207
objectName: "n207"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n208
objectName: "n208"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope29_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n209
objectName: "n209"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope29_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope29_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n210
objectName: "n210"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope29_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n211
objectName: "n211"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope29_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n212
objectName: "n212"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope29_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Nova pasta"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("create","folder")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":272,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope30_root
objectName: "n213"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n214
objectName: "n214"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n215
objectName: "n215"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope30_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n216
objectName: "n216"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope30_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope30_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n217
objectName: "n217"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope30_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n218
objectName: "n218"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope30_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n219
objectName: "n219"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope30_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Novo arquivo vazio"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("create","file")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":278,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope31_root
objectName: "n220"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n221
objectName: "n221"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n222
objectName: "n222"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope31_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n223
objectName: "n223"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope31_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope31_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n224
objectName: "n224"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope31_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n225
objectName: "n225"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope31_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n226
objectName: "n226"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope31_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Atualizar"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("refresh")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":284,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope32_root
objectName: "folderNewTab"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n228
objectName: "n228"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n229
objectName: "n229"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope32_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n230
objectName: "n230"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope32_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope32_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n231
objectName: "n231"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope32_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n232
objectName: "n232"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope32_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n233
objectName: "n233"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope32_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"objectName"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Abrir em nova aba"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return (q=>!!q.app.contextTarget&&q.app.contextTarget.directory)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return (q=>{if(q.app.contextTarget&&q.app.contextTarget.directory)q.app.send("newTab",q.app.contextTarget.path)})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileContextMenus.tsx","lineNumber":287,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem"}
MenuItem {
id: ndScope33_root
objectName: "n234"
property string hint: ""
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?36:0)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"indicator"}
indicator: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item"}
Item {
id: n235
objectName: "n235"
width: 0
height: 0
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":30,"columnNumber":20,"component":"qml:Item","property":"height"}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"leftPadding"}
leftPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"rightPadding"}
rightPadding: 12
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n236
objectName: "n236"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.35)({"root": ndScope33_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":34,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n237
objectName: "n237"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checked?"\u2713":"")({"root": ndScope33_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.checkable)({"root": ndScope33_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.minimumWidth"}
Layout.minimumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"Layout.maximumWidth"}
Layout.maximumWidth: 16
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":39,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Style.primary)({}); })()
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n238
objectName: "n238"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope33_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":45,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
}

// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n239
objectName: "n239"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.hint)({"root": ndScope33_root}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceVariantText)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":51,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 12
}
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n240
objectName: "n240"
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":59,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.highlighted?Style.withAlpha(Style.primary,.15):"transparent")({"root": ndScope33_root}); })()
}
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Propriedades"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.contextTarget)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible)({}); })()
// @nandomo-source {"fileName":"src/native/ContextAction.tsx","lineNumber":23,"columnNumber":7,"component":"qml:MenuItem","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("properties",$qml.app.contextTarget.path)})({"app": app}, ...arguments); })(); }
}
}
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":160,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n241
objectName: "n241"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":160,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+F"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":160,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return (q=>!q.app.state.modalsOpen)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":160,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{const search=$qml.app.findUi("fileSearch",$qml.app.toolbarObject);if(search&&search.visible){search.forceActiveFocus();search.selectAll()}else{const button=$qml.app.findUi("toolbarSearch",$qml.app.toolbarObject);if(button)button.clicked()}})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":165,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n242
objectName: "n242"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":165,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+Z"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":165,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.state.canUndo&&!$qml.app.state.modalsOpen&&!($qml.window.activeFocusItem&&typeof $qml.window.activeFocusItem.cursorPosition!=="undefined"))({"app": app, "window": ndScope0_window}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":165,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("undo")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":167,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n243
objectName: "n243"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":167,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+C"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":167,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.state.selectionCount&&!$qml.app.state.mutating&&!$qml.app.state.modalsOpen&&!($qml.window.activeFocusItem&&typeof $qml.window.activeFocusItem.cursorPosition!=="undefined"))({"app": app, "window": ndScope0_window}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":167,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("copy")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":174,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n244
objectName: "n244"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":174,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+X"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":174,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.state.selectionCount&&!$qml.app.state.mutating&&!$qml.app.state.modalsOpen&&!($qml.window.activeFocusItem&&typeof $qml.window.activeFocusItem.cursorPosition!=="undefined"))({"app": app, "window": ndScope0_window}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":174,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("cut")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":181,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n245
objectName: "n245"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":181,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+V"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":181,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.state.canPaste&&!$qml.app.state.mutating&&!$qml.app.state.modalsOpen&&!($qml.window.activeFocusItem&&typeof $qml.window.activeFocusItem.cursorPosition!=="undefined"))({"app": app, "window": ndScope0_window}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":181,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("paste")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":188,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n246
objectName: "n246"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":188,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Ctrl+A"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":188,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.state.entries.length&&!$qml.app.state.modalsOpen&&!($qml.window.activeFocusItem&&typeof $qml.window.activeFocusItem.cursorPosition!=="undefined"))({"app": app, "window": ndScope0_window}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":188,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("selectAll")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":195,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n247
objectName: "n247"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":195,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Delete"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":195,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.modalsOpen&&$qml.app.state.selectionCount>0&&!$qml.app.state.mutating&&$qml.app.state.path.indexOf(":///")<0&&(!$qml.window.activeFocusItem||typeof $qml.window.activeFocusItem.text!=="string"))({"app": app, "window": ndScope0_window}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":195,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("trash")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":200,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n248
objectName: "n248"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":200,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Alt+Return"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":200,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.modalsOpen&&!!$qml.app.state.selected&&!($qml.window.activeFocusItem&&typeof $qml.window.activeFocusItem.cursorPosition!=="undefined"))({"app": app, "window": ndScope0_window}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":200,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("properties")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":201,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n249
objectName: "n249"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":201,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "F2"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":201,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.modalsOpen&&$qml.app.state.selectionCount===1&&!($qml.window.activeFocusItem&&typeof $qml.window.activeFocusItem.cursorPosition!=="undefined"))({"app": app, "window": ndScope0_window}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":201,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("rename")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":208,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n250
objectName: "n250"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":208,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Space"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":208,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.modalsOpen&&$qml.app.state.selectionCount===1&&!!$qml.app.state.selected&&!($qml.window.activeFocusItem&&typeof $qml.window.activeFocusItem.cursorPosition!=="undefined"))({"app": app, "window": ndScope0_window}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":208,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("preview")})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":215,"columnNumber":7,"component":"qml:Shortcut"}
Shortcut {
id: n251
objectName: "n251"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":215,"columnNumber":7,"component":"qml:Shortcut","property":"sequence"}
sequence: "Escape"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":215,"columnNumber":7,"component":"qml:Shortcut","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.modalsOpen&&!($qml.window.activeFocusItem&&typeof $qml.window.activeFocusItem.cursorPosition!=="undefined"))({"app": app, "window": ndScope0_window}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":215,"columnNumber":7,"component":"qml:Shortcut","property":"onActivated"}
onActivated: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.send("select",null)})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":225,"columnNumber":7,"component":"qml:ColumnLayout"}
ColumnLayout {
id: ndScope0_fileContent
objectName: "n252"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":225,"columnNumber":7,"component":"qml:ColumnLayout","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":225,"columnNumber":7,"component":"qml:ColumnLayout","property":"focus"}
focus: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":225,"columnNumber":7,"component":"qml:ColumnLayout","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":225,"columnNumber":7,"component":"qml:ColumnLayout","property":"anchors.margins"}
anchors.margins: 12
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":225,"columnNumber":7,"component":"qml:ColumnLayout","property":"spacing"}
spacing: 8
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":225,"columnNumber":7,"component":"qml:ColumnLayout","property":"Keys.onPressed"}
Keys.onPressed: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,event)=>{if($qml.app.state.modalsOpen||$qml.window.activeFocusItem&&typeof $qml.window.activeFocusItem.cursorPosition!=="undefined")return;var entries=$qml.app.state.entries||[];if(!entries.length)return;var extend=!!(event.modifiers&Qt.ShiftModifier);var mode=extend?"range":"replace";if(event.key===Qt.Key_Home){$qml.app.send("selectPath",{path:entries[0].path,mode});$qml.app.revealKeyboard();event.accepted=true;return}if(event.key===Qt.Key_End){$qml.app.send("selectPath",{path:entries[entries.length-1].path,mode});$qml.app.revealKeyboard();event.accepted=true;return}var view=$qml.app.state.view;var row=view==="grid"?Math.max(1,Math.floor($qml.filesGrid.width/$qml.filesGrid.cellWidth)):1;var axis="row";var delta=0;if(event.key===Qt.Key_Down)delta=row;else if(event.key===Qt.Key_Up)delta=-row;else if(view==="columns"&&event.key===Qt.Key_Right){axis="column";delta=1}else if(view==="columns"&&event.key===Qt.Key_Left){axis="column";delta=-1}else if(view==="grid"&&event.key===Qt.Key_Right){axis="index";delta=1}else if(view==="grid"&&event.key===Qt.Key_Left){axis="index";delta=-1}else return;$qml.app.send("selectStep",{axis,delta,extend});$qml.app.revealKeyboard();event.accepted=true})({"app": app, "window": ndScope0_window, "filesGrid": ndScope0_filesGrid}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":225,"columnNumber":7,"component":"qml:ColumnLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":225,"columnNumber":7,"component":"qml:ColumnLayout"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":225,"columnNumber":7,"component":"qml:ColumnLayout"}


// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":286,"columnNumber":9,"component":"qml:Item"}
Item {
id: ndScope0_toolbarSlot
objectName: "n253"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":286,"columnNumber":9,"component":"qml:Item","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":286,"columnNumber":9,"component":"qml:Item","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":286,"columnNumber":9,"component":"qml:Item","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.toolbarObject?$qml.app.toolbarObject.implicitHeight:92)({"app": app}); })()
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":293,"columnNumber":9,"component":"qml:RowLayout"}
RowLayout {
id: n254
objectName: "n254"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":293,"columnNumber":9,"component":"qml:RowLayout","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":293,"columnNumber":9,"component":"qml:RowLayout","property":"Layout.fillHeight"}
Layout.fillHeight: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":293,"columnNumber":9,"component":"qml:RowLayout","property":"spacing"}
spacing: 12
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":293,"columnNumber":9,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":293,"columnNumber":9,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":298,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n255
objectName: "n255"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":298,"columnNumber":11,"component":"qml:Rectangle","property":"Layout.preferredWidth"}
Layout.preferredWidth: 220
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":298,"columnNumber":11,"component":"qml:Rectangle","property":"Layout.fillHeight"}
Layout.fillHeight: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":298,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 8
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":298,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.lighter($qml.theme.surfaceContainer,1.2))({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":298,"columnNumber":11,"component":"qml:Rectangle","property":"children"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":306,"columnNumber":13,"component":"qml:ScrollView"}
ScrollView {
id: ndScope0_sidebarScroll
objectName: "n256"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":306,"columnNumber":13,"component":"qml:ScrollView","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":306,"columnNumber":13,"component":"qml:ScrollView","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":306,"columnNumber":13,"component":"qml:ScrollView","property":"anchors.margins"}
anchors.margins: 12
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":306,"columnNumber":13,"component":"qml:ScrollView","property":"clip"}
clip: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":306,"columnNumber":13,"component":"qml:ScrollView","property":"contentWidth"}
contentWidth: (() => { const __name = function(fn) { return fn; }; return ($qml=>availableWidth)({}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":306,"columnNumber":13,"component":"qml:ScrollView","property":"children"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":313,"columnNumber":15,"component":"qml:Item"}
Item {
id: ndScope0_sidebarSlot
objectName: "n257"
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.sidebarScroll.availableWidth)({"sidebarScroll": ndScope0_sidebarScroll}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":313,"columnNumber":15,"component":"qml:Item","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":313,"columnNumber":15,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":313,"columnNumber":15,"component":"qml:Item","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.sidebarObject?$qml.app.sidebarObject.implicitHeight:0)({"app": app}); })()
}
}
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":327,"columnNumber":11,"component":"qml:ColumnLayout"}
ColumnLayout {
id: n258
objectName: "n258"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":327,"columnNumber":11,"component":"qml:ColumnLayout","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":327,"columnNumber":11,"component":"qml:ColumnLayout","property":"Layout.fillHeight"}
Layout.fillHeight: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":327,"columnNumber":11,"component":"qml:ColumnLayout","property":"spacing"}
spacing: 8
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":327,"columnNumber":11,"component":"qml:ColumnLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":332,"columnNumber":13}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":45,"columnNumber":3}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":46,"columnNumber":5,"component":"qml:StackLayout"}
StackLayout {
id: ndScope0_fileViews
objectName: "n259"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":46,"columnNumber":5,"component":"qml:StackLayout","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":46,"columnNumber":5,"component":"qml:StackLayout","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":46,"columnNumber":5,"component":"qml:StackLayout","property":"Layout.fillHeight"}
Layout.fillHeight: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":46,"columnNumber":5,"component":"qml:StackLayout","property":"currentIndex"}
currentIndex: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.view==="grid"?1:$qml.app.state.view==="columns"?2:0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":46,"columnNumber":5,"component":"qml:StackLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":46,"columnNumber":5,"component":"qml:StackLayout"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView"}
ListView {
id: ndScope0_filesList
objectName: "filesList"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView","property":"objectName"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView","property":"onWidthChanged"}
onWidthChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.revealSelection()})({"app": app}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView","property":"onHeightChanged"}
onHeightChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.revealSelection()})({"app": app}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView","property":"clip"}
clip: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView","property":"model"}
model: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.entries)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView","property":"ScrollBar.vertical"}
ScrollBar.vertical: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":69,"columnNumber":37,"component":"qml:ScrollBar"}
ScrollBar {
id: n261
objectName: "n261"
}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView","property":"delegate"}
delegate: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n262
objectName: (() => { const __name = function(fn) { return fn; }; return ($qml=>"listRow:"+modelData.path)({}); })()
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>ListView.view.width)({}); })()
height: 42
required property var modelData
required property int index
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"width"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"height"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 0
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"objectName"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"Accessible.role"}
Accessible.role: (() => { const __name = function(fn) { return fn; }; return (()=>Accessible.ListItem)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"Accessible.focusable"}
Accessible.focusable: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"Accessible.selected"}
Accessible.selected: (() => { const __name = function(fn) { return fn; }; return (q=>!!q.app.state.selection&&q.app.state.selection.indexOf(modelData.path)>=0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"Accessible.name"}
Accessible.name: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.name+", "+$qml.app.tr(modelData.directory?"Pasta":"Arquivos")+", "+$qml.app.state.path)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.selection&&$qml.app.state.selection.indexOf(modelData.path)>=0?$qml.theme.primaryContainer:$qml.rowMouse.containsMouse?$qml.theme.surfaceContainerHigh:"transparent")({"app": app, "theme": ndScope0_theme, "rowMouse": ndScope0_rowMouse}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":71,"columnNumber":11,"component":"qml:Rectangle"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":105,"columnNumber":13,"component":"qml:Behavior"}
Behavior on color {
id: n263
objectName: "n263"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":105,"columnNumber":13,"component":"qml:Behavior","property":"qmlOn"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":105,"columnNumber":13,"component":"qml:Behavior","property":"animation"}
animation: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":105,"columnNumber":52,"component":"qml:ColorAnimation"}
ColorAnimation {
id: n264
objectName: "n264"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":105,"columnNumber":52,"component":"qml:ColorAnimation","property":"duration"}
duration: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.preferences&&$qml.app.state.preferences.reduceAnimations?0:90)({"app": app}); })()
}
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":106,"columnNumber":13,"component":"qml:RowLayout"}
RowLayout {
id: n265
objectName: "n265"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":106,"columnNumber":13,"component":"qml:RowLayout","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":106,"columnNumber":13,"component":"qml:RowLayout","property":"anchors.margins"}
anchors.margins: 8
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":106,"columnNumber":13,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":106,"columnNumber":13,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":110,"columnNumber":15}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item"}
Item {
id: ndScope34_root
objectName: "n266"
property url source: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.fileIcon(modelData.icon))({"app": app}); })()
property url fallbackSource: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.state.path==="applications:///"?q.app.fileIcon("package-x-generic"):"")({"app": app}); })()
property color tint: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.folderColor||"transparent")({}); })()
property url emblem: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.emblem?$qml.app.fileIcon(modelData.emblem):"")({"app": app}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"fallbackSource"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"source"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"tint"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"emblem"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"Layout.preferredWidth"}
Layout.preferredWidth: 24
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"Layout.preferredHeight"}
Layout.preferredHeight: 24
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"children"}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item"}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image"}
Image {
id: ndScope34_image
objectName: "n267"
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.source)({"root": ndScope34_root}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"sourceSize"}
sourceSize: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.size(192,192))({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"fillMode"}
fillMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Image.PreserveAspectFit)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.tint.a===0&&!($qml.image.status===Image.Error&&String($qml.root.fallbackSource).length>0))({"root": ndScope34_root, "image": ndScope34_image}); })()
}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Image"}
Image {
id: n268
objectName: "n268"
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Image","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return (()=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Image","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return (q=>q.image.status===Image.Error||!String(q.root.source).length?q.root.fallbackSource:"")({"root": ndScope34_root, "image": ndScope34_image}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Image","property":"sourceSize"}
sourceSize: (() => { const __name = function(fn) { return fn; }; return (()=>Qt.size(192,192))({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Image","property":"fillMode"}
fillMode: (() => { const __name = function(fn) { return fn; }; return (()=>Image.PreserveAspectFit)({}); })()
}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect"}
MultiEffect {
id: n269
objectName: "n269"
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.image)({"image": ndScope34_image}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.image)({"image": ndScope34_image}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.tint.a>0)({"root": ndScope34_root}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect","property":"colorization"}
colorization: 1
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect","property":"colorizationColor"}
colorizationColor: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.tint)({"root": ndScope34_root}); })()
}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image"}
Image {
id: n270
objectName: "n270"
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>Math.max(14,parent.width*.3))({}); })()
height: (() => { const __name = function(fn) { return fn; }; return ($qml=>width)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"anchors.right"}
anchors.right: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent.right)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"anchors.bottom"}
anchors.bottom: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent.bottom)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"width"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"height"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.emblem)({"root": ndScope34_root}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>String($qml.root.emblem).length>0)({"root": ndScope34_root}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"fillMode"}
fillMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Image.PreserveAspectFit)({}); })()
}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item"}

}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":125,"columnNumber":15,"component":"qml:Label"}
Label {
id: n271
objectName: "n271"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":125,"columnNumber":15,"component":"qml:Label","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.name)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":125,"columnNumber":15,"component":"qml:Label","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":125,"columnNumber":15,"component":"qml:Label","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceText)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":125,"columnNumber":15,"component":"qml:Label","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":125,"columnNumber":15,"component":"qml:Label","property":"elide"}
elide: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.ElideRight)({}); })()
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":132,"columnNumber":15,"component":"qml:Label"}
Label {
id: n272
objectName: "n272"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":132,"columnNumber":15,"component":"qml:Label","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.directory?$qml.app.tr("Pasta"):$qml.app.sizeText(modelData.size))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":132,"columnNumber":15,"component":"qml:Label","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceVariantText)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":132,"columnNumber":15,"component":"qml:Label","property":"Layout.preferredWidth"}
Layout.preferredWidth: 100
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":144,"columnNumber":15,"component":"qml:Label"}
Label {
id: n273
objectName: "n273"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":144,"columnNumber":15,"component":"qml:Label","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.formatDateTime(new Date(modelData.modified),"dd/MM/yyyy"))({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":144,"columnNumber":15,"component":"qml:Label","property":"elide"}
elide: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.ElideRight)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":144,"columnNumber":15,"component":"qml:Label","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceVariantText)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":144,"columnNumber":15,"component":"qml:Label","property":"Layout.preferredWidth"}
Layout.preferredWidth: 95
}
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item"}
Item {
id: ndScope0_dragProxy
objectName: "n274"
width: 1
height: 1
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"height"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"Drag.active"}
Drag.active: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.rowMouse.nbDragging)({"rowMouse": ndScope0_rowMouse}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"Drag.dragType"}
Drag.dragType: (() => { const __name = function(fn) { return fn; }; return ($qml=>Drag.Automatic)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"Drag.supportedActions"}
Drag.supportedActions: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.CopyAction|Qt.MoveAction)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"Drag.imageSource"}
Drag.imageSource: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.fileIcon(modelData.icon))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"Drag.hotSpot.x"}
Drag.hotSpot.x: 24
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"Drag.hotSpot.y"}
Drag.hotSpot.y: 24
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"Drag.proposedAction"}
Drag.proposedAction: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.CopyAction)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"Drag.mimeData"}
Drag.mimeData: (() => { const __name = function(fn) { return fn; }; return ($qml=>({"text/uri-list":$qml.app.dragPayload(modelData.path)}))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"Drag.onActiveChanged"}
Drag.onActiveChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{if($qml.dragProxy.Drag.active)return;$qml.rowMouse.nbDragging=false;$qml.dragProxy.x=0;$qml.dragProxy.y=0})({"dragProxy": ndScope0_dragProxy, "rowMouse": ndScope0_rowMouse}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":156,"columnNumber":13,"component":"qml:Item","property":"Drag.onDragFinished"}
Drag.onDragFinished: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(action=>{$qml.rowMouse.nbDragging=false;$qml.dragProxy.x=0;$qml.dragProxy.y=0;if(action!==Qt.IgnoreAction)$qml.app.send("refresh")})(...args))({"app": app, "dragProxy": ndScope0_dragProxy, "rowMouse": ndScope0_rowMouse}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":220,"columnNumber":13,"component":"qml:DropArea"}
DropArea {
id: n275
objectName: "n275"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":220,"columnNumber":13,"component":"qml:DropArea","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":220,"columnNumber":13,"component":"qml:DropArea","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.directory&&!$qml.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":220,"columnNumber":13,"component":"qml:DropArea","property":"onEntered"}
onEntered: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(drag=>{if(!drag.hasUrls)drag.accepted=false})(...args))({}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":220,"columnNumber":13,"component":"qml:DropArea","property":"onDropped"}
onDropped: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(drop=>$qml.app.dropFiles(drop,modelData.path))(...args))({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea"}
MouseArea {
id: ndScope0_rowMouse
objectName: "n276"
property bool nbDragging: false
property real nbOriginX: 0
property real nbOriginY: 0
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"hoverEnabled"}
hoverEnabled: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"acceptedButtons"}
acceptedButtons: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.LeftButton|Qt.RightButton)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"drag.target"}
drag.target: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.dragProxy)({"dragProxy": ndScope0_dragProxy}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"drag.axis"}
drag.axis: (() => { const __name = function(fn) { return fn; }; return ($qml=>Drag.XAndYAxis)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"onPressed"}
onPressed: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{$qml.fileContent.forceActiveFocus();$qml.rowMouse.nbDragging=false;$qml.rowMouse.nbOriginX=mouse.x;$qml.rowMouse.nbOriginY=mouse.y;$qml.dragProxy.Drag.proposedAction=mouse.modifiers&Qt.ShiftModifier?Qt.MoveAction:Qt.CopyAction})(...args))({"dragProxy": ndScope0_dragProxy, "rowMouse": ndScope0_rowMouse, "fileContent": ndScope0_fileContent}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"onPositionChanged"}
onPositionChanged: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{if($qml.rowMouse.nbDragging||!$qml.rowMouse.pressed||!(mouse.buttons&Qt.LeftButton))return;var dx=mouse.x-$qml.rowMouse.nbOriginX;var dy=mouse.y-$qml.rowMouse.nbOriginY;if(dx*dx+dy*dy<36)return;$qml.dragProxy.x=mouse.x-24;$qml.dragProxy.y=mouse.y-24;$qml.rowMouse.nbDragging=true})(...args))({"dragProxy": ndScope0_dragProxy, "rowMouse": ndScope0_rowMouse}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"onReleased"}
onReleased: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.rowMouse.nbDragging=false;$qml.dragProxy.x=0;$qml.dragProxy.y=0})({"dragProxy": ndScope0_dragProxy, "rowMouse": ndScope0_rowMouse}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"onCanceled"}
onCanceled: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.rowMouse.nbDragging=false;$qml.dragProxy.x=0;$qml.dragProxy.y=0})({"dragProxy": ndScope0_dragProxy, "rowMouse": ndScope0_rowMouse}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"onClicked"}
onClicked: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{if(mouse.button===Qt.RightButton){var p=mapToItem($qml.window.contentItem,mouse.x,mouse.y);$qml.app.context(parent.modelData,p.x,p.y)}else{var mode=mouse.modifiers&Qt.ControlModifier?"toggle":mouse.modifiers&Qt.ShiftModifier?"range":"replace";$qml.app.send("selectPath",{path:parent.modelData.path,mode});if(mode==="replace"&&$qml.app.state.preferences&&$qml.app.state.preferences.singleClick)$qml.app.open(parent.modelData)}})(...args))({"app": app, "window": ndScope0_window}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":241,"columnNumber":13,"component":"qml:MouseArea","property":"onDoubleClicked"}
onDoubleClicked: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{if(mouse.button===Qt.LeftButton&&!($qml.app.state.preferences&&$qml.app.state.preferences.singleClick))$qml.app.open(parent.modelData)})(...args))({"app": app}, ...arguments); })(); }
}
}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":58,"columnNumber":7,"component":"qml:ListView"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":347,"columnNumber":9,"component":"qml:MouseArea"}
MouseArea {
id: n277
objectName: "n277"
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.filesList.width)({"filesList": ndScope0_filesList}); })()
height: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.filesList.height)({"filesList": ndScope0_filesList}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":347,"columnNumber":9,"component":"qml:MouseArea","property":"parent"}
parent: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.filesList)({"filesList": ndScope0_filesList}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":347,"columnNumber":9,"component":"qml:MouseArea","property":"width"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":347,"columnNumber":9,"component":"qml:MouseArea","property":"height"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":347,"columnNumber":9,"component":"qml:MouseArea","property":"z"}
z: 1
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":347,"columnNumber":9,"component":"qml:MouseArea","property":"onPressed"}
onPressed: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>{const mouse=args[0];const view=$qml.filesList;const p=parent.mapToItem(view.contentItem,mouse.x,mouse.y);if(view.indexAt(p.x,p.y)>=0)mouse.accepted=false})({"filesList": ndScope0_filesList}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":347,"columnNumber":9,"component":"qml:MouseArea","property":"onClicked"}
onClicked: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{if(mouse.button!==Qt.LeftButton)return;if($qml.app.state.modalsOpen||$qml.app.state.mutating)return;if(!($qml.app.state.selection&&$qml.app.state.selection.length))return;$qml.app.send("select",null)})(...args))({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":370,"columnNumber":9,"component":"qml:DropArea"}
DropArea {
id: n278
objectName: "n278"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":370,"columnNumber":9,"component":"qml:DropArea","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":370,"columnNumber":9,"component":"qml:DropArea","property":"z"}
z: 5
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":370,"columnNumber":9,"component":"qml:DropArea","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.mutating&&$qml.app.state.path.indexOf(":///")<0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":370,"columnNumber":9,"component":"qml:DropArea","property":"onEntered"}
onEntered: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(drag=>{if(!drag.hasUrls)drag.accepted=false})(...args))({}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":370,"columnNumber":9,"component":"qml:DropArea","property":"onDropped"}
onDropped: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(drop=>{var point2=mapToItem($qml.filesList.contentItem,drop.x,drop.y);var index=$qml.filesList.indexAt(point2.x,point2.y);var entry=index>=0?$qml.app.state.entries[index]:null;$qml.app.dropFiles(drop,entry&&entry.directory?entry.path:$qml.app.state.path)})(...args))({"app": app, "filesList": ndScope0_filesList}, ...arguments); })(); }
}
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView"}
GridView {
id: ndScope0_filesGrid
objectName: "filesGrid"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"objectName"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"onWidthChanged"}
onWidthChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.revealSelection()})({"app": app}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"onHeightChanged"}
onHeightChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.revealSelection()})({"app": app}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"onCellWidthChanged"}
onCellWidthChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.revealSelection()})({"app": app}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"onCellHeightChanged"}
onCellHeightChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.revealSelection()})({"app": app}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"clip"}
clip: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"model"}
model: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.entries)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"cellWidth"}
cellWidth: (() => { const __name = function(fn) { return fn; }; return ($qml=>Math.max(150,width/Math.max(1,Math.floor(width/(($qml.app.state.preferences?$qml.app.state.preferences.gridSize:96)+64)))))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"cellHeight"}
cellHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>($qml.app.state.preferences?$qml.app.state.preferences.gridSize:96)+58)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"ScrollBar.vertical"}
ScrollBar.vertical: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":446,"columnNumber":37,"component":"qml:ScrollBar"}
ScrollBar {
id: n280
objectName: "n280"
}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"delegate"}
delegate: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n281
objectName: "n281"
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>GridView.view.cellWidth-12)({}); })()
height: (() => { const __name = function(fn) { return fn; }; return ($qml=>GridView.view.cellHeight-8)({}); })()
required property var modelData
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle","property":"Accessible.role"}
Accessible.role: (() => { const __name = function(fn) { return fn; }; return (()=>Accessible.ListItem)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle","property":"Accessible.focusable"}
Accessible.focusable: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle","property":"Accessible.selected"}
Accessible.selected: (() => { const __name = function(fn) { return fn; }; return (q=>!!q.app.state.selection&&q.app.state.selection.indexOf(modelData.path)>=0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle","property":"Accessible.name"}
Accessible.name: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.name+", "+$qml.app.tr(modelData.directory?"Pasta":"Arquivos"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle","property":"width"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle","property":"height"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.cornerRadius)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.selection&&$qml.app.state.selection.indexOf(modelData.path)>=0?$qml.theme.primaryContainer:$qml.gridMouse.containsMouse?$qml.theme.surfaceContainerHigh:"transparent")({"app": app, "theme": ndScope0_theme, "gridMouse": ndScope0_gridMouse}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":448,"columnNumber":11,"component":"qml:Rectangle"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":478,"columnNumber":13,"component":"qml:Behavior"}
Behavior on color {
id: n282
objectName: "n282"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":478,"columnNumber":13,"component":"qml:Behavior","property":"qmlOn"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":478,"columnNumber":13,"component":"qml:Behavior","property":"animation"}
animation: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":478,"columnNumber":52,"component":"qml:ColorAnimation"}
ColorAnimation {
id: n283
objectName: "n283"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":478,"columnNumber":52,"component":"qml:ColorAnimation","property":"duration"}
duration: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.preferences&&$qml.app.state.preferences.reduceAnimations?0:90)({"app": app}); })()
}
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":479,"columnNumber":13,"component":"qml:ColumnLayout"}
ColumnLayout {
id: n284
objectName: "n284"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":479,"columnNumber":13,"component":"qml:ColumnLayout","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":479,"columnNumber":13,"component":"qml:ColumnLayout","property":"anchors.margins"}
anchors.margins: 8
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":479,"columnNumber":13,"component":"qml:ColumnLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":479,"columnNumber":13,"component":"qml:ColumnLayout"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":483,"columnNumber":15,"component":"qml:Item"}
Item {
id: n285
objectName: "n285"
readonly property bool hasPreview: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.remote&&(!$qml.app.state.preferences||$qml.app.state.preferences.thumbnails)&&!modelData.directory&&/\.(pdf|png|jpe?g|webp|gif|bmp|svg)$/i.test(modelData.name))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":483,"columnNumber":15,"component":"qml:Item","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":483,"columnNumber":15,"component":"qml:Item","property":"Layout.alignment"}
Layout.alignment: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.AlignHCenter)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":483,"columnNumber":15,"component":"qml:Item","property":"Layout.preferredWidth"}
Layout.preferredWidth: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.preferences?$qml.app.state.preferences.gridSize:96)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":483,"columnNumber":15,"component":"qml:Item","property":"Layout.preferredHeight"}
Layout.preferredHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>Layout.preferredWidth)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":483,"columnNumber":15,"component":"qml:Item","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":483,"columnNumber":15,"component":"qml:Item"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":521,"columnNumber":17}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item"}
Item {
id: ndScope35_root
objectName: "n286"
property url source: (() => { const __name = function(fn) { return fn; }; return ($qml=>($qml.app.state.videoThumbnails||{})[modelData.path]||$qml.app.fileIcon(modelData.icon))({"app": app}); })()
property url fallbackSource: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.state.path==="applications:///"?q.app.fileIcon("package-x-generic"):"")({"app": app}); })()
property color tint: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.folderColor||"transparent")({}); })()
property url emblem: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.emblem?$qml.app.fileIcon(modelData.emblem):"")({"app": app}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"fallbackSource"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"source"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"tint"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"emblem"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!parent.hasPreview||$qml.thumbnail.status===Loader.Error)({"thumbnail": ndScope0_thumbnail}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item","property":"children"}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item"}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image"}
Image {
id: ndScope35_image
objectName: "n287"
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.source)({"root": ndScope35_root}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"sourceSize"}
sourceSize: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.size(192,192))({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"fillMode"}
fillMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Image.PreserveAspectFit)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":34,"columnNumber":7,"component":"qml:Image","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.tint.a===0&&!($qml.image.status===Image.Error&&String($qml.root.fallbackSource).length>0))({"root": ndScope35_root, "image": ndScope35_image}); })()
}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Image"}
Image {
id: n288
objectName: "n288"
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Image","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return (()=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Image","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return (q=>q.image.status===Image.Error||!String(q.root.source).length?q.root.fallbackSource:"")({"root": ndScope35_root, "image": ndScope35_image}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Image","property":"sourceSize"}
sourceSize: (() => { const __name = function(fn) { return fn; }; return (()=>Qt.size(192,192))({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Image","property":"fillMode"}
fillMode: (() => { const __name = function(fn) { return fn; }; return (()=>Image.PreserveAspectFit)({}); })()
}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect"}
MultiEffect {
id: n289
objectName: "n289"
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.image)({"image": ndScope35_image}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.image)({"image": ndScope35_image}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.tint.a>0)({"root": ndScope35_root}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect","property":"colorization"}
colorization: 1
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":47,"columnNumber":7,"component":"qml:MultiEffect","property":"colorizationColor"}
colorizationColor: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.tint)({"root": ndScope35_root}); })()
}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image"}
Image {
id: n290
objectName: "n290"
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>Math.max(14,parent.width*.3))({}); })()
height: (() => { const __name = function(fn) { return fn; }; return ($qml=>width)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"anchors.right"}
anchors.right: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent.right)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"anchors.bottom"}
anchors.bottom: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent.bottom)({}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"width"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"height"}
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.emblem)({"root": ndScope35_root}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>String($qml.root.emblem).length>0)({"root": ndScope35_root}); })()
// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":54,"columnNumber":7,"component":"qml:Image","property":"fillMode"}
fillMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Image.PreserveAspectFit)({}); })()
}

// @nandomo-source {"fileName":"src/native/EntryIcon.tsx","lineNumber":23,"columnNumber":5,"component":"qml:Item"}

}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":543,"columnNumber":17,"component":"qml:Loader"}
Loader {
id: ndScope0_thumbnail
objectName: (() => { const __name = function(fn) { return fn; }; return ($qml=>"thumbnail:"+modelData.path)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":543,"columnNumber":17,"component":"qml:Loader","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":543,"columnNumber":17,"component":"qml:Loader","property":"objectName"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":543,"columnNumber":17,"component":"qml:Loader","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":543,"columnNumber":17,"component":"qml:Loader","property":"active"}
active: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent.hasPreview)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":543,"columnNumber":17,"component":"qml:Loader","property":"sourceComponent"}
sourceComponent: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":554,"columnNumber":21,"component":"qml:Component"}
Component {
id: n292
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":554,"columnNumber":21,"component":"qml:Component","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":555,"columnNumber":23}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle"}
Rectangle {
id: ndScope36_root
objectName: "n293"
property url source: (() => { const __name = function(fn) { return fn; }; return ($qml=>"file://"+modelData.path.split("/").map(encodeURIComponent).join("/"))({}); })()
property string kind: (() => { const __name = function(fn) { return fn; }; return ($qml=>/\.pdf$/i.test(modelData.name)?"pdf":"image")({}); })()
property bool expanded: false
property real zoom: 1
property real angle: 0
property int resetToken: 0
property real panX: 0
property real panY: 0
readonly property string previewStatus: (() => { const __name = function(fn) { return fn; }; return ($qml=>kind==="image"?$qml.image.status===Image.Ready?"ready":$qml.image.status===Image.Error?"error":"loading":kind==="pdf"?$qml.pdf.status===Loader.Error?"error":$qml.pdf.item?$qml.pdf.item.previewStatus:"loading":kind==="video"?$qml.video.status===Loader.Error?"error":$qml.video.item?$qml.video.item.previewStatus:"loading":"unsupported")({"image": ndScope36_image, "pdf": ndScope36_pdf, "video": ndScope36_video}); })()
readonly property real aspectRatio: (() => { const __name = function(fn) { return fn; }; return ($qml=>kind==="image"&&$qml.image.implicitHeight>0?$qml.image.implicitWidth/$qml.image.implicitHeight:kind==="pdf"&&$qml.pdf.item?$qml.pdf.item.aspectRatio:kind==="video"&&$qml.video.item?$qml.video.item.aspectRatio:1.4)({"image": ndScope36_image, "pdf": ndScope36_pdf, "video": ndScope36_video}); })()
function panTo() { return (() => { const __name = function(fn) { return fn; }; return (($qml,x,y)=>{var rotated=$qml.root.angle%180!==0;var limitX=Math.max(0,((rotated?$qml.root.height:$qml.root.width)*$qml.root.zoom-$qml.root.width)/2);var limitY=Math.max(0,((rotated?$qml.root.width:$qml.root.height)*$qml.root.zoom-$qml.root.height)/2);$qml.root.panX=Math.max(-limitX,Math.min(limitX,x));$qml.root.panY=Math.max(-limitY,Math.min(limitY,y))})({"root": ndScope36_root}, ...arguments); })(); }
function resetView() { return (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.root.panX=0;$qml.root.panY=0;if($qml.pdf.item)$qml.pdf.item.resetView()})({"root": ndScope36_root, "pdf": ndScope36_pdf}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"qmlMethods"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"onResetTokenChanged"}
onResetTokenChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.root.resetView()})({"root": ndScope36_root}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"onSourceChanged"}
onSourceChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.root.resetView()})({"root": ndScope36_root}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"onZoomChanged"}
onZoomChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.root.panTo($qml.root.panX,$qml.root.panY)})({"root": ndScope36_root}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"onAngleChanged"}
onAngleChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.root.panTo($qml.root.panX,$qml.root.panY)})({"root": ndScope36_root}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceContainerHigh)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"radius"}
radius: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.cornerRadius)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"clip"}
clip: true
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"source"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"kind"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle","property":"children"}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle"}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":107,"columnNumber":9,"component":"qml:Image"}
Image {
id: n294
objectName: "n294"
width: 96
height: 96
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":107,"columnNumber":9,"component":"qml:Image","property":"anchors.centerIn"}
anchors.centerIn: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":107,"columnNumber":9,"component":"qml:Image","property":"width"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":107,"columnNumber":9,"component":"qml:Image","property":"height"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":107,"columnNumber":9,"component":"qml:Image","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.kind==="folder"?Quickshell.iconPath("folder"):"")({"root": ndScope36_root}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":107,"columnNumber":9,"component":"qml:Image","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.kind==="folder")({"root": ndScope36_root}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":107,"columnNumber":9,"component":"qml:Image","property":"fillMode"}
fillMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Image.PreserveAspectFit)({}); })()
}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image"}
Image {
id: ndScope36_image
objectName: "previewImage"
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"objectName"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"scale"}
scale: 1
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"rotation"}
rotation: 0
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"transform"}
transform: 
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":122,"columnNumber":26,"component":"qml:Translate"}
Translate {
id: n296
objectName: "n296"
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":122,"columnNumber":26,"component":"qml:Translate","property":"x"}
x: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.panX)({"root": ndScope36_root}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":122,"columnNumber":26,"component":"qml:Translate","property":"y"}
y: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.panY)({"root": ndScope36_root}); })()
}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"anchors.margins"}
anchors.margins: 8
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.kind==="image")({"root": ndScope36_root}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?$qml.root.source:"")({"root": ndScope36_root}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"asynchronous"}
asynchronous: true
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"autoTransform"}
autoTransform: true
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"fillMode"}
fillMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Image.PreserveAspectFit)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":117,"columnNumber":9,"component":"qml:Image","property":"sourceSize"}
sourceSize: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.expanded?Qt.size(-1,-1):Qt.size($qml.root.width*2,$qml.root.height*2))({"root": ndScope36_root}); })()
}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader"}
Loader {
id: ndScope36_pdf
objectName: "previewPdf"
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader","property":"objectName"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader","property":"scale"}
scale: 1
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader","property":"rotation"}
rotation: 0
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader","property":"transform"}
transform: 
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":143,"columnNumber":26,"component":"qml:Translate"}
Translate {
id: n298
objectName: "n298"
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":143,"columnNumber":26,"component":"qml:Translate","property":"x"}
x: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.panX)({"root": ndScope36_root}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":143,"columnNumber":26,"component":"qml:Translate","property":"y"}
y: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.panY)({"root": ndScope36_root}); })()
}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader","property":"anchors.margins"}
anchors.margins: 8
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader","property":"active"}
active: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.kind==="pdf"&&String($qml.root.source).length>0)({"root": ndScope36_root}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader","property":"sourceComponent"}
sourceComponent: 
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":152,"columnNumber":13,"component":"qml:Component"}
Component {
id: n299
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":152,"columnNumber":13,"component":"qml:Component","property":"children"}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":153,"columnNumber":15}

// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":22,"columnNumber":5,"component":"qml:Item"}
Item {
id: ndScope37_root
objectName: "n300"
property url source: ""
property bool expanded: false
readonly property string previewStatus: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.document.status===PdfDocument.Ready?"ready":$qml.document.status===PdfDocument.Error?"error":"loading")({"document": ndScope37_document}); })()
readonly property real aspectRatio: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.document.status===PdfDocument.Ready?$qml.document.pagePointSize(0).width/$qml.document.pagePointSize(0).height:.707)({"document": ndScope37_document}); })()
function resetView() { return (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.view.resetScale();$qml.view.goToLocation(0,Qt.point(0,0),1)})({"view": ndScope37_view}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":22,"columnNumber":5,"component":"qml:Item","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":22,"columnNumber":5,"component":"qml:Item","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":22,"columnNumber":5,"component":"qml:Item","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":22,"columnNumber":5,"component":"qml:Item","property":"qmlMethods"}
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":22,"columnNumber":5,"component":"qml:Item","property":"children"}

// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":22,"columnNumber":5,"component":"qml:Item"}

// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":55,"columnNumber":7,"component":"qml:Rectangle"}
Rectangle {
id: n301
objectName: "n301"
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":55,"columnNumber":7,"component":"qml:Rectangle","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":55,"columnNumber":7,"component":"qml:Rectangle","property":"color"}
color: "white"
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":55,"columnNumber":7,"component":"qml:Rectangle","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.root.expanded)({"root": ndScope37_root}); })()
}

// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":60,"columnNumber":7,"component":"qml:PdfDocument"}
PdfDocument {
id: ndScope37_document
objectName: "n302"
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":60,"columnNumber":7,"component":"qml:PdfDocument","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":60,"columnNumber":7,"component":"qml:PdfDocument","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.source)({"root": ndScope37_root}); })()
}

// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":64,"columnNumber":7,"component":"qml:PdfPageImage"}
PdfPageImage {
id: n303
objectName: "n303"
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":64,"columnNumber":7,"component":"qml:PdfPageImage","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":64,"columnNumber":7,"component":"qml:PdfPageImage","property":"document"}
document: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.document)({"document": ndScope37_document}); })()
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":64,"columnNumber":7,"component":"qml:PdfPageImage","property":"currentFrame"}
currentFrame: 0
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":64,"columnNumber":7,"component":"qml:PdfPageImage","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.root.expanded)({"root": ndScope37_root}); })()
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":64,"columnNumber":7,"component":"qml:PdfPageImage","property":"fillMode"}
fillMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Image.PreserveAspectFit)({}); })()
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":64,"columnNumber":7,"component":"qml:PdfPageImage","property":"sourceSize.width"}
sourceSize.width: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.width*2)({"root": ndScope37_root}); })()
}

// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":77,"columnNumber":7,"component":"qml:PdfMultiPageView"}
PdfMultiPageView {
id: ndScope37_view
objectName: "pdfPages"
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":77,"columnNumber":7,"component":"qml:PdfMultiPageView","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":77,"columnNumber":7,"component":"qml:PdfMultiPageView","property":"objectName"}
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":77,"columnNumber":7,"component":"qml:PdfMultiPageView","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":77,"columnNumber":7,"component":"qml:PdfMultiPageView","property":"document"}
document: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.document)({"document": ndScope37_document}); })()
// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":77,"columnNumber":7,"component":"qml:PdfMultiPageView","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.expanded)({"root": ndScope37_root}); })()
}

// @nandomo-source {"fileName":"src/native/PdfPreview.tsx","lineNumber":22,"columnNumber":5,"component":"qml:Item"}

}
}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":138,"columnNumber":9,"component":"qml:Loader","property":"onLoaded"}
onLoaded: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{item.source=Qt.binding(function(){return $qml.root.source});item.expanded=Qt.binding(function(){return $qml.root.expanded})})({"root": ndScope36_root}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":165,"columnNumber":9,"component":"qml:Loader"}
Loader {
id: ndScope36_video
objectName: "previewVideoLoader"
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":165,"columnNumber":9,"component":"qml:Loader","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":165,"columnNumber":9,"component":"qml:Loader","property":"objectName"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":165,"columnNumber":9,"component":"qml:Loader","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return (()=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":165,"columnNumber":9,"component":"qml:Loader","property":"anchors.margins"}
anchors.margins: 8
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":165,"columnNumber":9,"component":"qml:Loader","property":"active"}
active: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.visible&&$qml.root.kind==="video"&&String($qml.root.source).length>0)({"root": ndScope36_root}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":165,"columnNumber":9,"component":"qml:Loader","property":"sourceComponent"}
sourceComponent: 
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":168,"columnNumber":28,"component":"qml:Component"}
Component {
id: n306
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":168,"columnNumber":28,"component":"qml:Component","property":"children"}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":168,"columnNumber":42}

// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":10,"columnNumber":10,"component":"qml:Item"}
Item {
id: ndScope38_root
objectName: "n307"
property url source: ""
readonly property string previewStatus: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.video.error!==MediaPlayer.NoError?"error":$qml.video.hasVideo?"ready":"loading")({"video": ndScope38_video}); })()
readonly property real aspectRatio: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.video.implicitHeight>0?$qml.video.implicitWidth/$qml.video.implicitHeight:16/9)({"video": ndScope38_video}); })()
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":10,"columnNumber":10,"component":"qml:Item","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":10,"columnNumber":10,"component":"qml:Item","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":10,"columnNumber":10,"component":"qml:Item","property":"children"}

// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":10,"columnNumber":10,"component":"qml:Item"}

// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":15,"columnNumber":5,"component":"qml:Video"}
Video {
id: ndScope38_video
objectName: "previewVideo"
width: (() => { const __name = function(fn) { return fn; }; return (()=>parent.width)({}); })()
height: (() => { const __name = function(fn) { return fn; }; return (()=>Math.max(0,parent.height-44))({}); })()
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":15,"columnNumber":5,"component":"qml:Video","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":15,"columnNumber":5,"component":"qml:Video","property":"objectName"}
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":15,"columnNumber":5,"component":"qml:Video","property":"width"}
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":15,"columnNumber":5,"component":"qml:Video","property":"height"}
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":15,"columnNumber":5,"component":"qml:Video","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.source)({"root": ndScope38_root}); })()
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":15,"columnNumber":5,"component":"qml:Video","property":"autoPlay"}
autoPlay: false
}

// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":19,"columnNumber":5,"component":"qml:RowLayout"}
RowLayout {
id: n309
objectName: "n309"
width: (() => { const __name = function(fn) { return fn; }; return (()=>parent.width)({}); })()
height: 40
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":19,"columnNumber":5,"component":"qml:RowLayout","property":"height"}
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":19,"columnNumber":5,"component":"qml:RowLayout","property":"width"}
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":19,"columnNumber":5,"component":"qml:RowLayout","property":"anchors.bottom"}
anchors.bottom: (() => { const __name = function(fn) { return fn; }; return (()=>parent.bottom)({}); })()
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":19,"columnNumber":5,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":19,"columnNumber":5,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":21,"columnNumber":7,"component":"qml:Button"}
Button {
id: n310
objectName: "videoPlayPause"
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":21,"columnNumber":7,"component":"qml:Button","property":"objectName"}
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":21,"columnNumber":7,"component":"qml:Button","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr($qml.video.playbackState===MediaPlayer.PlayingState?"Pausar":"Reproduzir"))({"app": app, "video": ndScope38_video}); })()
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":21,"columnNumber":7,"component":"qml:Button","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.previewStatus==="ready")({"root": ndScope38_root}); })()
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":21,"columnNumber":7,"component":"qml:Button","property":"onClicked"}
onClicked: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{if($qml.video.playbackState===MediaPlayer.PlayingState)$qml.video.pause();else $qml.video.play()})({"video": ndScope38_video}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":25,"columnNumber":7,"component":"qml:Slider"}
Slider {
id: n311
objectName: "videoSeek"
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":25,"columnNumber":7,"component":"qml:Slider","property":"objectName"}
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":25,"columnNumber":7,"component":"qml:Slider","property":"from"}
from: 0
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":25,"columnNumber":7,"component":"qml:Slider","property":"to"}
to: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.video.duration)({"video": ndScope38_video}); })()
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":25,"columnNumber":7,"component":"qml:Slider","property":"value"}
value: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.video.position)({"video": ndScope38_video}); })()
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":25,"columnNumber":7,"component":"qml:Slider","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.video.seekable)({"video": ndScope38_video}); })()
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":25,"columnNumber":7,"component":"qml:Slider","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":25,"columnNumber":7,"component":"qml:Slider","property":"Accessible.name"}
Accessible.name: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr("Posi\xE7\xE3o do v\xEDdeo"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/VideoPreview.tsx","lineNumber":25,"columnNumber":7,"component":"qml:Slider","property":"onMoved"}
onMoved: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.video.seek(value)})({"video": ndScope38_video}, ...arguments); })(); }
}
}
}
}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":165,"columnNumber":9,"component":"qml:Loader","property":"onLoaded"}
onLoaded: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{item.source=Qt.binding(function(){return $qml.root.source})})({"root": ndScope36_root}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":170,"columnNumber":9,"component":"qml:Label"}
Label {
id: n312
objectName: "n312"
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent.width-24)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":170,"columnNumber":9,"component":"qml:Label","property":"anchors.centerIn"}
anchors.centerIn: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":170,"columnNumber":9,"component":"qml:Label","property":"width"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":170,"columnNumber":9,"component":"qml:Label","property":"wrapMode"}
wrapMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.Wrap)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":170,"columnNumber":9,"component":"qml:Label","property":"horizontalAlignment"}
horizontalAlignment: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.AlignHCenter)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":170,"columnNumber":9,"component":"qml:Label","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":170,"columnNumber":9,"component":"qml:Label","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.kind!=="folder"&&$qml.root.previewStatus!=="ready")({"root": ndScope36_root}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":170,"columnNumber":9,"component":"qml:Label","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.previewStatus==="unsupported"?$qml.app.tr("Sem pr\xE9via para este formato"):$qml.root.previewStatus==="error"?$qml.app.tr("N\xE3o foi poss\xEDvel carregar a pr\xE9via"):$qml.app.tr("Carregando pr\xE9via\u2026"))({"app": app, "root": ndScope36_root}); })()
}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":193,"columnNumber":9,"component":"qml:MouseArea"}
MouseArea {
id: ndScope36_pan
objectName: "previewPan"
property real originX: 0
property real originY: 0
property real startX: 0
property real startY: 0
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":193,"columnNumber":9,"component":"qml:MouseArea","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":193,"columnNumber":9,"component":"qml:MouseArea","property":"objectName"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":193,"columnNumber":9,"component":"qml:MouseArea","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return (()=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":193,"columnNumber":9,"component":"qml:MouseArea","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.expanded&&$qml.root.previewStatus==="ready"&&($qml.root.kind==="image"||$qml.root.kind==="pdf")&&($qml.root.zoom>1||$qml.root.angle!==0))({"root": ndScope36_root}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":193,"columnNumber":9,"component":"qml:MouseArea","property":"cursorShape"}
cursorShape: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.pan.pressed?Qt.ClosedHandCursor:Qt.OpenHandCursor)({"pan": ndScope36_pan}); })()
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":193,"columnNumber":9,"component":"qml:MouseArea","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":193,"columnNumber":9,"component":"qml:MouseArea","property":"onPressed"}
onPressed: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,mouse)=>{$qml.pan.originX=mouse.x;$qml.pan.originY=mouse.y;$qml.pan.startX=$qml.root.panX;$qml.pan.startY=$qml.root.panY})({"root": ndScope36_root, "pan": ndScope36_pan}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":193,"columnNumber":9,"component":"qml:MouseArea","property":"onPositionChanged"}
onPositionChanged: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,mouse)=>{if($qml.pan.pressed)$qml.root.panTo($qml.pan.startX+mouse.x-$qml.pan.originX,$qml.pan.startY+mouse.y-$qml.pan.originY)})({"root": ndScope36_root, "pan": ndScope36_pan}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FilePreview.tsx","lineNumber":42,"columnNumber":7,"component":"qml:Rectangle"}

}
}
}
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":573,"columnNumber":15,"component":"qml:Label"}
Label {
id: n314
objectName: "n314"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":573,"columnNumber":15,"component":"qml:Label","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.name)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":573,"columnNumber":15,"component":"qml:Label","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":573,"columnNumber":15,"component":"qml:Label","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceText)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":573,"columnNumber":15,"component":"qml:Label","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":573,"columnNumber":15,"component":"qml:Label","property":"horizontalAlignment"}
horizontalAlignment: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.AlignHCenter)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":573,"columnNumber":15,"component":"qml:Label","property":"wrapMode"}
wrapMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.Wrap)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":573,"columnNumber":15,"component":"qml:Label","property":"maximumLineCount"}
maximumLineCount: 2
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":573,"columnNumber":15,"component":"qml:Label","property":"elide"}
elide: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.ElideRight)({}); })()
}
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item"}
Item {
id: ndScope0_dragProxy
objectName: "n315"
width: 1
height: 1
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"height"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"Drag.active"}
Drag.active: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.gridMouse.nbDragging)({"gridMouse": ndScope0_gridMouse}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"Drag.dragType"}
Drag.dragType: (() => { const __name = function(fn) { return fn; }; return ($qml=>Drag.Automatic)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"Drag.supportedActions"}
Drag.supportedActions: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.CopyAction|Qt.MoveAction)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"Drag.imageSource"}
Drag.imageSource: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.fileIcon(modelData.icon))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"Drag.hotSpot.x"}
Drag.hotSpot.x: 24
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"Drag.hotSpot.y"}
Drag.hotSpot.y: 24
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"Drag.proposedAction"}
Drag.proposedAction: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.CopyAction)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"Drag.mimeData"}
Drag.mimeData: (() => { const __name = function(fn) { return fn; }; return ($qml=>({"text/uri-list":$qml.app.dragPayload(modelData.path)}))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"Drag.onActiveChanged"}
Drag.onActiveChanged: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{if($qml.dragProxy.Drag.active)return;$qml.gridMouse.nbDragging=false;$qml.dragProxy.x=0;$qml.dragProxy.y=0})({"dragProxy": ndScope0_dragProxy, "gridMouse": ndScope0_gridMouse}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":587,"columnNumber":13,"component":"qml:Item","property":"Drag.onDragFinished"}
Drag.onDragFinished: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(action=>{$qml.gridMouse.nbDragging=false;$qml.dragProxy.x=0;$qml.dragProxy.y=0;if(action!==Qt.IgnoreAction)$qml.app.send("refresh")})(...args))({"app": app, "dragProxy": ndScope0_dragProxy, "gridMouse": ndScope0_gridMouse}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":650,"columnNumber":13,"component":"qml:DropArea"}
DropArea {
id: n316
objectName: "n316"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":650,"columnNumber":13,"component":"qml:DropArea","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":650,"columnNumber":13,"component":"qml:DropArea","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.directory&&!$qml.app.state.mutating)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":650,"columnNumber":13,"component":"qml:DropArea","property":"onEntered"}
onEntered: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(drag=>{if(!drag.hasUrls)drag.accepted=false})(...args))({}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":650,"columnNumber":13,"component":"qml:DropArea","property":"onDropped"}
onDropped: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(drop=>$qml.app.dropFiles(drop,modelData.path))(...args))({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea"}
MouseArea {
id: ndScope0_gridMouse
objectName: "n317"
property bool nbDragging: false
property real nbOriginX: 0
property real nbOriginY: 0
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"hoverEnabled"}
hoverEnabled: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"acceptedButtons"}
acceptedButtons: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.LeftButton|Qt.RightButton)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"drag.target"}
drag.target: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.dragProxy)({"dragProxy": ndScope0_dragProxy}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"drag.axis"}
drag.axis: (() => { const __name = function(fn) { return fn; }; return ($qml=>Drag.XAndYAxis)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"onPressed"}
onPressed: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{$qml.fileContent.forceActiveFocus();$qml.gridMouse.nbDragging=false;$qml.gridMouse.nbOriginX=mouse.x;$qml.gridMouse.nbOriginY=mouse.y;$qml.dragProxy.Drag.proposedAction=mouse.modifiers&Qt.ShiftModifier?Qt.MoveAction:Qt.CopyAction})(...args))({"dragProxy": ndScope0_dragProxy, "gridMouse": ndScope0_gridMouse, "fileContent": ndScope0_fileContent}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"onPositionChanged"}
onPositionChanged: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{if($qml.gridMouse.nbDragging||!$qml.gridMouse.pressed||!(mouse.buttons&Qt.LeftButton))return;var dx=mouse.x-$qml.gridMouse.nbOriginX;var dy=mouse.y-$qml.gridMouse.nbOriginY;if(dx*dx+dy*dy<36)return;$qml.dragProxy.x=mouse.x-24;$qml.dragProxy.y=mouse.y-24;$qml.gridMouse.nbDragging=true})(...args))({"dragProxy": ndScope0_dragProxy, "gridMouse": ndScope0_gridMouse}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"onReleased"}
onReleased: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.gridMouse.nbDragging=false;$qml.dragProxy.x=0;$qml.dragProxy.y=0})({"dragProxy": ndScope0_dragProxy, "gridMouse": ndScope0_gridMouse}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"onCanceled"}
onCanceled: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.gridMouse.nbDragging=false;$qml.dragProxy.x=0;$qml.dragProxy.y=0})({"dragProxy": ndScope0_dragProxy, "gridMouse": ndScope0_gridMouse}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"onClicked"}
onClicked: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{if(mouse.button===Qt.RightButton){var p=mapToItem($qml.window.contentItem,mouse.x,mouse.y);$qml.app.context(parent.modelData,p.x,p.y)}else{var mode=mouse.modifiers&Qt.ControlModifier?"toggle":mouse.modifiers&Qt.ShiftModifier?"range":"replace";$qml.app.send("selectPath",{path:parent.modelData.path,mode});if(mode==="replace"&&$qml.app.state.preferences&&$qml.app.state.preferences.singleClick)$qml.app.open(parent.modelData)}})(...args))({"app": app, "window": ndScope0_window}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":671,"columnNumber":13,"component":"qml:MouseArea","property":"onDoubleClicked"}
onDoubleClicked: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{if(mouse.button===Qt.LeftButton&&!($qml.app.state.preferences&&$qml.app.state.preferences.singleClick))$qml.app.open(parent.modelData)})(...args))({"app": app}, ...arguments); })(); }
}
}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":406,"columnNumber":7,"component":"qml:GridView"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":776,"columnNumber":9,"component":"qml:MouseArea"}
MouseArea {
id: n318
objectName: "n318"
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.filesGrid.width)({"filesGrid": ndScope0_filesGrid}); })()
height: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.filesGrid.height)({"filesGrid": ndScope0_filesGrid}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":776,"columnNumber":9,"component":"qml:MouseArea","property":"parent"}
parent: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.filesGrid)({"filesGrid": ndScope0_filesGrid}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":776,"columnNumber":9,"component":"qml:MouseArea","property":"width"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":776,"columnNumber":9,"component":"qml:MouseArea","property":"height"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":776,"columnNumber":9,"component":"qml:MouseArea","property":"z"}
z: 1
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":776,"columnNumber":9,"component":"qml:MouseArea","property":"onPressed"}
onPressed: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>{const mouse=args[0];const view=$qml.filesGrid;const p=parent.mapToItem(view.contentItem,mouse.x,mouse.y);if(view.indexAt(p.x,p.y)>=0)mouse.accepted=false})({"filesGrid": ndScope0_filesGrid}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":776,"columnNumber":9,"component":"qml:MouseArea","property":"onClicked"}
onClicked: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{if(mouse.button!==Qt.LeftButton)return;if($qml.app.state.modalsOpen||$qml.app.state.mutating)return;if(!($qml.app.state.selection&&$qml.app.state.selection.length))return;$qml.app.send("select",null)})(...args))({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":799,"columnNumber":9,"component":"qml:DropArea"}
DropArea {
id: n319
objectName: "n319"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":799,"columnNumber":9,"component":"qml:DropArea","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":799,"columnNumber":9,"component":"qml:DropArea","property":"z"}
z: 5
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":799,"columnNumber":9,"component":"qml:DropArea","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.mutating&&$qml.app.state.path.indexOf(":///")<0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":799,"columnNumber":9,"component":"qml:DropArea","property":"onEntered"}
onEntered: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(drag=>{if(!drag.hasUrls)drag.accepted=false})(...args))({}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":799,"columnNumber":9,"component":"qml:DropArea","property":"onDropped"}
onDropped: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(drop=>{var point2=mapToItem($qml.filesGrid.contentItem,drop.x,drop.y);var index=$qml.filesGrid.indexAt(point2.x,point2.y);var entry=index>=0?$qml.app.state.entries[index]:null;$qml.app.dropFiles(drop,entry&&entry.directory?entry.path:$qml.app.state.path)})(...args))({"app": app, "filesGrid": ndScope0_filesGrid}, ...arguments); })(); }
}
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":835,"columnNumber":7,"component":"qml:Flickable"}
Flickable {
id: ndScope0_filesColumns
objectName: "n320"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":835,"columnNumber":7,"component":"qml:Flickable","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":835,"columnNumber":7,"component":"qml:Flickable","property":"clip"}
clip: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":835,"columnNumber":7,"component":"qml:Flickable","property":"contentWidth"}
contentWidth: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.columnRow.width)({"columnRow": ndScope0_columnRow}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":835,"columnNumber":7,"component":"qml:Flickable","property":"contentHeight"}
contentHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>height)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":835,"columnNumber":7,"component":"qml:Flickable","property":"ScrollBar.horizontal"}
ScrollBar.horizontal: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":840,"columnNumber":39,"component":"qml:ScrollBar"}
ScrollBar {
id: n321
objectName: "n321"
}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":835,"columnNumber":7,"component":"qml:Flickable","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":835,"columnNumber":7,"component":"qml:Flickable"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":842,"columnNumber":9,"component":"qml:MouseArea"}
MouseArea {
id: n322
objectName: "n322"
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.filesColumns.width)({"filesColumns": ndScope0_filesColumns}); })()
height: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.filesColumns.height)({"filesColumns": ndScope0_filesColumns}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":842,"columnNumber":9,"component":"qml:MouseArea","property":"width"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":842,"columnNumber":9,"component":"qml:MouseArea","property":"height"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":842,"columnNumber":9,"component":"qml:MouseArea","property":"z"}
z: -1
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":842,"columnNumber":9,"component":"qml:MouseArea","property":"onClicked"}
onClicked: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(mouse=>{if(mouse.button!==Qt.LeftButton)return;if($qml.app.state.modalsOpen||$qml.app.state.mutating)return;if(!($qml.app.state.selection&&$qml.app.state.selection.length))return;$qml.app.send("select",null)})(...args))({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":858,"columnNumber":9,"component":"qml:DropArea"}
DropArea {
id: n323
objectName: "n323"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":858,"columnNumber":9,"component":"qml:DropArea","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":858,"columnNumber":9,"component":"qml:DropArea","property":"z"}
z: 5
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":858,"columnNumber":9,"component":"qml:DropArea","property":"enabled"}
enabled: (() => { const __name = function(fn) { return fn; }; return ($qml=>!$qml.app.state.mutating&&$qml.app.state.path.indexOf(":///")<0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":858,"columnNumber":9,"component":"qml:DropArea","property":"onEntered"}
onEntered: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(drag=>{if(!drag.hasUrls)drag.accepted=false})(...args))({}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":858,"columnNumber":9,"component":"qml:DropArea","property":"onDropped"}
onDropped: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,...args)=>(drop=>{var index=-1;var entry=index>=0?$qml.app.state.entries[index]:null;$qml.app.dropFiles(drop,entry&&entry.directory?entry.path:$qml.app.state.path)})(...args))({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":888,"columnNumber":9,"component":"qml:Row"}
Row {
id: ndScope0_columnRow
objectName: "n324"
height: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent.height)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":888,"columnNumber":9,"component":"qml:Row","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":888,"columnNumber":9,"component":"qml:Row","property":"height"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":888,"columnNumber":9,"component":"qml:Row","property":"spacing"}
spacing: 8
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":888,"columnNumber":9,"component":"qml:Row","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":893,"columnNumber":11,"component":"qml:Repeater"}
Repeater {
id: n325
objectName: "n325"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":893,"columnNumber":11,"component":"qml:Repeater","property":"model"}
model: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.columns)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":893,"columnNumber":11,"component":"qml:Repeater","property":"delegate"}
delegate: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":896,"columnNumber":15,"component":"qml:Rectangle"}
Rectangle {
id: ndScope0_columnPanel
objectName: "n326"
width: 260
height: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.columnRow.height)({"columnRow": ndScope0_columnRow}); })()
required property var modelData
required property int index
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":896,"columnNumber":15,"component":"qml:Rectangle","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":896,"columnNumber":15,"component":"qml:Rectangle","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":896,"columnNumber":15,"component":"qml:Rectangle","property":"width"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":896,"columnNumber":15,"component":"qml:Rectangle","property":"height"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":896,"columnNumber":15,"component":"qml:Rectangle","property":"radius"}
radius: 8
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":896,"columnNumber":15,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.lighter($qml.theme.surfaceContainer,1.2))({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":896,"columnNumber":15,"component":"qml:Rectangle","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":909,"columnNumber":17,"component":"qml:ColumnLayout"}
ColumnLayout {
id: n327
objectName: "n327"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":909,"columnNumber":17,"component":"qml:ColumnLayout","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":909,"columnNumber":17,"component":"qml:ColumnLayout","property":"anchors.margins"}
anchors.margins: 8
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":909,"columnNumber":17,"component":"qml:ColumnLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":909,"columnNumber":17,"component":"qml:ColumnLayout"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":915,"columnNumber":19,"component":"qml:Label"}
Label {
id: n328
objectName: "n328"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":915,"columnNumber":19,"component":"qml:Label","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.columnPanel.modelData.path)({"columnPanel": ndScope0_columnPanel}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":915,"columnNumber":19,"component":"qml:Label","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.primary)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":915,"columnNumber":19,"component":"qml:Label","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":915,"columnNumber":19,"component":"qml:Label","property":"elide"}
elide: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.ElideLeft)({}); })()
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":924,"columnNumber":19,"component":"qml:ListView"}
ListView {
id: ndScope0_columnList
objectName: "n329"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":924,"columnNumber":19,"component":"qml:ListView","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":924,"columnNumber":19,"component":"qml:ListView","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":924,"columnNumber":19,"component":"qml:ListView","property":"Layout.fillHeight"}
Layout.fillHeight: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":924,"columnNumber":19,"component":"qml:ListView","property":"clip"}
clip: true
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":924,"columnNumber":19,"component":"qml:ListView","property":"model"}
model: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.columnPanel.modelData.entries)({"columnPanel": ndScope0_columnPanel}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":924,"columnNumber":19,"component":"qml:ListView","property":"ScrollBar.vertical"}
ScrollBar.vertical: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":933,"columnNumber":49,"component":"qml:ScrollBar"}
ScrollBar {
id: n330
objectName: "n330"
}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":924,"columnNumber":19,"component":"qml:ListView","property":"delegate"}
delegate: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":935,"columnNumber":23,"component":"qml:ItemDelegate"}
ItemDelegate {
id: ndScope0_columnDelegate
objectName: (() => { const __name = function(fn) { return fn; }; return (()=>"columnEntry:"+modelData.path)({}); })()
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>ListView.view.width)({}); })()
required property var modelData
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":935,"columnNumber":23,"component":"qml:ItemDelegate","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":935,"columnNumber":23,"component":"qml:ItemDelegate","property":"objectName"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":935,"columnNumber":23,"component":"qml:ItemDelegate","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":935,"columnNumber":23,"component":"qml:ItemDelegate","property":"width"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":935,"columnNumber":23,"component":"qml:ItemDelegate","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>modelData.name)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":935,"columnNumber":23,"component":"qml:ItemDelegate","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":947,"columnNumber":27,"component":"qml:Label"}
Label {
id: n332
objectName: "n332"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":947,"columnNumber":27,"component":"qml:Label","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent.text)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":947,"columnNumber":27,"component":"qml:Label","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceText)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":947,"columnNumber":27,"component":"qml:Label","property":"elide"}
elide: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.ElideRight)({}); })()
}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":935,"columnNumber":23,"component":"qml:ItemDelegate","property":"highlighted"}
highlighted: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.selection&&$qml.app.state.selection.indexOf(modelData.path)>=0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":935,"columnNumber":23,"component":"qml:ItemDelegate","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":935,"columnNumber":23,"component":"qml:ItemDelegate"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":966,"columnNumber":25,"component":"qml:MouseArea"}
MouseArea {
id: n333
objectName: "n333"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":966,"columnNumber":25,"component":"qml:MouseArea","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return (()=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":966,"columnNumber":25,"component":"qml:MouseArea","property":"onClicked"}
onClicked: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,mouse)=>{$qml.fileContent.forceActiveFocus();var mode=mouse.modifiers&Qt.ControlModifier?"toggle":mouse.modifiers&Qt.ShiftModifier?"range":"replace";if(modelData.directory&&mode==="replace")$qml.app.open(modelData,$qml.columnPanel.index);else{$qml.app.send("selectPath",{path:modelData.path,mode});if(mode==="replace"&&$qml.app.state.preferences.singleClick)$qml.app.open(modelData)}})({"app": app, "columnPanel": ndScope0_columnPanel, "fileContent": ndScope0_fileContent}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":966,"columnNumber":25,"component":"qml:MouseArea","property":"onDoubleClicked"}
onDoubleClicked: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{if(!modelData.directory&&!$qml.app.state.preferences.singleClick)$qml.app.open(modelData)})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":985,"columnNumber":25,"component":"qml:TapHandler"}
TapHandler {
id: n334
objectName: "n334"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":985,"columnNumber":25,"component":"qml:TapHandler","property":"acceptedButtons"}
acceptedButtons: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.RightButton)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":985,"columnNumber":25,"component":"qml:TapHandler","property":"onTapped"}
onTapped: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{var p=parent.mapToItem($qml.window.contentItem,point.position.x,point.position.y);$qml.app.context(parent.modelData,p.x,p.y)})({"app": app, "window": ndScope0_window}, ...arguments); })(); }
}
}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":924,"columnNumber":19,"component":"qml:ListView","property":"children"}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":1002,"columnNumber":21,"component":"qml:MouseArea"}
MouseArea {
id: n335
objectName: "n335"
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.columnList.width)({"columnList": ndScope0_columnList}); })()
height: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.columnList.height)({"columnList": ndScope0_columnList}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":1002,"columnNumber":21,"component":"qml:MouseArea","property":"parent"}
parent: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.columnList)({"columnList": ndScope0_columnList}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":1002,"columnNumber":21,"component":"qml:MouseArea","property":"width"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":1002,"columnNumber":21,"component":"qml:MouseArea","property":"height"}
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":1002,"columnNumber":21,"component":"qml:MouseArea","property":"z"}
z: 1
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":1002,"columnNumber":21,"component":"qml:MouseArea","property":"onPressed"}
onPressed: function() { (() => { const __name = function(fn) { return fn; }; return (($qml,mouse)=>{const p=parent.mapToItem($qml.columnList.contentItem,mouse.x,mouse.y);if($qml.columnList.indexAt(p.x,p.y)>=0)mouse.accepted=false})({"columnList": ndScope0_columnList}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":1002,"columnNumber":21,"component":"qml:MouseArea","property":"onClicked"}
onClicked: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{if(!$qml.app.state.modalsOpen&&!$qml.app.state.mutating)$qml.app.send("select",null)})({"app": app}, ...arguments); })(); }
}
}
}
}
}
}
}

// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":1023,"columnNumber":7,"component":"qml:TapHandler"}
TapHandler {
id: n336
objectName: "n336"
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":1023,"columnNumber":7,"component":"qml:TapHandler","property":"acceptedButtons"}
acceptedButtons: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.RightButton)({}); })()
// @nandomo-source {"fileName":"src/native/FileViews.tsx","lineNumber":1023,"columnNumber":7,"component":"qml:TapHandler","property":"onTapped"}
onTapped: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{var node=$qml.fileViews;var target=null;var local=point.position;for(var depth=0;node&&depth<32;depth++){if(typeof node.modelData!=="undefined")target=node.modelData;var child=node.childAt(local.x,local.y);if(!child)break;local=node.mapToItem(child,local.x,local.y);node=child}var p=$qml.fileViews.mapToItem($qml.window.contentItem,point.position.x,point.position.y);$qml.app.context(target,p.x,p.y)})({"app": app, "window": ndScope0_window, "fileViews": ndScope0_fileViews}, ...arguments); })(); }
}
}
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: ndScope0_detailsContainer
objectName: "detailsContainer"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle","property":"objectName"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>!!$qml.app.state.detailsVisible)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.detailsVisible?1:0)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle","property":"Layout.preferredWidth"}
Layout.preferredWidth: 290
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle","property":"Layout.fillHeight"}
Layout.fillHeight: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.theme.surfaceContainer)({"theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.cornerRadius)({}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle","property":"children"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":334,"columnNumber":11,"component":"qml:Rectangle"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":344,"columnNumber":13,"component":"qml:Behavior"}
Behavior on opacity {
id: n338
objectName: "n338"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":344,"columnNumber":13,"component":"qml:Behavior","property":"qmlOn"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":344,"columnNumber":13,"component":"qml:Behavior","property":"animation"}
animation: 
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":344,"columnNumber":54,"component":"qml:NumberAnimation"}
NumberAnimation {
id: n339
objectName: "n339"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":344,"columnNumber":54,"component":"qml:NumberAnimation","property":"duration"}
duration: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.preferences&&$qml.app.state.preferences.reduceAnimations?0:110)({"app": app}); })()
}
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":345,"columnNumber":13,"component":"qml:ScrollView"}
ScrollView {
id: ndScope0_detailsScroll
objectName: "n340"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":345,"columnNumber":13,"component":"qml:ScrollView","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":345,"columnNumber":13,"component":"qml:ScrollView","property":"anchors.fill"}
anchors.fill: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent)({}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":345,"columnNumber":13,"component":"qml:ScrollView","property":"anchors.margins"}
anchors.margins: 12
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":345,"columnNumber":13,"component":"qml:ScrollView","property":"clip"}
clip: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":345,"columnNumber":13,"component":"qml:ScrollView","property":"contentWidth"}
contentWidth: (() => { const __name = function(fn) { return fn; }; return ($qml=>availableWidth)({}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":345,"columnNumber":13,"component":"qml:ScrollView","property":"children"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":352,"columnNumber":15,"component":"qml:Item"}
Item {
id: ndScope0_detailsSlot
objectName: "n341"
width: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.detailsScroll.availableWidth)({"detailsScroll": ndScope0_detailsScroll}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":352,"columnNumber":15,"component":"qml:Item","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":352,"columnNumber":15,"component":"qml:Item","property":"width"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":352,"columnNumber":15,"component":"qml:Item","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.detailsObject?$qml.app.detailsObject.implicitHeight:0)({"app": app}); })()
}
}
}
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":368,"columnNumber":9,"component":"qml:RowLayout"}
RowLayout {
id: n342
objectName: "n342"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":368,"columnNumber":9,"component":"qml:RowLayout","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return (q=>!q.app.state.chooser||!!q.app.state.error)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":368,"columnNumber":9,"component":"qml:RowLayout","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":368,"columnNumber":9,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":368,"columnNumber":9,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":369,"columnNumber":9,"component":"qml:Label"}
Label {
id: n343
objectName: "n343"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":369,"columnNumber":9,"component":"qml:Label","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>{const state=$qml.app.state;const virtual={"trash:///":"Lixeira","recent:///":"Recentes","applications:///":"Aplicativos"}[state.path];return state.error||state.transferStatus||(state.searchBusy?$qml.app.tr("Buscando\u2026"):"")||(state.busy?$qml.app.tr("Carregando\u2026"):$qml.app.tr(virtual!==void 0?virtual:state.path===state.home?"Pasta pessoal":state.path.split("/").filter(function(p){return p.length}).pop()||"Sistema"))+" \xB7 "+state.path+" \xB7 "+$qml.app.tr("{count} itens",{count:state.entries.length})+" \xB7 "+(state.selectionCount>1?$qml.app.tr("{count} selecionados",{count:state.selectionCount})+" \xB7 ":"")+$qml.app.tr({name:"nome",size:"tamanho",modified:"data",type:"tipo"}[state.order]||"nome")+" \xB7 "+$qml.app.tr(state.descending?"decrescente":"crescente")})({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":369,"columnNumber":9,"component":"qml:Label","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.state.error?$qml.theme.error:$qml.theme.surfaceVariantText)({"app": app, "theme": ndScope0_theme}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":369,"columnNumber":9,"component":"qml:Label","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":369,"columnNumber":9,"component":"qml:Label","property":"elide"}
elide: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.ElideMiddle)({}); })()
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":430,"columnNumber":9}

// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button"}
Button {
id: ndScope39_root
objectName: "footerCancelTransfer"
property string iconName: ""
property bool selected: false
property string statusIcon: ""
readonly property string actionIcon: (() => { const __name = function(fn) { return fn; }; return ($qml=>({"applications-other":"apps","list-add":"add",trash:"delete",recent:"history",settings:"settings","edit-copy":"content_copy","edit-cut":"content_cut",move:"drive_file_move","copy-to":"file_copy","visibility-off":"visibility_off",visibility:"visibility",sort:"sort","go-previous":"chevron_left","go-next":"chevron_right","go-up":"arrow_upward","view-refresh":"refresh",search:"search","edit-undo":"undo","view-list-details":"view_list","view-grid":"grid_view","view-column":"view_column","window-close":"close","document-preview":"visibility","document-open":"open_in_new","edit-rename":"edit","applications-games":"sports_esports"})[iconName]||"")({}); })()
readonly property var iconMap: (() => { const __name = function(fn) { return fn; }; return ($qml=>ApplicationWindow.window?ApplicationWindow.window.osIcons:{})({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"qmlImports"}
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"implicitWidth"}
implicitWidth: (() => { const __name = function(fn) { return fn; }; return ($qml=>text.length?Math.max(64,contentItem.implicitWidth+24):36)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"implicitHeight"}
implicitHeight: 36
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"leftPadding"}
leftPadding: (() => { const __name = function(fn) { return fn; }; return ($qml=>text.length?12:9)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"rightPadding"}
rightPadding: (() => { const __name = function(fn) { return fn; }; return ($qml=>(text.length?12:9)+(statusIcon?24:0))({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"topPadding"}
topPadding: 9
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"bottomPadding"}
bottomPadding: 9
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"activeFocusOnTab"}
activeFocusOnTab: true
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"Accessible.name"}
Accessible.name: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.app.tr(text||{"visibility-off":"Arquivos ocultos escondidos",visibility:"Arquivos ocultos vis\xEDveis",sort:"Ordenar","go-previous":"Voltar","go-next":"Avan\xE7ar","go-up":"Pasta acima","view-refresh":"Atualizar",settings:"Prefer\xEAncias","list-add":"Nova aba","window-close":"Fechar detalhes","applications-other":"Aplicativos","view-list-details":"Visualiza\xE7\xE3o em lista","view-grid":"Visualiza\xE7\xE3o em grade","view-column":"Visualiza\xE7\xE3o em colunas","document-open":"Abrir pasta","document-preview":"Pr\xE9-visualizar","edit-rename":"Renomear","edit-copy":"Copiar","edit-cut":"Recortar","copy-to":"Copiar para\u2026",move:"Mover para\u2026",trash:"Mover para a lixeira",recent:"Recentes","drive-harddisk":"Abrir pasta"}[iconName]||iconName))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"ToolTip.visible"}
ToolTip.visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>hovered&&(text.length===0||contentItem.implicitWidth>availableWidth))({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"ToolTip.text"}
ToolTip.text: (() => { const __name = function(fn) { return fn; }; return ($qml=>Accessible.name)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"background"}
background: 
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":155,"columnNumber":11,"component":"qml:Rectangle"}
Rectangle {
id: n345
objectName: "n345"
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":155,"columnNumber":11,"component":"qml:Rectangle","property":"radius"}
radius: 7
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":155,"columnNumber":11,"component":"qml:Rectangle","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.selected?Style.withAlpha(Style.primary,.14):$qml.root.down?Style.withAlpha(Style.surfaceText,.16):$qml.root.hovered||$qml.root.activeFocus?Style.withAlpha(Style.surfaceText,.08):"transparent")({"root": ndScope39_root}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":155,"columnNumber":11,"component":"qml:Rectangle","property":"children"}

// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":168,"columnNumber":13,"component":"qml:Behavior"}
Behavior on color {
id: n346
objectName: "n346"
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":168,"columnNumber":13,"component":"qml:Behavior","property":"qmlOn"}
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":168,"columnNumber":13,"component":"qml:Behavior","property":"animation"}
animation: 
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":169,"columnNumber":15,"component":"qml:ColorAnimation"}
ColorAnimation {
id: n347
objectName: "n347"
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":169,"columnNumber":15,"component":"qml:ColorAnimation","property":"duration"}
duration: (() => { const __name = function(fn) { return fn; }; return (()=>ApplicationWindow.window&&ApplicationWindow.window.reduceAnimations?0:90)({}); })()
}
}
}
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"contentItem"}
contentItem: 
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":175,"columnNumber":11,"component":"qml:RowLayout"}
RowLayout {
id: n348
objectName: "n348"
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":175,"columnNumber":11,"component":"qml:RowLayout","property":"spacing"}
spacing: 10
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":175,"columnNumber":11,"component":"qml:RowLayout","property":"opacity"}
opacity: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.enabled?1:.4)({"root": ndScope39_root}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":175,"columnNumber":11,"component":"qml:RowLayout","property":"children"}

// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":175,"columnNumber":11,"component":"qml:RowLayout"}

// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":181,"columnNumber":13,"component":"qml:Image"}
Image {
id: n349
objectName: "n349"
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":181,"columnNumber":13,"component":"qml:Image","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.iconName.length>0&&!$qml.root.actionIcon)({"root": ndScope39_root}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":181,"columnNumber":13,"component":"qml:Image","property":"source"}
source: (() => { const __name = function(fn) { return fn; }; return ($qml=>visible?$qml.root.iconName.indexOf("file://")===0?$qml.root.iconName:$qml.root.iconMap&&$qml.root.iconMap[$qml.root.iconName]?$qml.root.iconMap[$qml.root.iconName]:Quickshell.iconPath($qml.root.iconName,"folder"):"")({"root": ndScope39_root}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":181,"columnNumber":13,"component":"qml:Image","property":"Layout.preferredWidth"}
Layout.preferredWidth: 18
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":181,"columnNumber":13,"component":"qml:Image","property":"Layout.preferredHeight"}
Layout.preferredHeight: 18
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":181,"columnNumber":13,"component":"qml:Image","property":"Layout.alignment"}
Layout.alignment: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.AlignCenter)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":181,"columnNumber":13,"component":"qml:Image","property":"fillMode"}
fillMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Image.PreserveAspectFit)({}); })()
}

// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":206,"columnNumber":13,"component":"qml:DIcon"}
DIcon {
id: n350
objectName: "n350"
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":206,"columnNumber":13,"component":"qml:DIcon","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.actionIcon.length>0)({"root": ndScope39_root}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":206,"columnNumber":13,"component":"qml:DIcon","property":"name"}
name: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.actionIcon)({"root": ndScope39_root}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":206,"columnNumber":13,"component":"qml:DIcon","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":206,"columnNumber":13,"component":"qml:DIcon","property":"size"}
size: 18
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":206,"columnNumber":13,"component":"qml:DIcon","property":"Layout.preferredWidth"}
Layout.preferredWidth: 18
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":206,"columnNumber":13,"component":"qml:DIcon","property":"Layout.preferredHeight"}
Layout.preferredHeight: 18
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":206,"columnNumber":13,"component":"qml:DIcon","property":"Layout.alignment"}
Layout.alignment: (() => { const __name = function(fn) { return fn; }; return ($qml=>Qt.AlignCenter)({}); })()
}

// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":223,"columnNumber":13,"component":"qml:StyledText"}
StyledText {
id: n351
objectName: "n351"
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":223,"columnNumber":13,"component":"qml:StyledText","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text.length>0)({"root": ndScope39_root}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":223,"columnNumber":13,"component":"qml:StyledText","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.text)({"root": ndScope39_root}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":223,"columnNumber":13,"component":"qml:StyledText","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":223,"columnNumber":13,"component":"qml:StyledText","property":"elide"}
elide: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.ElideRight)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":223,"columnNumber":13,"component":"qml:StyledText","property":"wrapMode"}
wrapMode: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.NoWrap)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":223,"columnNumber":13,"component":"qml:StyledText","property":"font.pixelSize"}
font.pixelSize: 14
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":223,"columnNumber":13,"component":"qml:StyledText","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":223,"columnNumber":13,"component":"qml:StyledText","property":"verticalAlignment"}
verticalAlignment: (() => { const __name = function(fn) { return fn; }; return ($qml=>Text.AlignVCenter)({}); })()
}
}
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"objectName"}
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"text"}
text: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.tr("Cancelar"))({"app": app}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return (q=>!!q.app.state.canCancelTransfer)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"onClicked"}
onClicked: function() { (() => { const __name = function(fn) { return fn; }; return (q=>{q.app.send("cancelTransfer")})({"app": app}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button","property":"children"}

// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button"}

// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":243,"columnNumber":9,"component":"qml:DIcon"}
DIcon {
id: n352
objectName: "n352"
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":243,"columnNumber":9,"component":"qml:DIcon","property":"anchors.right"}
anchors.right: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent.right)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":243,"columnNumber":9,"component":"qml:DIcon","property":"anchors.rightMargin"}
anchors.rightMargin: 8
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":243,"columnNumber":9,"component":"qml:DIcon","property":"anchors.verticalCenter"}
anchors.verticalCenter: (() => { const __name = function(fn) { return fn; }; return ($qml=>parent.verticalCenter)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":243,"columnNumber":9,"component":"qml:DIcon","property":"name"}
name: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.statusIcon)({"root": ndScope39_root}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":243,"columnNumber":9,"component":"qml:DIcon","property":"size"}
size: 16
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":243,"columnNumber":9,"component":"qml:DIcon","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return ($qml=>Style.surfaceText)({}); })()
// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":243,"columnNumber":9,"component":"qml:DIcon","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return ($qml=>$qml.root.statusIcon.length>0)({"root": ndScope39_root}); })()
}

// @nandomo-source {"fileName":"src/native/QuietButton.tsx","lineNumber":41,"columnNumber":7,"component":"qml:Button"}

}
}

// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":435,"columnNumber":9,"component":"qml:Item"}
Item {
id: ndScope0_footerSlot
objectName: "n353"
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":435,"columnNumber":9,"component":"qml:Item","property":"qmlId"}
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":435,"columnNumber":9,"component":"qml:Item","property":"visible"}
visible: (() => { const __name = function(fn) { return fn; }; return (q=>!!q.app.state.chooser)({"app": app}); })()
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":435,"columnNumber":9,"component":"qml:Item","property":"Layout.fillWidth"}
Layout.fillWidth: true
// @nandomo-source {"fileName":"src/native/FileWindow.tsx","lineNumber":435,"columnNumber":9,"component":"qml:Item","property":"implicitHeight"}
implicitHeight: (() => { const __name = function(fn) { return fn; }; return (q=>q.app.footerObject?q.app.footerObject.implicitHeight:0)({"app": app}); })()
}
}
}

// @nandomo-source {"fileName":"src/native/Shell.tsx","lineNumber":712,"columnNumber":7}

// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":36,"columnNumber":3}

// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":37,"columnNumber":5,"component":"qml:Timer"}
Timer {
id: n354
objectName: "n354"
property int step: 0
property int ticks: 0
property string startingPath: ""
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":37,"columnNumber":5,"component":"qml:Timer","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":37,"columnNumber":5,"component":"qml:Timer","property":"interval"}
interval: 100
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":37,"columnNumber":5,"component":"qml:Timer","property":"repeat"}
repeat: true
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":37,"columnNumber":5,"component":"qml:Timer","property":"running"}
running: (() => { const __name = function(fn) { return fn; }; return (_qml=>Quickshell.env("NANDOMO_FM_HMR_SMOKE")==="1")({}); })()
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":37,"columnNumber":5,"component":"qml:Timer","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{try{if(++ticks>400)throw new Error("HMR timeout at step "+step+": "+$qml.app.state.error);if(step===0&&$qml.app.toolbarObject&&!$qml.app.state.busy){startingPath=$qml.app.state.path;if(startingPath.indexOf("/tmp/nandomo-hmr-smoke-")!==0)throw new Error("Unsafe HMR fixture");$qml.app.send("select",startingPath+"/alpha.txt");$qml.app.send("properties");$qml.app.send("hidden");step=1}else if(step===1&&$qml.app.state.selected&&$qml.app.state.hidden&&$qml.app.state.detailsOpen){console.warn("FM_HMR_READY");step=2}else if(step===2){if($qml.app.state.path!==startingPath||!$qml.app.state.selected||$qml.app.state.selected.name!=="alpha.txt"||!$qml.app.state.hidden||!$qml.app.state.detailsOpen)throw new Error("Application state lost during reload");var label=$qml.app.findUi("hmrLabel",$qml.app.toolbarObject);if(label&&label.text==="HMR version 2"){if($qml.app.uiGeneration!==1)throw new Error("Failed edits committed a scene");$qml.app.findUi("hmrAction",$qml.app.toolbarObject).clicked();step=3}}else if(step===3&&$qml.app.state.descending){if($qml.app.findUi("hmrAction",$qml.app.toolbarObject).text!=="updated")return;console.warn("FM_HMR_SMOKE_PASS");Qt.quit()}}catch(error){console.warn("FM_HMR_SMOKE_FAIL",error);Qt.exit(1)}})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":65,"columnNumber":5,"component":"qml:Timer"}
Timer {
id: n355
objectName: "n355"
property int ticks: 0
property string startingPath: ""
property bool startingHidden: false
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":65,"columnNumber":5,"component":"qml:Timer","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":65,"columnNumber":5,"component":"qml:Timer","property":"interval"}
interval: 250
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":65,"columnNumber":5,"component":"qml:Timer","property":"repeat"}
repeat: true
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":65,"columnNumber":5,"component":"qml:Timer","property":"running"}
running: (() => { const __name = function(fn) { return fn; }; return ($qml=>Quickshell.env("NANDOMO_FM_SMOKE")==="1")({}); })()
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":65,"columnNumber":5,"component":"qml:Timer","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{ticks++;try{if(ticks===4){if(!$qml.app.toolbarObject)throw new Error("TSX toolbar did not mount");startingPath=$qml.app.state.path;startingHidden=$qml.app.state.hidden;var address=$qml.app.findUi("toolbarAddress",$qml.app.toolbarObject);if(!address||address.text!==startingPath)throw new Error("Address binding failed");console.warn("FM_QML_READY",$qml.window.visible,$qml.app.state.entries.length,Style.primary);$qml.app.findUi("toolbarHidden",$qml.app.toolbarObject).clicked()}if(ticks===8){if($qml.app.state.hidden===startingHidden)throw new Error("TSX clicked handler failed");var hiddenButton=$qml.app.findUi("toolbarHidden",$qml.app.toolbarObject);if(hiddenButton.selected!==$qml.app.state.hidden)throw new Error("TSX reactive label failed");$qml.app.findUi("toolbarGrid",$qml.app.toolbarObject).clicked()}if(ticks===12){if($qml.app.state.view!=="grid")throw new Error("Grid event failed");$qml.app.findUi("toolbarColumns",$qml.app.toolbarObject).clicked()}if(ticks===16){if($qml.app.state.view!=="columns")throw new Error("Columns event failed");$qml.app.findUi("toolbarUp",$qml.app.toolbarObject).clicked()}if(ticks===20){var address=$qml.app.findUi("toolbarAddress",$qml.app.toolbarObject);if(address.text!==$qml.app.state.path||$qml.app.state.path===startingPath)throw new Error("Path update binding failed");address.clear();address.insertText(startingPath);address.accepted()}if(ticks===24){if($qml.app.state.path!==startingPath||$qml.app.state.error)throw new Error("TSX accepted text argument failed");var address=$qml.app.findUi("toolbarAddress",$qml.app.toolbarObject);address.clear();address.insertText("/draft-not-submitted");$qml.app.findUi("toolbarHidden",$qml.app.toolbarObject).clicked()}if(ticks===28){var address=$qml.app.findUi("toolbarAddress",$qml.app.toolbarObject);if(address.text!=="/draft-not-submitted"||$qml.app.state.path!==startingPath)throw new Error("Local address draft did not survive unrelated state updates: "+address.text+" draft="+address.draft+" path="+$qml.app.state.path);console.warn("FM_TSX_SMOKE_PASS");Qt.quit()}if(ticks>36)throw new Error("TSX smoke timeout")}catch(error){console.warn("FM_TSX_SMOKE_FAIL",error);Qt.exit(1)}})({"app": app, "window": ndScope0_window}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":172,"columnNumber":5,"component":"qml:Timer"}
Timer {
id: n356
objectName: "n356"
property int step: 0
property int ticks: 0
property var originalSidebar: null
property var alpha: null
property var beta: null
property var proton: null
property var heroic: null
function hasText() { return (() => { const __name = function(fn) { return fn; }; return (($qml,object,text)=>{if(!object)return false;if(object.text===text)return true;for(var i=0;i<object.children.length;i++)if(hasText(object.children[i],text))return true;return false})({}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":172,"columnNumber":5,"component":"qml:Timer","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":172,"columnNumber":5,"component":"qml:Timer","property":"qmlMethods"}
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":172,"columnNumber":5,"component":"qml:Timer","property":"interval"}
interval: 200
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":172,"columnNumber":5,"component":"qml:Timer","property":"repeat"}
repeat: true
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":172,"columnNumber":5,"component":"qml:Timer","property":"running"}
running: (() => { const __name = function(fn) { return fn; }; return ($qml=>Quickshell.env("NANDOMO_FM_SIDEBAR_SMOKE")==="1")({}); })()
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":172,"columnNumber":5,"component":"qml:Timer","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{ticks++;try{if($qml.app.state.error)throw new Error($qml.app.state.error);if(ticks>80)throw new Error("Sidebar fixture timeout at step "+step);if(step===0&&$qml.app.sidebarObject&&hasText($qml.app.sidebarObject,$qml.app.tr("Nenhuma instala\xE7\xE3o detectada"))){originalSidebar=$qml.app.sidebarObject;$qml.app.send("fixture","populated");step=1}else if(step===1&&$qml.app.findUi("gameGroup:Steam / Proton",$qml.app.sidebarObject)){alpha=$qml.app.findUi("drive:a",$qml.app.sidebarObject);beta=$qml.app.findUi("drive:b",$qml.app.sidebarObject);var section=$qml.app.findUi("gameGroup:Steam / Proton",$qml.app.sidebarObject);if(section.height!==36||$qml.app.findUi("game:/games/proton",section))throw new Error("Collapsed group dimensions failed");if(!alpha||!beta)return;if(beta.mounted||!beta.statusIcon||hasText($qml.app.sidebarObject,$qml.app.tr("Nenhum volume detectado")))throw new Error("Initial sidebar state failed");$qml.app.findUi("groupToggle:gameGroup:Steam / Proton",section).clicked();step=11}else if(step===11&&$qml.app.findUi("game:/games/proton",$qml.app.sidebarObject)){var section=$qml.app.findUi("gameGroup:Steam / Proton",$qml.app.sidebarObject);if(section.height<=36)return;$qml.app.findUi("groupToggle:gameGroup:Steam / Proton",section).clicked();step=12}else if(step===12&&!$qml.app.findUi("game:/games/proton",$qml.app.sidebarObject)){var section=$qml.app.findUi("gameGroup:Steam / Proton",$qml.app.sidebarObject);if(section.height!==36)return;$qml.app.findUi("groupToggle:gameGroup:Steam / Proton",section).clicked();step=13}else if(step===13&&$qml.app.findUi("game:/games/proton",$qml.app.sidebarObject)){proton=$qml.app.findUi("game:/games/proton",$qml.app.sidebarObject);$qml.app.send("fixture","updated");step=2}else if(step===2&&$qml.app.findUi("gameGroup:Heroic",$qml.app.sidebarObject)&&beta.text==="Beta online"){if($qml.app.sidebarObject!==originalSidebar||$qml.app.findUi("drive:a",$qml.app.sidebarObject)!==alpha||$qml.app.findUi("drive:b",$qml.app.sidebarObject)!==beta)throw new Error("Drive identities changed");if($qml.app.findUi("game:/games/proton",$qml.app.sidebarObject)!==proton||proton.text!=="Proton renamed")throw new Error("Nested row identity changed");if(!beta.mounted||beta.statusIcon||beta.parent.parent.y>=alpha.parent.parent.y)throw new Error("Native reorder failed");$qml.app.findUi("groupToggle:gameGroup:Heroic",$qml.app.sidebarObject).clicked();step=21}else if(step===21&&$qml.app.findUi("game:/games/heroic",$qml.app.sidebarObject)){heroic=$qml.app.findUi("game:/games/heroic",$qml.app.sidebarObject);beta.clicked();step=3}else if(step===3&&$qml.app.state.path==="/b-new"){$qml.app.send("fixture","removed");step=4}else if(step===4&&beta.text==="Beta kept"&&!$qml.app.findUi("drive:a",$qml.app.sidebarObject)&&!$qml.app.findUi("game:/games/proton",$qml.app.sidebarObject)){if($qml.app.findUi("game:/games/heroic",$qml.app.sidebarObject)!==heroic||heroic.text!=="Heroic kept")throw new Error("Retained group failed");$qml.app.send("fixture","empty");step=5}else if(step===5&&hasText($qml.app.sidebarObject,$qml.app.tr("Nenhum volume detectado"))&&hasText($qml.app.sidebarObject,$qml.app.tr("Nenhuma instala\xE7\xE3o detectada"))&&!$qml.app.findUi("drive:b",$qml.app.sidebarObject)){if($qml.app.sidebarObject!==originalSidebar||$qml.app.findUi("game:/games/heroic",$qml.app.sidebarObject))throw new Error("Sidebar teardown failed");console.warn("FM_SIDEBAR_SMOKE_PASS");Qt.quit()}}catch(error){console.warn("FM_SIDEBAR_SMOKE_FAIL",error);Qt.exit(1)}})({"app": app}, ...arguments); })(); }
}

// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":347,"columnNumber":5,"component":"qml:Timer"}
Timer {
id: n357
objectName: "n357"
property int step: 0
property int ticks: 0
property string fixturePath: ""
property int originalWindowHeight: 0
property int previewStableTicks: 0
function field() { return (() => { const __name = function(fn) { return fn; }; return (($qml,value)=>{var input=$qml.app.findUi("editName",$qml.app.dialogsObject);input.clear();input.insertText(value)})({"app": app}, ...arguments); })(); }
function save() { return (() => { const __name = function(fn) { return fn; }; return ($qml=>{$qml.app.findUi("editSave",$qml.app.dialogsObject).clicked()})({"app": app}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":347,"columnNumber":5,"component":"qml:Timer","property":"qmlDeclarations"}
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":347,"columnNumber":5,"component":"qml:Timer","property":"qmlMethods"}
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":347,"columnNumber":5,"component":"qml:Timer","property":"interval"}
interval: 200
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":347,"columnNumber":5,"component":"qml:Timer","property":"repeat"}
repeat: true
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":347,"columnNumber":5,"component":"qml:Timer","property":"running"}
running: (() => { const __name = function(fn) { return fn; }; return ($qml=>Quickshell.env("NANDOMO_FM_UX_SMOKE")==="1")({}); })()
// @nandomo-source {"fileName":"src/native/NativeSmokeChecks.tsx","lineNumber":347,"columnNumber":5,"component":"qml:Timer","property":"onTriggered"}
onTriggered: function() { (() => { const __name = function(fn) { return fn; }; return ($qml=>{ticks++;try{if($qml.app.state.error&&!$qml.app.state.conflict&&step!==9&&step!==10)throw new Error("Unexpected UI error at step "+step+": "+$qml.app.state.error);if(ticks>100)throw new Error("UX timeout at step "+step+": "+$qml.app.state.error);if(step===0&&$qml.app.detailsObject&&$qml.app.dialogsObject&&!$qml.app.state.busy){if($qml.app.state.path.indexOf("/tmp/nandomo-ux-smoke-")!==0)throw new Error("Unsafe fixture path");fixturePath=$qml.app.state.path;if($qml.detailsContainer.visible)throw new Error("Details visible without selection");$qml.app.findUi("toolbarSort",$qml.app.toolbarObject).clicked();step=-1}else if(step===-1&&$qml.app.findUi("toolbarSortPopup",$qml.app.toolbarObject).visible){$qml.app.findUi("sortOption:1",$qml.app.toolbarObject).triggered();$qml.app.findUi("toolbarSortPopup",$qml.app.toolbarObject).close();step=-2}else if(step===-2&&$qml.app.state.order==="size"){$qml.app.findUi("sortOption:0",$qml.app.toolbarObject).triggered();step=-3}else if(step===-3&&$qml.app.state.order==="name"){$qml.app.send("select",$qml.app.state.path+"/picture #.svg");step=-4}else if(step===-4&&$qml.app.state.selected){if($qml.detailsContainer.visible)throw new Error("Selection opened details automatically");$qml.app.send("properties");step=1}else if(step===1&&$qml.app.state.detailsOpen&&$qml.app.findUi("detailsPreview",$qml.app.detailsObject).previewStatus==="ready"){if(!$qml.detailsContainer.visible)throw new Error("Selected file details hidden");var thumb=$qml.app.findUi("thumbnail:"+$qml.app.state.selected.path,$qml.window.contentItem);if(!thumb||!thumb.item||thumb.item.previewStatus!=="ready")return;$qml.app.context($qml.app.state.selected,400,200);if(!$qml.contextMenu.itemAt(3).enabled)throw new Error("Preview menu disabled");$qml.contextMenu.itemAt(3).triggered();$qml.contextMenu.close();step=2}else if(step===2&&$qml.app.findUi("previewDialog",$qml.app.dialogsObject).visible){if($qml.app.findUi("expandedPreview",$qml.app.dialogsObject).previewStatus!=="ready")return;if(++previewStableTicks<3)return;var preview=$qml.app.findUi("previewDialog",$qml.app.dialogsObject);if(preview.height<=preview.width)throw new Error("Portrait image did not produce a portrait modal");if(preview.height>$qml.window.height||preview.width>$qml.window.width)throw new Error("Preview exceeds window");$qml.app.findUi("previewZoomIn",$qml.app.dialogsObject).clicked();step=201}else if(step===201){var image=$qml.app.findUi("expandedPreview",$qml.app.dialogsObject);if(image.zoom<=1||$qml.app.findUi("previewImage",$qml.app.dialogsObject).scale<=1)return;$qml.app.findUi("previewRotateRight",$qml.app.dialogsObject).clicked();step=202}else if(step===202){if($qml.app.findUi("expandedPreview",$qml.app.dialogsObject).angle!==90||$qml.app.findUi("previewImage",$qml.app.dialogsObject).rotation!==90)return;$qml.app.findUi("expandedPreview",$qml.app.dialogsObject).panTo(20,30);$qml.app.findUi("previewZoomReset",$qml.app.dialogsObject).clicked();step=203}else if(step===203){var image=$qml.app.findUi("expandedPreview",$qml.app.dialogsObject);if(image.zoom!==1||image.angle!==0)return;if(image.panX!==0||image.panY!==0)throw new Error("Reset button retained image pan");$qml.app.findUi("previewClose",$qml.app.dialogsObject).clicked();$qml.app.send("select",$qml.app.state.path+"/document.pdf");step=3}else if(step===3&&$qml.app.findUi("detailsPreview",$qml.app.detailsObject).previewStatus==="ready"&&$qml.app.state.selected.name==="document.pdf"){$qml.app.send("preview");step=301}else if(step===301&&$qml.app.findUi("previewDialog",$qml.app.dialogsObject).visible){var pdf=$qml.app.findUi("expandedPreview",$qml.app.dialogsObject);if(pdf.previewStatus!=="ready")return;if(pdf.zoom!==1||pdf.angle!==0)throw new Error("Preview transform did not reset for another file");$qml.app.findUi("previewRotateRight",$qml.app.dialogsObject).clicked();step=302}else if(step===302){if($qml.app.findUi("previewPdf",$qml.app.dialogsObject).rotation!==90)return;$qml.app.findUi("previewClose",$qml.app.dialogsObject).clicked();step=3021}else if(step===3021&&!$qml.app.state.previewOpen){$qml.app.send("editPermissions");step=303}else if(step===303&&$qml.app.findUi("permissionsDialog",$qml.app.dialogsObject).visible){$qml.app.findUi("permissionsEditor",$qml.app.dialogsObject).mode=416;step=304}else if(step===304){$qml.app.findUi("permissionsSave",$qml.app.dialogsObject).clicked();step=305}else if(step===305&&!$qml.app.findUi("permissionsDialog",$qml.app.dialogsObject).visible&&!$qml.app.state.mutating){if($qml.app.state.error)throw new Error($qml.app.state.error);$qml.app.send("newMenu");step=4}else if(step===4&&$qml.newMenu.visible){$qml.newMenu.itemAt(0).triggered();$qml.newMenu.close();step=5}else if(step===5&&$qml.app.findUi("nameDialog",$qml.app.dialogsObject).visible){field("Created folder");save();step=6}else if(step===6&&!$qml.app.state.editRequest&&!$qml.app.state.mutating&&$qml.app.state.selected&&$qml.app.state.selected.name==="Created folder"){if(!$qml.detailsContainer.visible)throw new Error("Directory properties sidebar hidden");$qml.app.send("create","file");step=7}else if(step===7&&$qml.app.findUi("nameDialog",$qml.app.dialogsObject).visible){field("created.txt");save();step=8}else if(step===8&&!$qml.app.state.editRequest&&$qml.app.state.selected&&$qml.app.state.selected.name==="created.txt"){$qml.app.send("rename");step=9}else if(step===9&&$qml.app.findUi("nameDialog",$qml.app.dialogsObject).visible){field("existing.txt");save();step=10}else if(step===10&&$qml.app.state.error&&!$qml.app.state.mutating){if(!$qml.app.findUi("nameDialog",$qml.app.dialogsObject).visible)throw new Error("Conflict closed rename dialog");field("renamed.txt");save();step=11}else if(step===11&&!$qml.app.state.editRequest&&!$qml.app.state.mutating&&$qml.app.state.selected.name==="renamed.txt"){$qml.app.send("select",null);step=12}else if(step===12&&!$qml.app.state.selected&&!$qml.detailsContainer.visible){$qml.app.send("select",$qml.app.state.path+"/renamed.txt");step=13}else if(step===13&&$qml.app.state.selected&&$qml.app.state.selected.name==="renamed.txt"){$qml.app.findUi("detailsCopy",$qml.app.detailsObject).clicked();step=14}else if(step===14&&$qml.app.state.clipboard){$qml.app.send("navigate",$qml.app.state.path+"/Created folder");step=15}else if(step===15&&$qml.app.state.path.endsWith("/Created folder")&&!$qml.app.state.busy){$qml.app.send("paste");step=16}else if(step===16&&!$qml.app.state.mutating&&$qml.app.state.selected&&$qml.app.state.selected.name==="renamed.txt"){if($qml.app.state.error)throw new Error($qml.app.state.error);$qml.app.send("up");step=17}else if(step===17&&!$qml.app.state.busy&&!$qml.app.state.path.endsWith("/Created folder")){$qml.app.send("select",$qml.app.state.path+"/renamed.txt");step=18}else if(step===18&&$qml.app.state.selected&&$qml.app.state.selected.name==="renamed.txt"){$qml.app.findUi("detailsCut",$qml.app.detailsObject).clicked();step=19}else if(step===19&&$qml.app.state.clipboard&&$qml.app.state.clipboard.mode==="move"){$qml.app.send("navigate",$qml.app.state.path+"/Move target");step=20}else if(step===20&&$qml.app.state.path.endsWith("/Move target")&&!$qml.app.state.busy){$qml.app.send("paste");step=21}else if(step===21&&!$qml.app.state.mutating&&$qml.app.state.selected&&$qml.app.state.selected.name==="renamed.txt"){if($qml.app.state.error||$qml.app.state.clipboard)throw new Error("Cut/paste failed");$qml.app.send("preferences");step=22}else if(step===22&&$qml.app.findUi("preferencesDialog",$qml.app.dialogsObject).visible){originalWindowHeight=$qml.window.height;$qml.window.height=480;step=220}else if(step===220){var preferencesDialog=$qml.app.findUi("preferencesDialog",$qml.app.dialogsObject);if(preferencesDialog.width<400||preferencesDialog.height<250)throw new Error("Preferences content collapsed");if(preferencesDialog.height>$qml.window.height)throw new Error("Preferences exceeds window");$qml.app.findUi("preferencesShowSidebarVolumes",$qml.app.dialogsObject).handleClick();step=221}else if(step===221){if($qml.app.state.preferences.showSidebarVolumes||$qml.app.findUi("sidebarVolumesTitle",$qml.app.sidebarObject))return;$qml.app.findUi("preferencesShowSidebarVolumes",$qml.app.dialogsObject).handleClick();step=222}else if(step===222){if(!$qml.app.state.preferences.showSidebarVolumes||!$qml.app.findUi("sidebarVolumesTitle",$qml.app.sidebarObject))return;$qml.app.findUi("preferencesGrid",$qml.app.dialogsObject).sliderDragFinished(128);$qml.app.findUi("preferencesThumbnails",$qml.app.dialogsObject).handleClick();step=23}else if(step===23&&$qml.app.state.preferences.gridSize===128&&$qml.app.state.preferences.thumbnails===false){$qml.window.height=originalWindowHeight;$qml.app.send("closePreferences");$qml.app.send("openWith",$qml.app.state.selected.path);step=24}else if(step===24&&$qml.app.findUi("chooserDialog",$qml.app.dialogsObject).visible){if(!$qml.app.state.applications.length)throw new Error("No installed applications found");var list=$qml.app.findUi("chooserList",$qml.app.dialogsObject);if(!list||list.count!==$qml.app.state.applications.length)return;list.forceLayout();if(!list.itemAtIndex(0))return;$qml.app.findUi("chooserSearch",$qml.app.dialogsObject).text="nandomo-no-such-application-12345";step=241}else if(step===241){if($qml.app.findUi("chooserList",$qml.app.dialogsObject).count!==0)return;$qml.app.findUi("chooserSearch",$qml.app.dialogsObject).text="";step=242}else if(step===242){if($qml.app.findUi("chooserList",$qml.app.dialogsObject).count!==$qml.app.state.applications.length)return;$qml.app.findUi("chooserClose",$qml.app.dialogsObject).clicked();step=25}else if(step===25&&!$qml.app.state.chooserOpen){$qml.app.send("transfer","copy");step=26}else if(step===26&&$qml.app.findUi("destinationDialog",$qml.app.dialogsObject).visible){if($qml.app.findUi("nameDialog",$qml.app.dialogsObject).visible)throw new Error("Transfer still shows text input");$qml.app.send("browseDestination",$qml.app.state.path.substring(0,$qml.app.state.path.lastIndexOf("/"))+"/Created folder");step=27}else if(step===27&&!$qml.app.state.destinationBusy&&$qml.app.state.destinationPath.endsWith("/Created folder")){$qml.app.findUi("destinationConfirm",$qml.app.dialogsObject).clicked();step=28}else if(step===28&&$qml.app.findUi("conflictDialog",$qml.app.dialogsObject).visible){var input=$qml.app.findUi("conflictName",$qml.app.dialogsObject);input.clear();input.insertText("resolved.txt");$qml.app.findUi("conflictRename",$qml.app.dialogsObject).clicked();step=29}else if(step===29&&!$qml.app.state.conflict&&!$qml.app.state.editRequest&&!$qml.app.state.mutating){$qml.app.send("up");step=30}else if(step===30&&!$qml.app.state.busy&&!$qml.app.state.path.endsWith("/Move target")){$qml.app.send("select",$qml.app.state.path+"/Created folder");step=31}else if(step===31&&$qml.app.state.selected&&$qml.app.state.selected.directory){$qml.app.send("customizeFolder");step=32}else if(step===32&&$qml.app.findUi("appearanceDialog",$qml.app.dialogsObject).visible){$qml.app.findUi("appearanceLogosTab",$qml.app.dialogsObject).clicked();step=321}else if(step===321&&$qml.app.findUi("appearanceNext",$qml.app.dialogsObject).enabled){$qml.app.findUi("appearanceNext",$qml.app.dialogsObject).clicked();step=322}else if(step===322&&$qml.app.findUi("appearancePrevious",$qml.app.dialogsObject).enabled){$qml.app.findUi("appearanceEmblemsTab",$qml.app.dialogsObject).clicked();step=323}else if(step===323&&!$qml.app.findUi("appearancePrevious",$qml.app.dialogsObject).enabled){$qml.app.findUi("appearanceColor:#448aff",$qml.app.dialogsObject).clicked();$qml.app.findUi("appearanceSave",$qml.app.dialogsObject).clicked();step=33}else if(step===33&&!$qml.app.findUi("appearanceDialog",$qml.app.dialogsObject).visible){var folder=$qml.app.state.entries.find(function(entry){return entry.name==="Created folder"});if(!folder||folder.folderColor!=="#448aff")throw new Error("Folder appearance not propagated");$qml.app.send("applications");step=34}else if(step===34&&$qml.app.state.path==="applications:///"&&!$qml.app.state.busy){if(!$qml.app.state.entries.length||$qml.app.state.chooserOpen)throw new Error("Applications did not open as file view");$qml.app.send("properties",$qml.app.state.entries[Math.floor($qml.app.state.entries.length/3)].path);step=341}else if(step===341&&$qml.app.state.selected&&$qml.filesGrid.currentItem){if($qml.app.findUi("detailsOpen",$qml.app.detailsObject).text!==$qml.app.tr("Abrir app"))throw new Error("Application action label wrong");if($qml.app.findUi("detailsPreview",$qml.app.detailsObject).visible)throw new Error("Application shows file preview");$qml.filesGrid.forceLayout();var tile=$qml.filesGrid.currentItem;if(tile.y<$qml.filesGrid.contentY-1||tile.y+tile.height>$qml.filesGrid.contentY+$qml.filesGrid.height+1)throw new Error("Selected app disappeared after grid resized");$qml.window.width=1e3;$qml.window.height=650;step=342}else if(step===342&&$qml.filesGrid.currentItem){var tile=$qml.filesGrid.currentItem;if(tile.y<$qml.filesGrid.contentY-1||tile.y+tile.height>$qml.filesGrid.contentY+$qml.filesGrid.height+1)throw new Error("Selection lost after another window resize");$qml.app.send("special","recent:///");step=35}else if(step===35&&$qml.app.state.path==="recent:///"&&!$qml.app.state.busy){$qml.app.send("special","trash:///");step=36}else if(step===36&&$qml.app.state.path==="trash:///"&&!$qml.app.state.busy){$qml.app.send("navigate",fixturePath+"/Steam/steamapps/common");step=37}else if(step===37&&$qml.app.state.path===fixturePath+"/Steam/steamapps/common"&&!$qml.app.state.busy){var crumb=$qml.app.findUi("toolbarAddress",$qml.app.toolbarObject).segment(fixturePath+"/Steam/steamapps");if(!crumb)throw new Error("Breadcrumb segment missing: "+JSON.stringify($qml.app.findUi("toolbarAddress",$qml.app.toolbarObject).parts()));crumb.clicked();step=38}else if(step===38&&!$qml.app.state.busy&&$qml.app.state.path!==fixturePath+"/Steam/steamapps/common"){if($qml.app.state.path!==fixturePath+"/Steam/steamapps")throw new Error("Breadcrumb navigated to wrong directory: "+$qml.app.state.path);console.warn("FM_UX_SMOKE_PASS");Qt.quit()}}catch(error){console.warn("FM_UX_SMOKE_FAIL",error);Qt.exit(1)}})({"app": app, "window": ndScope0_window, "newMenu": ndScope0_newMenu, "contextMenu": ndScope0_contextMenu, "filesGrid": ndScope0_filesGrid, "detailsContainer": ndScope0_detailsContainer}, ...arguments); })(); }
}
}