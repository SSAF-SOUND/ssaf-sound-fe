import type { CSSProperties } from 'react';

import { css } from '@emotion/react';

type FlexDirection = CSSProperties['flexDirection'];
type JustifyContent = CSSProperties['justifyContent'];
type AlignItems = CSSProperties['alignItems'];

export const flexCss = (
  alignItems: AlignItems = '',
  justifyContent: JustifyContent = '',
  flexDirection: FlexDirection = 'row'
) => {
  return css({
    display: 'flex',
    alignItems,
    justifyContent,
    flexDirection,
  });
};

export const inlineFlexCss = (
  alignItems: AlignItems = '',
  justifyContent: JustifyContent = '',
  flexDirection: FlexDirection = 'row'
) => {
  return css({
    display: 'inline-flex',
    alignItems,
    justifyContent,
    flexDirection,
  });
};
