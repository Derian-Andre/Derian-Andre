const ABSOLUTE_ASSET = /^(?:[a-z][a-z\d+.-]*:|\/\/|data:)/i

export type LegacyAssetSection = "blog" | "work" | "projects"

function cleanSegment(value: string): string {
  return value.replace(/\\/g, "/").replace(/^\.?\/+|\/+$/g, "")
}

export function legacyAssetUrl(section: LegacyAssetSection, slug: string, file: string): string {
  if (ABSOLUTE_ASSET.test(file) || file.startsWith("/")) return file
  return `/img/${section}/${cleanSegment(slug)}/${cleanSegment(file)}`
}

export function curriculumAssetUrl(file: string): string {
  if (ABSOLUTE_ASSET.test(file) || file.startsWith("/")) return file
  return `/img/curriculum/${cleanSegment(file)}`
}
