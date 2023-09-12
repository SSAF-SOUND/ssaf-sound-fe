import type {
  ScrollAreaViewportProps,
  ScrollAreaScrollbarProps,
} from '@radix-ui/react-scroll-area';

import { css } from '@emotion/react';
import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';

import { colorMix, palettes } from '~/styles/utils';

const ScrollViewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>(
  (props, ref) => {
    return (
      <RadixScrollArea.Viewport ref={ref} css={scrollViewportCss} {...props} />
    );
  }
);
ScrollViewport.displayName = 'ScrollViewport';
const scrollViewportCss = css({
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

export const scrollbarSize = 8;

const Scrollbar = (props: ScrollAreaScrollbarProps) => {
  return <RadixScrollArea.Scrollbar css={scrollbarCss} {...props} />;
};

const scrollbarCss = css({
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  padding: 2,
  backgroundColor: colorMix('50%', palettes.grey4),
  transition: 'background-color 160ms ease-out',
  '&:hover': {
    backgroundColor: palettes.grey4,
  },
  '&[data-orientation="vertical"]': { width: scrollbarSize },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: scrollbarSize,
  },
});

const ScrollThumb = () => {
  return <RadixScrollArea.Thumb css={scrollThumbCss} />;
};

const scrollThumbCss = css({
  flex: 1,
  backgroundColor: colorMix('80%', palettes.grey1),
  borderRadius: scrollbarSize,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
});

export const Scroll = {
  Root: RadixScrollArea.Root,
  Viewport: ScrollViewport,
  Bar: Scrollbar,
  Thumb: ScrollThumb,
};
