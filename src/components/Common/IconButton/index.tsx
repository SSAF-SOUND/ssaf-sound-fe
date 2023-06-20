import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';

import { colorMix, inlineFlex, palettes } from '~/styles/utils';
import { themeColorVars } from '~/styles/utils/themeColorVars';

type IconTheme = 'primary' | 'secondary' | 'white' | 'black';

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  theme?: IconTheme;
  size?: number;
}

const IconButton = (props: IconButtonProps) => {
  const { theme = 'white', size = 'auto', ...restProps } = props;

  return (
    <button
      type="button"
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
