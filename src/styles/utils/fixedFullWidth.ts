import { css } from '@emotion/react';

import { pageMaxWidth, pageMinWidth } from './constants';

export const fixedFullWidth = css({
  width: '100%',
  minWidth: pageMinWidth,
  maxWidth: pageMaxWidth,
});
