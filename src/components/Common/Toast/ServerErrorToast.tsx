import type { Toast } from 'react-hot-toast';

import toast from 'react-hot-toast';

import { Icon } from '~/components/Common';
import { palettes } from '~/styles/utils';

import ToastRoot from './ToastRoot';

interface ServerErrorToastProps {
  t: Toast;
  clientMessage?: string;
  serverMessage?: string;
  showServerMessage?: boolean;
}

const ServerErrorToast = (props: ServerErrorToastProps) => {
  const {
    t,
    clientMessage = '',
    serverMessage = '',
    showServerMessage = false,
  } = props;

  const shouldShowServerMessage = showServerMessage && serverMessage;

  return (
    <ToastRoot
      icon={<Icon name="close" color={palettes.error.default} size={24} />}
      onClick={() => toast.dismiss(t.id)}
    >
      {clientMessage && <p>{clientMessage}</p>}
      {shouldShowServerMessage && <p>{serverMessage}</p>}
    </ToastRoot>
  );
};

export default ServerErrorToast;
