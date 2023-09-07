export type RecruitCategory = 'study' | 'project';

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

// ---- SkillName ----

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
  PROJECT = 'project',
  STUDY = 'study',
}

// ---- Applicants ----

export enum MatchStatus {
  /** 신청 -> 등록자가 수락하길 기다리는 상태 */
  WAITING_REGISTER_APPROVE = 'WAITING_REGISTER_APPROVE',
  /** 신청 -> 등록자 수락 -> 신청자 수락 대기 상태 */
  WAITING_APPLICANT = 'WAITING_APPLICANT',
  /** 완료 */
  DONE = 'DONE',
  /** 거절 */
  REJECT = 'REJECT',
  /** 취소 */
  CANCEL = 'CANCEL',
}

export interface RecruitParticipantsCount {
  part: RecruitParts;
  count: number;
}
