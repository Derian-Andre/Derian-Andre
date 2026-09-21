import { getStaticLocalePath, type Locale } from "../../i18n/config"
import { legacyAssetUrl } from "./assets"

export const legacyTags = [
  "blog-img",
  "blog-ext",
  "blog-link",
  "blog-embed",
  "Icon",
  "LazyEmbed",
] as const

export interface LegacyMarkupContext {
  locale: Locale
  slug: string
}

type Attributes = Record<string, string>

const LENGTH = /^\d+(?:\.\d+)?(?:px|rem|em|%|vw|vh)$/

function attributes(source: string): Attributes {
  const parsed: Attributes = {}
  const expression = /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
  let match = expression.exec(source)

  while (match) {
    parsed[match[1]] = match[2] ?? match[3] ?? ""
    match = expression.exec(source)
  }

  return parsed
}

function escapeAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function optionalLength(value: string | undefined): string | undefined {
  return value && LENGTH.test(value) ? value : undefined
}

function transformExternalLinks(markup: string): string {
  return markup.replace(
    /<blog-ext\b([^>]*)>([\s\S]*?)<\/blog-ext>/gi,
    (_match, rawAttributes: string, content: string) => {
      const props = attributes(rawAttributes)
      const href = escapeAttribute(props.to || "#")
      const target = escapeAttribute(props.target || "_blank")
      const rel = escapeAttribute(props.rel || "nofollow noopener noreferrer")
      return `<a href="${href}" target="${target}" rel="${rel}">${content}</a>`
    },
  )
}

function transformInternalLinks(markup: string, context: LegacyMarkupContext): string {
  return markup.replace(
    /<blog-link\b([^>]*)>([\s\S]*?)<\/blog-link>/gi,
    (_match, rawAttributes: string, content: string) => {
      const props = attributes(rawAttributes)
      const href = getStaticLocalePath(context.locale, `/blog/${props.to || ""}`)
      return `<a href="${escapeAttribute(href)}">${content}</a>`
    },
  )
}

function transformImages(markup: string, context: LegacyMarkupContext): string {
  return markup.replace(
    /<blog-img\b([^>]*)>([\s\S]*?)<\/blog-img>/gi,
    (_match, rawAttributes: string, caption: string) => {
      const props = attributes(rawAttributes)
      const src = legacyAssetUrl("blog", context.slug, props.src || "")
      const alt = props.alt || context.slug.replaceAll("-", " ")
      const maxWidth = optionalLength(props["max-width"] ?? props.maxWidth)
      const maxHeight = optionalLength(props["max-height"] ?? props.maxHeight)
      const style = [
        maxWidth ? `max-width:${maxWidth}` : "",
        maxHeight ? `max-height:${maxHeight}` : "",
      ]
        .filter(Boolean)
        .join(";")
      const styleAttribute = style ? ` style="${style}"` : ""
      const cleanCaption = caption.trim()
      const figcaption = cleanCaption ? `<figcaption>${cleanCaption}</figcaption>` : ""

      return `<figure class="legacy-blog-image" data-legacy-tag="blog-img"${styleAttribute}><img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}" loading="lazy" decoding="async">${figcaption}</figure>`
    },
  )
}

function iframe(props: Attributes, legacyTag: "blog-embed" | "lazy-embed"): string {
  const src = escapeAttribute(props.src || "")
  const title = escapeAttribute(props.title || "Contenido multimedia incrustado")
  return `<div class="legacy-embed" data-legacy-tag="${legacyTag}"><iframe src="${src}" title="${title}" loading="lazy" allowfullscreen></iframe></div>`
}

function transformEmbeds(markup: string): string {
  return markup
    .replace(/<blog-embed\b([^>]*)>(?:[\s\S]*?)<\/blog-embed>/gi, (_match, rawAttributes: string) =>
      iframe(attributes(rawAttributes), "blog-embed"),
    )
    .replace(
      /<LazyEmbed\b([^>]*)>(?:[\s\S]*?)<\/LazyEmbed(?:e)?>/gi,
      (_match, rawAttributes: string) => iframe(attributes(rawAttributes), "lazy-embed"),
    )
}

function transformIcons(markup: string): string {
  return markup
    .replace(/<Icon\b([^>]*)\/>/g, (_match, rawAttributes: string) => {
      const props = attributes(rawAttributes)
      return `<span class="legacy-icon" data-icon="${escapeAttribute(props.name || "")}" aria-hidden="true"></span>`
    })
    .replace(/<Icon\b([^>]*)>(?:[\s\S]*?)<\/Icon>/g, (_match, rawAttributes: string) => {
      const props = attributes(rawAttributes)
      return `<span class="legacy-icon" data-icon="${escapeAttribute(props.name || "")}" aria-hidden="true"></span>`
    })
}

export function containsLegacyMarkup(markup: string): boolean {
  return /<(?:blog-(?:img|ext|link|embed)|Icon|LazyEmbed)\b/i.test(markup)
}

/**
 * Convert the custom elements used by Nuxt Content into portable semantic
 * HTML. Run this before Markdown compilation (custom loader/remark pre-pass),
 * because Astro's standard `render(entry)` does not invoke this function.
 */
export function transformLegacyMarkup(markup: string, context: LegacyMarkupContext): string {
  let transformed = transformExternalLinks(markup)
  transformed = transformInternalLinks(transformed, context)
  transformed = transformImages(transformed, context)
  transformed = transformEmbeds(transformed)
  return transformIcons(transformed)
}
