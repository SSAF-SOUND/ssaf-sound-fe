import type { AxiosRequestConfig } from 'axios';
import type { RecruitDetail } from '~/services/recruit/apis';
import type { RecruitCategoryName } from '~/services/recruit/utils';
import type { ApiSuccessResponse } from '~/types';


import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

export interface GetRecruitDetailOptions {
  publicRequest?: boolean;
  config?: AxiosRequestConfig;
}

export type GetRecruitDetailApiData = ApiSuccessResponse<RecruitDetail>;

export const getRecruitDetail = (
  recruitId: number,
  options: GetRecruitDetailOptions = {}
) => {
  const { publicRequest = false, config } = options;
  const endpoint = endpoints.recruit.detail(recruitId);

  const axiosInstance = publicRequest ? publicAxios : privateAxios;

  return axiosInstance
    .get<GetRecruitDetailApiData>(endpoint, config)
    .then((res) => {
      res.data.data.category =
        res.data.data.category.toLowerCase() as RecruitCategoryName;

      return res.data.data;
    });
};
