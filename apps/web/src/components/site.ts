import { type Locale, localeMetadata, locales } from "@/i18n"

export function getLocaleStaticPaths() {
  return locales.map((locale) => ({
    params: { lang: locale },
    props: { locale },
  }))
}

export function splitEntryId(id: string): { locale: Locale; slug: string } | undefined {
  const [candidateLocale, ...slugParts] = id.split("/")
  if (!locales.includes(candidateLocale as Locale) || slugParts.length === 0) return undefined

  return {
    locale: candidateLocale as Locale,
    slug: slugParts.join("/"),
  }
}

export function isPublished(data: { draft?: boolean; disabled?: boolean }): boolean {
  return !data.draft && !data.disabled
}

export function formatDate(value: Date | string, locale: Locale): string {
  const date = new Date(value)
  if (Number.isNaN(date.valueOf())) return ""

  return new Intl.DateTimeFormat(localeMetadata[locale].dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}
