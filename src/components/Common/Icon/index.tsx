import type { CSSProperties } from 'react';

import { css } from '@emotion/react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { AiFillApple, AiFillGithub, AiOutlineGoogle } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IoMdListBox } from 'react-icons/io';
import { IoTriangle } from 'react-icons/io5';
import {
  MdAccountCircle,
  MdArticle,
  MdBookmark,
  MdBookmarkBorder,
  MdCalendarToday,
  MdChatBubbleOutline,
  MdControlPoint,
  MdCreate,
  MdGroup,
  MdGroupAdd,
  MdHome,
  MdMoreVert,
  MdNotifications,
  MdOutlineThumbUp,
  MdRefresh,
  MdRemoveCircleOutline,
  MdThumbUp,
} from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { TbSquareRoundedCheckFilled } from 'react-icons/tb';

import { inlineFlex } from '~/styles/utils';

export const icons = {
  board: <MdArticle />,
  recruit: <MdGroupAdd />,
  backward: <HiOutlineArrowLeft />,
  home: <MdHome />,
  profile: <MdAccountCircle />,

  group: <MdGroup />,
  calendar: <MdCalendarToday />,
  skill: <IoMdListBox />,

  like: <MdThumbUp />,
  [`like.outline`]: <MdOutlineThumbUp />,

  chat: <BsChatDots />,
  [`chat.rect`]: <MdChatBubbleOutline />,

  triangle: <IoTriangle />,
  pencil: <MdCreate />,

  [`circle.plus`]: <MdControlPoint />,
  [`circle.minus`]: <MdRemoveCircleOutline />,

  notification: <MdNotifications />,
  more: <MdMoreVert />,

  bookmark: <MdBookmark />,
  [`bookmark.outline`]: <MdBookmarkBorder />,

  refresh: <MdRefresh />,

  checkbox: <TbSquareRoundedCheckFilled />,

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
