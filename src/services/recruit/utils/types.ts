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

export type RecruitType = '프론트엔드' | '백엔드' | '기획/디자인';

export interface LimitType {
  recruitType: RecruitType;
  limit: number;
}

export interface SkillsType {
  name: SkillType;
  skillId: number;
}
