import type { SerializedStyles } from '@emotion/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { css } from '@emotion/react';
import { Slot } from '@radix-ui/react-slot';
import React, { forwardRef } from 'react';

import {
  colorMix,
  flex,
  fontCss,
  inlineFlex,
  palettes,
  themeColorVars,
} from '~/styles/utils';

import ButtonLoader from './ButtonLoader';

type ButtonVariant = 'text' | 'filled' | 'inverse' | 'literal' | 'outlined';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonTheme =
  | 'primary'
  | 'secondary'
  | 'grey'
  | 'success'
  | 'warning'
  | 'error'
  | 'recruit';

type CustomColor = Pick<
  Record<keyof typeof themeColorVars, string>,
  'mainColor' | 'mainDarkColor' | 'mainLightColor'
>;

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: ButtonTheme;
  asChild?: boolean;
  loading?: boolean;
  customColor?: CustomColor;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'filled',
    size = 'md',
    theme = 'primary',
    asChild = false,
    loading = false,
    disabled,
    children,
    style,
    customColor,
    ...restProps
  } = props;

  const Component = asChild ? Slot : 'button';
  if (Component === 'button') restProps.type = restProps.type || 'button';

  const isDisabled = disabled || loading;

  const styleWithCustomColor = customColor
    ? {
        ...style,
        [themeColorVars.mainColor.varName]: customColor.mainColor,
        [themeColorVars.mainLightColor.varName]: customColor.mainLightColor,
        [themeColorVars.mainDarkColor.varName]: customColor.mainDarkColor,
      }
    : style;

  return (
    <Component
      style={styleWithCustomColor}
      data-theme={theme}
      ref={ref}
      disabled={isDisabled}
      css={[baseCss, heightsCss[size], variantsCss[variant]]}
      {...restProps}
    >
      {loading ? (
        <div css={inlineFlex('center', 'center')}>
          <ButtonLoader color={loaderColor[variant]} />
        </div>
      ) : (
        children
      )}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;

const baseCss = css(
  {
    color: palettes.black,
    cursor: 'pointer',
    border: '2px solid transparent',
    borderRadius: 10,
    padding: '0 10px',
    margin: 0,
    transition:
      'color 200ms, background-color 200ms, border-color 200ms, outline 200ms',
    '&:disabled, &[disabled]': {
      pointerEvents: 'none',
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

const variantsCss: Record<ButtonVariant, SerializedStyles> = {
  text: css({
    backgroundColor: 'transparent',
    color: themeColorVars.mainColor.var,
    '&:hover': { color: themeColorVars.mainLightColor.var },
    '&:focus-visible': {
      backgroundColor: themeColorVars.mainDarkColor.var,
      color: palettes.white,
    },
    '&:active': {
      backgroundColor: themeColorVars.mainColor.var,
      color: palettes.white,
    },
    '&:disabled, &[disabled]': {
      color: colorMix('50%', themeColorVars.mainColor.var),
    },
  }),
  filled: css({
    backgroundColor: themeColorVars.mainColor.var,
    '&:hover': { borderColor: palettes.white },
    '&:active': {
      borderColor: 'transparent',
      backgroundColor: themeColorVars.mainDarkColor.var,
      color: palettes.white,
    },
    '&:focus-visible': {
      outline: `3px solid ${themeColorVars.mainLightColor.var}`,
    },
    '&:disabled, &[disabled]': {
      backgroundColor: colorMix('50%', themeColorVars.mainColor.var),
    },
  }),
  inverse: css({
    backgroundColor: palettes.white,
    color: palettes.black,
    '&:hover': { borderColor: themeColorVars.mainColor.var },
    '&:active': {
      backgroundColor: themeColorVars.mainDarkColor.var,
      borderColor: 'transparent',
      color: palettes.white,
    },
    '&:focus-visible': { outline: `3px solid ${themeColorVars.mainColor.var}` },
    '&:disabled, &[disabled]': {
      backgroundColor: colorMix('50%', palettes.white),
    },
  }),
  literal: css({
    backgroundColor: 'transparent',
    color: palettes.white,
    '&:hover': {
      color: themeColorVars.mainColor.var,
    },
    '&:focus-visible': {
      color: themeColorVars.mainLightColor.var,
    },
    '&:active': {
      color: themeColorVars.mainDarkColor.var,
    },
    '&:disabled, &[disabled]': {
      color: palettes.font.blueGrey,
    },
  }),
  outlined: css({
    border: `1px solid ${palettes.white}`,
    backgroundColor: 'transparent',
    color: palettes.white,
    '&:hover': {
      color: themeColorVars.mainColor.var,
      borderColor: themeColorVars.mainColor.var,
    },
    '&:focus-visible': {
      outline: `3px solid ${themeColorVars.mainColor.var}`,
    },
    '&:active': {
      backgroundColor: themeColorVars.mainDarkColor.var,
      color: palettes.white,
    },
    '&:disabled, &[disabled]': {
      color: colorMix('50%', palettes.white),
      borderColor: colorMix('50%', palettes.white),
    },
  }),
};

const loaderColor: Record<ButtonVariant, string> = {
  text: colorMix('50%', themeColorVars.mainColor.var),
  filled: '',
  inverse: '',
  literal: palettes.font.blueGrey,
  outlined: colorMix('50%', palettes.white),
};
