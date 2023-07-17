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
  const ACCESS_TOKEN_KEY = 'accessToken';
  const REFRESH_TOKEN_KEY = 'refreshToken';

  // Default Value
  const DEFAULT_RETURN_PAGE = routes.main();

  return {
    setReturnPage: (returnPage: string) => {
      sessionStorage.setItem(AUTH_RETURN_PAGE_KEY, returnPage);
    },
    getReturnPage: () => {
      return (
        sessionStorage.getItem(AUTH_RETURN_PAGE_KEY) ?? DEFAULT_RETURN_PAGE
      );
    },
    getAccessToken: () => {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    },
    getRefreshToken: () => {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    },
  };
};

export const webStorage = createWebStorage();
