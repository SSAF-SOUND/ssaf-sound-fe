import type { Toast } from 'react-hot-toast';

import toast from 'react-hot-toast';

import { Icon } from '~/components/Common/Icon';
import ToastRoot from '~/components/Common/Toast/ToastRoot';
import { palettes } from '~/styles/utils';

interface SuccessToastProps {
  t?: Toast;
  onClick?: () => void;
  message: string;
}

const SuccessToast = (props: SuccessToastProps) => {
  const { t, message, onClick } = props;
  const handleClick = onClick ? onClick : () => t && toast.dismiss(t.id);

  return (
    <ToastRoot
      onClick={handleClick}
      icon={<Icon name="check" color={palettes.success.default} size={24} />}
    >
      {message}
    </ToastRoot>
  );
};

export default SuccessToast;
