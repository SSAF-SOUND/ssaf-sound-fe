import { isAxiosError } from 'axios';

import { endpoints } from '~/react-query/common';
import { signOut } from '~/services/auth/apis/signOut';
import { publicAxios } from '~/utils/axios';
import { clearPrivateData } from '~/utils/clearPrivateData';
import { GlobalSymbol, isDevMode } from '~/utils/constants';
import { webStorage } from '~/utils/webStorage';

const getReissueRequestConfig = () => {
  let config;

  if (isDevMode) {
    const devRefreshToken = webStorage.DEV__getRefreshToken();
    if (devRefreshToken) {
      config = {
        headers: {
          Authorization: `Bearer ${devRefreshToken}`,
        },
      };
    }
  }

  return config;
};
export const reissueToken = () => {
  const endpoint = endpoints.auth.refresh();
  const tag = '[In reissueToken api request]';
  const config = getReissueRequestConfig();

  // 인터셉터 내부에서 무한루프가 발생할 수 있으니 publicAxios 사용
  return publicAxios.post(endpoint, null, config).catch(async (error) => {
    if (!isAxiosError(error)) {
      console.error(`${tag}: Unknown Error ${error}`);
      return Promise.reject(error);
    }

    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode >= 500) {
        console.error(`${tag}: Server Error`);
        return Promise.reject(error);
      } else {
        console.error(`${tag}: Client Error`);

        try {
          await signOut();
          clearPrivateData();
        } catch (err) {
          return Promise.reject(GlobalSymbol.QUIT_REQUEST_RETRY);
        }

        return Promise.reject(error);
      }
    }
  });
};
