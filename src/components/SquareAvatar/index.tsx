import type { CSSProperties } from 'react';
import type { UserInfo } from '~/services/member';

import { css } from '@emotion/react';

import { SsafyIcon, TrackSize } from '~/components/Common/SsafyIcon';
import { flex, fontCss, palettes } from '~/styles/utils';

import VacantSquareAvatar from './Vacant';

export interface SquareAvatarProps {
  userInfo?: UserInfo;
  className?: string;
  style?: CSSProperties;
}
const SquareAvatar = (props: SquareAvatarProps) => {
  const { userInfo, ...restProps } = props;
  if (!userInfo) return <VacantSquareAvatar {...restProps} />;

  const { isMajor, nickname, ssafyMember, ssafyInfo } = userInfo;
  const trackName = ssafyInfo?.majorTrack ?? 'uncertified';

  return (
    <div
      css={[selfCss, backgroundCss[isMajor ? 'major' : 'nonMajor']]}
      {...restProps}
    >
      <SsafyIcon.Track name={trackName} size={TrackSize.SM4} />
      <div css={textBoxCss}>
        <span css={nickNameCss}>{nickname}</span>
        {ssafyMember && (
          <span css={textCss}>
            {ssafyInfo.campus}캠퍼스 {ssafyInfo.semester}기생
          </span>
        )}
      </div>
    </div>
  );
};

const backgroundCss = {
  major: css({
    background: palettes.majorDark,
  }),
  nonMajor: css({
    background: palettes.nonMajorDark,
  }),
};

const selfCss = css(
  {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  flex('center', 'center', 'column', 6)
);

const textBoxCss = css(flex('center', 'center'));
const nickNameCss = css(fontCss.style.B16, fontCss.family.auto, {
  lineHeight: '18px',
  maxWidth: 85,
  textAlign: 'center',
  color: palettes.white,
});

const textCss = css(fontCss.style.R12, fontCss.family.auto, {
  color: palettes.primary.light,
  marginTop: 6,
});

export default SquareAvatar;
