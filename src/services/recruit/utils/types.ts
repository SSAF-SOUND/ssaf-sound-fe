/* enums */

// ---- SkillName ----

import { pickBy } from '~/utils/object';

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

export const RecruitPartsSet = new Set<string>(Object.values(RecruitParts));

export const ProjectPartsSet = new Set<string>(
  Object.values(
    pickBy(([, value]) => value !== RecruitParts.STUDY, RecruitParts)
  )
);

// ---- Category ----

export enum RecruitCategoryName {
  PROJECT = 'project',
  STUDY = 'study',
}

export const RecruitCategoryNameSet = new Set<string>(
  Object.values(RecruitCategoryName)
);

// ---- Applicants ----

export enum MatchStatus {
  /** 신청하기 전 */
  INITIAL = 'INITIAL',

  /** 등록자의 수락을 기다리는 상태 */
  PENDING = 'PENDING',

  /** 등록자가 수락 */
  SUCCESS = 'DONE',

  /** 등록자가 거절 */
  REJECTED = 'REJECT',
}

export const MatchStatusSet = new Set<string>(Object.values(MatchStatus));
export const ApplicableMatchStatusSet = new Set<string>([
  MatchStatus.INITIAL,
  MatchStatus.REJECTED,
]);

export interface RecruitParticipantsCount {
  part: RecruitParts;
  count: number;
}
