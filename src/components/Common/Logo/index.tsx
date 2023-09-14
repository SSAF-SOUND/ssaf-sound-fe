import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';

import LogoSVG from '~/assets/images/logo.svg';
import { inlineFlex } from '~/styles/utils';
import { routes } from '~/utils/routes';

export type LogoSize = 'sm' | 'lg';

export interface LogoProps {
  size?: LogoSize;
  navigateToMainPage?: boolean;
}

export const Logo = (props: LogoProps) => {
  const { size = 'sm', navigateToMainPage = false } = props;
  const router = useRouter();
  const handleClick = () => {
    if (navigateToMainPage) router.push(routes.main());
  };

  return (
    <div css={[selfCss, navigateToMainPage && cursorCss]} onClick={handleClick}>
      <AccessibleIcon.Root label="로고">
        <LogoSVG css={[svgBaseCss, svgCss[size]]} />
      </AccessibleIcon.Root>
    </div>
  );
};

const selfCss = css(inlineFlex());

const svgBaseCss = css({
  width: 'auto',
});

const svgCss = {
  sm: css({
    height: 20,
  }),
  lg: css({
    height: 32,
  }),
};

const cursorCss = css({
  cursor: 'pointer',
});

