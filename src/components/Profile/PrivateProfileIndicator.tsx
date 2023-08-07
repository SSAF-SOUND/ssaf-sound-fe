import { css } from '@emotion/react';

import { SsafyIcon, TrackSize } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

interface PrivateProfileIndicatorProps {
  className?: string;
}

const PrivateProfileIndicator = (props: PrivateProfileIndicatorProps) => {
  return (
    <div css={selfCss} {...props}>
      <p css={textCss}>프로필 비공개</p>
      <SsafyIcon.Track size={TrackSize.LG2} />
    </div>
  );
};

export default PrivateProfileIndicator;
const selfCss = css(flex('center', 'center', 'column', 30));
const textCss = css({ color: palettes.primary.default }, fontCss.style.B18);
