import type { CSSProperties } from 'react';

import { css } from '@emotion/react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import {
  AiFillApple,
  AiFillCaretDown,
  AiFillCaretRight,
  AiFillGithub,
  AiOutlineGoogle,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineRight,
} from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import {
  HiMinus,
  HiOutlineArrowLeft,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiPlus,
} from 'react-icons/hi';
import { HiChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { IoMdListBox } from 'react-icons/io';
import { IoTriangle } from 'react-icons/io5';
import {
  MdAccountCircle,
  MdArticle,
  MdBookmark,
  MdBookmarkBorder,
  MdCalendarToday,
  MdChatBubbleOutline,
  MdCheck,
  MdClose,
  MdControlPoint,
  MdCreate,
  MdDescription,
  MdGroup,
  MdGroupAdd,
  MdHome,
  MdIosShare,
  MdKeyboardArrowDown,
  MdLink,
  MdMoreVert,
  MdNotifications,
  MdOutlineThumbUp,
  MdRefresh,
  MdRemoveCircleOutline,
  MdSettings,
  MdThumbUp,
  MdSearch,
  MdOutlineSubdirectoryArrowRight,
} from 'react-icons/md';
import { RiKakaoTalkFill, RiSendPlane2Line } from 'react-icons/ri';
import { TbPencilPlus, TbSquareRoundedCheckFilled } from 'react-icons/tb';

import { inlineFlex } from '~/styles/utils';

export const icons = {
  board: <MdArticle />,
  recruit: <MdGroupAdd />,
  backward: <HiOutlineArrowLeft />,
  home: <MdHome />,
  profile: <MdAccountCircle />,
  search: <MdSearch />,

  group: <MdGroup />,
  calendar: <MdCalendarToday />,
  skill: <IoMdListBox />,

  like: <MdThumbUp />,
  [`like.outline`]: <MdOutlineThumbUp />,

  chat: <HiChatBubbleOvalLeftEllipsis />,
  [`chat.rect`]: <MdChatBubbleOutline />,

  triangle: <IoTriangle />,
  pencil: <MdCreate />,
  [`pencil.plus`]: <TbPencilPlus />,

  [`circle.plus`]: <MdControlPoint />,
  [`circle.minus`]: <MdRemoveCircleOutline />,
  plus: <HiPlus />,
  minus: <HiMinus />,

  notification: <MdNotifications />,
  more: <MdMoreVert />,

  bookmark: <MdBookmark />,
  [`bookmark.outline`]: <MdBookmarkBorder />,

  refresh: <MdRefresh />,

  check: <MdCheck />,
  checkbox: <TbSquareRoundedCheckFilled />,

  close: <MdClose />,
  share: <MdIosShare />,

  [`chevron.down`]: <MdKeyboardArrowDown />,
  [`chevron.right`]: <HiOutlineChevronRight />,
  [`chevron.left`]: <HiOutlineChevronLeft />,
  [`arrow.right`]: <AiFillCaretRight />,
  [`arrow.down`]: <AiFillCaretDown />,

  image: <BiImageAdd />,
  link: <MdLink />,
  setting: <MdSettings />,
  document: <MdDescription />,
  send: <RiSendPlane2Line />,

  google: <AiOutlineGoogle />,
  github: <AiFillGithub />,
  kakao: <RiKakaoTalkFill />,
  apple: <AiFillApple />,

  reply: <MdOutlineSubdirectoryArrowRight />,

  heart: <AiFillHeart />,
  [`heart.outlined`]: <AiOutlineHeart />,
  [`right.outlined`]: <AiOutlineRight />,
} as const;

export type IconNames = keyof typeof icons;
export interface IconProps {
  name: IconNames;
  size?: number;
  label?: string;
  color?: string;
  style?: CSSProperties;
  className?: string;
}

export const Icon = (props: IconProps) => {
  const {
    name,
    label = name,
    size = 24,
    color = '',
    style = {},
    className,
  } = props;
  return (
    <div
      css={selfCss}
      className={className}
      style={{ fontSize: size, color, ...style }}
      data-icon=""
    >
      <AccessibleIcon label={label}>{icons[name]}</AccessibleIcon>
    </div>
  );
};

const selfCss = css(inlineFlex());
