import type { LunchMenuSummary } from '~/services/lunch';

import { css } from '@emotion/react';
import React from 'react';

import { lunchCardMinHeight } from '~/components/Lunch/LunchCard/utils';
import { flex, palettes } from '~/styles/utils';

import { LunchCardMenuDescription } from './LunchCardMenuDescription';
import { LunchCardPollButton } from './LunchCardPollButton';

export interface LunchCardProps {
  polled?: boolean;
  summary: LunchMenuSummary;
  order: number;
}

export const LunchCard = (props: LunchCardProps) => {
  const { polled = false, summary, order } = props;
  const { pollCount } = summary;

  return (
    <div css={selfCss}>
      <LunchCardMenuDescription order={order} menu={summary} />

      <LunchCardPollButton
        css={{ width: likeButtonWidth }}
        pollCount={pollCount}
        polled={polled}
        onPolledChange={() => {}}
      />
    </div>
  );
};

const descriptionMinWidth = 200;
const likeButtonWidth = 100;

const selfMinWidth = descriptionMinWidth + likeButtonWidth;

const selfCss = css(
  {
    position: 'relative',
    backgroundColor: palettes.white,
    borderRadius: 20,
    overflow: 'hidden',
    color: palettes.black,
    minHeight: lunchCardMinHeight,
    height: '100%',
    minWidth: selfMinWidth,
  },
  flex('stretch', '', 'row')
);
