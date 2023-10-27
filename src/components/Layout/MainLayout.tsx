import type { CSSProperties, ReactNode } from 'react';

import { css } from '@emotion/react';

import {
  fontCss,
  globalVars,
  pageMaxWidth,
  pageMinWidth,
} from '~/styles/utils';

export interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children, ...restProps } = props;
  return (
    <div css={selfCss} {...restProps}>
      {children}
    </div>
  );
};

export default MainLayout;

const selfCss = css(
  {
    minWidth: pageMinWidth,
    maxWidth: pageMaxWidth,
    minHeight: '100vh',
    margin: '0 auto',
    padding: `0 ${globalVars.mainLayoutPaddingX.var}`,
    boxShadow: `20px 20px 40px #272b32, -20px -20px 40px #353a44;`,
    overflow: 'hidden',
  },
  fontCss.family.auto
);
