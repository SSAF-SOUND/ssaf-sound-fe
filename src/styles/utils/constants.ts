import { css } from '@emotion/react';

export const pageMinHeight = 600;

export const pageMinWidth = 350;
export const pageMaxWidth = 576;

//

export const topBarHeight = 50;
export const titleBarHeight = 50;
export const gnbHeight = 64;

export const navigationGroupPaddingCss = {
  active: css({
    padding: `${topBarHeight}px 0 ${gnbHeight}px 0`,
  }),
  inactive: css({
    padding: 0,
  }),
};

export const zIndex = {
  // fixed 요소 간 zIndex 순서
  fixed: {
    normal: 10,
    modal: 50,
    selectBox: 100,
    max: 9999,
  },
};
