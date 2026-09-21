export const locales = ["es", "en"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "es"

export const i18nRouting = {
  prefixDefaultLocale: true,
  redirectToDefaultLocale: false,
} as const

export const localeMetadata: Record<
  Locale,
  {
    dateLocale: string
    languageLabel: string
    openGraphLocale: string
    switchLabel: string
  }
> = {
  es: {
    dateLocale: "es-MX",
    languageLabel: "Español",
    openGraphLocale: "es_MX",
    switchLabel: "Cambiar a español",
  },
  en: {
    dateLocale: "en-US",
    languageLabel: "English",
    openGraphLocale: "en_US",
    switchLabel: "Switch to English",
  },
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function stripLocalePrefix(pathname: string): string {
  const normalizedPathname = `/${pathname}`.replace(/\/{2,}/g, "/")
  const [, candidateLocale, ...segments] = normalizedPathname.split("/")

  if (!candidateLocale || !isLocale(candidateLocale)) return normalizedPathname

  return segments.length > 0 ? `/${segments.join("/")}` : "/"
}

/**
 * Build-time fallback for Markdown transforms, where Astro's virtual
 * `astro:i18n` module is not available while `astro.config.mjs` is loading.
 */
export function getStaticLocalePath(locale: string, path: string): string {
  const safeLocale = isLocale(locale) ? locale : defaultLocale
  const route = stripLocalePrefix(path).replace(/^\/|\/$/g, "")
  const prefix =
    i18nRouting.prefixDefaultLocale || safeLocale !== defaultLocale ? `/${safeLocale}` : ""

  return route ? `${prefix}/${route}` : prefix || "/"
}
