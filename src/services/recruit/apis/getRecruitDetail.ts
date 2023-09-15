import type { RecruitDetail, RecruitCategoryName } from '~/services/recruit';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

export type GetRecruitDetailApiData = ApiSuccessResponse<RecruitDetail>;

export const getRecruitDetail = (recruitId: number, publicRequest = false) => {
  const endpoint = endpoints.recruit.detail(recruitId);

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance.get<GetRecruitDetailApiData>(endpoint).then((res) => {
    res.data.data.category =
      res.data.data.category.toLowerCase() as RecruitCategoryName;

    return res.data.data;
  });
};
