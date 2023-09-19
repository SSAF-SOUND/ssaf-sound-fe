import type { AxiosInstance } from 'axios';
import type { ApiErrorResponse } from '~/types';

import axios from 'axios';
import { rest } from 'msw';

import { server } from '~/mocks/server';
import { endpoints } from '~/react-query/common';
import {
  composeUrls,
  configurePrivateAxiosInterceptors,
  ResponseCode,
  sleep,
} from '~/utils';

const baseUrl = 'https://test.com/';
const privateRequestEndpoint = composeUrls(baseUrl, '/private');
const refreshTokenEndpoint = composeUrls(baseUrl, endpoints.auth.refresh());
const reissueToken = jest.fn(() => {
  return axios.post(refreshTokenEndpoint);
});

const setupMSW = (
  serverTaskOnReissueToken: () => void,
  serverTaskOnPrivateRequest?: () => void,
  serverTaskDelayOnReissueToken = 0
) => {
  const EXPIRED = 'EXPIRED';
  const VALID = 'VALID';
  const cookies = { token: EXPIRED } as { token?: string };

  server.use(
    rest.get(privateRequestEndpoint, (req, res, ctx) => {
      serverTaskOnPrivateRequest?.();

      if (cookies.token === EXPIRED) {
        return res(
          ctx.status(400),
          ctx.json<ApiErrorResponse>({
            message: '',
            code: ResponseCode.EXPIRED_TOKEN,
          })
        );
      }

      return res(ctx.status(200));
    }),

    rest.post(refreshTokenEndpoint, async (req, res, ctx) => {
      await sleep(serverTaskDelayOnReissueToken);
      serverTaskOnReissueToken();
      cookies.token = VALID;
      return res(ctx.status(200));
    })
  );
};

describe('privateAxios interceptors test', () => {
  let axiosInstance: AxiosInstance;
  beforeEach(() => {
    axiosInstance = axios.create();
    configurePrivateAxiosInterceptors(axiosInstance, reissueToken, {
      reissueTokenTriggerCodes: [ResponseCode.EXPIRED_TOKEN],
      skipReissueToken: () => false,
    });
  });

  it('`privateAxios`로 여러개의 요청을 보낼 때, 토큰 만료로 요청이 실패한 경우, 토큰 재발급 요청은 1회만 보낸다.', async () => {
    const serverTaskOnReissueToken = jest.fn();

    setupMSW(serverTaskOnReissueToken);

    const privateRequest = () => axiosInstance.get(privateRequestEndpoint);

    await Promise.allSettled([
      privateRequest(),
      privateRequest(),
      privateRequest(),
      privateRequest(),
    ]);

    expect(serverTaskOnReissueToken).toBeCalledTimes(1);
  });

  it('`privateAxios`로 여러개의 요청을 보낼 때, 토큰 만료로 요청이 실패한 경우, 토큰 재발급 이후에 실패했던 요청들이 재전송된다.', async () => {
    const serverTaskOnReissueToken = jest.fn();
    const serverTaskOnPrivateRequest = jest.fn();

    setupMSW(serverTaskOnReissueToken, serverTaskOnPrivateRequest);

    const privateRequest = () => axiosInstance.get(privateRequestEndpoint);

    await Promise.allSettled([
      privateRequest(),
      privateRequest(),
      privateRequest(),
      privateRequest(),
    ]);

    expect(serverTaskOnPrivateRequest).toBeCalledTimes(8);
  });

  it('토큰 재발급 중에 `privateAxios` 요청이 발생했다면, 해당 요청은 대기상태에 있다가 토큰 재발급이 완료된 이후에 수행된다.', async () => {
    const serverTaskOnReissueToken = jest.fn();
    const serverTaskOnPrivateRequest = jest.fn();
    const serverTaskDelayOnReissueToken = 1000;

    setupMSW(
      serverTaskOnReissueToken,
      serverTaskOnPrivateRequest,
      serverTaskDelayOnReissueToken
    );

    const privateRequest = () => axiosInstance.get(privateRequestEndpoint);
    const latePrivateRequest = () => axiosInstance.get(privateRequestEndpoint);

    setTimeout(() => latePrivateRequest(), serverTaskDelayOnReissueToken / 2);
    await privateRequest();

    // privateRequest 2번, latePrivateRequest 1번
    expect(serverTaskOnPrivateRequest).toBeCalledTimes(3);
  });
});
