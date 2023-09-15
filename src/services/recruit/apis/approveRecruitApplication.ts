import type { UpdatedRecruitApplicationInfo } from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type ApproveRecruitApplicationApiData =
  ApiSuccessResponse<UpdatedRecruitApplicationInfo>;

export const approveRecruitApplication = (recruitApplicationId: number) => {
  const endpoint = endpoints.recruit.application.approve(recruitApplicationId);
  return privateAxios
    .post<ApproveRecruitApplicationApiData>(endpoint, null)
    .then((res) => res.data.data);
};
