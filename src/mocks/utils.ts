import type { RestContext } from 'msw';
import type { ApiErrorResponse, ApiSuccessResponse } from '~/types';

/**
 * - 성공 응답에 거의 `data`만 사용되기 때문에 만들었습니다.
 * - `resolver`의 반환값으로 사용하면 됩니다.
 * @example
 *   return res(...mockSuccess(ctx, { token: '1234' }))
 */
export const mockSuccess = <D>(
  ctx: RestContext,
  data: D,
  message = '',
  statusCode = 200
) => {
  const isValidStatusCode = statusCode >= 200 && statusCode < 400;
  return [
    ctx.status(isValidStatusCode ? statusCode : 200),
    ctx.json<ApiSuccessResponse<D>>({
      statusCode,
      message,
      data,
    }),
  ] as const;
};

/**
 * - 실패 응답에 거의 `message`만 사용되기 때문에 만들었습니다.
 * - `resolver`의 반환값으로 사용하면 됩니다.
 * @example
 *   return res(...mockError(ctx, 'error-message'))
 */
export const mockError = (
  ctx: RestContext,
  message: string,
  statusCode = 400
) => {
  const isValidStatusCode = statusCode >= 400 && statusCode < 600;
  return [
    ctx.status(isValidStatusCode ? statusCode : 400),
    ctx.json<ApiErrorResponse>({ statusCode, message }),
  ] as const;
};
