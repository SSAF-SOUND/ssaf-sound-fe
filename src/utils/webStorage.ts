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
  const authReturnPageKey = 'auth-return-page';

  // `devMode`에서만 사용합니다.
  const dev__accessTokenKey = 'accessToken';
  const dev__refreshTokenKey = 'refreshToken';
  const dev__storedAccessTokenKey = 'stored-accessToken';
  const dev__storedRefreshTokenKey = 'stored-refreshToken';
  const dev__storedExpiredAccessTokenKey = 'stored-expired-refreshToken';
  const dev__storedExpiredRefreshTokenKey = 'stored-expired-refreshToken';

  // Default Value
  const DEFAULT_RETURN_PAGE = routes.main();

  return {
    setSignInReturnPage: (returnPage: string) => {
      sessionStorage.setItem(authReturnPageKey, returnPage);
    },
    getSignInReturnPage: () => {
      return sessionStorage.getItem(authReturnPageKey) ?? DEFAULT_RETURN_PAGE;
    },
    clearSignInReturnPage: () => {
      sessionStorage.removeItem(authReturnPageKey);
    },
    clearPrivateData: () => {},
    DEV__setTokens: (tokens: Tokens) => {
      localStorage.setItem(dev__accessTokenKey, tokens.accessToken);
      localStorage.setItem(dev__refreshTokenKey, tokens.refreshToken);
    },
    DEV__getAccessToken: () => {
      return localStorage.getItem(dev__accessTokenKey);
    },
    DEV__getRefreshToken: () => {
      return localStorage.getItem(dev__refreshTokenKey);
    },
    DEV__removeTokens: () => {
      localStorage.removeItem(dev__accessTokenKey);
      localStorage.removeItem(dev__refreshTokenKey);
    },
    DEV__storeTokens: (tokens: Tokens) => {
      localStorage.setItem(dev__storedAccessTokenKey, tokens.accessToken);
      localStorage.setItem(dev__storedRefreshTokenKey, tokens.refreshToken);
    },
    DEV__getStoredTokens: () => {
      return {
        accessToken: localStorage.getItem(dev__storedAccessTokenKey) ?? '',
        refreshToken: localStorage.getItem(dev__storedRefreshTokenKey) ?? '',
      };
    },
    DEV__storeExpiredTokens: (tokens: Tokens) => {
      localStorage.setItem(
        dev__storedExpiredAccessTokenKey,
        tokens.accessToken
      );
      localStorage.setItem(
        dev__storedExpiredRefreshTokenKey,
        tokens.refreshToken
      );
    },
    DEV__getStoredExpiredTokens: () => {
      return {
        accessToken:
          localStorage.getItem(dev__storedExpiredAccessTokenKey) ?? '',
        refreshToken:
          localStorage.getItem(dev__storedExpiredRefreshTokenKey) ?? '',
      };
    },
  };
};

export const webStorage = createWebStorage();
