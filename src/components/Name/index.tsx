import type { SerializedStyles } from '@emotion/react';
import type { UserInfo } from '~/services/member/utils';

import { css } from '@emotion/react';

import { Avatar, SsafyIcon, TrackSize } from '~/components/Common';
import { CertificationState } from '~/services/member/utils';
import { fontCss, inlineFlex } from '~/styles/utils';

export type NameProps = {
  userInfo: UserInfo;
  size?: NameSize;
};

type NameSize = 'sm' | 'md' | 'lg';

const Name = (props: NameProps) => {
  const { size = 'sm', userInfo } = props;
  const {
    // basic info
    isMajor,
    nickname,
    ssafyMember,

    // ssafy info
    ssafyInfo,
  } = userInfo;

  const showBadge =
    ssafyMember &&
    ssafyInfo?.certificationState === CertificationState.CERTIFIED;

  return (
    <span css={[selfCss, gapCss[size]]}>
      <Avatar size={size} nickName={nickname} major={isMajor} />
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
