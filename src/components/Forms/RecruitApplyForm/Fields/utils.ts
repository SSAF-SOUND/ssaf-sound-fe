import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

export const disabledCss = css({
  background: palettes.background.grey,
  color: palettes.white,

  '> p': {
    color: palettes.white,
  },
});
