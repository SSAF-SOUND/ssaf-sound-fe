import type { IconNames } from '../Common/Icon';

export interface LimitType {
  recruitType: RecruitType;
  limit: number;
}

export interface SkillsType {
  name: SkillType;
  skillId: number;
}

export type InfoType = '모집 인원' | '모집 기간' | '기술 스택';
type RecruitType = '프론트엔드' | '백엔드' | '기획/디자인';
type SkillType =
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

// 위의 type들 나중에 types로 이전할 예정
type PeriodType = string[];

interface InfoTypes {
  icon: IconNames;
  title: InfoType;
  parser?: any;
  // 임시로 any
  // parser을 어떻게 사용할 지 고민중
}
type ProjectInfoKeys = 'PERSONNEL' | 'PERIOD' | 'STACK';
export const PROJECT_INFO: Record<ProjectInfoKeys, InfoTypes> = {
  PERSONNEL: {
    icon: 'group',
    title: '모집 인원',
    parser: (arr: LimitType[]) =>
      arr.map((v) => v.recruitType + ' ' + v.limit + '명').join(', '),
  },
  PERIOD: {
    icon: 'calendar',
    title: '모집 기간',
    parser: (arr: PeriodType) => arr.join(' ~ '),
  },
  STACK: {
    icon: 'skill',
    title: '기술 스택',
    parser: (arr: SkillsType[]) => arr.map((v) => v.name).join(', '),
  },
};
