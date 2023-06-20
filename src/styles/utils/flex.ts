import type { SerializedStyles } from '@emotion/react';
import type { CSSProperties } from 'react';

import { css } from '@emotion/react';

type FlexDirection = CSSProperties['flexDirection'];
type JustifyContent = CSSProperties['justifyContent'];
type AlignItems = CSSProperties['alignItems'];
type Gap = CSSProperties['gap'];
type FlexWrap = CSSProperties['flexWrap'];

interface FlexOptions {
  items?: AlignItems;
  justify?: JustifyContent;
  dir?: FlexDirection;
  gap?: Gap;
  wrap?: FlexWrap;
}

const flexCore = (
  alignItems: AlignItems | FlexOptions = '',
  justifyContent: JustifyContent = '',
  flexDirection: FlexDirection = 'row',
  gap: Gap = '',
  flexWrap: FlexWrap = 'nowrap'
) => {
  if (typeof alignItems === 'string') {
    return css({
      alignItems,
      justifyContent,
      flexDirection,
      gap,
      flexWrap,
    });
  }

  const flexOptions = alignItems;

  return css({
    alignItems: flexOptions.items,
    justifyContent: flexOptions.justify,
    flexDirection: flexOptions.dir,
    gap: flexOptions.gap,
    flexWrap: flexOptions.wrap,
  });
};

export function flex(
  alignItems?: AlignItems,
  justifyContent?: JustifyContent,
  flexDirection?: FlexDirection,
  gap?: Gap,
  flexWrap?: FlexWrap
): SerializedStyles;
export function flex(options?: FlexOptions): SerializedStyles;
export function flex(
  alignItems: AlignItems | FlexOptions = '',
  justifyContent: JustifyContent = '',
  flexDirection: FlexDirection = 'column',
  gap: Gap = '',
  flexWrap: FlexWrap = 'nowrap'
) {
  const base = { display: 'flex' };
  return css(
    flexCore(alignItems, justifyContent, flexDirection, gap, flexWrap),
    base
  );
}

export function inlineFlex(
  alignItems?: AlignItems,
  justifyContent?: JustifyContent,
  flexDirection?: FlexDirection,
  gap?: Gap,
  flexWrap?: FlexWrap
): SerializedStyles;
export function inlineFlex(options?: FlexOptions): SerializedStyles;
export function inlineFlex(
  alignItems: AlignItems | FlexOptions = '',
  justifyContent: JustifyContent = '',
  flexDirection: FlexDirection = 'column',
  gap: Gap = '',
  flexWrap: FlexWrap = 'nowrap'
) {
  const base = { display: 'inline-flex' };
  return css(
    flexCore(alignItems, justifyContent, flexDirection, gap, flexWrap),
    base
  );
}
