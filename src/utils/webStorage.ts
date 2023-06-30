import { isClient, noop } from '~/utils/misc';
import { routes } from '~/utils/routes';

const mockStorage = new Proxy(
  {},
  {
    get: () => noop,
  }
) as Storage;

const sessionStorage = isClient ? window.sessionStorage : mockStorage;

const createWebStorage = () => {
  // Storage Key
  const AUTH_RETURN_PAGE_KEY = 'auth-return-page';

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
  };
};

export const webStorage = createWebStorage();
