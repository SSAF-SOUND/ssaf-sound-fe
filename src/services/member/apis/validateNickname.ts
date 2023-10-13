import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export interface ValidateNicknameParams {
  nickname: string;
}

export interface ValidateNicknameBody {
  nickname: string;
}

export type ValidateNicknameApiData = ApiSuccessResponse<{
  possible: boolean;
}>;
/**
 * - 중복인 경우에 `possible: false`로 응답
 * - 그 이외의 원인으로 유효성 검사에 실패하면, 4XX 실패 응답
 */
export const validateNickname = (params: ValidateNicknameParams) => {
  const endpoint = endpoints.user.nickname();
  const body: ValidateNicknameBody = params;

  return privateAxios
    .post<ValidateNicknameApiData>(endpoint, body)
    .then((res) => res.data.data.possible);
};
