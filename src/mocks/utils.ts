import type { RestContext, DefaultBodyType } from 'msw';
import type { ApiErrorResponse, ApiSuccessResponse } from '~/types';

import { rest } from 'msw';

/**
 * - 성공 응답에 거의 `data`만 사용되기 때문에 만들었습니다.
 * - `resolver`의 반환값으로 사용하면 됩니다.
 * @example
 *   return res(...mockSuccess(ctx, { token: '1234' }))
 */
export const mockSuccess = <D>(
  ctx: RestContext,
  data: D,
  code = '',
  message = '',
  statusCode = 200
) => {
  const isValidStatusCode = statusCode >= 200 && statusCode < 400;
  return [
    ctx.status(isValidStatusCode ? statusCode : 200),
    ctx.json<ApiSuccessResponse<D>>({
      data,
      code,
      message,
    }),
  ] as const;
};

/**
 * - 실패 응답에 거의 `code`, `message`만 사용되기 때문에 만들었습니다.
 * - `resolver`의 반환값으로 사용하면 됩니다.
 * @example
 *   return res(...mockError(ctx, 'error-code', 'error-message'))
 */
export const mockError = (
  ctx: RestContext,
  code = '',
  message = '',
  statusCode = 400
) => {
  const isValidStatusCode = statusCode >= 400 && statusCode < 600;
  return [
    ctx.status(isValidStatusCode ? statusCode : 400),
    ctx.json<ApiErrorResponse>({ code, message, data: null }),
  ] as const;
};

/**
 * - Mock handler 자체를 만드는 유틸리티입니다.
 * - 요청 ~ 응답 사이에 별다른 로직을 수행하지 않는 핸들러를 만들 때 사용합니다.
 * - 기본 `delay`는 500ms 입니다.
 */
export const restSuccess = <D extends DefaultBodyType>(
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  url: string,
  { delay = 500, data }: { delay?: number; data?: D } = {}
) => {
  return rest[method](url, (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json({ data }));
  });
};

/**
 * - Mock handler 자체를 만드는 유틸리티입니다.
 * - 요청 ~ 응답 사이에 별다른 로직을 수행하지 않는 핸들러를 만들 때 사용합니다.
 * - 기본 `delay`는 500ms 입니다.
 */
export const restError = <D extends DefaultBodyType>(
  method: 'get' | 'post' | 'patch' | 'delete',
  url: string,
  {
    delay = 500,
    message = '에러가 발생하였습니다.',
    status = 400,
    code = '400',
    data = {},
  }: {
    delay?: number;
    message?: string;
    code?: string;
    status?: number;
    data?: D;
  } = {}
) => {
  const safeStatus = status >= 400 && status < 600 ? status : 400;

  return rest[method](url, (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.status(safeStatus),
      ctx.json({
        code,
        message,
        data,
      })
    );
  });
};
