import type { CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox';

import { css } from '@emotion/react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef } from 'react';

import { Icon } from '~/components/Common/Icon';
import { colorMix, inlineFlex, palettes, themeColorVars } from '~/styles/utils';

export interface CheckboxProps extends Omit<RadixCheckboxProps, 'asChild'> {
  theme?: 'primary' | 'secondary';
  size?: number;
  label?: string;
}

const defaultCheckboxSize = 24;

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props: CheckboxProps, ref) => {
    const {
      theme = 'primary',
      size = defaultCheckboxSize,
      label,
      ...restProps
    } = props;

    return (
      <RadixCheckbox.Root
        ref={ref}
        css={selfCss}
        data-theme={theme}
        {...restProps}
      >
        <RadixCheckbox.Indicator asChild forceMount>
          <Icon css={checkIconCss} size={size} name="checkbox" label={label} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    );
  }
);
Checkbox.displayName = 'Checkbox';

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
