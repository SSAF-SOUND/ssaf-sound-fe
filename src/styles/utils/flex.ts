import type { SerializedStyles } from '@emotion/react';
import type { CSSProperties } from 'react';

import { css } from '@emotion/react';

type FlexDirection = CSSProperties['flexDirection'];
type JustifyContent = CSSProperties['justifyContent'];
type AlignItems = CSSProperties['alignItems'];
interface FlexOptions {
  items?: AlignItems;
  justify?: JustifyContent;
  dir?: FlexDirection;
}

const flexCore = (
  alignItems: AlignItems | FlexOptions = '',
  justifyContent: JustifyContent = '',
  flexDirection: FlexDirection = 'row'
) => {
  const base = { display: 'flex' };

  if (typeof alignItems === 'string') {
    return css(
      {
        alignItems,
        justifyContent,
        flexDirection,
      },
      base
    );
  }

  const flexOptions = alignItems;

  return css(
    {
      alignItems: flexOptions?.items,
      justifyContent: flexOptions?.justify,
      flexDirection: flexOptions?.dir,
    },
    base
  );
};

export function flex(
  alignItems?: AlignItems,
  justifyContent?: JustifyContent,
  flexDirection?: FlexDirection
): SerializedStyles;
export function flex(options?: FlexOptions): SerializedStyles;
export function flex(
  alignItems: AlignItems | FlexOptions = '',
  justifyContent: JustifyContent = '',
  flexDirection: FlexDirection = 'row'
) {
  const base = { display: 'flex' };
  return css(flexCore(alignItems, justifyContent, flexDirection), base);
}

export function inlineFlex(
  alignItems?: AlignItems,
  justifyContent?: JustifyContent,
  flexDirection?: FlexDirection
): SerializedStyles;
export function inlineFlex(options?: FlexOptions): SerializedStyles;
export function inlineFlex(
  alignItems: AlignItems | FlexOptions = '',
  justifyContent: JustifyContent = '',
  flexDirection: FlexDirection = 'row'
) {
  const base = { display: 'inline-flex' };
  return css(flexCore(alignItems, justifyContent, flexDirection), base);
}
