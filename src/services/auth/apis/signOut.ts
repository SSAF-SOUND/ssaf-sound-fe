import { endpoints } from '~/react-query/common';
import { publicAxios } from '~/utils/axios';
import { isDevMode } from '~/utils/constants';
import { webStorage } from '~/utils/webStorage';

export const signOut = () => {
  const endpoint = endpoints.auth.signOut();

  return publicAxios.delete(endpoint).then(() => {
    if (isDevMode) {
      webStorage.DEV__removeTokens();
    }
  });
};
