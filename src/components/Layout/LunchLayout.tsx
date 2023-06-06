import type { ReactNode } from 'react';

import { css } from '@emotion/react';

const LunchLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div css={baseCss}>
      <div css={headerCss}>
        <h2 css={titleCss}>icon 오늘의 점심</h2>
        <span css={textCss}>
          점심 맛있으셨나요? <br />
          맛있는 만큼 따봉을 눌러주세요.
        </span>
      </div>
      {children}
    </div>
  );
};

const baseCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 43,
});

// 이름에 대해 고민중
const headerCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 43,
});

const titleCss = css({
  fontSize: 17,
  fontWeight: 700,
  lineHeight: '22px',
  letterSpacing: '-0.85px',
  margin: '0 auto',
});

const textCss = css({
  fontSize: 20,
  fontWeight: 500,
  lineHeight: '22.5px',
  letterSpacing: '-1.25',
});

const linkCss = css({
  textDecoration: 'none',
  color: '#000',
});

export default LunchLayout;
