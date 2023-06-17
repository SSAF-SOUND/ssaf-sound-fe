import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss } from '~/styles/utils';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout = (props: PageLayoutProps) => {
  return <div css={selfCss} {...props} />;
};

const selfCss = css(
  {
    minWidth: 320,
    maxWidth: 576,
    boxShadow: `20px 20px 40px #272b32, -20px -20px 40px #353a44`,
  },

  fontCss.family.auto
);

export default PageLayout;
