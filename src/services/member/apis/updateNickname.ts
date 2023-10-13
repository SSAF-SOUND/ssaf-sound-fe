import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export interface UpdateNicknameParams {
  nickname: string;
}

export interface UpdateNicknameBody {
  nickname: string;
}

export const updateNickname = (params: UpdateNicknameParams) => {
  const endpoint = endpoints.user.nickname();
  const body: UpdateNicknameBody = params;

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};
