import toast from 'react-hot-toast';

import { Toast } from '~/components/Common';

const clientErrorToast = (message: string) => {
  return toast((t) => <Toast.ServerError clientMessage={message} t={t} />);
};

const customToast = {
  clientError: clientErrorToast,
};

export default customToast;
