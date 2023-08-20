import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { flex, topBarHeight } from '~/styles/utils';

interface LunchPageLayoutProps {
  children: ReactNode;
}

export const LunchPageLayout = (props: LunchPageLayoutProps) => {
  const { children } = props;
  return <div css={selfCss}>{children}</div>;
};

const selfPaddingTop = topBarHeight + 44;
const selfPaddingX = 15;

const selfCss = css(
  {
    padding: `0 ${selfPaddingX}px`,
    paddingTop: selfPaddingTop,
  },
  flex('center', '', 'column', 40)
);
