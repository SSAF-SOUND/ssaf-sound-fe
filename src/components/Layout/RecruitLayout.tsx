/* css */
import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { flex, pageMinHeight, titleBarHeight } from '~/styles/utils';

const selfPaddingX = 10;
const selfMinHeight = `max(${pageMinHeight}px, 100vh)`;
const searchBarTop = titleBarHeight;
const selfPaddingTop = searchBarTop;

export const RecruitLayout = (props: { children: ReactNode }) => {
  return <div css={selfCss}>{props.children}</div>;
};

const selfCss = css(
  {
    padding: `${selfPaddingTop}px ${selfPaddingX}px 15px`,
    minHeight: selfMinHeight,
  },
  flex('', '', 'column')
);
