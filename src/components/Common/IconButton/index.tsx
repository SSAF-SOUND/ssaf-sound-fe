import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';

import { colorMix, inlineFlex, palettes } from '~/styles/utils';
import { themeColorVars } from '~/styles/utils/themeColorVars';

type IconTheme = 'primary' | 'secondary' | 'white';

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  theme?: IconTheme;
}

const IconButton = (props: IconButtonProps) => {
  const { theme = 'white', ...restProps } = props;

  return (
    <button type="button" css={selfCss} {...restProps} data-theme={theme} />
  );
};

export default IconButton;

const selfCss = css(
  {
    backgroundColor: 'inherit',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 200ms',
    '& [data-icon]': {
      color: themeColorVars.mainColor.var,
    },
    ':focus-visible, :hover': {
      backgroundColor: colorMix('20%', themeColorVars.mainDarkColor.var),
    },
    ':active': {
      backgroundColor: colorMix('30%', themeColorVars.mainLightColor.var),
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
