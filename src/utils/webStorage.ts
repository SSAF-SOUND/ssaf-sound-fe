import type { Tokens } from '~/services/auth';

import { isClient, noop } from '~/utils/misc';
import { routes } from '~/utils/routes';

const mockStorage = new Proxy(
  {},
  {
    get: () => noop,
  }
) as Storage;

const sessionStorage = isClient ? window.sessionStorage : mockStorage;
const localStorage = isClient ? window.localStorage : mockStorage;

const createWebStorage = () => {
  // Storage Key
  const AUTH_RETURN_PAGE_KEY = 'auth-return-page';

  // `devMode`에서만 사용합니다.
  const DEV__ACCESS_TOKEN_KEY = 'accessToken';
  const DEV__REFRESH_TOKEN_KEY = 'refreshToken';

  // Default Value
  const DEFAULT_RETURN_PAGE = routes.main();

  return {
    setSignInReturnPage: (returnPage: string) => {
      sessionStorage.setItem(AUTH_RETURN_PAGE_KEY, returnPage);
    },
    getSignInReturnPage: () => {
      return (
        sessionStorage.getItem(AUTH_RETURN_PAGE_KEY) ?? DEFAULT_RETURN_PAGE
      );
    },
    clearPrivateData: () => {},
    DEV__setTokens: (tokens: Tokens) => {
      localStorage.setItem(DEV__ACCESS_TOKEN_KEY, tokens.accessToken);
      localStorage.setItem(DEV__REFRESH_TOKEN_KEY, tokens.refreshToken);
    },
    DEV__getAccessToken: () => {
      return localStorage.getItem(DEV__ACCESS_TOKEN_KEY);
    },
    DEV__getRefreshToken: () => {
      return localStorage.getItem(DEV__REFRESH_TOKEN_KEY);
    },
    DEV__removeTokens: () => {
      localStorage.removeItem(DEV__ACCESS_TOKEN_KEY);
      localStorage.removeItem(DEV__REFRESH_TOKEN_KEY);
    },
  };
};

export const webStorage = createWebStorage();
