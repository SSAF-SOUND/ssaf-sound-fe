import type { CSSProperties } from 'react';

import { css } from '@emotion/react';
import React from 'react';

import { flex, fontCss, palettes } from '~/styles/utils';

interface LunchCardOrderProps {
  order: number;
  className?: string;
  style?: CSSProperties;
}

export const LunchCardOrder = (props: LunchCardOrderProps) => {
  const { order, ...restProps } = props;
  return (
    <div css={selfCss} {...restProps}>
      <div css={backgroundCss} />
      <strong css={textCss}>{order}</strong>
    </div>
  );
};

const zIndex = {
  background: 1,
  text: 2,
};

const orderLayerSize = 100;
const getBackgroundTranslateXOffset = (size: number) => size / Math.sqrt(2);
const backgroundTranslateXOffset =
  getBackgroundTranslateXOffset(orderLayerSize);
const orderTextTop = 4;
const orderTextLeft = 16;

const selfCss = css({
  position: 'absolute',
  left: 0,
  top: 0,
});

const backgroundCss = css(
  {
    position: 'relative',
    width: orderLayerSize,
    height: orderLayerSize,
    backgroundColor: palettes.secondary.dark,
    color: palettes.white,
    transform: `rotate(45deg) translate3d(-${backgroundTranslateXOffset}px, -0, 0)`,
    zIndex: zIndex.background,
  },
  flex('center', 'center'),
  fontCss.style.B24
);

const textCss = css(
  {
    position: 'absolute',
    top: orderTextTop,
    left: orderTextLeft,
    color: palettes.white,
    zIndex: zIndex.text,
  },
  fontCss.style.B24
);
