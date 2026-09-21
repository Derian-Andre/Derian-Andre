export type IsoDateString = string

export interface CurriculumContact {
  readonly title: string
  readonly icon: string
  readonly url: string
}

export interface CurriculumSkillGroup {
  readonly slug: string
  readonly years: number
  readonly items: readonly string[]
}

export interface CurriculumExperienceItem {
  readonly slug: string
  readonly dateStart: IsoDateString
  readonly dateEnd: IsoDateString | null
  readonly stack: readonly string[]
}

export interface CurriculumExperienceGroup {
  readonly slug: string
  readonly items: readonly CurriculumExperienceItem[]
}

export interface CurriculumCredentialItem {
  readonly type: string
  readonly slug: string
  readonly date: IsoDateString
  readonly id: string | null
  readonly url?: string | null
  readonly author?: string
}

export interface CurriculumCredentialProvider {
  readonly slug: string
  readonly home: string
  readonly validator: string
  readonly items: readonly CurriculumCredentialItem[]
}

export interface CurriculumData {
  readonly contact: readonly CurriculumContact[]
  readonly languages: readonly string[]
  readonly skills: readonly CurriculumSkillGroup[]
  readonly experience: readonly CurriculumExperienceGroup[]
  readonly certifications: readonly CurriculumCredentialProvider[]
  readonly courses: readonly CurriculumCredentialProvider[]
}
