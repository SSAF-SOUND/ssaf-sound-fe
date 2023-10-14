import type { UpdatedRecruitApplicationInfo } from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type RejectRecruitApplicationApiData =
  ApiSuccessResponse<UpdatedRecruitApplicationInfo>;

export const rejectRecruitApplication = (recruitApplicationId: number) => {
  const endpoint = endpoints.recruit.application.reject(recruitApplicationId);
  return privateAxios
    .patch<RejectRecruitApplicationApiData>(endpoint, null)
    .then((res) => res.data.data);
};
