import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common/queryKeys';
import { publicAxios } from '~/utils';

export interface SignInData {}
export type SignInApiData = ApiSuccessResponse<SignInData>;

export const signIn = (code: string) => {
  const endpoint = endpoints.auth.signIn();
  return publicAxios
    .post<SignInApiData>(endpoint, {
      code,
    })
    .then((res) => res.data);
};
