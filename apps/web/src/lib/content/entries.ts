import { defaultLocale, isLocale, type Locale, localizedPath } from "../../i18n"

export type ContentCollectionName = "blog" | "work" | "projects"

export interface LocalizedEntryIdentity {
  locale: Locale
  slug: string
}

export interface PublicationData {
  date: Date | string
  draft?: boolean
  disabled?: boolean
}

export interface ContentLike<TData extends PublicationData = PublicationData> {
  id: string
  data: TData
}

export function parseLocalizedEntryId(id: string): LocalizedEntryIdentity {
  const cleanId = id
    .replace(/\\/g, "/")
    .replace(/\.(?:md|mdx)$/i, "")
    .replace(/\/index$/i, "")
  const [possibleLocale, ...slugParts] = cleanId.split("/")
  const locale = isLocale(possibleLocale) ? possibleLocale : defaultLocale
  const slug = (isLocale(possibleLocale) ? slugParts : [possibleLocale, ...slugParts])
    .filter(Boolean)
    .join("/")

  return { locale, slug }
}

export function contentRoute(collection: ContentCollectionName, entryId: string): string {
  const { locale, slug } = parseLocalizedEntryId(entryId)
  return localizedPath(locale, `/${collection}/${slug}`)
}

export function isPublished(data: Pick<PublicationData, "draft" | "disabled">) {
  return data.draft !== true && data.disabled !== true
}

export function onlyPublished<TEntry extends ContentLike>(entries: readonly TEntry[]): TEntry[] {
  return entries.filter((entry) => isPublished(entry.data))
}

export function sortByDateDescending<TEntry extends ContentLike>(
  entries: readonly TEntry[],
): TEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  )
}
