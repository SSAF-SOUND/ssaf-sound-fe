import type { InternalAxiosRequestConfig } from 'axios';
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

let reissueRequest: ReturnType<typeof reissueToken> | undefined;
const waitingQueue = new Set<InternalAxiosRequestConfig>();

privateAxios.interceptors.request.use((config) => {
  if (reissueRequest === undefined) return config;

  return reissueRequest.then(() => config);
});

privateAxios.interceptors.response.use(
  undefined,
  async (error: AxiosError<ApiErrorResponse> | Error) => {
    const tag = '[In privateAxios response interceptor]';
    if (
      !(error instanceof AxiosError) ||
      !error.response?.data ||
      !error.config
    ) {
      console.error(`${tag}: Unknown Error`);
      return Promise.reject(error);
    }

    const requestConfig = error.config;
    const retry = () => privateAxios.request(requestConfig);

    const statusCode = error.response.status;
    if (statusCode >= 500) {
      console.error(`${tag}: Server Error`);
      return Promise.reject(error);
    }

    // 특정 에러가 발생하면 토큰을 재발급하고, 토큰 재발급 성공시 기존 요청 다시 보내기
    // 토큰 재발급 실패시, 요청 버리기
    console.error(`${tag}: Client Error`);
    const response = error.response.data;
    switch (response.code) {
      case RESPONSE.CODE.EXPIRED_TOKEN:
      case RESPONSE.CODE.TOKEN_NOT_EXISTS: {
        if (reissueRequest === undefined) {
          reissueRequest = reissueToken();
        }
        waitingQueue.add(requestConfig);
        console.log(waitingQueue);

        return reissueRequest
          .then(() => retry())
          .finally(() => {
            waitingQueue.delete(requestConfig);
            if (!waitingQueue.size) {
              reissueRequest = undefined;
            }
          });
        // Edge Case
        // 만료 요청 N개를 보냄 -> N개 전부 실패 -> 가장 처음 실패한 만료요청에 대해서 토큰 재발급을 요청
        // -> 서버에서 토큰 재발급 완료 후 응답 객체 전송 -> 응답 객체가 도착하기 전에 만료된 토큰을 가진 N+1번째 요청이 보내지는 상황에서
        // 큐에서 대기중인 요청들은 토큰 재발급 이후에 전부 재요청 처리됨.
        // 뒤늦게 보낸 만료 요청에 대한 실패 결과가 도착하면 큐 사이즈가 이미 0이라서 reissueRequest는 undefined가 됨.
        // 그러면 불필요한 재발급 요청을 1번 더 보내게됨.
        // privateAxios.interceptors.request.use에서 처리하기.
      }
      default:
        break;
    }

    return Promise.reject(error);
  }
);
