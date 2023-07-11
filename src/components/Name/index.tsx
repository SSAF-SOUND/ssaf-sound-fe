import type { SerializedStyles } from '@emotion/react';
import type { UserSsafyInfo, UserBasicInfo } from '~/services/member/utils';

import { css } from '@emotion/react';

import { MajorType } from '~/services/member/utils';
import { fontCss, inlineFlex } from '~/styles/utils';

import { Avatar, SsafyIcon, TrackSize } from '../Common';

type BasicInfo = Pick<UserBasicInfo, 'isMajor' | 'nickname'>;
export type NameProps = {
  userSsafyInfo: UserSsafyInfo;
  size?: NameSize;
} & BasicInfo;

type NameSize = 'sm' | 'md' | 'lg';

const Name = (props: NameProps) => {
  const {
    size = 'lg',
    nickname = '쌒사운드',
    isMajor,
    userSsafyInfo = {
      ssafyMember: true,
      ssafyInfo: {
        majorType: MajorType['MOBILE'],
        certificationState: true,
      },
    },
  } = props;

  const { ssafyMember, ssafyInfo } = userSsafyInfo;

  return (
    <span css={[selfCss, gapCss[size]]}>
      <Avatar size={size} nickName={nickname} major={isMajor} />
      <span css={[textCss[size], fontCss.family.auto]}>{nickname}</span>
      {ssafyMember && (
        <SsafyIcon.Track
          name={ssafyInfo?.majorType || 'fallback'}
          size={trackSize[size]}
        />
      )}
    </span>
  );
};

const selfCss = css(inlineFlex('center', '', 'row'));

const gapCss: Record<NameSize, SerializedStyles> = {
  sm: css({
    gap: 2,
  }),
  md: css({
    gap: 4,
  }),
  lg: css({
    gap: 5,
  }),
};

const textCss: Record<NameSize, SerializedStyles> = {
  sm: css(fontCss.style.B12),
  md: css(fontCss.style.B18),
  lg: css(fontCss.style.B40),
};

const trackSize: Record<NameSize, TrackSize> = {
  sm: TrackSize['SM1'],
  md: TrackSize['SM2'],
  lg: TrackSize['SM3'],
};

export default Name;
