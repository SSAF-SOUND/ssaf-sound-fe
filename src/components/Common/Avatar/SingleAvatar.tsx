import type { SerializedStyles } from '@emotion/react';
import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';
import React from 'react';

import { flex, fontCss } from '~/styles/utils';

export interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  size?: AvatarSize;
  major: boolean;
  nickName: string;
}
type AvatarSize = 'sm' | 'md' | 'lg';
type BackgroundColor = 'major' | 'nonMajor';

const SingleAvatar = (props: AvatarProps) => {
  const { major = false, size = 'sm', nickName = '샆사운드', ...rest } = props;
  // 현재 설계상 major라는 이름으로 전공여부를 가지고오게되어 그대로 사용하기 위해 major라는 명칭을 사용하게 됨.

  return (
    <div
      css={[
        selfCss,
        sizeCss[size],
        backgroundCss[major ? 'major' : 'nonMajor'],
      ]}
      {...rest}
    >
      <span css={[[textCss[size]], textCapitalizeCss]}>
        {getFirstText(nickName)}
      </span>
    </div>
  );
};

const getFirstText = (str: string) => str.at(0);

const selfCss = css(
  {
    borderRadius: 100,
    color: '#000',
    border: '0.6px solid #fff',
  },
  flex('center', 'center', 'row')
);

const sizeCss: Record<AvatarSize, SerializedStyles> = {
  sm: css({ width: 20, height: 20 }),
  md: css({ width: 30, height: 30 }),
  lg: css({ width: 40, height: 40 }),
};

const textCss: Record<AvatarSize, SerializedStyles> = {
  sm: css(fontCss.style.B12),
  md: css(fontCss.style.B14),
  lg: css(fontCss.style.B24),
};

const textCapitalizeCss = css({
  textTransform: 'capitalize',
});

const backgroundCss: Record<BackgroundColor, SerializedStyles> = {
  major: css({
    backgroundColor: '#71E498',
    // todo 팔레트로 이관
  }),
  nonMajor: css({
    backgroundColor: '#FFBF75',
  }),
};

export default SingleAvatar;
