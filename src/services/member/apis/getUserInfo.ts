import type { UserInfo } from '~/services/member/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { publicAxios } from '~/utils/axios';

export type GetUserInfo = ApiSuccessResponse<
  Omit<UserInfo, 'memberRole' | 'memberId'>
>;

export const getUserInfo = (id: number) => {
  const endpoint = endpoints.user.userInfo(id);

  return publicAxios.get<GetUserInfo>(endpoint).then((res) => {
    return {
      ...res.data.data,
      memberId: id,
    };
  });
};
