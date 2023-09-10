import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';
import { Slot } from '@radix-ui/react-slot';

import { Theme, colorMix, inlineFlex } from '~/styles/utils';
import { themeColorVars } from '~/styles/utils/themeColorVars';

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  theme?:
    | Theme.PRIMARY
    | Theme.SECONDARY
    | Theme.WHITE
    | Theme.BLACK
    | Theme.RECRUIT;
  size?: number;
  asChild?: boolean;
}

export const IconButton = (props: IconButtonProps) => {
  const {
    theme = Theme.WHITE,
    size = 'auto',
    asChild = false,
    ...restProps
  } = props;

  const Component = asChild ? Slot : 'button';
  if (Component === 'button') restProps.type = restProps.type || 'button';

  return (
    <Component
      style={{ width: size, height: size }}
      css={selfCss}
      {...restProps}
      data-theme={theme}
    />
  );
};

export default IconButton;

const selfCss = css(
  {
    padding: 0,
    backgroundColor: 'inherit',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 200ms, color 200ms',
    '& [data-icon]': {
      color: themeColorVars.mainDarkColor.var,
    },
    ':focus-visible, :hover': {
      backgroundColor: colorMix('30%', themeColorVars.mainColor.var),
    },
    ':active': {
      backgroundColor: colorMix('50%', themeColorVars.mainColor.var),
    },
    ':disabled': {
      pointerEvents: 'none',
      '& [data-icon]': {
        color: colorMix('50%', themeColorVars.mainColor.var),
      },
    },
  },
  inlineFlex('center', 'center')
);
