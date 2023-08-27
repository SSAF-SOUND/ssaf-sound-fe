import { isClient } from '~/utils/misc';

export const getPathname = () => {
  if (isClient) {
    return location.pathname;
  }
};
