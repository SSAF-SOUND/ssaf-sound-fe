import type { ApiSuccessResponse } from '~/types';

import { isAxiosError } from 'axios';

import { endpoints, getQueryClient, queryKeys } from '~/react-query/common';
import { isDevMode, publicAxios, webStorage } from '~/utils';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
export type SignInApiData = ApiSuccessResponse<Tokens>;
export interface SignInParams {
  code: string;
  oauthName: string;
}

const signInDevPlugin = (tokens: Tokens) => {
  webStorage.DEV__setTokens(tokens);
};

export const signIn = (params: SignInParams) => {
  const endpoint = endpoints.auth.signIn();

  return publicAxios.post<SignInApiData>(endpoint, params).then((res) => {
    const tokens = res.data.data;
    signInDevPlugin(tokens);
    return tokens;
  });
};

export const signOut = () => {
  const endpoint = endpoints.auth.signOut();

  return publicAxios.post(endpoint, null).then(async () => {
    if (isDevMode) {
      webStorage.DEV__removeTokens();
    }

    const queryClient = getQueryClient();

    if (queryClient) {
      await queryClient.refetchQueries(queryKeys.auth());
      // NOTE: WebStorage 에 저장한 유저 정보도 모두 삭제해야합니다.
    }
  });
};

export const reissueToken = () => {
  const endpoint = endpoints.auth.refresh();
  const tag = '[In reissueToken api request]';
  const config = isDevMode
    ? {
        headers: {
          Authorization: `Bearer ${webStorage.DEV__getRefreshToken()}`,
        },
      }
    : {};

  // 인터셉터 내부에서 무한루프가 발생할 수 있으니 publicAxios 사용
  return publicAxios.post(endpoint, null, config).catch(async (error) => {
    if (!isAxiosError(error)) {
      console.error(`${tag}: Unknown Error`);
      return Promise.reject(error);
    }

    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode >= 500) {
        console.error(`${tag}: Server Error`);
        return Promise.reject(error);
      } else {
        console.error(`${tag}: Client Error`);

        await signOut();
        return Promise.reject(error);
      }
    }
  });
};
