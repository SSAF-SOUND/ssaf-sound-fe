import type { CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox';

import { css } from '@emotion/react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';

import { Icon } from '~/components/Common';
import { colorMix, inlineFlex, palettes, themeColorVars } from '~/styles/utils';

export interface CheckboxProps extends Omit<RadixCheckboxProps, 'asChild'> {
  theme?: 'primary' | 'secondary';
  size?: number;
}

const defaultCheckboxSize = 24;

export const Checkbox = (props: CheckboxProps) => {
  const { theme = 'primary', size = defaultCheckboxSize, ...restProps } = props;

  return (
    <RadixCheckbox.Root css={selfCss} data-theme={theme} {...restProps}>
      <RadixCheckbox.Indicator asChild forceMount>
        <Icon css={checkIconCss} size={size} name="checkbox" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
};

const selfCss = css(
  {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: '50%',
    padding: 0,
    ':focus-visible': {
      outline: `3px solid ${themeColorVars.mainLightColor.var}`,
    },
  },
  inlineFlex('center', 'center')
);

const checkIconCss = css({
  '[data-state="unchecked"] &': {
    color: colorMix('50%', palettes.font.blueGrey),
  },
  '[data-state="checked"] &': {
    color: themeColorVars.mainDarkColor.var,
  },
});
