import type { Tokens } from '~/services/auth/apis/types';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { publicAxios } from '~/utils/axios';
import { isDevMode } from '~/utils/constants';
import { webStorage } from '~/utils/webStorage';

export type SignInApiData = ApiSuccessResponse<Tokens>;

export interface SignInParams {
  code: string;
  oauthName: string;
}

const signInDevPlugin = (tokens: Tokens) => {
  if (isDevMode) {
    webStorage.DEV__setTokens(tokens);
  }
};
export const signIn = (params: SignInParams) => {
  const endpoint = endpoints.auth.signIn();

  return publicAxios.post<SignInApiData>(endpoint, params).then((res) => {
    const tokens = res.data.data;
    signInDevPlugin(tokens);
    return tokens;
  });
};
