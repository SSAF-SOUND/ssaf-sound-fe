import { css } from '@emotion/react';

import { pageMaxWidth, pageMinWidth } from './constants';

export const fixedFullWidth = css({
  position: 'fixed',
  width: '100%',
  minWidth: pageMinWidth,
  maxWidth: pageMaxWidth,
});
