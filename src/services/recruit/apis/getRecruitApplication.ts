import type { RecruitApplicationDetail } from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type GetRecruitApplicationApiData =
  ApiSuccessResponse<RecruitApplicationDetail>;

// 다른 사람의 신청서 ()
export const getRecruitApplication = (recruitApplicationId: number) => {
  const endpoint = endpoints.recruit.application.detail(recruitApplicationId);
  return privateAxios
    .get<GetRecruitApplicationApiData>(endpoint)
    .then((res) => res.data.data);
};
