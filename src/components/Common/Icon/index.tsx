import type { CSSProperties } from 'react';

import { css } from '@emotion/react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { AiFillApple, AiFillGithub, AiOutlineGoogle } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IoTriangle } from 'react-icons/io5';
import {
  MdAccountCircle,
  MdArticle,
  MdGroupAdd,
  MdHome,
  MdNotifications,
  MdThumbUp,
} from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';

import { inlineFlex } from '~/styles/utils';

export const icons = {
  board: <MdArticle />,
  recruit: <MdGroupAdd />,
  backward: <HiOutlineArrowLeft />,
  home: <MdHome />,
  profile: <MdAccountCircle />,
  like: <MdThumbUp />,
  notification: <MdNotifications />,
  chat: <BsChatDots />,
  trigger: <IoTriangle />,
  google: <AiOutlineGoogle />,
  github: <AiFillGithub />,
  kakao: <RiKakaoTalkFill />,
  apple: <AiFillApple />,
} as const;

interface IconProps {
  name: keyof typeof icons;
  size?: number;
  label?: string;
  color?: string;
  style?: CSSProperties;
}

const Icon = (props: IconProps) => {
  const { name, label = name, size = 24, color = '', style = {} } = props;
  return (
    <div css={selfCss} style={{ fontSize: size, color, ...style }}>
      <AccessibleIcon label={label}>{icons[name]}</AccessibleIcon>
    </div>
  );
};

const selfCss = css(inlineFlex());

export default Icon;
