import type { UserInfo } from '~/services/member';

import { css } from '@emotion/react';

import { flex, fontCss, palettes } from '~/styles/utils';

import VacantSquareAvatar from './Vacant';
import { SsafyIcon } from '../Common';
import { TrackSize } from '../Common/SsafyIcon/Track';

export interface SquareAvatarProps {
  userInfo?: UserInfo;
}
const SquareAvatar = (props: SquareAvatarProps) => {
  const { userInfo } = props;
  if (!userInfo) return <VacantSquareAvatar />;

  const { isMajor, nickname, ssafyMember, ssafyInfo } = userInfo;

  return (
    <div css={[selfCss, backgroundCss[isMajor ? 'major' : 'nonMajor']]}>
      <SsafyIcon.Track
        name={ssafyMember ? ssafyInfo?.majorTrack : 'uncertified'}
        size={TrackSize.SM4}
      />
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
    width: 104,
    height: 113,
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
});

export default SquareAvatar;
