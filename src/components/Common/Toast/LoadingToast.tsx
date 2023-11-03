import type { ComponentPropsWithoutRef } from 'react';

import { ClipLoader } from 'react-spinners';

import ToastRoot from '~/components/Common/Toast/ToastRoot';
import { palettes } from '~/styles/utils';

interface LoadingToastProps extends ComponentPropsWithoutRef<'button'> {
  message: string;
}

const LoadingToast = (props: LoadingToastProps) => {
  const { message, ...restProps } = props;

  return (
    <ToastRoot
      icon={<ClipLoader size={24} color={palettes.font.blueGrey} />}
      {...restProps}
    >
      {message ?? '로딩'}
    </ToastRoot>
  );
};

export default LoadingToast;
