import type { InternalAxiosRequestConfig, AxiosError } from 'axios';
import type { ApiErrorResponse } from '~/types';

import * as Sentry from '@sentry/nextjs';
import axios, { isAxiosError } from 'axios';

import { reissueToken } from '~/services/auth';
import { createRequestInfiniteLoopDetector } from '~/utils/createRequestInfiniteLoopDetector';
import { customToast } from '~/utils/customToast';
import { webStorage } from '~/utils/webStorage';

import { API_URL, isDevMode, ResponseCode } from './constants';

export const publicAxios = axios.create({
  baseURL: API_URL,
  withCredentials: isDevMode,
});

export const privateAxios = axios.create({
  baseURL: API_URL,
  withCredentials: isDevMode,
});

const devPlugin = (config: InternalAxiosRequestConfig) => {
  if (isDevMode)
    config.headers.Authorization = `Bearer ${webStorage.DEV__getAccessToken()}`;
};

const detectRequestInfiniteLoop = createRequestInfiniteLoopDetector(5, {
  timerSeconds: 10,
  onDetect: () => {
    const errorMessage = isDevMode
      ? '등록하지 않은 Mocking API가 있는지 확인해주세요! HTTP Method가 일치하지 않는 문제일 수도 있습니다.'
      : '오류가 발생했습니다.';
    customToast.clientError(errorMessage);
    Sentry.captureException(new Error('Error: Detect request infinite loop'));
  },
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
    devPlugin(config);

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
    (error: AxiosError<ApiErrorResponse> | Error) => {
      const tag = `[In privateAxios response interceptor]`;
      if (!isAxiosError(error) || !error.response?.data || !error.config) {
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

      if (detectRequestInfiniteLoop()) return;

      if (reissueTokenRequest === undefined) {
        reissueTokenRequest = reissueToken();
      }

      waitingQueue.add(requestConfig);

      return reissueTokenRequest
        .finally(() => {
          waitingQueue.delete(requestConfig);
          if (!waitingQueue.size) {
            reissueTokenRequest = undefined;
          }
        })
        .then(() => retryFailedRequest());
    }
  );
};

configurePrivateAxiosInterceptors(reissueToken, [ResponseCode.EXPIRED_TOKEN]);
