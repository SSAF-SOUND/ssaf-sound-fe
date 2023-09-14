import type { RecruitParts, MatchStatus } from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export interface ApplyRecruitParams {
  recruitPartToApply: RecruitParts;
  answerToRecruitAuthor: string;
}

export interface ApplyRecruitBody {
  recruitType: RecruitParts;
  contents: [string];
}

export type ApplyRecruitApiData = ApiSuccessResponse<{
  recruitApplicationId: number;
  matchStatus: MatchStatus;
}>;

export const applyRecruit = (recruitId: number, params: ApplyRecruitParams) => {
  const { recruitPartToApply, answerToRecruitAuthor } = params;
  const endpoint = endpoints.recruit.apply(recruitId);

  const body: ApplyRecruitBody = {
    recruitType: recruitPartToApply,
    contents: [answerToRecruitAuthor],
  };

  return privateAxios
    .post<ApplyRecruitApiData>(endpoint, body)
    .then((res) => res.data.data);
};
