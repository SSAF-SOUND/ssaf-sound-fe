import type { Toast } from 'react-hot-toast';

import toast from 'react-hot-toast';

import { Icon } from '~/components/Common';
import ToastRoot from '~/components/Common/Toast/ToastRoot';
import { palettes } from '~/styles/utils';

interface SuccessToastProps {
  t: Toast;
  message: string;
}

const SuccessToast = (props: SuccessToastProps) => {
  const { t, message } = props;
  return (
    <ToastRoot
      onClick={() => {
        toast.dismiss(t.id);
      }}
      icon={<Icon name="check" color={palettes.success.default} size={24} />}
    >
      {message}
    </ToastRoot>
  );
};

export default SuccessToast;
