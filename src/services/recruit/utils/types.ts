export type RecruitCategory = 'study' | 'project';

export type SkillType =
  | 'React'
  | 'JavaScript'
  | 'TypeScript'
  | 'Vue'
  | 'Svelte'
  | 'NextJs'
  | 'NodeJs'
  | 'Java'
  | 'Spring'
  | 'Swift'
  | 'Android'
  | 'Figma'
  | 'XD'
  | 'Django'
  | 'IOS'
  | 'Flutter';

export enum SkillName {
  SPRING = 'Spring',
  REACT = 'React',
  IOS = 'IOS',
  VUE = 'Vue',
  JAVA = 'Java',
  JAVASCRIPT = 'JavaScript',
  TYPESCRIPT = 'TypeScript',
  NODEJS = 'Nodejs',
  NEXTJS = 'Nextjs',
  NUXTJS = 'Nuxtjs',
  XD = 'XD',
  SWIFT = 'Swift',
  FIGMA = 'Figma',
  SVELTE = 'Svelte',
  ANDROID = 'Android',
  FLUTTER = 'Flutter',
  DJANGO = 'Django',
  ETC = '기타',
}
export const SkillNameSet = new Set<string>(Object.values(SkillName));

export type RecruitType =
  | '프론트엔드'
  | '백엔드'
  | '기획/디자인'
  | '앱'
  | '스터디';

export interface LimitType {
  recruitType: RecruitType;
  limit: number;
  currentNumber?: number;
}

export interface SkillsType {
  name: SkillName;
  skillId: number;
}

export type RecruitCategoryType = 'study' | 'project';

// ---- Parts ----

// ---- Applicants ----
