// meta

export enum RecruitParts {
  FRONTEND = '프론트엔드',
  BACKEND = '백엔드',
  PM = '기획/디자인',
  APP = '앱',
  STUDY = '스터디',
}

export enum RecruitCategoryName {
  PROJECT = '프로젝트',
  STUDY = '스터디',
}

export const possibleProjectParts = Object.values(RecruitParts).filter(
  (part) => part !== RecruitParts.STUDY
);

export const maxParticipantsCount = 20;

export const minParticipantsCount = 1;
