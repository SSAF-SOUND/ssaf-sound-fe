import { css } from '@emotion/react';

import { hideScrollBar } from './hideScrollBar';

const button = () => {
  return css({
    whiteSpace: 'nowrap',
    userSelect: 'none',
    overflow: 'hidden',

    margin: 0,
    padding: 0,
    outline: 0,
    border: 0,
    background: 'transparent',
    cursor: 'pointer',

    fontFamily: 'inherit',
    fontWeight: 'inherit',
  });
};

export const resetStyle = {
  button,
};
