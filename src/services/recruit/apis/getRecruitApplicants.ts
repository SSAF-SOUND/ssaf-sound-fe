import type { RecruitApplicant } from './types';
import type { RecruitParts } from '~/services/recruit/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

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
