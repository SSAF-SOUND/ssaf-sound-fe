import type { ApiSuccessResponse } from '~/types';

import axios from 'axios';

import { endpoints } from '~/react-query/common/queryKeys';

interface SignInData {
  accessToken: string;
}

type SignInApiData = ApiSuccessResponse<SignInData>;

export const signIn = (code: string) => {
  const endpoint = endpoints.auth.signIn();
  return axios
    .post<SignInApiData>(endpoint, {
      code,
    })
    .then((res) => res.data);
};
