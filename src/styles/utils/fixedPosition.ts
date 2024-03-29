import { css } from '@emotion/react';

import { pageMaxWidth, pageMinWidth } from '~/styles/utils/constants';
import { globalVars } from '~/styles/utils/globalVars';
import { position } from '~/styles/utils/position';

const commonCss = css({
  marginLeft: `calc(-1 * ${globalVars.removedBodyScrollBarSize.var} / 2)`,
});

export const onLowerPageMinWidthCss = css({
  [`@media screen and (max-width: ${pageMinWidth}px)`]: {
    left: 0,
    transform: 'none',
  },
});

// 상단 중앙에, maxWidth 인 채로 고정
export const fixTopCenter = css(
  {
    minWidth: pageMinWidth,
    maxWidth: pageMaxWidth,
    width: '100%',
  },
  position.xy('center', 'start', 'fixed'),
  onLowerPageMinWidthCss,
  commonCss
);

// 하단 중앙에 maxWidth 인 채로 고정
export const fixBottomCenter = css(
  {
    width: '100%',
    minWidth: pageMinWidth,
    maxWidth: pageMaxWidth,
    zIndex: 1,
  },
  position.xy('center', 'end', 'fixed'),
  onLowerPageMinWidthCss,
  commonCss
);
