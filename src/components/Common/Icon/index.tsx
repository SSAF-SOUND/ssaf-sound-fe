import type { CSSProperties } from 'react';

import { css } from '@emotion/react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { forwardRef } from 'react';
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
import { BiCodeBlock, BiImageAdd } from 'react-icons/bi';
import { BsPersonFillLock } from 'react-icons/bs';
import {
  HiMinus,
  HiOutlineArrowLeft,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiPlus,
} from 'react-icons/hi';
import { HiChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
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
  MdLogout,
  MdOutlineChat,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
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

  like: <MdThumbUp />,
  [`like.outline`]: <MdOutlineThumbUp />,

  chat: <HiChatBubbleOvalLeftEllipsis />,
  [`chat.rect`]: <MdChatBubbleOutline />,
  [`chat.multiline`]: <MdOutlineChat />,

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
  [`chevron.left.double`]: <MdKeyboardDoubleArrowLeft />,
  [`chevron.right.double`]: <MdKeyboardDoubleArrowRight />,
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

  signIn: <BsPersonFillLock />,
  signOut: <MdLogout />,
  skill: <BiCodeBlock />,
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

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  (props: IconProps, ref) => {
    const {
      name,
      label = name,
      size = 24,
      color,
      style = {},
      ...restProps
    } = props;
    return (
      <div
        ref={ref}
        css={selfCss}
        {...restProps}
        style={{ fontSize: size, color, ...style }}
        data-icon=""
      >
        <AccessibleIcon label={label}>{icons[name]}</AccessibleIcon>
      </div>
    );
  }
);

Icon.displayName = 'Icon';
const selfCss = css(inlineFlex());
