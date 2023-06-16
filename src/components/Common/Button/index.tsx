import type { SerializedStyles } from '@emotion/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { css } from '@emotion/react';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';

import { flex, fontCss, palettes } from '~/styles/utils';
import { toCssVar } from '~/styles/utils/toCssVar';

type ButtonVariant = 'text' | 'filled' | 'outlined';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'grey'
  | 'warning'
  | 'error'
  | 'white';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  asChild?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    variant = 'filled',
    size = 'md',
    color = 'primary',
    asChild = false,
    ...restProps
  } = props;

  const Component = asChild ? Slot : 'button';
  if (Component === 'button') restProps.type = 'button';

  return (
    <Component
      css={[
        baseCss,
        heightsCss[size],
        variantsCss[variant],
        colorVarCss[color],
      ]}
      {...restProps}
    />
  );
};

const baseCss = css(
  {
    width: '100%',
    color: palettes.black,
    cursor: 'pointer',
    border: '2px solid transparent',
    borderRadius: 10,
    padding: '0 10px',
    margin: 0,
    transition: 'color 200ms, background-color 200ms',
    '&:disabled': {
      cursor: 'initial',
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },
  fontCss.style.B16,
  fontCss.family.auto,
  flex('center', 'center', 'row')
);

const heightsCss: Record<ButtonSize, SerializedStyles> = {
  sm: css({ height: 32 }),
  md: css({ height: 44 }),
  lg: css({ height: 56 }),
};

const cssVar = {
  baseColor: toCssVar('baseColor'),
  hoverColor: toCssVar('hoverColor'),
  activeColor: toCssVar('activeColor'),
  focusColor: toCssVar('activeColor'),
};

const createButtonColorCss = (
  base: string,
  hover: string,
  active: string,
  focus: string
) => {
  return css({
    [cssVar.baseColor.varName]: base,
    [cssVar.hoverColor.varName]: hover,
    [cssVar.activeColor.varName]: active,
    [cssVar.focusColor.varName]: focus,
  });
};

const colorVarCss = {
  primary: createButtonColorCss(
    palettes.primary.default,
    palettes.primary.dark,
    palettes.primary.default,
    palettes.primary.light
  ),
  secondary: createButtonColorCss(
    palettes.secondary.default,
    palettes.secondary.dark,
    palettes.secondary.default,
    palettes.secondary.light
  ),
  grey: createButtonColorCss(
    palettes.grey3,
    palettes.grey2,
    palettes.grey3,
    palettes.grey4
  ),
  warning: createButtonColorCss(
    palettes.warning.default,
    palettes.warning.dark,
    palettes.warning.default,
    palettes.warning.light
  ),
  error: createButtonColorCss(
    palettes.error.default,
    palettes.error.dark,
    palettes.error.default,
    palettes.error.light
  ),
  white: createButtonColorCss(
    palettes.grey5,
    palettes.grey3,
    palettes.grey5,
    palettes.white
  ),
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
    '&:focus': {
      outline: `2px solid ${cssVar.focusColor.var}`,
    },
  }),
  filled: css({
    backgroundColor: cssVar.baseColor.var,
    '&:hover': {
      backgroundColor: cssVar.hoverColor.var,
    },
    '&:active': {
      backgroundColor: cssVar.activeColor.var,
    },
    '&:focus': {
      outline: `3px solid ${cssVar.focusColor.var}`,
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
    '&:focus': {
      outline: `2px solid ${cssVar.focusColor.var}`,
    },
  }),
};

export default Button;
