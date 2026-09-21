import { unified } from "@astrojs/markdown-remark"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { defaultLocale, i18nRouting, locales } from "./src/i18n/config"
import remarkLegacyMarkup from "./src/lib/content/remark-legacy-markup"

const site = process.env.PUBLIC_SITE_URL ?? "https://derianandre.com"

export default defineConfig({
  site,
  output: "static",
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: i18nRouting,
  },
  integrations: [react()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkLegacyMarkup] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
