import type { AxiosError} from 'axios';
import type { ApiErrorResponse } from '~/types';

import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { Toast } from '~/components/Common';
import { customToast } from '~/utils';

interface HandleAxiosErrorOptions {
  /**
   * 콘솔에 표시되는 에러 메세지 앞에 붙는 메세지입니다.
   */
  tag: string;
  /**
   * - `statusCode`값이 `500`이상일 때, 토스트에 표시할 메세지입니다.
   * - 서버측 메세지보다 상단에 표시됩니다.
   * - 기본값은 "서버에서 알 수 없는 오류가 발생했습니다" 입니다.
   */
  clientMessageOnServerError: string;
  /**
   * - `statusCode`값이 `500`이상일 때, 토스트에 표시할 서버측 에러 메세지입니다.
   * - 유저에게 필요 없는 정보일 수 있으므로, 기본적으로 development 모드에서만 `true`입니다.
   */
  showServerMessage: boolean;
  /**
   * - `statusCode`값이 `400 ~ 499` (=클라이언트 오류)일 때 수행할 함수입니다.
   */
  onClientError: ((response: ApiErrorResponse) => void) | null;
  /**
   * - `statusCode`값이 `500 ~ 599` (=서버 오류)일 때 수행할 함수입니다.
   * - 주어지지 않으면 기본 핸들러 함수를 사용합니다.
   */
  onServerError: (response: ApiErrorResponse) => void;
  /**
   * - 서버 에러 검사를 건너 뛰고 싶은 경우에 사용합니다.
   */
  skipServerError: boolean;
}

export const handleAxiosError = (
  error: unknown,
  options: Partial<HandleAxiosErrorOptions> = {}
) => {
  const {
    tag = '',
    clientMessageOnServerError = '서버에서 알 수 없는 오류가 발생하였습니다',
    showServerMessage = process.env.NODE_ENV === 'development',
    onClientError = defaultOnClientError,
    onServerError,
    skipServerError = false,
  } = options;

  if (!isAxiosError<ApiErrorResponse>(error) || !error.response) {
    const unknownErrorMessage = [tag, 'Unknown Error']
      .filter(Boolean)
      .join(' ');
    console.error(unknownErrorMessage);
    return;
  }

  /* Server Error */
  if (!skipServerError && isServerError(error)) {
    if (onServerError) {
      onServerError(error.response.data);
    } else {
      toast((t) => (
        <Toast.ServerError
          t={t}
          clientMessage={clientMessageOnServerError}
          serverMessage={error.response?.data?.message}
          showServerMessage={showServerMessage}
        />
      ));
    }
  }

  /* Client Error */
  if (isClientError(error)) {
    onClientError?.(error.response.data);
  }
};

const defaultOnClientError: HandleAxiosErrorOptions['onClientError'] = (
  err
) => {
  customToast.clientError(err.message || '오류가 발생했습니다');
};

export const isServerError = (error: AxiosError) => {
  const statusCode = error.response?.status;
  return statusCode && 500 <= statusCode && statusCode < 600;
};

export const isClientError = (error: AxiosError) => {
  const statusCode = error.response?.status;
  return statusCode && 400 <= statusCode && statusCode < 500;
};
