import type { UpdatedRecruitApplicationInfo } from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type CancelRecruitApplicationApiData =
  ApiSuccessResponse<UpdatedRecruitApplicationInfo>;

export const cancelRecruitApplication = (recruitApplicationId: number) => {
  const endpoint = endpoints.recruit.application.cancel(recruitApplicationId);
  return privateAxios
    .patch<CancelRecruitApplicationApiData>(endpoint, null)
    .then((res) => res.data.data);
};
