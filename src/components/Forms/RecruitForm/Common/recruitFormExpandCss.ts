import { css } from '@emotion/react';

import { toCssVar } from '~/styles/utils';

export const recruitFormMarginForExpandCssVar = toCssVar(
  'recruit-form-margin-for-expand'
);
export const recruitFormExpandCss = css({
  width: 'auto',
  margin: `0 calc(-1 * ${recruitFormMarginForExpandCssVar.var})`,
});
