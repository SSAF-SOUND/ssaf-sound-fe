import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { flex } from '~/styles/utils';

interface LunchPageLayoutProps {
  children: ReactNode;
}

export const LunchPageLayout = (props: LunchPageLayoutProps) => {
  const { children } = props;
  return <div css={selfCss}>{children}</div>;
};

const selfCss = css(
  {
    paddingTop: 50,
  },
  flex('center', '', 'column', 40)
);
