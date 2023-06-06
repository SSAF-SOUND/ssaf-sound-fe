import { css } from '@emotion/react';
import React from 'react';

import LikeProgress from './LikeProgress';
import Menu from './Menu';
import Order from './Order';
import Place from './Place';
import VoteButton from './VoteButton';

const LunchCard = (props: any) => {
  const { checked = false, place, mainMenu, extraMenu } = props;
  return (
    <div css={selfCss}>
      <VoteButton checked={checked} />
      <Order order={1} />
      <Place place="3층" />
      <Menu mainMenu={mainMenu} extraMenu={extraMenu} />
      <LikeProgress now={80} />
    </div>
  );
};

const selfCss = css({
  position: 'relative',
  width: 325,
  height: 226,
  backgroundColor: '#999999',
  borderRadius: 10,
});

export default LunchCard;
