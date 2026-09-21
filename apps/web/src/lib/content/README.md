# Legacy content compatibility

`transformLegacyMarkup(markup, { locale, slug })` converts the Nuxt Content
tags `blog-img`, `blog-ext`, `blog-link`, `blog-embed`, and `Icon` to portable
semantic HTML. It also handles the one legacy `LazyEmbed`/`LazyEmbede` typo in
the work collection.

The transform must run **before Markdown compilation**. Astro's built-in
`render(entry)` compiles a collection entry directly and does not call this
adapter. A dependency-free remark plugin is provided for the application
shell. Add it to `astro.config.mjs` (outside this migration boundary):

```ts
import remarkLegacyMarkup from "./src/lib/content/remark-legacy-markup";

export default defineConfig({
  markdown: { remarkPlugins: [remarkLegacyMarkup] },
});
```

The plugin derives locale and slug from `vfile.path`, transforms tags stored in
a single HTML node, joins tags represented by separate opening/closing nodes,
and makes every open-only legacy tag valid standalone HTML. Alternatively, the
shell can:

1. Pre-normalize source through a custom Content Layer loader and call
   `transformLegacyMarkup` before returning each entry body; or
2. call the same transform from another Markdown pre-pass.

Until one of these is wired, the copied Markdown remains lossless, but custom
tags will render as inert HTML elements. Do not silently delete these tags.

Asset helpers intentionally resolve to the preserved public contract:
`/img/blog/<slug>/<file>`, `/img/work/<slug>/<file>`, and
`/img/projects/<slug>/<file>`. All published content must resolve to a real file;
the production build verifier rejects broken local references.
