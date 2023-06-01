import { Noto_Sans_KR } from 'next/font/google';

import { css } from '@emotion/react';

const sans = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

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

export const fontCss = {
  family: {
    sans: css(sans.style),
  },
  style: {
    // B12: createFontStyleCss(),
  },
};
