import type { UserInfo } from '~/services/member/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export type UpdateMyInfoApiData = ApiSuccessResponse<UserInfo>;

export interface UpdateMyInfoParams {
  nickname: string;
  ssafyMember: boolean;
  isMajor: boolean;
  year: number | undefined;
  campus: string | undefined;
  agreedTermsIds: number[];
}

export interface UpdateMyInfoBody {
  nickname: string;
  ssafyMember: boolean;
  isMajor: boolean;
  campus: string | undefined;
  semester: number | undefined;
  termIds: number[];
}

export const updateMyInfo = (params: UpdateMyInfoParams) => {
  const endpoint = endpoints.user.myInfo();
  const { year, agreedTermsIds, ...restParams } = params;

  const body: UpdateMyInfoBody = {
    ...restParams,
    semester: year,
    termIds: agreedTermsIds,
  };

  return privateAxios
    .put<UpdateMyInfoApiData>(endpoint, body)
    .then((res) => res.data.data);
};
