import { css } from '@emotion/react';
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';

import LogoSVG from '~/assets/images/logo.svg';

export type LogoSize = 'sm' | 'lg';

export interface LogoProps {
  size?: LogoSize;
}

const Logo = (props: LogoProps) => {
  const { size = 'sm' } = props;
  return (
    <AccessibleIcon.Root label="로고">
      <LogoSVG css={[baseCss, svgCss[size]]} />
    </AccessibleIcon.Root>
  );
};

const baseCss = css({
  width: 'auto',
  pointerEvent: 'none',
});

const svgCss = {
  sm: css({
    height: 20,
  }),
  lg: css({
    height: 32,
  }),
};

export default Logo;
