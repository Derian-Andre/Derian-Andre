# Astro content collections

This directory contains the migrated `blog`, `work`, and `projects`
collections. Entry IDs follow `<locale>/<slug>` so existing public routes can
remain `/<locale>/<collection>/<slug>`.

Astro's current Content Layer discovers its registry at
`src/content.config.ts`. That file is deliberately outside this migration's
write boundary. The application shell must add this one-line bridge:

```ts
export { collections } from "./content/collections";
```

The Markdown documents are byte-for-byte copies of the legacy sources. Blog
and work entries are mirrored under both locales because the Nuxt site exposed
both localized route families from the same source content. Projects retain
their existing locale-specific documents. Unpublished legacy blog drafts are
kept under `_drafts/es/` and are intentionally excluded from all loaders.

Use the helpers in `../lib/content` to derive locale/slug/path, filter drafts,
resolve legacy asset URLs, and transform legacy custom tags when rendering raw
Markdown outside Astro's standard `render(entry)` flow.

