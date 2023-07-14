import { css } from '@emotion/react';

export const hideScrollBar = () => {
  return css({
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    'scrollbar-width': 'none',
    '-ms-overflow-style': 'none',
  });
};
