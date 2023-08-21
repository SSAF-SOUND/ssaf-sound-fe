import { css } from '@emotion/react';
import React from 'react';

import LikeProgress from './LikeProgress';
import Menu from './Menu';
import Order from './Order';
import Place from './Place';
import VoteButton from './VoteButton';
import { palettes, position } from '~/styles/utils';
import Image from 'next/image';
import { Icon, ImageWithFallback } from '../../Common';
import FallbackImage from '../../assets/images/싸피 로고 캐릭터@2x.png';
import { Toggle } from '@radix-ui/react-toggle';
export interface LunchCardProps extends Record<string, any> {}

const LunchCard = (props: LunchCardProps) => {
  const { checked = false, mainMenu, extraMenu, order } = props;
  return (
    <div css={selfCss}>
      <Order order={order} />

      <LunchCardLikeButton />
    </div>
  );
};

const LunchCardLikeButton = () => {
  return (
    <div
      css={{
        position: 'absolute',
        right: 0,
        width: 130,
        height: '100%',
        top: 0,
        display: 'flex',
      }}
    >
      <Toggle asChild>
        <Icon name="like" size={36} />
      </Toggle>
      <span>134</span>
    </div>
  );
};
const selfCss = css({
  position: 'relative',
  maxWidth: 340,
  height: 226,
  backgroundColor: palettes.white,
  borderRadius: 32,
  overflow: 'hidden',
});

export default LunchCard;
