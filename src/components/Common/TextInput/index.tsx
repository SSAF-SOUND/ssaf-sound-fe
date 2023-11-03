import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';
import { forwardRef } from 'react';

import { colorMix, fontCss, palettes } from '~/styles/utils';

type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputOwnProps {
  size?: TextInputSize;
  rounded?: boolean;
}

export type TextInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  keyof TextInputOwnProps
> &
  TextInputOwnProps;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { size = 'sm', rounded = false, ...restProps } = props;
    return (
      <input
        type="text"
        ref={ref}
        css={[selfCss, sizeCss[size], rounded && roundedCss]}
        {...restProps}
      />
    );
  }
);

TextInput.displayName = 'Input';

const selfCss = css(
  {
    padding: '0 16px',
    borderRadius: 8,
    border: `1px solid ${palettes.background.default}`,
    '::placeholder': {
      color: palettes.font.blueGrey,
    },
    ':disabled': {
      backgroundColor: colorMix('50%', palettes.white),
    },
  },
  fontCss.family.auto
);

const sizeCss = {
  sm: css({ height: 36 }, fontCss.style.R14),
  md: css({ height: 44 }, fontCss.style.R16),
  lg: css({ height: 52 }, fontCss.style.R18),
};

const roundedCss = css({
  borderRadius: 20,
});
