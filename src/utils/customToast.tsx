import toast from 'react-hot-toast';

import { Toast } from '~/components/Common/Toast';
import { getErrorResponse } from '~/utils/handleAxiosError';
import { toastClassnames } from '~/utils/toast-classnames';

const clientErrorToast = (message: string) => {
  return toast((t) => <Toast.ServerError clientMessage={message} t={t} />);
};

const successToast = (message: string) => {
  return toast((t) => <Toast.Success message={message} t={t} />);
};

const promiseToast = (
  // eslint-disable-next-line
  promise: Promise<any>,
  messages: {
    loading: string;
    success?: string;
    error?: string;
  }
) => {
  const {
    error: errorMessage,
    success: successMessage,
    loading: loadingMessage,
  } = messages;
  const id = Math.random().toString();
  const onClickSettledToast = () => toast.dismiss(id);

  return toast.promise(
    promise,
    {
      loading: <Toast.Loading message={loadingMessage} />,
      success: successMessage ? (
        <Toast.Success onClick={onClickSettledToast} message={successMessage} />
      ) : null,
      error: (err) => {
        const errorResponse = getErrorResponse(err);
        const errorResponseMessage =
          errorResponse?.message ?? '요청 처리에 실패하였습니다.';

        return (
          <Toast.ServerError
            onClick={onClickSettledToast}
            clientMessage={errorMessage ?? errorResponseMessage}
          />
        );
      },
    },
    {
      icon: null,
      id,
      style: { padding: 0 },
      className: toastClassnames.promiseToastRoot,
    }
  );
};

export const customToast = {
  clientError: clientErrorToast,
  success: successToast,
  promise: promiseToast,
};
