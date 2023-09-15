import type {
  MatchStatus,
  RecruitParts,
  SkillName,
  RecruitCategoryType,
} from './utils';
import type { UserInfo } from '../member';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type RecruitParams = {
  category?: RecruitCategoryType;
  keyword?: string;
  isFinished?: boolean;
  recruitTypes?: RecruitParts[];
  skills?: SkillName[];
};

export interface RecruitMembers {
  limit: number;
  members: UserInfo[];
}

// ---------------------------------------

export interface RecruitApplicant {
  recruitApplicationId: number;
  matchStatus: MatchStatus;
  author: UserInfo;
  reply: string;
  question: string;
  liked: boolean;
  appliedAt: string;
}

export type GetRecruitApplicantsApiData = ApiSuccessResponse<{
  recruitId: number;
  recruitApplications: {
    [key in RecruitParts]?: RecruitApplicant[];
  };
}>;

export const getRecruitApplicants = (recruitId: number) => {
  const endpoint = endpoints.recruit.application.applicants(recruitId);

  return privateAxios
    .get<GetRecruitApplicantsApiData>(endpoint)
    .then((res) => res.data.data);
};

// ---------------------------------
