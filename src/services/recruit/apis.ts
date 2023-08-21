import type {
  LimitType,
  RecruitCategoryType,
  RecruitType,
  SkillsType,
} from './utils';
import type { UserInfo } from '../member';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

export type GetRecruitsApiData = ApiSuccessResponse<Recruits>;

export interface Recruits {
  recruits: RecruitSummary[];
  currentPage: number;
  totalPages: number;
  lastPage: boolean;
}

export const getRecruits = () => {
  const endpoint = endpoints.recruit.list();
  return publicAxios.get<GetRecruitsApiData>(endpoint).then((res) => res);
};

// ------------------------------------------

export type GetRecruitDetailApiData = ApiSuccessResponse<RecruitDetail>;

export interface RecruitDetail {
  userInfo: UserInfo;
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
  scrapCount: number;
}

export const getRecruitDetail = (recruitId: number) => {
  const endpoint = endpoints.recruit.detail(recruitId);
  return privateAxios
    .get<GetRecruitDetailApiData>(endpoint)
    .then((res) => res.data.data);
};

// ------------------------------------------

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

export type RecruitMember = UserInfo;

export type RecruitMembers = {
  members: RecruitMember[];
  limit: number;
};

// ------------------------------------------
// 수정 예정

export type PartialRecruitType = Partial<RecruitType>;
export type recruitMembersType = {
  recruitTypes: Partial<Record<PartialRecruitType, RecruitMembers>>;
};

export type GetRecruitMembersApiData = ApiSuccessResponse<recruitMembersType>;

export const getRecruitMembers = (recruitId: number) => {
  const endpoint = endpoints.recruit.members(recruitId);
  return publicAxios
    .get<GetRecruitMembersApiData>(endpoint)
    .then((res) => res.data.data);
};

// -----------------------------------------

export interface RecruitComment {
  recruitCommentId: number;
  content: string;
  commentGroup: number;
  children: [
    {
      recruitCommentId: number;
      content: string;
      commentGroup: number;
      children: [];
      deletedComment: boolean;
      memberId: number;
      nickname: 'khs';
      ssafyMember: true;
      isMajor: true;
      majorTrack: '자바백엔드';
    }
  ];
  deletedComment: false;
  memberId: 1;
  nickname: 'khs';
  ssafyMember: true;
  isMajor: true;
  majorTrack: '자바백엔드';
}

// --------------------------------------

export interface RecruitScrap {
  scrapCount: number;
}

export type RecruitScrapApiData = ApiSuccessResponse<RecruitScrap>;

// ---------------------------------------

export interface RecruitApplyParams {
  recruitType: RecruitType;
  contents: Array<string>;
}

export type RecruitApplyParamsApiData = ApiSuccessResponse<RecruitApplyParams>;

export const postRecruitApply = ({
  recruitId,
  body,
}: {
  recruitId: number;
  body: RecruitApplyParams;
}) => {
  const endpoint = endpoints.recruit.apply(recruitId);
  return privateAxios
    .post<GetRecruitMembersApiData>(endpoint, body)
    .then((res) => res.data);
};

// ---------------------------------------

export const recruitAPI = {
  getRecruits,
  getRecruitDetail,
  getRecruitMembers,
  postRecruitApply,
};
