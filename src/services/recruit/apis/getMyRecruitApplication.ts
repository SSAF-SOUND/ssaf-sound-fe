import type { MyRecruitApplicationDetail } from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type GetMyRecruitApplicationApiData =
  ApiSuccessResponse<MyRecruitApplicationDetail>;

export const getMyRecruitApplication = (recruitId: number) => {
  const endpoint = endpoints.recruit.application.mine(recruitId);
  return privateAxios
    .get<GetMyRecruitApplicationApiData>(endpoint)
    .then((res) => res.data.data);
};
