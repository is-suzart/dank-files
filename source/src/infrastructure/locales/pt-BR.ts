import type { Catalog } from '@nandomo/core';

/**
 * pt-BR is the source language: a missing key already renders the Portuguese
 * source string, so only forms that are not the key itself live here.
 */
export const ptBR: Catalog = {
  "Desktop clipboard unavailable":"A área de transferência do sistema está indisponível.",
  "Desktop integration unavailable":"A integração com o desktop está indisponível.",
  "Desktop integration closed":"A integração com o desktop foi encerrada.",
  "Desktop request timed out":"A solicitação ao desktop demorou demais.",
  "Invalid file location":"Local de arquivo inválido.",
  "Invalid file clipboard":"A área de transferência não contém arquivos válidos.",
  "Invalid clipboard action":"Ação da área de transferência inválida.",
  "Clipboard too large":"O conteúdo da área de transferência excede o limite.",
  "Invalid clipboard format":"Formato da área de transferência inválido.",

  '{count} itens': { one: '{count} item', other: '{count} itens' },
  '{count} pastas': { one: '{count} pasta', other: '{count} pastas' },
  '{count} selecionados': { one: '{count} selecionado', other: '{count} selecionados' },
};
