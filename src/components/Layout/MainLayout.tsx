import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { globalVars, pageMaxWidth, pageMinWidth } from '~/styles/utils';

// 임시 레이아웃입니다.
// 개발 단계에서, 보기 편하게 하기 위해서 넣어놨어요!

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children, className } = props;
  return (
    <div css={selfCss} className={className}>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;

const selfCss = css({
  minWidth: pageMinWidth,
  maxWidth: pageMaxWidth,
  minHeight: '100vh',
  margin: '0 auto',
  padding: `0 ${globalVars.mainLayoutPaddingX.var}`,
  boxShadow: `20px 20px 40px #272b32, -20px -20px 40px #353a44;`,
  overflow: 'hidden',
});
