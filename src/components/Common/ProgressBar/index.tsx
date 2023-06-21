import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import React from 'react';

import { flex, palettes } from '~/styles/utils';

type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  min?: number;
  now?: number;
  max?: number;
  label?: string;
  foregroundColor?: string;
  backgroundColor?: string;
  size?: ProgressBarSize;
}

const calculateForegroundWidth = (min: number, now: number, max: number) => {
  const width = ((now - min) / (max - min)) * 100;
  if (width <= 0) return '0%';
  return `${width}%`;
};

const defaultForeground = palettes.primary.default;
const defaultBackground = palettes.white;

const ProgressBar = (props: ProgressBarProps) => {
  const {
    label,
    min = 0,
    now = min,
    max = 100,
    foregroundColor = defaultForeground,
    backgroundColor = defaultBackground,
    size = 'sm',
  } = props;

  const width = calculateForegroundWidth(min, now, max);

  return (
    <div style={{ backgroundColor }} css={[selfCss, sizeCss[size]]}>
      <div style={{ width, backgroundColor: foregroundColor }} css={barCss}>
        {label}
      </div>
    </div>
  );
};

export default ProgressBar;

const sizeCss = {
  sm: css({
    height: 6,
  }),
  md: css({
    height: 10,
  }),
  lg: css({
    height: 16,
  }),
};

const selfCss = css(
  {
    overflow: 'hidden',
    width: '100%',
    borderRadius: 10,
  },
  flex('center', '', 'row')
);

const barCss = css(
  {
    height: '100%',
    transition: 'width 200ms',
    font: 'inherit',
  },
  flex('center', 'center', 'row')
);
