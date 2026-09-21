import { getRelativeLocaleUrl } from "astro:i18n"
import { defaultLocale, isLocale, stripLocalePrefix } from "./config"
import en from "./locales/en"
import es from "./locales/es"

export {
  defaultLocale,
  isLocale,
  type Locale,
  localeMetadata,
  locales,
  stripLocalePrefix,
} from "./config"

const translations = { es, en } as const

export function getTranslations(locale: string) {
  return translations[isLocale(locale) ? locale : defaultLocale]
}

const ABSOLUTE_URL = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i

/**
 * Prefix an internal route with a supported locale while avoiding duplicate
 * locale segments. External URLs, mail/tel links, and fragment links pass
 * through unchanged.
 */
export function localizedPath(locale: string, path: string): string {
  if (ABSOLUTE_URL.test(path)) return path

  const safeLocale = isLocale(locale) ? locale : defaultLocale
  const [pathnameWithQuery = "/", hash] = path.split("#", 2)
  const [rawPathname = "/", query] = pathnameWithQuery.split("?", 2)
  const unprefixed = stripLocalePrefix(rawPathname)
  const route = unprefixed.replace(/^\/|\/$/g, "")
  const localizedWithSlash = route
    ? getRelativeLocaleUrl(safeLocale, route)
    : getRelativeLocaleUrl(safeLocale)
  const localized = localizedWithSlash.replace(/\/$/, "") || "/"
  const withQuery = query ? `${localized}?${query}` : localized

  return hash ? `${withQuery}#${hash}` : withQuery
}
