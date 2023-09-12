import { css } from '@emotion/react';

import { pageMinHeight } from '~/styles/utils/constants';

export const pageCss = {
  minHeight: css({ minHeight: `max(${pageMinHeight}px, 100vh)` }),
};
