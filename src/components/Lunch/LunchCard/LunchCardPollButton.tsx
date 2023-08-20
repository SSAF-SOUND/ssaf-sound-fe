import { css } from '@emotion/react';
import { Toggle } from '@radix-ui/react-toggle';
import React from 'react';

import { Icon } from '~/components/Common';
import { colorMix, flex, fontCss, palettes } from '~/styles/utils';

export interface LunchCardPollButtonProps {
  pollCount: number;
  polled: boolean;
  onPolledChange: (polled: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const LunchCardPollButton = (props: LunchCardPollButtonProps) => {
  const {
    pollCount,
    polled = false,
    onPolledChange,
    className,
    disabled,
  } = props;
  return (
    <Toggle
      css={likeButtonSelfCss}
      className={className}
      pressed={polled}
      onPressedChange={onPolledChange}
      disabled={disabled}
    >
      <div
        css={likeButtonContentCss}
        className={lunchLikeButtonContentClassname}
      >
        <Icon name="like" size={36} />
        <strong>{pollCount}</strong>
      </div>
    </Toggle>
  );
};

const lunchLikeButtonContentClassname = 'lunch-like-button-content';

const likeButtonSelfCss = css(
  {
    flexShrink: 0,
    cursor: 'pointer',
    backgroundColor: palettes.white,
    userSelect: 'none',
    transition: 'transform 200ms',
    [`&:hover .${lunchLikeButtonContentClassname}, &:focus-visible .${lunchLikeButtonContentClassname}`]:
      {
        transform: `translate3d(0, 3px, 0)`,
      },
    [`&:active .${lunchLikeButtonContentClassname}`]: {
      transform: `translate3d(0, 0, 0)`,
    },
    '&[data-state="on"]': {
      color: palettes.white,
      backgroundColor: palettes.primary.dark,
    },
    '&:disabled': {
      color: 'inherit',
      opacity: 0.7,
      pointerEvents: 'none',
    },
  },
  fontCss.style.B20
);

const likeButtonContentCss = css(
  {
    transition: 'transform 200ms',
  },
  flex('center', 'center', 'column', 8)
);
