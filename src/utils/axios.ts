import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse } from '~/types';

import axios, { AxiosError } from 'axios';

import { reissueToken } from '~/services/auth';

import { API_URL, RESPONSE } from './constants';

export const publicAxios = axios.create({
  baseURL: API_URL,
});

export const privateAxios = axios.create({
  baseURL: API_URL,
});

const configurePrivateAxiosInterceptors = (
  reissueToken: () => Promise<unknown>,
  responseCodesTriggerReissueToken: string[]
) => {
  let reissueTokenRequest: ReturnType<typeof reissueToken> | undefined;
  const waitingQueue = new Set<InternalAxiosRequestConfig>();

  /**
   * - 토큰 재발급 수행 중에 privateAxios 요청이 감지된 경우, 해당 요청을 서버에 보내지 않고 대기시킵니다.
   * - 토큰 재발급에 성공하면, 대기중인 요청을 서버에 보냅니다.
   * - 토큰 재발급에 실패하면, 대기중인 요청을 서버에 보내지 않고 즉시 실패시킵니다.
   */
  privateAxios.interceptors.request.use((config) => {
    if (reissueTokenRequest === undefined) return config;
    return reissueTokenRequest.then(() => config);
  });

  /**
   * - privateAxios 요청에 대한 응답 데이터에 토큰 재발급이 필요하다는 code가 포함되었다면,
   * 토큰 재발급을 수행하고, Reject될 예정이었던 요청을 대기시킵니다.
   * - 토큰 재발급에 성공한 경우, 대기중인 요청을 다시 서버로 전송합니다.
   * - 토큰 재발급에 실패한 경우, 대기중인 요청을 실패시킵니다.
   */
  privateAxios.interceptors.response.use(
    undefined,
    async (error: AxiosError<ApiErrorResponse> | Error) => {
      const tag = `[In privateAxios response interceptor]`;
      if (
        !(error instanceof AxiosError) ||
        !error.response?.data ||
        !error.config
      ) {
        console.error(`${tag}: Unknown Error`);
        return Promise.reject(error);
      }

      const requestConfig = error.config;
      const retryFailedRequest = () => privateAxios.request(requestConfig);

      const statusCode = error.response.status;
      if (statusCode >= 500) {
        console.error(`${tag}: Server Error`);
        return Promise.reject(error);
      }

      console.error(`${tag}: Client Error`);
      const response = error.response.data;

      if (!responseCodesTriggerReissueToken.includes(response.code)) {
        return Promise.reject(error);
      }

      if (reissueTokenRequest === undefined) {
        reissueTokenRequest = reissueToken();
      }

      waitingQueue.add(requestConfig);

      return reissueTokenRequest
        .then(() => retryFailedRequest())
        .catch(() => Promise.reject(error))
        .finally(() => {
          waitingQueue.delete(requestConfig);
          if (!waitingQueue.size) {
            reissueTokenRequest = undefined;
          }
        });
    }
    // Edge Case
    // 만료 요청 N개를 보냄 -> N개 전부 실패 -> 가장 처음 실패한 만료요청에 대해서 토큰 재발급을 요청
    // -> 서버에서 토큰 재발급 완료 후 응답 객체 전송 -> 응답 객체가 도착하기 전에 만료된 토큰을 가진 N+1번째 요청이 보내지는 상황에서
    // 큐에서 대기중인 요청들은 토큰 재발급 이후에 전부 재요청 처리됨.
    // 뒤늦게 보낸 만료 요청에 대한 실패 결과가 도착하면 큐 사이즈가 이미 0이라서 reissueRequest는 undefined가 됨.
    // 그러면 불필요한 재발급 요청을 1번 더 보내게됨.
    // request interceptors에서 처리하기.
  );
};

configurePrivateAxiosInterceptors(reissueToken, [
  RESPONSE.CODE.EXPIRED_TOKEN,
  RESPONSE.CODE.TOKEN_NOT_EXISTS,
]);
