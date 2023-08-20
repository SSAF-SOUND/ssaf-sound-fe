import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import {
  flex,
  pageMinHeight,
  pageMinWidth,
  topBarHeight,
} from '~/styles/utils';

interface LunchLayoutProps {
  children: ReactNode;
}

export const LunchLayout = (props: LunchLayoutProps) => {
  const { children } = props;
  return <div css={selfCss}>{children}</div>;
};

const selfPaddingY = topBarHeight + 44;
const selfPaddingX = 15;

const selfCss = css(
  {
    padding: `${selfPaddingY}px ${selfPaddingX}px`,
    minWidth: pageMinWidth,
    minHeight: `max(${pageMinHeight}px, 100vh)`,
  },
  flex('center', '', 'column', 40)
);
