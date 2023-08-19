import { css } from '@emotion/react';

import { hideScrollBar } from './hideScrollBar';

const button = () => {
  return css({
    whiteSpace: 'nowrap',
    userSelect: 'none',
    webkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    overflow: 'hidden',

    margin: 0,
    padding: 0,

    outline: 0,
    border: '0 solid transparent',
    background: 'transparent',
    cursor: 'pointer',

    fontFamily: 'inherit',
    fontWeight: 'inherit',
    webkitFontSmoothing: 'antialiased',

    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus': {
      textDecoration: 'none',
      outline: 'none',
    },
  });
};

const textArea = () => {
  return css(
    {
      margin: 0,
      padding: 0,
      border: 'none',

      fontFamily: 'inherit',
      fontWeight: 'inherit',

      resize: 'none',
      background: 'transparent',

      '&:focus': {
        outline: 'none',
      },
    },
    hideScrollBar()
  );
};

export const resetStyle = {
  button,
  textArea,
};
