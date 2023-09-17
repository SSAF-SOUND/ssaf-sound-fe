import type { RecruitApplicant } from '~/services/recruit/apis';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type GetRejectedRecruitApplicantsApiData = ApiSuccessResponse<
  RecruitApplicant[]
>;

export const getRejectedRecruitApplicants = (recruitId: number) => {
  const endpoint = endpoints.recruit.application.rejectedApplicants(recruitId);
  return privateAxios
    .get<GetRejectedRecruitApplicantsApiData>(endpoint)
    .then((res) => res.data.data);
};
