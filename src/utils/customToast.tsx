import toast from 'react-hot-toast';

import { Toast } from '~/components/Common';
import { getErrorResponse } from '~/utils/handleAxiosError';

const clientErrorToast = (message: string) => {
  return toast((t) => <Toast.ServerError clientMessage={message} t={t} />);
};

const successToast = (message: string) => {
  return toast((t) => <Toast.Success message={message} t={t} />);
};

const promiseToast = (
  promise: Promise<void>,
  messages: {
    loading: string;
    success: string;
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
      success: (
        <Toast.Success onClick={onClickSettledToast} message={successMessage} />
      ),
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
    { icon: null, id }
  );
};

export const customToast = {
  clientError: clientErrorToast,
  success: successToast,
  promise: promiseToast,
};
