// import { Noto_Sans_KR } from 'next/font/google';

import { css } from '@emotion/react';

// const notoSansKR = Noto_Sans_KR({
//   weight: ['400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

const createFontStyleCss = (
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
  fontWeight: number
) => {
  return css({
    fontSize,
    lineHeight,
    letterSpacing,
    fontWeight,
  });
};

const fontCss = {
  family: {
    // sans: notoSansKR.style,
    sans: {
      fontFamily: 'Noto Sans KR, sans-serif',
    },
  },
  style: {
    // B12: createFontStyleCss(),
  },
};

export { fontCss };
