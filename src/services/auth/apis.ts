import type { ApiSuccessResponse } from '~/types';

import { isAxiosError } from 'axios';

import { endpoints } from '~/react-query/common';
import { publicAxios } from '~/utils';

export interface SignInData {}
export type SignInApiData = ApiSuccessResponse<SignInData>;
export interface SignInParams {
  code: string;
  oauthName: string;
}

export const signIn = (params: SignInParams) => {
  const endpoint = endpoints.auth.signIn();

  return publicAxios
    .post<SignInApiData>(endpoint, params)
    .then((res) => res.data);
};

export const signOut = () => {
  const endpoint = endpoints.auth.signOut();

  return publicAxios.post(endpoint, {});
};

export const reissueToken = () => {
  const endpoint = endpoints.auth.refresh();
  const tag = '[In reissueToken api request]';

  // 인터셉터 내부에서 무한루프가 발생할 수 있으니 publicAxios 사용
  return publicAxios
    .post(endpoint, {}, { withCredentials: true })
    .catch((error) => {
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
          // 필요하다면, 쿠키 삭제도 고려. (로그아웃 요청을 다시 보낼지, 이 응답에서 서버가 삭제시킬지는 논의 필요)
          //
          // NOTE: 삭제해야할 클라이언트 상태들이 있다면 삭제하기
          // console.log(store.dispatch(resetStoreAction()));
          // console.log(getQueryClient().clear());
          return Promise.reject(error);
        }
      }
    });
};
