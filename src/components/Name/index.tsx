import type { SerializedStyles } from '@emotion/react';
import type { UserInfo } from '~/services/member/utils';

import { css } from '@emotion/react';

import { Avatar } from '~/components/Common/Avatar';
import { SsafyIcon, TrackSize } from '~/components/Common/SsafyIcon';
import { CertificationState } from '~/services/member/utils';
import {
  deletedUserDisplayNickname,
  isDeletedUser,
} from '~/services/member/utils/isDeletedUser';
import { fontCss, inlineFlex, palettes } from '~/styles/utils';

export interface NameProps {
  userInfo: NameUserInfo;
  withAvatar?: boolean;
  size?: NameSize;
  anonymous?: boolean;
  className?: string;
}

type NameUserInfo = Omit<UserInfo, 'memberId' | 'memberRole'>;
type NameSize = 'sm' | 'md' | 'lg';

const Name = (props: NameProps) => {
  const {
    className,
    size = 'sm',
    withAvatar = true,
    userInfo,
    anonymous = false,
  } = props;
  const {
    // basic info
    nickname,
    ssafyMember,

    // ssafy info
    ssafyInfo,
  } = userInfo;

  const showBadge =
    !anonymous &&
    ssafyMember &&
    ssafyInfo?.certificationState === CertificationState.CERTIFIED;

  const isDeleted = isDeletedUser({ nickname });
  const displayNickname = isDeleted ? (
    <span css={{ color: palettes.grey3 }}>{deletedUserDisplayNickname}</span>
  ) : (
    <span>{nickname}</span>
  );

  return (
    <span css={selfCss} className={className}>
      {!isDeleted && withAvatar && (
        <Avatar
          size={size}
          userInfo={userInfo}
          anonymous={anonymous}
          css={{ flexShrink: 0 }}
        />
      )}
      <span css={[textBaseCss, textCss[size], fontCss.family.auto]}>
        {displayNickname}
      </span>
      {!isDeleted && showBadge && (
        <SsafyIcon.Track
          name={ssafyInfo.majorTrack || 'fallback'}
          size={trackSize[size]}
        />
      )}
    </span>
  );
};

const selfCss = css(inlineFlex('center', '', 'row', 2));

const textBaseCss = css({
  maxWidth: 260,
  wordBreak: 'break-all',
});

const textCss: Record<NameSize, SerializedStyles> = {
  sm: css(fontCss.style.B12),
  md: css(fontCss.style.B18),
  lg: css(fontCss.style.B28),
};

const trackSize: Record<NameSize, TrackSize> = {
  sm: TrackSize.SM1,
  md: TrackSize.SM2,
  lg: TrackSize.SM3,
};

export default Name;
