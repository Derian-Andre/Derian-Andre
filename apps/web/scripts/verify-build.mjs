import { access, readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const webRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const distRoot = path.join(webRoot, "dist")
const contentRoot = path.join(webRoot, "src", "content")
const localeModulesRoot = path.join(webRoot, "src", "i18n", "locales")

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function walk(directory, predicate = () => true) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      return entry.isDirectory()
        ? walk(entryPath, predicate)
        : predicate(entryPath)
          ? [entryPath]
          : []
    }),
  )

  return files.flat()
}

function outputCandidates(pathname) {
  const cleanPath = decodeURIComponent(pathname).replace(/\\/g, "/")
  const relativePath = cleanPath.replace(/^\/+|\/+$/g, "")

  if (!relativePath) return [path.join(distRoot, "index.html")]
  if (path.posix.extname(relativePath)) return [path.join(distRoot, ...relativePath.split("/"))]

  return [path.join(distRoot, ...relativePath.split("/"), "index.html")]
}

async function outputExists(pathname) {
  return (await Promise.all(outputCandidates(pathname).map(exists))).some(Boolean)
}

async function assertRoutes(routes) {
  const missing = []

  for (const route of routes) {
    if (!(await outputExists(route))) missing.push(route)
  }

  if (missing.length) throw new Error(`Missing generated routes:\n${missing.join("\n")}`)
}

async function expectedContentRoutes() {
  const routes = []

  for (const collection of ["blog", "projects", "work"]) {
    const collectionRoot = path.join(contentRoot, collection)
    const files = await walk(collectionRoot, (filePath) => filePath.endsWith(".md"))

    for (const filePath of files) {
      const source = await readFile(filePath, "utf8")
      const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ""
      const hidden = /^\s*(?:disabled|draft):\s*true\s*$/im.test(frontmatter)
      const relative = path.relative(collectionRoot, filePath).replace(/\\/g, "/")
      const [locale, ...slugParts] = relative.replace(/\.md$/, "").split("/")
      const route = `/${locale}/${collection}/${slugParts.join("/")}/`

      if (hidden) {
        if (await outputExists(route)) throw new Error(`Draft content was published: ${route}`)
        continue
      }

      routes.push(route)
    }
  }

  return routes
}

async function verifyLocalReferences(htmlFiles) {
  const broken = new Set()

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8")
    const pagePath = `/${path
      .relative(distRoot, htmlFile)
      .replace(/\\/g, "/")
      .replace(/index\.html$/, "")}`

    for (const match of html.matchAll(/\b(?:href|src)=["']([^"'<>]+)["']/g)) {
      const reference = match[1]
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) continue

      const pathname = new URL(reference, `https://portfolio.test${pagePath}`).pathname
      if (await outputExists(pathname)) continue
      broken.add(pathname)
    }
  }

  if (broken.size) {
    throw new Error(`Broken local references:\n${[...broken].sort().join("\n")}`)
  }
}

async function verifySceneCspCoverage() {
  const headers = await readFile(path.join(distRoot, "_headers"), "utf8")
  const csp = headers.match(/^\s*Content-Security-Policy:\s*(.+)$/m)?.[1] ?? ""
  const scriptSources = csp.match(/(?:^|;)\s*script-src\s+([^;]+)/)?.[1] ?? ""
  const sceneRoot = path.join(distRoot, "scenes")

  if (!(await exists(sceneRoot))) return

  const sceneFiles = await walk(sceneRoot, (filePath) => filePath.endsWith(".js"))
  const externalOrigins = new Set()

  for (const sceneFile of sceneFiles) {
    const source = await readFile(sceneFile, "utf8")
    for (const match of source.matchAll(/(?:from\s*["']|import\(\s*["'])(https:\/\/[^"')\s]+)/g)) {
      externalOrigins.add(new URL(match[1]).origin)
    }
  }

  const missingOrigins = [...externalOrigins].filter((origin) => !scriptSources.includes(origin))
  if (missingOrigins.length) {
    throw new Error(`CSP script-src is missing scene module origins:\n${missingOrigins.join("\n")}`)
  }
}

async function verifyLegacyServiceWorkerCleanup(htmlFiles) {
  const missingCleanup = []

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8")
    if (!html.includes('class="site-layout"')) continue

    if (!/serviceWorker\s*\.\s*getRegistrations/.test(html) || !/pathname\s*===\s*["']\/sw\.js["']/.test(html)) {
      missingCleanup.push(path.relative(distRoot, htmlFile).replace(/\\/g, "/"))
    }
  }

  if (missingCleanup.length) {
    throw new Error(`Missing legacy service worker cleanup:\n${missingCleanup.join("\n")}`)
  }
}

if (!(await exists(distRoot)))
  throw new Error("dist/ is missing. Run the build before verification.")

const locales = (await readdir(localeModulesRoot, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.[cm]?[jt]s$/.test(entry.name))
  .map((entry) => entry.name.replace(/\.[cm]?[jt]s$/, ""))
  .sort()

if (locales.length === 0) throw new Error("No locale modules were found.")

const requiredRoutes = ["/", "/404.html"]
for (const locale of locales) {
  for (const route of [
    "",
    "404",
    "about",
    "blog",
    "blog/page",
    "blog/page/1",
    "curriculum",
    "home",
    "projects",
    "services",
    "work",
  ]) {
    requiredRoutes.push(`/${locale}/${route}`)
  }
}

await assertRoutes(requiredRoutes)
await assertRoutes(await expectedContentRoutes())

const htmlFiles = await walk(distRoot, (filePath) => filePath.endsWith(".html"))
await verifyLocalReferences(htmlFiles)
await verifySceneCspCoverage()
await verifyLegacyServiceWorkerCleanup(htmlFiles)

console.log(`Verified ${htmlFiles.length} generated HTML files; all local references resolve.`)
