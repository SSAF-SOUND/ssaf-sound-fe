import type { ComponentPropsWithoutRef } from 'react';
import type { Toast } from 'react-hot-toast';

import toast from 'react-hot-toast';

import { Icon } from '~/components/Common/Icon';
import ToastRoot from '~/components/Common/Toast/ToastRoot';
import { palettes } from '~/styles/utils';

interface SuccessToastProps extends ComponentPropsWithoutRef<'button'> {
  t?: Toast;
  message: string;
}

const SuccessToast = (props: SuccessToastProps) => {
  const { t, message, onClick, ...restProps } = props;
  const handleClick = onClick ? onClick : () => t && toast.dismiss(t.id);

  return (
    <ToastRoot
      onClick={handleClick}
      icon={<Icon name="check" color={palettes.success.default} size={24} />}
      {...restProps}
    >
      {message}
    </ToastRoot>
  );
};

export default SuccessToast;
