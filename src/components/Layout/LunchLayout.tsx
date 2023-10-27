import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { flex, pageCss, pageMinWidth, topBarHeight } from '~/styles/utils';

interface LunchLayoutProps {
  children: ReactNode;
}

export const LunchLayout = (props: LunchLayoutProps) => {
  const { children } = props;
  return <main css={selfCss}>{children}</main>;
};

const selfPaddingY = topBarHeight + 44;

const selfCss = css(
  {
    padding: `${selfPaddingY}px 0`,
    minWidth: pageMinWidth,
  },
  pageCss.minHeight,
  flex('center', '', 'column', 40)
);
