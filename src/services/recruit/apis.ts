import type {
  LimitType,
  RecruitCategoryType,
  RecruitType,
  SkillsType,
} from './utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export interface RecruitDetail {
  category: RecruitCategoryType;
  title: string;
  recruitStart: string;
  recruitEnd: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  deletedRecruit: boolean;
  finishedRecruit: boolean;
  view: number;
  skills: SkillsType[];
  limits: LimitType[];
}

export type GetRecruitDetailApiData = ApiSuccessResponse<RecruitDetail>;

export const getRecruitDetail = () => {
  const endpoint = endpoints.recruit.detail();
  return privateAxios.get<GetRecruitDetailApiData>(endpoint).then((res) => res);
};

// 추후 보완할 예정입니다!
// Recruits 전체를 불러오는 부분입니다

export type GetRecruitsApiData = ApiSuccessResponse<Recruits>;

export interface Recruits {
  recruits: RecruitSummary[];
  currentPage: number;
  totalPages: number;
  lastPage: boolean;
}

export interface RecruitSummary {
  recruitId: number;
  title: string;
  finishedRecruit: boolean;
  recruitEnd: string;
  skills: SkillsType[];
  participants: RecruitParticipant[];
}
export interface RecruitParticipant {
  recruitType: RecruitType;
  limit: number;
  members: {
    nickName: string;
    major: boolean;
  }[];
}

export const getRecruits = () => {
  const endpoint = endpoints.recruit.data();
  return privateAxios.get<GetRecruitsApiData>(endpoint).then((res) => res);
};
