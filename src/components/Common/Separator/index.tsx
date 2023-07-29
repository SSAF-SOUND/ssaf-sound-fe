import type { SeparatorProps as RadixSeparatorProps } from '@radix-ui/react-separator';
import type { CSSProperties } from 'react';

import { css } from '@emotion/react';
import * as RadixSeparator from '@radix-ui/react-separator';

import { palettes } from '~/styles/utils';

interface SeparatorProps {
  decorative?: boolean;
  style?: CSSProperties;
  className?: string;
  orientation?: RadixSeparatorProps['orientation'];
  height?: number | string;
  width?: number | string;
}

export const Separator = (props: SeparatorProps) => {
  const { decorative = true, height, width, style, ...restProps } = props;
  const styleWithHeight = { ...style, height, width };

  return (
    <RadixSeparator.Root
      decorative={decorative}
      css={selfCss}
      style={styleWithHeight}
      {...restProps}
    />
  );
};

const selfCss = css({
  backgroundColor: palettes.white,
  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 },
});
