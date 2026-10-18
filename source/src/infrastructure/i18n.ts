import { fileToolsEn,fileToolsZh } from './locales/fileTools.js';
import { createTranslator, normalizeLocale, resolveLocale, type Catalogs } from '@nandomo/core';
import { ptBR } from './locales/pt-BR.js';
import { en } from './locales/en.js';
import { zhHans } from './locales/zh-Hans.js';

/** Authored UI only: file names, paths, app names and user data stay untouched. */
export const catalogs: Catalogs = { 'pt-BR': ptBR, en:{...en,...fileToolsEn}, 'zh-Hans': {...zhHans,...fileToolsZh} };

export const FALLBACK_LOCALE = 'en';
/** The language the catalog keys are written in. */
export const SOURCE_LOCALE = 'pt-BR';

/** `C`/`POSIX` are accepted and fall back; they never pick a language. */
export function detectOsLocale(
  env: Record<string, string | undefined> = typeof process === 'undefined' ? {} : process.env,
): string | null {
  const effective = env.LC_ALL || env.LC_MESSAGES || env.LANG;
  // GNU LANGUAGE is an ordered preference list, except in the C/POSIX locale.
  if (effective && !normalizeLocale(effective)) return effective;
  return env.LANGUAGE?.split(':').find(locale =>
    !!resolveLocale(locale, Object.keys(catalogs), ''),
  ) || effective || null;
}

export const i18n = createTranslator({ catalogs, locale: detectOsLocale(), fallback: FALLBACK_LOCALE, source: SOURCE_LOCALE });

/** Formatting retains the OS region, even when several regions share a UI catalog. */
export function formattingLocale(category:'LC_TIME'|'LC_NUMERIC', env:Record<string,string|undefined>=process.env):string {
  return normalizeLocale(env.LC_ALL || env[category] || env.LANG) || i18n.locale();
}

/** Startup translation for TSX text props; the native shell has its own `tr`. */
export function t(key: string, params?: Record<string, string | number>): string {
  return i18n.t(key, params);
}

/** Payload handed to the native shell so QML translates without Node state. */
export function qmlCatalog(): { locale: string; fallback: string; source: string; catalogs: Catalogs } {
  return { locale: i18n.locale(), fallback: FALLBACK_LOCALE, source: SOURCE_LOCALE, catalogs };
}
