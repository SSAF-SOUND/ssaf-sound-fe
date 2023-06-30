import type { UserInfo } from './utils/types';
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
  isMajor: boolean;
  campus?: string;
  semester?: number;
}

export const updateMyInfo = (params: UpdateMyInfoParams) => {
  const endpoint = endpoints.user.myInfo();

  return privateAxios
    .patch<UpdateMyInfoApiData>(endpoint, params)
    .then((res) => res.data.data);
};

export interface ValidateNicknameParams {
  nickname: string;
}

export const validateNickname = (params: ValidateNicknameParams) => {
  const endpoint = endpoints.user.nickname();

  return privateAxios.post(endpoint, params).then((res) => res.data);
};
