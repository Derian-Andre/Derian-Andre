# Derian André — Portfolio

The portfolio is now a pnpm/Turborepo monorepo built with Astro 7, React 19,
Tailwind CSS 4, shadcn/ui-compatible primitives, Biome, and Cloudflare Workers
Static Assets.

Phase 1 preserves the existing bilingual routes, content, and curriculum
design. The visual redesign and experimental home experience belong to Phase 2.

## Requirements

- Node.js 24 LTS
- pnpm 11

## Quick start

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The Astro application is served from `apps/web` through the root Turborepo
task. Common quality commands are:

```bash
pnpm check
pnpm lint
pnpm build
pnpm verify
```

`verify` depends on the production build and checks generated bilingual routes,
draft exclusion, and local references. Any broken local reference fails the task.

## Workspace

- `apps/web`: Astro pages, content collections, compatibility layer, and
  Cloudflare configuration.
- `packages/ui`: shared shadcn-compatible React primitives and Tailwind theme.
- `docs/migration/phase-1.md`: migration invariants and deployment checklist.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for package boundaries and task
contracts.

## Deployment

Pull requests run checks, Biome, the static build, and output verification.
Production deployment is handled directly by Cloudflare Workers Builds; there
is no GitHub Actions deployment workflow or deployment secret in this repository.
