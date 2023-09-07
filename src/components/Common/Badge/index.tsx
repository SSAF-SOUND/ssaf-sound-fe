import type { ToggleProps } from '@radix-ui/react-toggle';

import { css } from '@emotion/react';
import * as Toggle from '@radix-ui/react-toggle';

import { fontCss, inlineFlex, palettes, themeColorVars } from '~/styles/utils';

export interface BadgeProps extends ToggleProps {
  theme?: 'primary' | 'secondary';
}
export const Badge = (props: BadgeProps) => {
  const { children, theme = 'primary', ...restProps } = props;

  return (
    <Toggle.Root css={[selfCss, textCss]} data-theme={theme} {...restProps}>
      {children}
    </Toggle.Root>
  );
};

const selfCss = css(inlineFlex('center', 'center', 'row', 8), {
  minWidth: 40,
  padding: '4px 8px',
  borderRadius: 16,
  cursor: 'pointer',
  border: `1px solid ${palettes.white}`,
  color: palettes.white,
  transition:
    'color 200ms, background-color 200ms, border-color 200ms, outline 200ms',
  backgroundColor: 'transparent',
  '&:hover': {
    borderColor: themeColorVars.mainColor.var,
    color: themeColorVars.mainColor.var,
  },
  '&:focus-visible': {
    outline: `3px solid ${themeColorVars.mainColor.var}`,
  },
  '&[data-state="on"]': {
    background: themeColorVars.mainDarkestColor.var,
    borderColor: themeColorVars.mainDarkestColor.var,
    color: palettes.white,
  },
});

const textCss = css(fontCss.style.R14, fontCss.family.auto);
