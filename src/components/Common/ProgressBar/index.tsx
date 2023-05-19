import type { ReactNode } from 'react';

import { css } from '@emotion/react';
import React from 'react';

interface ProgressBarProps {
  children?: ReactNode;
  min?: number;
  now?: number;
  max?: number;
  label?: string;
  foregroundColor?: string;
  backgroundColor?: string;
}

const calForegroundWidth = (min: number, now: number, max: number) => {
  const width = ((now - min) / (max - min)) * 100;
  if (width <= 0) return '0%';
  return `${width}%`;
};

const defaultForeground = '#0066ff';
const defaultBackground = '#e0e0e0';

const ProgressBar = ({
  label = '',
  min = 0,
  now = min,
  max = 100,
  foregroundColor = defaultForeground,
  backgroundColor = defaultBackground,
  ...props
}: ProgressBarProps) => {
  const width = calForegroundWidth(min, now, max);
  return (
    <div style={{ backgroundColor: backgroundColor }} css={baseCss} {...props}>
      <div style={{ width, backgroundColor: foregroundColor }} css={barCss}>
        {label}
      </div>
    </div>
  );
};

const baseCss = css({
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  width: '100%',
  height: 16,
  borderRadius: 10,
  backgroundColor: '#eee',
});

const barCss = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  transition: 'width 200ms',
  font: 'inherit',
});

export default ProgressBar;
