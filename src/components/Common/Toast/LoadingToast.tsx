import { ClipLoader } from 'react-spinners';

import ToastRoot from '~/components/Common/Toast/ToastRoot';
import { palettes } from '~/styles/utils';

interface LoadingToastProps {
  message: string;
}

const LoadingToast = (props: LoadingToastProps) => {
  const { message } = props;

  return (
    <ToastRoot icon={<ClipLoader size={24} color={palettes.font.blueGrey} />}>
      {message ?? '로딩'}
    </ToastRoot>
  );
};

export default LoadingToast;
