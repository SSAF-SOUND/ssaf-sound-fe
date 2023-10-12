import type { UserInfo } from '~/services/member/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export type GetMyInfoApiData = ApiSuccessResponse<UserInfo>;

export const getMyInfo = () => {
  const endpoint = endpoints.user.myInfo();
  return privateAxios
    .get<GetMyInfoApiData>(endpoint)
    .then((res) => res.data.data);
};
