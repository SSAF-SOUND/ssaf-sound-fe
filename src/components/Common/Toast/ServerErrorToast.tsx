import type { ComponentPropsWithoutRef } from 'react';
import type { Toast } from 'react-hot-toast';

import toast from 'react-hot-toast';

import { Icon } from '~/components/Common/Icon';
import { palettes } from '~/styles/utils';

import ToastRoot from './ToastRoot';

interface ServerErrorToastProps extends ComponentPropsWithoutRef<'button'> {
  t?: Toast;
  onClick?: () => void;
  clientMessage?: string;
  serverMessage?: string;
  showServerMessage?: boolean;
}

const ServerErrorToast = (props: ServerErrorToastProps) => {
  const {
    t,
    onClick,
    clientMessage = '',
    serverMessage = '',
    showServerMessage = false,
    ...restProps
  } = props;

  const shouldShowServerMessage = showServerMessage && serverMessage;
  const handleClick = onClick ? onClick : () => t && toast.dismiss(t.id);

  return (
    <ToastRoot
      icon={<Icon name="close" color={palettes.error.default} size={24} />}
      onClick={handleClick}
      {...restProps}
    >
      {clientMessage && <p>{clientMessage}</p>}
      {shouldShowServerMessage && <p>{serverMessage}</p>}
    </ToastRoot>
  );
};

export default ServerErrorToast;
