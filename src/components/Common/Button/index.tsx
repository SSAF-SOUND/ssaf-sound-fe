import type { SerializedStyles } from '@emotion/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { css } from '@emotion/react';
import React from 'react';

import { toCssVar } from '~/styles/utils/toCssVar';

type ButtonVariant = 'text' | 'filled' | 'outlined';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonColor = 'primary' | 'secondary';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
}

const Button = ({
  variant = 'text',
  size = 'md',
  color = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      css={[
        baseCss,
        heightsCss[size],
        variantsCss[variant],
        colorVarCss[color],
      ]}
      {...props}
    />
  );
};

const baseCss = css({
  cursor: 'pointer',
  border: '1px solid transparent',
  borderRadius: 10,
  padding: '0 10px',
  margin: 0,
  transition: 'color 200ms, background-color 200ms',
  '&:disabled': {
    cursor: 'initial',
    pointerEvents: 'none',
    opacity: 0.5,
  },
});

const heightsCss: Record<ButtonSize, SerializedStyles> = {
  sm: css({ height: 32 }),
  md: css({ height: 44 }),
  lg: css({ height: 56 }),
};

const cssVar = {
  baseColor: toCssVar('baseColor'),
  hoverColor: toCssVar('hoverColor'),
  activeColor: toCssVar('activeColor'),
};

const colorVarCss = {
  primary: css({
    [cssVar.baseColor.varName]: '#0066ff',
    [cssVar.hoverColor.varName]: '#054cb4',
    [cssVar.activeColor.varName]: '#347ff5',
  }),
  secondary: css({
    [cssVar.baseColor.varName]: '#18c03d',
    [cssVar.hoverColor.varName]: '#0c9b2b',
    [cssVar.activeColor.varName]: '#29e352',
  }),
};

const variantsCss: Record<ButtonVariant, SerializedStyles> = {
  text: css({
    backgroundColor: 'transparent',
    color: cssVar.baseColor.var,
    '&:hover': {
      color: cssVar.hoverColor.var,
    },
    '&:active': {
      color: cssVar.activeColor.var,
    },
  }),
  filled: css({
    backgroundColor: cssVar.baseColor.var,
    color: '#fff',
    '&:hover': {
      backgroundColor: cssVar.hoverColor.var,
    },
    '&:active': {
      backgroundColor: cssVar.activeColor.var,
    },
  }),
  outlined: css({
    backgroundColor: 'transparent',
    borderColor: cssVar.baseColor.var,
    color: cssVar.baseColor.var,
    '&:hover': {
      borderColor: cssVar.hoverColor.var,
      color: cssVar.hoverColor.var,
    },
    '&:active': {
      borderColor: cssVar.activeColor.var,
      color: cssVar.activeColor.var,
    },
  }),
};

export default Button;
