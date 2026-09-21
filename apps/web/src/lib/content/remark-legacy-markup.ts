import { defaultLocale, getStaticLocalePath, isLocale, type Locale } from "../../i18n/config"
import { legacyAssetUrl } from "./assets"
import { type LegacyMarkupContext, transformLegacyMarkup } from "./legacy-markup"

interface MarkdownNode {
  type: string
  value?: string
  children?: MarkdownNode[]
}

interface VFileLike {
  path?: string
  history?: string[]
}

type Attributes = Record<string, string>

const LENGTH = /^\d+(?:\.\d+)?(?:px|rem|em|%|vw|vh)$/
const CONTENT_PATH =
  /[\\/]src[\\/]content[\\/](?:blog|work|projects)[\\/]([^\\/]+)[\\/](.+?)\.(?:md|mdx)$/i

function parseAttributes(source: string): Attributes {
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

function contextFromFile(file: VFileLike): LegacyMarkupContext {
  const path = file.path ?? file.history?.at(-1) ?? ""
  const match = path.match(CONTENT_PATH)
  const localeCandidate = match?.[1] ?? defaultLocale
  const locale: Locale = isLocale(localeCandidate) ? localeCandidate : defaultLocale
  const slug = (match?.[2] ?? "entry").replace(/\\/g, "/").replace(/\/index$/i, "")

  return { locale, slug }
}

function imageMarkup(
  rawAttributes: string,
  context: LegacyMarkupContext,
  wrapCaption: boolean,
): { close: string; open: string } {
  const props = parseAttributes(rawAttributes)
  const src = legacyAssetUrl("blog", context.slug, props.src || "")
  const alt = props.alt || context.slug.replaceAll("-", " ")
  const maxWidth = props["max-width"] ?? props.maxWidth
  const maxHeight = props["max-height"] ?? props.maxHeight
  const style = [
    maxWidth && LENGTH.test(maxWidth) ? `max-width:${maxWidth}` : "",
    maxHeight && LENGTH.test(maxHeight) ? `max-height:${maxHeight}` : "",
  ]
    .filter(Boolean)
    .join(";")
  const styleAttribute = style ? ` style="${style}"` : ""
  const image = `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}" loading="lazy" decoding="async">`

  if (!wrapCaption) {
    return {
      open: `<figure class="legacy-blog-image" data-legacy-tag="blog-img"${styleAttribute}>${image}</figure>`,
      close: "",
    }
  }

  return {
    open: `<figure class="legacy-blog-image" data-legacy-tag="blog-img"${styleAttribute}>${image}<figcaption>`,
    close: "</figcaption></figure>",
  }
}

function anchorMarkup(
  tag: "blog-ext" | "blog-link",
  rawAttributes: string,
  context: LegacyMarkupContext,
): { href: string; open: string } {
  const props = parseAttributes(rawAttributes)
  if (tag === "blog-link") {
    const href = getStaticLocalePath(context.locale, `/blog/${props.to || ""}`)
    return { href, open: `<a href="${escapeAttribute(href)}">` }
  }

  const href = props.to || "#"
  return {
    href,
    open: `<a href="${escapeAttribute(href)}" target="${escapeAttribute(props.target || "_blank")}" rel="${escapeAttribute(props.rel || "nofollow noopener noreferrer")}">`,
  }
}

function iconMarkup(rawAttributes: string): string {
  const props = parseAttributes(rawAttributes)
  return `<span class="legacy-icon" data-icon="${escapeAttribute(props.name || "")}" aria-hidden="true"></span>`
}

function embedMarkup(rawAttributes: string, tag: string): string {
  const props = parseAttributes(rawAttributes)
  const src = escapeAttribute(props.src || "")
  const title = escapeAttribute(props.title || "Contenido multimedia incrustado")
  return `<div class="legacy-embed" data-legacy-tag="${tag}"><iframe src="${src}" title="${title}" loading="lazy" allowfullscreen></iframe></div>`
}

function closingIndex(children: MarkdownNode[], start: number, tag: string): number {
  const expression = new RegExp(`</${tag}>`, "i")
  for (let index = start + 1; index < children.length; index += 1) {
    if (children[index]?.type === "html" && expression.test(children[index]?.value ?? "")) {
      return index
    }
  }
  return -1
}

function processHtmlSiblings(children: MarkdownNode[], context: LegacyMarkupContext): void {
  for (let index = 0; index < children.length; index += 1) {
    const node = children[index]
    if (node?.type !== "html" || !node.value) continue

    const value = transformLegacyMarkup(node.value, context)
    const opening = value.match(
      /^\s*<(blog-img|blog-ext|blog-link|blog-embed|LazyEmbed|Icon)\b([^>]*)>\s*$/i,
    )
    if (!opening) {
      node.value = value
      continue
    }

    const originalTag = opening[1]
    const tag = originalTag.toLowerCase()
    const rawAttributes = opening[2] ?? ""
    const acceptedClosingTag = tag === "lazyembed" ? "LazyEmbed(?:e)?" : originalTag
    const closeAt = closingIndex(children, index, acceptedClosingTag)

    if (tag === "icon") {
      node.value = iconMarkup(rawAttributes)
      if (closeAt >= 0 && children[closeAt]) {
        children[closeAt].value = (children[closeAt].value ?? "").replace(/<\/Icon>/i, "")
      }
      continue
    }

    if (tag === "blog-img") {
      const replacement = imageMarkup(rawAttributes, context, closeAt >= 0)
      node.value = replacement.open
      if (closeAt >= 0 && children[closeAt]) {
        children[closeAt].value = (children[closeAt].value ?? "").replace(
          /<\/blog-img>/i,
          replacement.close,
        )
      }
      continue
    }

    if (tag === "blog-ext" || tag === "blog-link") {
      const replacement = anchorMarkup(tag, rawAttributes, context)
      node.value =
        closeAt >= 0
          ? replacement.open
          : `${replacement.open}${escapeAttribute(replacement.href)}</a>`
      if (closeAt >= 0 && children[closeAt]) {
        children[closeAt].value = (children[closeAt].value ?? "").replace(
          new RegExp(`</${tag}>`, "i"),
          "</a>",
        )
      }
      continue
    }

    node.value = embedMarkup(rawAttributes, tag === "lazyembed" ? "lazy-embed" : "blog-embed")
    if (closeAt >= 0 && children[closeAt]) {
      children[closeAt].value = (children[closeAt].value ?? "").replace(
        new RegExp(`</${acceptedClosingTag}>`, "i"),
        "",
      )
    }
  }
}

function visit(node: MarkdownNode, context: LegacyMarkupContext): void {
  if (!node.children) return
  processHtmlSiblings(node.children, context)
  for (const child of node.children) visit(child, context)
}

/**
 * Dependency-free remark plugin for Astro's `markdown.remarkPlugins` list.
 * It converts complete legacy tags and paired tags emitted as separate MDAST
 * html nodes. Open-only image/embed tags become valid standalone HTML.
 */
export function remarkLegacyMarkup() {
  return (tree: MarkdownNode, file: VFileLike): void => {
    visit(tree, contextFromFile(file))
  }
}

export default remarkLegacyMarkup
