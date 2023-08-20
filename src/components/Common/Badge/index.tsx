import type { ToggleProps } from '@radix-ui/react-toggle';

import { css } from '@emotion/react';
import * as Toggle from '@radix-ui/react-toggle';

import { fontCss, inlineFlex, palettes } from '~/styles/utils';

export interface BadgeProps extends ToggleProps {
  theme?: 'primary' | 'secondary';
}
export const Badge = (props: BadgeProps) => {
  const { children, theme = 'primary', ...restProps } = props;

  return (
    <Toggle.Root css={[selfCss, textCss]} {...restProps}>
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
    borderColor: palettes.primary.dark,
    color: palettes.primary.dark,
  },
  '&:focus-visible': {
    outline: `3px solid ${palettes.primary.light}`,
  },
  '&[data-state="on"]': {
    background: palettes.primary.darkest,
    borderColor: palettes.primary.darkest,
    color: palettes.white,
  },
});

const textCss = css(fontCss.style.R14, fontCss.family.auto);
