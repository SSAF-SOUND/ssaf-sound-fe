import type { ApiErrorResponse } from '~/types';

import { rest } from 'msw';

import { server } from '~/mocks/server';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, privateAxios, RESPONSE, sleep } from '~/utils';

const privatePath = '/private';

const setupMSW = (
  serverTaskOnReissueToken: () => void,
  serverTaskOnPrivateRequest?: () => void,
  serverTaskDelayOnReissueToken = 0
) => {
  const cookies = { token: undefined } as { token?: string };
  server.use(
    rest.get(composeUrls(API_URL, privatePath), (req, res, ctx) => {
      serverTaskOnPrivateRequest?.();
      if (cookies.token) {
        return res(ctx.status(200));
      }

      return res(
        ctx.status(400),
        ctx.json<ApiErrorResponse>({
          message: '',
          code: RESPONSE.CODE.EXPIRED_TOKEN,
        })
      );
    }),

    rest.post(
      composeUrls(API_URL, endpoints.auth.refresh()),
      async (req, res, ctx) => {
        await sleep(serverTaskDelayOnReissueToken);
        serverTaskOnReissueToken();
        cookies.token = 'token';
        return res(ctx.status(200));
      }
    )
  );
};

describe('privateAxios interceptors test', () => {
  it('`privateAxios`로 여러개의 요청을 보낼 때, 토큰 만료로 요청이 실패한 경우, 토큰 재발급 요청은 1회만 보내야 한다.', async () => {
    const serverTaskOnReissueToken = jest.fn();

    setupMSW(serverTaskOnReissueToken);

    const privateRequest = () => privateAxios.get(privatePath);

    await Promise.allSettled([
      privateRequest(),
      privateRequest(),
      privateRequest(),
      privateRequest(),
    ]);

    expect(serverTaskOnReissueToken).toBeCalledTimes(1);
  });

  it('`privateAxios`로 여러개의 요청을 보낼 때, 토큰 만료로 요청이 실패한 경우, 토큰 재발급 이후에 실패했던 요청들이 재전송되어야 한다.', async () => {
    const serverTaskOnReissueToken = jest.fn();
    const serverTaskOnPrivateRequest = jest.fn();

    setupMSW(serverTaskOnReissueToken, serverTaskOnPrivateRequest);

    const privateRequest = () => privateAxios.get(privatePath);

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

    const privateRequest = () => privateAxios.get(privatePath);
    const latePrivateRequest = () => privateAxios.get(privatePath);

    setTimeout(() => latePrivateRequest(), serverTaskDelayOnReissueToken / 2);
    await privateRequest();

    // privateRequest 2번, latePrivateRequest 1번
    expect(serverTaskOnPrivateRequest).toBeCalledTimes(3);
  });
});
