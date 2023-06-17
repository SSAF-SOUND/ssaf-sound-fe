import { css } from '@emotion/react';

const createFontStyleCss = (
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
  fontWeight: number
) => {
  return css({
    fontSize,
    lineHeight: `${lineHeight}px`,
    letterSpacing: `${letterSpacing}em`,
    fontWeight,
  });
};

const BOLD = 700;
const REGULAR = 400;

const fallbacks =
  '-apple-system, BlinkMacSystemFont, system-ui, Roboto, "Noto Sans KR", sans-serif';

export const fontCss = {
  family: {
    auto: {
      fontFamily: `Manrope, Pretendard, ${fallbacks}`,
    },
    pretendard: {
      fontFamily: `Pretendard, ${fallbacks}`,
    },
    manrope: {
      fontFamily: `Manrope, ${fallbacks}`,
    },
  },
  style: {
    B32: createFontStyleCss(32, 50, -0.04, BOLD),
    B28: createFontStyleCss(28, 44, -0.04, BOLD),
    B24: createFontStyleCss(24, 36, -0.03, BOLD),
    B20: createFontStyleCss(20, 30, -0.03, BOLD),
    B18: createFontStyleCss(18, 26, -0.03, BOLD),
    B16: createFontStyleCss(16, 26, -0.03, BOLD),
    B14: createFontStyleCss(14, 24, -0.03, BOLD),
    B12: createFontStyleCss(12, 18, -0.03, BOLD),
    R32: createFontStyleCss(32, 50, -0.04, REGULAR),
    R28: createFontStyleCss(28, 44, -0.04, REGULAR),
    R24: createFontStyleCss(24, 36, -0.03, REGULAR),
    R20: createFontStyleCss(20, 30, -0.03, REGULAR),
    R18: createFontStyleCss(18, 26, -0.03, REGULAR),
    R16: createFontStyleCss(16, 26, -0.03, REGULAR),
    R14: createFontStyleCss(14, 24, -0.03, REGULAR),
    R12: createFontStyleCss(12, 18, -0.03, REGULAR),
  },
};
