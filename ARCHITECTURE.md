# Portfolio architecture

This repository uses a pnpm and Turborepo monorepo. The former Nuxt application
has been replaced by the Astro site in `apps/web`; migrated content and public
assets now live exclusively inside that application workspace.

## Workspace boundaries

- `apps/web` owns Astro pages, layouts, content, Cloudflare configuration, and
  application-specific components.
- `packages/ui` owns reusable React primitives, UI hooks, utilities, and global
  Tailwind CSS v4 theme tokens.
- Root scripts contain no application logic. They only delegate package tasks
  through `turbo run`.

Dependencies are declared in the package that uses them. Shared versions are
fixed in the pnpm catalog in `pnpm-workspace.yaml`, and the lockfile is the final
source of reproducibility.

## UI package

`@workspace/ui` is a just-in-time package: it exports TypeScript and TSX source
directly, and Astro's Vite pipeline compiles it. It intentionally has no build
task or barrel export.

Public imports use explicit subpaths:

```ts
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
```

The application imports the shared theme once:

```ts
import "@workspace/ui/globals.css"
```

To add a shadcn primitive, run the pinned CLI from `apps/web`. Its monorepo
configuration routes reusable primitives to `packages/ui` and app-specific
blocks to `apps/web`.

```bash
pnpm dlx shadcn@4.21.0 add button
```

React components render to static HTML in Astro unless the caller adds a
`client:*` directive. Hydration is therefore an application decision, not a UI
package default.

## Task contract

Packages implement the tasks they need. Turborepo registers the shared task
contract:

- `build`: production artifacts; cached from `dist/**`.
- `check`: package-level Biome validation or framework checks.
- `check-types`: type checking without emitted JavaScript.
- `lint`: package-level Biome linting.
- `format`: write operation; never cached.
- `test`: package tests, with optional `coverage/**` output.
- `dev` and `preview`: persistent local servers; never cached.
- `deploy`: a side effect that depends on the same package's successful build.

`check`, `check-types`, `lint`, and `test` use a transit node so packages can run
in parallel while dependency changes still invalidate their caches.

## Rendering and deployment baseline

The portfolio starts as a statically generated Astro site deployed through
Cloudflare Workers Static Assets. The Cloudflare adapter belongs in `apps/web`
only if a route genuinely requires on-demand rendering. There is no root
environment file; environment variables stay beside the package that consumes
them.

Astro owns locale routing through its native `i18n` configuration. Locale
codes, the default locale, routing policy, and locale metadata live in
`apps/web/src/i18n/config.ts`; pages and build checks derive from that shared
configuration instead of maintaining route lists in Cloudflare `_redirects`.
The generated site prefixes every locale, including Spanish. The root page
derives its redirect target from Astro's locale URL helper and the configured
default locale, while Cloudflare normalizes public URLs without a trailing
slash.

## Toolchain

- Node.js 24 LTS (`.nvmrc`)
- pnpm 11, fixed by the root `packageManager` field
- Turborepo 2
- Astro 7 and React 19
- Tailwind CSS 4 and shadcn CLI 4
- Biome 2
- Cloudflare Wrangler 4

Exact package versions live in `pnpm-workspace.yaml`.
