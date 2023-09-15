import type { LikeStatus } from '~/services/common';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type LikeRecruitApplicationApiData = ApiSuccessResponse<
  Omit<LikeStatus, 'likeCount'>
>;

export const likeRecruitApplication = (recruitApplicationId: number) => {
  const endpoint = endpoints.recruit.application.like(recruitApplicationId);

  return privateAxios
    .post<LikeRecruitApplicationApiData>(endpoint, null)
    .then((res) => res.data.data.liked);
};
