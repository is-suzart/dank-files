# Dank Files — file manager QML / DMS

Janela independente executada por Quickshell. Toda a UI do aplicativo é escrita
em TypeScript/TSX: janela, lista, grid, colunas, menus, breadcrumb, diálogos e
prévias. Não há arquivos `.qml` próprios nem um registro `dms.ts`.

O modelo usa signals/computed/batch do Nandomo. A bridge compila as árvores TSX
para QML **temporário**, criado em `/tmp` ao iniciar e removido ao encerrar. Os
componentes externos do DMS e Qt continuam nativos, com seu tema e comportamento.
Node↔Quickshell usa JSON por stdin/stdout, sem WebSocket. O transporte específico
do piloto ainda não é uma integração genérica estabilizada do framework.

## Seleção e teclado

Ctrl+clique adiciona ou remove itens; Shift+clique seleciona um intervalo. O clique
direito preserva a seleção quando ocorre em um item já marcado. Ctrl+A seleciona
os itens visíveis da pasta atual. Setas, Home/End e Shift movem ou ampliam a seleção;
na grade, subir/descer acompanha o número de células por linha.

Ctrl+C/Ctrl+X/Ctrl+V e mover/copiar para trabalham sobre a seleção. Delete envia
os itens à lixeira; F2 e Espaço operam sobre um único item. Campos de texto e
diálogos conservam seus próprios atalhos. O painel de detalhes segue o item com
foco e continua abrindo explicitamente por Propriedades, salvo a preferência fixa.
Navegação por teclado revela o item; selecionar com o mouse só ajusta a rolagem
quando o painel está ativo. Arrastar uma seleção múltipla ainda não foi implementado.

O smoke `node scripts/selection-smoke.mjs` usa arquivos temporários e QtTest para
enviar teclas reais e Ctrl+cliques na grade e em colunas. Requer QtTest apenas
para o teste, além de DMS/Quickshell.

## Desenvolvimento com hot reload

```sh
pnpm --dir /home/savunma/Code/nandomo --filter @nandomo/dank-files dev
```

Salvar `src/app.tsx` ou arquivos em `src/components/` recompila e remonta as
regiões sem reiniciar o estado de aplicação. Seleção, pasta e preferências
continuam; estado local, drafts e foco dos componentes remontados reiniciam.
Erros de compilação/criação QML mantêm a UI anterior. Mudanças na janela nativa,
serviços e modelo exigem reinício e são indicadas no terminal. Veja
[hot reload e limites](../../ARCH/hot-reload.md).

## Autoria TSX e componentes nativos

```tsx
const dms = importQml('qs.DankCommon.Widgets');
const qml = importQml('QtQuick');

<qml.Column spacing={12}>
  <dms.DankButton text="Atualizar" onClicked={manager.refresh} />
</qml.Column>
```

`qml:prepare` descobre os módulos usados e gera seus tipos a partir dos arquivos
`qmldir`, `.qmltypes` e fontes nativas. O cache `.nandomo/qml-modules.d.ts` não é
mantido pelo desenvolvedor. Não é necessário cadastrar cada componente DMS.

Closures comuns executam no Node e usam signals; os eventos atravessam a bridge.
Quando um binding/handler precisa executar no Qt — coordenadas do mouse, drag,
estado de imagem, delegates e APIs nativas — ele é declarado explicitamente:

```tsx
const scope = createQmlScope();
scope.id('icon');

<qml.Image qmlId={scope.id('icon')} source={imageUrl} />
<qml.Item width={qmlExpression(scope, objects => objects.icon.width)} />
```

`qmlExpression` e `qmlHandler` compilam funções JavaScript para o contexto Qt.
Essas funções podem acessar ids do escopo e nomes nativos do Qt, mas **não podem
capturar serviços, signals ou variáveis do Node**. A lógica de arquivos permanece
na camada application. `qmlReadEvent(['text'], handler)` lê a propriedade no
instante do signal nativo, evitando uma inspeção assíncrona que perderia o draft.
`NativeTextField.tsx` usa esse recurso com os signals sem argumentos do DMS.

`For`/`Show` têm criação, ordenação e descarte incrementais. Chaves estáveis
preservam os controles. O transporte confirma montagem e possui fila, timeout e
fechamento de requisições. Referências nativas oferecem `inspect/set/invoke`.
O corpo de `component` executa uma vez por instância; seu escopo descarta effects,
computeds e hooks no unmount.

## Organização e responsabilidades

```text
src/
  main.ts                         # composição de serviços e inicialização
  app.tsx                         # composição das regiões TSX
  components/
    Toolbar.tsx                   # UI + signal/effect do endereço local
    Sidebar.tsx                   # UI + computeds locais + For/Show
    PlaceItem.tsx                 # componente de um volume/local de jogos
    DetailsPanel.tsx              # seleção, metadados e preview nativo
    FileDialogs.tsx               # formulário local e diálogos
    NativeTextField.tsx            # eventos de texto do DMS
  native/
    Shell.tsx                     # transporte nativo, tema e montagem das regiões
    FileWindow.tsx                # janela, atalhos, slots e footer
    FileViews.tsx                 # lista/grid/colunas, delegates e drag/drop
    FileContextMenus.tsx           # menus de arquivos e aplicativos
    PathBar.tsx                    # breadcrumb e editor de caminho
    FilePreview.tsx, PdfPreview.tsx, PreviewContent.tsx
    QuietButton.tsx, EntryIcon.tsx # composição visual nativa
    renderShell.tsx                # gera o QML temporário
  application/
    createFileManager.ts          # estado compartilhado e casos de uso
    ports.ts                      # contratos dos serviços externos
  domain/
    files.ts                      # dados de arquivos, volumes e grupos
    sortEntries.ts                # regras de ordenação/visibilidade
  infrastructure/
    filesystem.ts, nodeServices.ts # filesystem, lsblk, launchers e xdg-open
    icons.ts, dmsDesktop.ts        # integração com o desktop
    quickshell.ts                  # protocolo/processo e montagem das regiões
    quickshellScene.ts, ui-transport.ts
```

O antigo `controller.ts` foi removido. Componentes não recebem `update`, `patch`,
JSON ou comandos de transporte. `createFileManager(home, services)` depende de
interfaces e pode ser exercitado com serviços em memória, sem Node/Quickshell.
O domínio não importa o runtime. A camada de aplicação usa o core reativo,
uma escolha explícita para esta DX. `main.ts` injeta implementações reais e
encerra o modelo, seus watchers e a UI quando o processo fecha.

## Executar

```sh
cd /home/savunma/Code/nandomo
pnpm --filter @nandomo/dank-files start
```

Requer Node, dependências do workspace, Quickshell/Qt e DMS com DankCommon.
O launcher encontra o bundle do DMS em `$XDG_RUNTIME_DIR/danklinux-shell`.
Para outra instalação:

```sh
NANDOMO_DMS_SOURCE=/caminho/da/pasta/que/contem/DankCommon \
  pnpm --filter @nandomo/dank-files start
```

A pasta temporária contém o shell, os componentes de preview deste app e um symlink para DankCommon;
ela é removida no encerramento. Não copia/modifica componentes do DMS, não
altera configurações do desktop e não inicia uma segunda barra/sessão DMS.
O cache extraído do DMS pode mudar após reiniciar/atualizar o shell: o launcher
redescobre a fonte em cada execução.

## Implementado neste primeiro recorte

- Diretórios reais, links simbólicos, caminho editável e erros de leitura.
- Voltar, avançar, pasta acima e atualização manual.
- Lista, grid e colunas: selecionar pasta em uma coluna abre a próxima.
- Ordenação por nome, tamanho, data e extensão; direção ascendente/descendente,
  pastas antes dos arquivos, toggle de ocultos.
- Abrir arquivo com xdg-open por duplo clique, sem interpolação de shell.
- Drives via lsblk, inclusive volumes não montados (sem ação de montagem).
- Seção Jogos abaixo de Drives: Steam/Proton, Heroic e Lutris agrupados.
- DankButton/DankTextField e Style do DankCommon; cores de dms-colors.json com
  atualização pelo arquivo e fallback para SystemPalette.
- Ícones do tema DMS por modo ou qt6ct, busca XDG com herança/hicolor e fallback
  no provider Quickshell. Tipos são por extensão neste recorte, não MIME completo.

- Clique simples seleciona; o painel direito aparece somente para arquivos.
- Botão Novo na sidebar: criar pasta ou arquivo vazio, com formulário em TSX.
- Renomear arquivos/pastas via diálogo; conflitos preservam o destino e mantêm
  o formulário aberto. Criação usa escrita exclusiva; rename usa GNU `mv -n -T`.
- Menu de contexto: abrir, preview, renomear, copiar caminho, criar e atualizar.
- Imagens nativas e PDF (primeira página no painel, múltiplas páginas no diálogo).
  PDF requer o módulo Qt Quick PDF; falhas mostram uma mensagem no preview.

Atalhos: Alt+Left/Right/Up, Ctrl+H, Ctrl+L, F5, F2 (renomear), Espaço
(preview) e Esc (fechar detalhes/diálogo). Ctrl+L foca o campo de caminho.
O arquivo só é criado/renomeado após Salvar. Abrir chama xdg-open.
Os componentes novos são TSX; renderização de imagens/PDF é QML nativo.

## Descoberta de jogos: alcance atual

Steam considera instalação nativa/Flatpak, libraryfolders.vdf e os diretórios
common/compatdata. Heroic considera configs nativas/Flatpak, winePrefix nos
JSONs GamesConfig e Games/Heroic. Lutris considera configs nativas/Flatpak,
prefix em YAML e Games. Só diretórios existentes aparecem, com deduplicação
por realpath. Não é um scanner universal de todos os formatos/launchers; não
varre o disco inteiro e não lê executáveis. YAML é reconhecimento de chave
simples, sem execução/avaliação do arquivo.

## Próximas etapas

Ainda faltam navegação completa por teclado e multisseleção, breadcrumbs,
clipboard entre apps, resolução interativa de conflitos, progresso/cancelamento,
lixeira e restauração, montagem/ejeção via UDisks2, hotplug, MIME/thumbnails,
propriedades, busca e acessibilidade/teclado completos. Drives são atualizados
manualmente por Atualizar; jogos personalizados podem exigir ampliar a descoberta.
A interface não deve ser tratada como um file manager completo nesta etapa.

Antes de adicionar operações destrutivas, precisamos testar os contratos de
conflito, lixeira, cancelamento e links simbólicos em diretórios de fixture.

## Testes

```sh
pnpm --filter @nandomo/dank-files test
pnpm --filter @nandomo/dank-files typecheck
# Sem janela no desktop: use Xvfb e software rendering em um runtime de teste.
NANDOMO_DMS_SOURCE=/caminho/do/DMS XDG_RUNTIME_DIR=/tmp/runtime-fm \
NANDOMO_FM_QT_PLATFORM=xcb QT_QUICK_BACKEND=software \
  xvfb-run -a node examples/file-manager-qml/scripts/run.mjs --smoke
# Fixture nativa isolada: listas vazias, inserção, reordenação, atualização e remoção.
NANDOMO_DMS_SOURCE=/caminho/do/DMS XDG_RUNTIME_DIR=/tmp/runtime-fm \
NANDOMO_FM_QT_PLATFORM=xcb QT_QUICK_BACKEND=software \
  xvfb-run -a node examples/file-manager-qml/scripts/run.mjs --sidebar-smoke
```

Crie o runtime de teste com permissão 0700 antes do smoke. Os testes de filesystem
usam temporários, não diretórios de dados do usuário. O smoke monta a view real,
recebe listagem do backend e dispara os sinais dos controles gerados pelo TSX:
ocultos, grid/colunas, pasta acima e aceitação do endereço. Também confere
os bindings de texto e a navegação resultante. Sucesso: `FM_TSX_SMOKE_PASS`.
O smoke de sidebar usa um backend de fixture sem consultar filesystem, lsblk ou
xdg-open. Verifica identidade dos objetos nativos, posições após reordenação,
labels reativos, callbacks com dados atualizados, grupos aninhados e estados
vazios. Sucesso: `FM_SIDEBAR_SMOKE_PASS`.


O smoke de UX cria sua própria pasta em `/tmp`, renderiza imagem/PDF, abre os
menus e diálogos TSX, cria pasta/arquivo e renomeia com um conflito real. Verifica
que o destino foi preservado e remove somente sua fixture ao terminar:

```sh
NANDOMO_DMS_SOURCE=/caminho/do/DMS XDG_RUNTIME_DIR=/tmp/runtime-fm \
NANDOMO_FM_QT_PLATFORM=xcb QT_QUICK_BACKEND=software \
  xvfb-run -a node /home/savunma/Code/nandomo/examples/file-manager-qml/scripts/ux-smoke.mjs
```

Sucesso: `FM_UX_SMOKE_PASS` e `FM_UX_FILESYSTEM_PASS`.


### Visual e preview adaptável

As ações secundárias usam `QuietButton`, composto com Qt Controls e `StyledText`
do DMS: cores do OS, hover/foco e texto truncado. A criação de itens fica no menu de contexto.
O footer mostra nome, caminho, quantidade e ordenação.
`src/native/PreviewContent.tsx` ajusta a proporção do modal à imagem ou primeira página PDF,
limitando sua dimensão ao espaço disponível na janela. O preview oferece também
Abrir no app padrão, usando a associação XDG do desktop sem alterar preferências.


A sidebar descobre os lugares reais por `user-dirs.dirs` (incluindo caminhos
personalizados), sem executar seu conteúdo. Diretórios inexistentes ou desativados
não aparecem. Ícones dos arquivos/lugares vêm do tema XDG/DMS; ações da toolbar
usam os ícones do DMS. Grade é a visualização inicial, com ícones de 96 px,
nomes em até duas linhas e quantidade de colunas adaptável à largura.


A sidebar prioriza os favoritos de `gtk-3.0/bookmarks` (ou `.gtk-bookmarks`),
os mesmos locais usados por Nautilus/Thunar. XDG user-dirs é fallback quando não
há arquivo de favoritos. Apenas diretórios locais acessíveis são suportados.
Steam/Heroic/Lutris são grupos colapsáveis. O caminho usa breadcrumbs clicáveis;
duplo clique ou Ctrl+L ativa edição, Enter navega e Esc fecha a edição.
Ordenação usa um menu e o olho alterna arquivos ocultos.


### Miniaturas e transferências

A grade carrega miniaturas nativas de imagens e da primeira página dos PDFs nas
células visíveis. Ícones de fallback priorizam versões escaláveis/maiores.
Menus têm grupos de ações, atalhos e o mesmo tema do app. O olho riscado significa
ocultos escondidos; o olho aberto e destacado significa ocultos visíveis.

Copiar/recortar usa uma área de transferência interna, de um item, com Ctrl+C/X/V.
Navegue até a pasta desejada e cole; recortar só move quando Colar é confirmado.
Mover para/Copiar para abre um diálogo de destino. A integração da área de
transferência com outros aplicativos e multisseleção ainda não estão implementadas.
Mover/Copiar para permite navegar pelas subpastas em uma lista com rolagem e
voltar à pasta acima, começando na pasta atual. Não muda a navegação principal.
Destinos existentes abrem um diálogo: renomear, ignorar, cancelar ou substituir
arquivos comuns. Substituir não mescla pastas nem segue links simbólicos.
O arquivo substituto é preparado no volume de destino antes da troca; um movimento
só remove a origem depois da cópia. Cópia de pasta dentro de si é recusada.
Links simbólicos são preservados, sem seguir o conteúdo. Falhas durante uma cópia
recursiva podem deixar uma cópia parcial; não há rollback, progresso ou cancelamento.
O smoke de UX também verifica copiar/colar e recortar/colar em sua fixture.
O smoke de sidebar verifica a altura ao expandir/recolher os grupos de jogos.


### Preferências e aplicativos

A engrenagem abre preferências persistidas em
`$XDG_CONFIG_HOME/nandomo-file-manager/preferences.json` (fallback `~/.config`).
Configure ícones de 48–160 px, miniaturas, pastas primeiro, clique único/duplo e
visibilidade da ação de terminal. A gravação é serializada e substitui o JSON
atomicamente. O terminal usa xdg-terminal-exec quando disponível, com fallbacks
para terminais conhecidos; este recorte abre uma janela externa, não um terminal
embutido.

Aplicativos exibe os arquivos `.desktop` instalados na própria área de arquivos,
com nomes localizados e ícones do OS; abrir um item executa o aplicativo.
Abrir com… no contexto de arquivo/pasta usa um seletor pesquisável, chamando
`gio launch` com o caminho separado, sem shell e sem alterar o aplicativo padrão.
Lixeira e Recentes são visualizações internas. Recentes lê o XBEL do desktop
(usando o parser XML do Python 3) e ignora caminhos locais inexistentes e URLs
remotas. Lixeira lê os arquivos e `.trashinfo` do XDG Trash e dos volumes montados.
Oferece restauração para a pasta original e esvaziamento com confirmação. Colisões na restauração preservam ambos os itens e informam o conflito. Locais de rede dependem de GVfs com acesso FUSE.
Instalação de pacotes por drag/drop permanece planejada.

A interface tem catálogos em português brasileiro, inglês e chinês simplificado.
O idioma é escolhido na inicialização pelo ambiente do sistema de destino:
`LC_ALL`, `LC_MESSAGES` e `LANG`, com a lista GNU `LANGUAGE` quando aplicável.
`C`/`POSIX` e idiomas sem catálogo usam inglês. Isso seleciona traduções incluídas;
não faz tradução automática. Reinicie o app após mudar o idioma do sistema.
Datas e números preservam a região e as categorias `LC_TIME`/`LC_NUMERIC` do OS. Nomes de arquivos, favoritos e jogos
permanecem como foram definidos pelo usuário ou aplicativo de origem.

A revisão tem teste de cobertura de chaves literais da UI e erros em português,
paridade dos catálogos e preservação dos parâmetros. Textos calculados precisam
continuar sendo revisados; mensagens externas do sistema podem vir no idioma do
programa que as produziu. A redação chinesa ainda precisa de revisão por falante nativo.

Teste opcional de movimentação grande, com arquivos temporários próprios:

```bash
cd /home/savunma/Code/nandomo/examples/file-manager-qml
pnpm plugin:build
node scripts/large-transfer-smoke.mjs
```

Exige HOME e `/tmp` em sistemas de arquivos diferentes, ao menos 2 GiB livres em
cada um e DMS/Quickshell disponíveis. Move 1 GiB mais 256 arquivos pequenos pela
interface QML offscreen, compara SHA-256, verifica links simbólicos, mede a
continuidade dos eventos da UI e testa cancelamento na volta. Remove somente as
pastas temporárias criadas pelo próprio teste. Não mede rede ou GoogleDrive.

### Hierarquia, títulos e arraste

Grupos de jogos exibem os locais com recuo e guia visual. Heroic resolve nomes
pelos caches das lojas e pelo `installed.json` do Legendary; IDs como Sugar viram
Rocket League. Quando os metadados faltam, usa o nome da pasta do prefixo.
As visualizações ficam em um grupo de botões; o resumo foi para o rodapé:
nome da pasta, caminho, quantidade e ordenação.

Lista/grade exportam arquivos com drag nativo `text/uri-list` e aceitam arquivos
locais soltos sobre uma pasta ou no fundo da visualização. O drop pode conter
vários URLs, processados em sequência. Ctrl solicita cópia e Shift solicita
movimentação; o destino externo também participa da negociação da ação.
Conflitos recusam sobrescrita; operações múltiplas não são transacionais.


O smoke de arraste usa mouse real via xdotool numa tela Xvfb de 1280×900:

```sh
NANDOMO_DMS_SOURCE=/caminho/do/DMS XDG_RUNTIME_DIR=/tmp/runtime-fm \
NANDOMO_FM_QT_PLATFORM=xcb QT_QUICK_BACKEND=software \
  xvfb-run -a -s '-screen 0 1280x900x24' node /home/savunma/Code/nandomo/examples/file-manager-qml/scripts/drag-smoke.mjs
```

Confere Ctrl+arrastar (preserva origem) e Shift+arrastar (move), somente em sua
pasta temporária. Sucesso: `FM_DRAG_SMOKE_PASS`. A validação com gerenciadores GTK
externos ainda precisa ser concluída; o contrato URI nativo está implementado.


### Propriedades e aparência de pastas

Diretórios também abrem detalhes na sidebar: caminho, data, número de itens
imediatos, quantidade de subpastas, permissões e UID do dono. O tamanho recursivo
não é calculado. O menu de contexto oferece **Cor, emblema e ícone…**, com escolha
de imagem por um seletor nativo. As escolhas são salvas em
`$XDG_CONFIG_HOME/nandomo-file-manager/folders.json`, associadas ao caminho,
e aplicadas na lista e grade deste aplicativo; não mudam as preferências globais
do Nautilus/Thunar. Sem personalização, permanece o ícone do OS.

Os diálogos são compostos em TSX (`FileDialogs.tsx`, `FolderAppearanceDialog.tsx`)
com signals e efeitos. Os wrappers QML `FolderList`, `IconPicker` e `EntryIcon`
cuidam da rolagem, seletor nativo e renderização dos ícones. Isso também permite
encapsular a composição em `defineComponent`; APIs Qt continuam nos wrappers.
O arraste em lista/grade usa o próprio ícone como imagem de feedback.

### Montagens remotas e alinhamento

Montagens FUSE (incluindo rclone), NFS, CIFS e semelhantes não carregam miniaturas
nem prévias automáticas na sidebar. A pré-visualização explícita continua disponível.
A identificação usa o ponto de montagem mais específico de `/proc/self/mountinfo`.
Transferências mostram arquivo/destino no footer e não matam `mv` após cinco segundos;
a duração de uma operação remota depende do serviço. Partições montadas em `/boot`,
`/boot/efi` e `/efi` ficam fora da sidebar de volumes.

Botões somente com ícone têm padding de 9 px para acomodar e centralizar o ícone
de 18 px em 36 px. O header usa `RowLayout`; os primitivos `ui.Flex`, `ui.HStack`
e `ui.VStack` também existem, mas não substituem o alinhamento interno do botão.

### Ações de aplicativos e detalhes avançados

O menu de arquivos termina em Propriedades. Permissões aparecem por extenso na
seção recolhível Avançado; o dono é resolvido para o nome local quando disponível.
Aplicativos tem um menu próprio: Abrir app, Abrir .desktop, Desinstalar… e Ocultar.
Abrir .desktop usa o editor associado a texto simples. Desinstalar… encaminha
para o gerenciador de software registrado para `appstream://`; a remoção depende
desse gerenciador. Ocultar persiste em `hidden-apps.json` no diretório de configuração
do app, sem modificar o launcher original nem os menus globais do desktop.
A seleção é revelada após a geometria mudar, por três frames de atualização,
centralizando o item na grade; a validação nativa inclui um item no meio da grade
seguido de outro redimensionamento da janela.

### Locais, volumes e paleta visual

Favoritos têm menu de contexto para abrir, adicionar a pasta atual e remover de
Locais. O contexto de uma pasta também permite adicioná-la. A atualização dos
bookmarks GTK preserva as outras entradas e labels e usa gravação serializada.
Volumes desmontados mostram um indicador `usb_off`, com tooltip explicativo,
sem o sufixo de texto. O contexto oferece montar/desmontar via `udisksctl`;
a autorização é controlada pelo OS. Esses comandos não são executados pelos smokes.
A personalização usa círculos de cores e uma grade pesquisável de emblemas e
logos/ícones dos temas instalados, com limite inicial de 1.500 logos. Continua
possível escolher uma imagem própria. Composição/estado ficam em TSX; os pequenos
wrappers QML implementam os controles nativos.

### Associações, permissões e retorno ao ícone de pasta

Abrir com consulta o MIME do alvo por `xdg-mime` e as associações recomendadas
por `gio mime`, com aplicativos associados antes dos demais e seus ícones visíveis.
Avançado é o último bloco dos detalhes, usa o ícone de configurações e abre um
editor de acesso para proprietário/grupo/outros. Alterações usam `chmod` nos bits
de acesso, preservando os bits especiais; links exigem abrir o arquivo original.
O proprietário continua somente leitura. A aplicação não eleva privilégios.
Na personalização, Usar ícone de pasta remove somente o logo; mantém cor/emblema.
Emblemas usam os arquivos do catálogo do tema, também ao restaurar a sessão.
Abas e busca usam os controles com visual DMS; Restaurar padrão é secundário,
com Salvar separado no lado direito. A cor não colore um logo personalizado.

### Abas, volumes e movimento

A barra de abas abre uma nova aba na pasta atual. Ctrl+T cria uma aba,
Ctrl+W fecha a atual, Ctrl+Tab e Ctrl+Shift+Tab alternam entre elas.
Cada aba mantém caminho, histórico, seleção e modo de visualização. A última
aba mantém a janela aberta; o clipboard e as preferências pertencem à janela.
Trocas de aba ficam bloqueadas durante transferências e diálogos.

Volumes montados mostram uma barra de espaço indisponível ao usuário, calculada
por `statfs` de forma assíncrona. Dados desconhecidos não mostram uma barra.
Atualizar locais também atualiza os valores. Preferências oferece **Reduzir
animações**, que desativa as transições curtas de seleção, botões e detalhes.

No Wayland, especialmente para arrastar arquivos entre aplicações, inicie com:

```sh
QT_QPA_PLATFORM=wayland pnpm --dir /home/savunma/Code/nandomo --filter @nandomo/dank-files dev
```

O launcher respeita a plataforma explicitamente configurada. O arraste oferece
`text/uri-list` da seleção e limpa o estado ao cancelar ou terminar. A integração
real com Nautilus/Thunar deve ser verificada na sessão gráfica; os testes
`offscreen` não comprovam essa interoperabilidade.

### Pré-visualização e diálogos

A pré-visualização tem botões para fechar, ampliar/reduzir, girar em passos de
90° e restaurar o enquadramento. Zoom varia de 25% a 800%; a transformação
reinicia ao escolher outro arquivo. Imagens e PDF permanecem limitados à área
da prévia. Preferências usa scroll para caber na altura mínima da janela.

“Abrir com” filtra a lista em tempo real e mostra aplicativos associados antes
da lista geral, com ícones. Pastas têm “Abrir em nova aba” no menu de contexto;
o botão “Nova aba” fica visível na barra, ao lado das abas com rolagem horizontal.

Em Preferências, as opções “Mostrar … na barra lateral” controlam lugares,
volumes, jogos e os itens especiais (aplicativos, lixeira e recentes). As opções
são salvas automaticamente; esconder uma seção não desmonta volumes nem altera
os arquivos.

Trocar de aba restaura imediatamente o conteúdo salvo. Listagens consultadas nos
últimos cinco segundos são reutilizadas; as mais antigas são atualizadas em
segundo plano após uma pausa de 150 ms. Uma operação em arquivos invalida essa
janela de cache. F5 continua forçando a atualização imediatamente. A seleção
ativa não recria os botões da barra de abas.


## Registro no desktop Linux

```sh
pnpm --dir /home/savunma/Code/nandomo --filter @nandomo/dank-files install:desktop
```

Registra **Nandomo Arquivos** no menu e como opção para `inode/directory`, sem
alterar o gerenciador padrão. O launcher aceita uma pasta ou URL `file://`, inclusive
caminhos com espaços. Para escolher explicitamente como padrão:

```sh
xdg-mime default io.github.is_suzart.DankFiles.desktop inode/directory
xdg-mime query default inode/directory
```

Anote o padrão anterior com o segundo comando antes de trocar; para restaurar,
execute o primeiro comando com o identificador anterior.

Em uma sessão Wayland, o launcher prefere Wayland a `QT_QPA_PLATFORM=xcb` herdado.
`NANDOMO_FM_QT_PLATFORM=xcb` força X11 para diagnóstico; `offscreen` continua
respeitado para testes. Sem Wayland, o backend Qt existente é preservado.

Este registro local referencia o checkout e o Node instalado: mover/remover o
projeto exige registrar novamente. Ainda não é um pacote independente. Não há
serviço `org.freedesktop.FileManager1` para revelar arquivos via D-Bus, nem suporte
a URLs remotas de rede. Cada abertura cria uma janela/processo independente.
Para remover o registro, apague apenas `io.github.is_suzart.DankFiles.desktop` de
`$XDG_DATA_HOME/applications` (padrão `~/.local/share/applications`) e o diretório
`nandomo-file-manager` do mesmo diretório de dados.


## Plugin DMS distribuível (preview)

```sh
pnpm --dir /home/savunma/Code/nandomo --filter @nandomo/dank-files plugin:build
pnpm --dir /home/savunma/Code/nandomo --filter @nandomo/dank-files plugin:test
```

O artefato `dist/dankFiles.tar.gz` contém a pasta instalável `dankFiles`.
`src/plugin/FilesWidget.tsx` gera o botão da DankBar; o backend é um bundle Node
sem dependências do workspace em runtime. Não é necessário pnpm/tsx/TypeScript
na máquina de destino. Dependências nativas e instalação: [PLUGIN.md](PLUGIN.md).

Para o smoke nativo do pacote extraído, sem abrir janela no desktop:

```sh
node /home/savunma/Code/nandomo/examples/file-manager-qml/scripts/plugin-smoke.mjs --native
```

`plugin:install` compila, testa e copia para o diretório de plugins do usuário.
Recusa sobrescrever um plugin existente; não muda a barra nem os MIME defaults.
Ative em Settings → Plugins e adicione **Dank Files** à DankBar.
O build ainda não é publicado automaticamente em repositório/registro público.


## Tema inicial e vídeos

A janela só aparece após a primeira leitura do tema. Se o tema DMS não estiver
acessível, usa a paleta do Qt; uma atualização posterior do tema continua reativa.

Vídeos MP4/MKV/WebM/MOV/AVI/M4V/OGV/MPEG têm preview nativo Qt Multimedia, com
reproduzir/pausar e busca de posição, sem autoplay. Ocultar/fechar o preview
remove o player e interrompe a reprodução. A grade usa imagens estáticas geradas
por `ffmpegthumbnailer`, com cache em `$XDG_CACHE_HOME/nandomo/video-thumbnails`,
invalidação por tamanho/data e no máximo dois decoders simultâneos. A listagem
não aguarda as miniaturas. A preferência de miniaturas e a restrição para
pastas remotas continuam valendo; falhas mantêm o ícone original.

Smoke nativo (requer ffmpeg para gerar apenas uma fixture temporária):

```sh
node /home/savunma/Code/nandomo/examples/file-manager-qml/scripts/video-native-smoke.mjs
```


No preview ampliado de imagens/PDFs, após aumentar o zoom, arraste com o botão
esquerdo para focar outra região. O cursor indica a ação e o deslocamento fica
limitado à área ampliada. **Restaurar** volta zoom, rotação e posição; em PDFs,
volta também à primeira página e ao zoom interno inicial. Trocar de arquivo
limpa o deslocamento. O arraste é tratado no Qt, sem IPC por movimento do mouse.

Smoke de arraste real com imagem e PDF temporários (QtTest só para a fixture):

```sh
node /home/savunma/Code/nandomo/examples/file-manager-qml/scripts/pan-native-smoke.mjs
```

### Barra compacta e operações

A lupa (ou `Ctrl+F`) abre a busca no lugar do caminho. Fechar a busca limpa o
filtro e restaura o breadcrumb. A barra não mantém uma linha de pesquisa aberta
nem o checkbox de subpastas. Compactação, extração, desfazer e esvaziamento da
lixeira ficam no menu de contexto; renomear vários itens abre o fluxo em lote.
Configurações de comportamento permanecem em Preferências. Durante uma
transferência, o progresso e o botão Cancelar ficam juntos no rodapé.

## Portal FileChooser backend (opt-in)

The bundle includes an `org.freedesktop.impl.portal.FileChooser` backend for
OpenFile, SaveFile and SaveFiles. Applications that use the desktop portal can
select files in Dank Files, including multiple files and folders, filters,
additional choices and explicit overwrite confirmation.

From an installed plugin directory:

```bash
node app/install-portal-backend.mjs             # preview; writes nothing
node app/install-portal-backend.mjs --enable
systemctl --user restart xdg-desktop-portal.service
```

Development: run `pnpm plugin:build`, then use
`node scripts/install-portal-backend.mjs --enable` from the application directory.
The installer registers the backend for the current user, backs up the active
portal configuration (including desktop-specific configurations), and changes
only `org.freedesktop.impl.portal.FileChooser` under `[preferred]` to
`dank-files;gtk`. Screen sharing, screenshots and other portal preferences stay
as configured. GTK remains an alternative preference, not a per-request crash
recovery guarantee. `--uninstall` removes the registration and restores the
configuration backup; restart the portal service afterward.

Requires `xdg-desktop-portal`, Python/PyGObject, Node, Quickshell and an available
DMS DankCommon source. Restart browsers after changing the portal. Browsers
which use their own file dialogs must first enable their portal integration;
setting `inode/directory` alone does not select upload/download dialogs.

The chooser currently opens as a separate window: foreign-parent attachment and
browser-relative modality are not implemented. MIME filters use the OS
shared-mime-info catalog, with common-type fallbacks on minimal installations.

Validation includes the D-Bus backend contract and public portal forwarding on
private buses. `pnpm exec tsx tests/portal-native-smoke.tsx` additionally runs the
public portal through a real Quickshell chooser, including subfolder navigation,
filtering and file selection; set `PORTAL_TEST_PLATFORM=wayland` for a native
Wayland run. No browser profiles are modified by the installer.
