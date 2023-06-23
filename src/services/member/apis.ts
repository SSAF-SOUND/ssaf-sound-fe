import type { SsafyInfo, UserBasicInfo, UserInfo } from './utils/types';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type GetMyInfoApiData = ApiSuccessResponse<UserInfo>;

export const getMyInfo = () => {
  const endpoint = endpoints.user.myInfo();
  return privateAxios
    .get<GetMyInfoApiData>(endpoint)
    .then((res) => res.data.data);
};

export type UpdateMyInfoApiData = ApiSuccessResponse<UserInfo>;
export interface UpdateMyInfoParams {
  nickname: string;
  ssafyMember: boolean;
  campus: string;
  semester: number;
  isMajor: boolean;
}

export const updateMyInfo = (params: UpdateMyInfoParams) => {
  const endpoint = endpoints.user.myInfo();

  return privateAxios
    .post<UpdateMyInfoApiData>(endpoint, params)
    .then((res) => res.data.data);
};
