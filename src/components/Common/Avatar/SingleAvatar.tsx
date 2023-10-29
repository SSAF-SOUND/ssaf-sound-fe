import type { SerializedStyles } from '@emotion/react';
import type { UserBasicInfo } from '~/services/member';

import { css } from '@emotion/react';
import React from 'react';

import { flex, fontCss, palettes } from '~/styles/utils';

import { classnames as cn } from './classnames';

export interface SingleAvatarProps {
  className?: string;
  size?: AvatarSize;
  userInfo?: AvatarUserInfo;
  anonymous?: boolean;
}

export type AvatarUserInfo = Omit<UserBasicInfo, 'memberId' | 'memberRole'>;
export type AvatarSize = 'sm' | 'md' | 'md2' | 'lg';

const SingleAvatar = (props: SingleAvatarProps) => {
  const {
    size = 'sm',
    userInfo,
    anonymous = false,
    className,
    ...restProps
  } = props;

  const classNames = [cn.avatar, className].join(' ');

  return (
    <div
      css={[
        selfCss,
        sizeCss[size],
        userInfo?.isMajor && majorCss,
        anonymous && anonymousCss,
        !userInfo && emptyCss,
      ]}
      className={classNames}
      {...restProps}
    >
      {userInfo && (
        <span css={[textCss[size], textCapitalizeCss, lineHeightCss]}>
          {getFirstText(userInfo.nickname)}
        </span>
      )}
    </div>
  );
};

const getFirstText = (str: string) => str.at(0) || '';

const selfCss = css(
  {
    borderRadius: 100,
    color: palettes.black,
    border: `0.6px solid ${palettes.white}`,
    backgroundColor: palettes.nonMajor,
  },
  flex('center', 'center', 'row'),
  fontCss.family.auto
);

export const sizeCss: Record<AvatarSize, SerializedStyles> = {
  sm: css({ width: 16, height: 16 }),
  md: css({ width: 20, height: 20 }),
  md2: css({ width: 30, height: 30 }),
  lg: css({ width: 36, height: 36 }),
};

const lineHeightCss = css({ lineHeight: 1 });

const textCss: Record<AvatarSize, SerializedStyles> = {
  sm: css(fontCss.style.B12),
  md: css(fontCss.style.B14),
  md2: css(fontCss.style.B14),
  lg: css(fontCss.style.B28),
};

const textCapitalizeCss = css({
  textTransform: 'capitalize',
});

const majorCss = css({
  backgroundColor: palettes.major,
});

const anonymousCss = css({
  backgroundColor: palettes.recruit.default,
});

const emptyCss = css({
  backgroundColor: palettes.grey4,
  border: `1px dotted ${palettes.grey0}`,
});

export default SingleAvatar;
