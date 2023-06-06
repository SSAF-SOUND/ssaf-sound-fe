import { css } from '@emotion/react';
import React from 'react';

import LikeProgress from './LikeProgress';
import Menu from './Menu';
import Order from './Order';
import Place from './Place';
import VoteButton from './VoteButton';

interface Data {
  lunchId?: string;
  mainMenu: string;
  extraMenu: string;
  menuUrl?: string;
  menuKcal?: string;
  uploadAt?: Date;
  // place는 정해지지 않았지만, 필요하다고 생각함.
  place?: string;
}

export interface LunchCardProps extends Data {
  checked?: boolean;
  now?: number;
  // fetch data
}

const baseCss = css({
  position: 'relative',
  width: 325,
  height: 226,
  backgroundColor: '#999999',
  borderRadius: 10,
});

const LunchCard = (props: LunchCardProps) => {
  const { checked = false, place, mainMenu, extraMenu } = props;
  return (
    <div css={baseCss}>
      <VoteButton checked={checked} />
      <Order order={1} />
      <Place place="3층" />
      <Menu mainMenu={mainMenu} extraMenu={extraMenu} />
      <LikeProgress now={80} />
    </div>
  );
};

export default LunchCard;
