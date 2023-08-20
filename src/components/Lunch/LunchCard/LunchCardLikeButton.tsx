import { css } from '@emotion/react';
import { Toggle } from '@radix-ui/react-toggle';
import React from 'react';

import { Icon } from '~/components/Common';
import { flex, fontCss } from '~/styles/utils';

export interface LunchCardLikeButtonProps {
  pollCount: number;
  polled: boolean;
  onPolledChange: (polled: boolean) => void;
  className?: string;
}

export const LunchCardLikeButton = (props: LunchCardLikeButtonProps) => {
  const { pollCount, polled = false, onPolledChange, className } = props;
  return (
    <Toggle
      css={likeButtonSelfCss}
      className={className}
      pressed={polled}
      onPressedChange={onPolledChange}
    >
      <Icon name="like" size={36} />
      <strong>{pollCount}</strong>
    </Toggle>
  );
};

const likeButtonSelfCss = css(
  {
    height: '100%',
    flexShrink: 0,
    cursor: 'pointer',
  },
  flex('center', 'center', 'column', 8),
  fontCss.style.B20
);
