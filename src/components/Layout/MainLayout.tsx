import type { ReactNode } from 'react';

import { css } from '@emotion/react';

// 임시 레이아웃입니다.
// 개발 단계에서, 보기 편하게 하기 위해서 넣어놨어요!
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div css={baseCss}>
      {/* header ... */}
      <main>{children}</main>
    </div>
  );
};

const baseCss = css({
  width: '390px',
  backgroundColor: '#eeeeee',
  margin: '0 auto',
  padding: '0 31px',
});

export default Layout;
