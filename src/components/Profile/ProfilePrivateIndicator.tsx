import { css } from '@emotion/react';

import { SsafyIcon, TrackSize } from '~/components/Common/SsafyIcon';
import { flex, fontCss, palettes } from '~/styles/utils';

interface ProfilePrivateIndicatorProps {
  className?: string;
}

const ProfilePrivateIndicator = (props: ProfilePrivateIndicatorProps) => {
  return (
    <div css={selfCss} {...props}>
      <p css={textCss}>프로필 비공개</p>
      <SsafyIcon.Track size={TrackSize.LG2} />
    </div>
  );
};

export default ProfilePrivateIndicator;
const selfCss = css(flex('center', 'center', 'column', 30));
const textCss = css({ color: palettes.primary.default }, fontCss.style.B18);
