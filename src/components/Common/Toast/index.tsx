import LoadingToast from './LoadingToast';
import ServerErrorToast from './ServerErrorToast';
import SuccessToast from './SuccessToast';

const Toast = {
  ServerError: ServerErrorToast,
  Success: SuccessToast,
  Loading: LoadingToast,
};

export default Toast;
