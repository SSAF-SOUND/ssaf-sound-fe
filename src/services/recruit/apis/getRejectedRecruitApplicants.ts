import type { GetRecruitApplicantsApiData } from '~/services/recruit/apis';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type GetRejectedRecruitApplicantsApiData = GetRecruitApplicantsApiData;

export const getRejectedRecruitApplicants = (recruitId: number) => {
  const endpoint = endpoints.recruit.application.rejectedApplicants(recruitId);
  return privateAxios
    .get<GetRejectedRecruitApplicantsApiData>(endpoint)
    .then((res) => res.data.data);
};
