import type { ReactNode } from 'react';

import { css } from '@emotion/react';

// 임시 레이아웃입니다.
// 개발 단계에서, 보기 편하게 하기 위해서 넣어놨어요!

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children, className = '' } = props;
  return (
    <div css={selfCss} className={className}>
      {/* header ... */}
      <main>{children}</main>
    </div>
  );
};

const selfCss = css({
  minWidth: 350,
  maxWidth: 576,
  minHeight: '100vh',
  margin: '0 auto',
  padding: '0 10px',
  boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
});

export default MainLayout;
