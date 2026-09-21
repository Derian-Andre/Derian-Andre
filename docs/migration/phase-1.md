# Phase 1: architecture migration

This phase replaces the Nuxt 2 build and deployment path while intentionally
preserving the current information architecture, content, and curriculum
design. The visual redesign, motion system, shaders, and new portfolio home are
reserved for Phase 2.

## Runtime architecture

- `apps/web`: Astro static site. Astro components are the default rendering
  unit; React is reserved for interactive islands.
- `packages/ui`: shared shadcn-compatible React primitives and design tokens.
- Turborepo coordinates package tasks. Root scripts only delegate to
  `turbo run`.
- Biome checks JavaScript, TypeScript, JSON, and CSS. `astro check` remains the
  source of truth for `.astro` type and template validation.
- Cloudflare Workers Static Assets serves `apps/web/dist`; no Worker runtime or
  Astro Cloudflare adapter is required for this fully prerendered phase.
- Astro's native i18n router owns locale prefixes. Locale configuration is
  centralized in `src/i18n/config.ts` and is shared by routing, the root
  default-locale redirect, metadata, content transforms, and build
  verification.

## Migration invariants

1. Existing `/es` and `/en` URLs must render or redirect permanently.
2. The curriculum keeps its hierarchy, typography, breakpoints, dark/light
   behavior, and print layout.
3. Content slugs are stable. Invalid legacy dates are normalized explicitly,
   never interpreted from the build machine's locale.
4. Legacy custom Markdown elements are translated through one compatibility
   layer instead of editing dozens of articles by hand.
5. No Phase 2 visual language is introduced into migrated pages.

## Deployment workflow

Pull requests and `main` run source checks, a production static build, and route
verification. Deployment is handled by Cloudflare Workers Builds instead of a
GitHub Actions deployment workflow. Rollback uses a previously validated Git
tag or the static artifact retained by CI; the obsolete IONOS workflow has been
removed.

Before the first production deployment:

- connect the repository to the Cloudflare Worker named in `apps/web/wrangler.jsonc`;
- configure the Workers build command and production branch in Cloudflare;
- attach `derianandre.com` and `www.derianandre.com` as custom domains;
- validate deep links, slash normalization, localized metadata, 404s, and cache
  behavior on the `workers.dev` preview;
- confirm that the legacy Nuxt service worker no longer controls the domain.
