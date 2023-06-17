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
  | 'success'
  | 'warning'
  | 'error';

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
    color: palettes.black,
    cursor: 'pointer',
    border: '2px solid transparent',
    borderRadius: 10,
    padding: '0 10px',
    margin: 0,
    transition: 'color 200ms, background-color 200ms, border-color 200ms',
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
  mainColor: toCssVar('mainColor'),
  mainLightColor: toCssVar('mainLightColor'),
  mainDarkColor: toCssVar('mainDarkColor'),
};

const createButtonColorCss = (
  main: string,
  mainLight: string,
  mainDark: string
) => {
  return css({
    [cssVar.mainColor.varName]: main,
    [cssVar.mainLightColor.varName]: mainLight,
    [cssVar.mainDarkColor.varName]: mainDark,
  });
};

const colorVarCss = {
  primary: createButtonColorCss(
    palettes.primary.default,
    palettes.primary.light,
    palettes.primary.dark
  ),
  secondary: createButtonColorCss(
    palettes.secondary.default,
    palettes.secondary.light,
    palettes.secondary.dark
  ),
  grey: createButtonColorCss(palettes.grey3, palettes.grey4, palettes.grey2),
  warning: createButtonColorCss(
    palettes.warning.default,
    palettes.warning.light,
    palettes.warning.dark
  ),
  error: createButtonColorCss(
    palettes.error.default,
    palettes.error.light,
    palettes.error.dark
  ),
  success: createButtonColorCss(
    palettes.success.default,
    palettes.success.light,
    palettes.success.dark
  ),
};

const variantsCss: Record<ButtonVariant, SerializedStyles> = {
  text: css({
    backgroundColor: 'transparent',
    color: cssVar.mainColor.var,
    '&:hover': { color: cssVar.mainLightColor.var },
    '&:focus': {
      backgroundColor: cssVar.mainDarkColor.var,
      color: palettes.white,
    },
    '&:active': {
      backgroundColor: cssVar.mainColor.var,
      color: palettes.white,
    },
  }),
  filled: css({
    backgroundColor: cssVar.mainColor.var,
    '&:hover': { borderColor: palettes.white },
    '&:active': {
      backgroundColor: cssVar.mainDarkColor.var,
      color: palettes.white,
    },
    '&:focus': { outline: `3px solid ${cssVar.mainLightColor.var}` },
  }),
  outlined: css({
    backgroundColor: palettes.white,
    color: palettes.black,
    '&:hover': { borderColor: cssVar.mainColor.var },
    '&:active': {
      backgroundColor: cssVar.mainDarkColor.var,
      borderColor: 'transparent',
      color: palettes.white,
    },
    '&:focus': { outline: `3px solid ${cssVar.mainColor.var}` },
  }),
};

export default Button;
