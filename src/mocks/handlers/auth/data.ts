import cookie from 'js-cookie';

import { ResponseCode } from '~/utils';

export const ACCESS_TOKEN_KEY = 'msw-access-token';
export const REFRESH_TOKEN_KEY = 'msw-refresh-token';
export const TOKEN_VALUE = '.';
export const EXPIRED_TOKEN_VALUE = '..';

export const issueTokens = () => {
  cookie.set(ACCESS_TOKEN_KEY, TOKEN_VALUE, {
    expires: 0.25 / 24, // 15분
  });
  cookie.set(REFRESH_TOKEN_KEY, TOKEN_VALUE, {
    expires: 14, // 14일
  });
};

export const removeTokens = () => {
  cookie.remove(ACCESS_TOKEN_KEY);
  cookie.remove(REFRESH_TOKEN_KEY);
};

const checkTokenError = (token: string | undefined) => {
  if (token === TOKEN_VALUE) {
    return undefined;
  }

  if (token === EXPIRED_TOKEN_VALUE) {
    return {
      code: ResponseCode.EXPIRED_TOKEN,
      message: '',
      data: {},
    };
  }

  return {
    code: ResponseCode.INVALID_TOKEN,
    message: '',
    data: {},
  };
};

/**
 * - 브라우저에 세팅되어 있는 mocking된 access token을 확인합니다.
 * - 오류가 없으면 undefined를 반환합니다.
 * - 오류가 있는 경우 서버에서 응답할 것으로 예상되는 data를 반환합니다.
 */
export const checkAccessTokenError = () => {
  return checkTokenError(cookie.get(ACCESS_TOKEN_KEY));
};

export const checkRefreshTokenError = () => {
  return checkTokenError(cookie.get(REFRESH_TOKEN_KEY));
};
