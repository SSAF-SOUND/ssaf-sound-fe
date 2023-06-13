import type { SignInApiData } from '~/services/auth';

import cookie from 'js-cookie';
import { rest } from 'msw';

import {
  mockExpiredTokenError,
  mockInvalidTokenError,
  mockSuccess,
} from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const ACCESS_TOKEN_KEY = 'msw-access-token';
const REFRESH_TOKEN_KEY = 'msw-refresh-token';
const TOKEN_VALUE = '.';
const EXPIRED_TOKEN_VALUE = '..';

const issueTokens = () => {
  cookie.set(ACCESS_TOKEN_KEY, TOKEN_VALUE, {
    expires: 1 / 24, // 1시간
  });
  cookie.set(REFRESH_TOKEN_KEY, TOKEN_VALUE, {
    expires: 14, // 14일
  });
};
const removeTokens = () => {
  cookie.remove(ACCESS_TOKEN_KEY);
  cookie.remove(REFRESH_TOKEN_KEY);
};

const signIn = rest.post<never, never, SignInApiData>(
  composeUrls(API_URL, endpoints.auth.signIn()),
  (req, res, ctx) => {
    issueTokens();

    return res(ctx.delay(500), ...mockSuccess(ctx, {}));
  }
);

const signOut = rest.post(
  composeUrls(API_URL, endpoints.auth.signOut()),
  (req, res, ctx) => {
    removeTokens();

    return res(...mockSuccess(ctx, {}));
  }
);

const reissueToken = rest.post(
  composeUrls(API_URL, endpoints.auth.refresh()),
  (req, res, ctx) => {
    const refreshToken = cookie.get(REFRESH_TOKEN_KEY);

    if (refreshToken === TOKEN_VALUE) {
      // 토큰이 유효함
      issueTokens();
      return res(...mockSuccess(ctx, {}));
    }

    if (refreshToken === EXPIRED_TOKEN_VALUE) {
      // 토큰이 만료됨 (토큰 값을 ..로 세팅 후 보내면 됨)
      // removeTokens();
      return res(...mockExpiredTokenError(ctx));
    }

    // 토큰이 유효하지 않음 (위조, 없음 등)
    // removeTokens();
    return res(...mockInvalidTokenError(ctx));
  }
);

export const authHandlers = [signIn, signOut, reissueToken];
