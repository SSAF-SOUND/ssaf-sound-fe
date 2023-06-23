import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

import { themeColorVars } from '~/styles/utils/themeColorVars';

interface ButtonLoaderProps {
  color?: string;
}

const ButtonLoader = (props: ButtonLoaderProps) => {
  return <ClipLoader size={20} {...props} />;
};

export default ButtonLoader;
