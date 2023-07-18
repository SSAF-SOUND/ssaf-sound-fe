import type { SerializedStyles } from '@emotion/react';
import type { ComponentPropsWithoutRef } from 'react';
import type { UserBasicInfo, UserInfo } from '~/services/member';

import { css } from '@emotion/react';
import React from 'react';

import { flex, fontCss, palettes } from '~/styles/utils';

export interface SingleAvatarProps extends ComponentPropsWithoutRef<'div'> {
  size?: AvatarSize;
  userInfo?: AvatarUserInfo;
}

type AvatarUserInfo = Omit<UserBasicInfo, 'memberId' | 'memberRole'>;
type AvatarSize = 'sm' | 'md' | 'lg';

const SingleAvatar = (props: SingleAvatarProps) => {
  const { size = 'sm', userInfo, ...restProps } = props;

  return (
    <div
      css={[
        selfCss,
        sizeCss[size],
        userInfo?.isMajor && majorCss,
        !userInfo && emptyCss,
      ]}
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

const sizeCss: Record<AvatarSize, SerializedStyles> = {
  sm: css({ width: 16, height: 16 }),
  md: css({ width: 20, height: 20 }),
  lg: css({ width: 40, height: 40 }),
};

const lineHeightCss = css({ lineHeight: 1 });

const textCss: Record<AvatarSize, SerializedStyles> = {
  sm: css(fontCss.style.B12),
  md: css(fontCss.style.B14),
  lg: css(fontCss.style.B28),
};

const textCapitalizeCss = css({
  textTransform: 'capitalize',
});

const majorCss = css({
  backgroundColor: palettes.major,
});

const emptyCss = css({
  backgroundColor: palettes.white,
  border: `1px dotted ${palettes.grey0}`,
});

export default SingleAvatar;
