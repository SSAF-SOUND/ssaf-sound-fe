import type { CSSProperties} from 'react';

import { css } from '@emotion/react';
import { memo } from 'react';

import { flex, fontCss, palettes, themeColorVars } from '~/styles/utils';

interface VacantSquareAvatarProps {
  className?: string;
  style?: CSSProperties;
}

const VacantSquareAvatar = memo((props: VacantSquareAvatarProps) => {
  return (
    <div css={selfCss} {...props}>
      <span css={titleCss}>vacant</span>
      <span css={textCss} data-theme="recruit">
        리쿠르팅 모집중
      </span>
    </div>
  );
});

VacantSquareAvatar.displayName = 'VacantSquareAvatar';

const selfCss = css(flex('center', 'center', 'column'), {
  width: 120,
  height: 120,
  borderRadius: 8,
  border: `1px solid ${palettes.font.blueGrey}}`,
});

const titleCss = css(fontCss.family.auto, fontCss.style.B18, {
  color: palettes.font.blueGrey,
});

const textCss = css(fontCss.family.auto, fontCss.style.R12, {
  color: themeColorVars.mainColor.var,
});

export default VacantSquareAvatar;
