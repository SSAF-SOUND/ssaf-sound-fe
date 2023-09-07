import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

import { flex, palettes } from '~/styles/utils';

export const HalfLoadingSpinner = (props: {
  color?: string;
  className?: string;
  size?: number;
}) => {
  const { size = 120, color = palettes.primary.default, className } = props;
  return (
    <div css={selfCss} className={className}>
      <ClipLoader size={size} color={color} />
    </div>
  );
};

const selfCss = css(flex('center', 'center'), { height: '50vh' });
