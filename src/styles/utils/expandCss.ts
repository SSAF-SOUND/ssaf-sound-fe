import { css } from '@emotion/react';

import { cssArithmetic } from '~/styles/utils/arithmetic';
import { globalVars } from '~/styles/utils/globalVars';

const mainLayoutPaddingX = globalVars.mainLayoutPaddingX.var;

export const expandCss = (marginForExpand: string = mainLayoutPaddingX) => {
  const negativeMarginForExpand = cssArithmetic.multiply('-1', marginForExpand);

  return css({
    width: 'auto',
    marginLeft: negativeMarginForExpand,
    marginRight: negativeMarginForExpand,
  });
};

export const expandStyle = (marginForExpand: string = mainLayoutPaddingX) => {
  const negativeMarginForExpand = cssArithmetic.multiply(-1, marginForExpand);

  return {
    width: 'auto',
    marginLeft: negativeMarginForExpand,
    marginRight: negativeMarginForExpand,
  };
};
