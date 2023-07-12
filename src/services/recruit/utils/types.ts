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
  REACT = 'React',
  JAVASCRIPT = 'JavaScript',
  TYPESCRIPT = 'TypeScript',
  VUE = 'Vue',
  SVELTE = 'Svelte',
  NEXTJS = 'NextJs',
  NODEJS = 'NodeJs',
  JAVA = 'Java',
  SPRING = 'Spring',
  SWIFT = 'Swift',
  ANDROID = 'Android',
  FIGMA = 'Figma',
  XD = 'XD',
  DJANGO = 'Django',
  IOS = 'IOS',
  FLUTTER = 'Flutter',
}
export const SkillNameSet = new Set<string>(Object.values(SkillName));

export type RecruitType = '프론트엔드' | '백엔드' | '기획/디자인';

export interface LimitType {
  recruitType: RecruitType;
  limit: number;
}

export interface SkillsType {
  name: SkillType;
  skillId: number;
}

export type RecruitCategoryType = 'study' | 'project';
