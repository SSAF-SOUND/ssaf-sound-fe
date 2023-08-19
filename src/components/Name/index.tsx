import type { SerializedStyles } from '@emotion/react';
import type { UserInfo } from '~/services/member/utils';

import { css } from '@emotion/react';

import { Avatar, SsafyIcon, TrackSize } from '~/components/Common';
import { CertificationState } from '~/services/member/utils';
import { fontCss, inlineFlex } from '~/styles/utils';

export type NameProps = {
  userInfo: NameUserInfo;
  withAvatar?: boolean;
  size?: NameSize;
  anonymous?: boolean;
};

type NameUserInfo = Omit<UserInfo, 'memberId' | 'memberRole'>;
type NameSize = 'sm' | 'md' | 'lg';

const Name = (props: NameProps) => {
  const { size = 'sm', withAvatar = true, userInfo, anonymous = false } = props;
  const {
    // basic info
    nickname,
    ssafyMember,

    // ssafy info
    ssafyInfo,
  } = userInfo;

  const showBadge =
    ssafyMember &&
    ssafyInfo?.certificationState === CertificationState.CERTIFIED;

  return (
    <span css={selfCss}>
      {withAvatar && (
        <Avatar size={size} userInfo={userInfo} anonymous={anonymous} />
      )}
      <span css={[textBaseCss, textCss[size], fontCss.family.auto]}>
        {nickname}
      </span>
      {showBadge && (
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
  maxWidth: 230,
  wordBreak: 'break-word',
});

const textCss: Record<NameSize, SerializedStyles> = {
  sm: css(fontCss.style.B12),
  md: css(fontCss.style.B18),
  lg: css(fontCss.style.B40),
};

const trackSize: Record<NameSize, TrackSize> = {
  sm: TrackSize.SM1,
  md: TrackSize.SM2,
  lg: TrackSize.SM3,
};

export default Name;
