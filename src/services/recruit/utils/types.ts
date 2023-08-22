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

/* enums */

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

// ---- Parts ----

export enum RecruitParts {
  FRONTEND = '프론트엔드',
  BACKEND = '백엔드',
  PM = '기획/디자인',
  APP = '앱',
  STUDY = '스터디',
}

// ---- Category ----

export enum RecruitCategoryName {
  PROJECT = '프로젝트',
  STUDY = '스터디',
}
