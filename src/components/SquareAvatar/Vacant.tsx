import { css } from '@emotion/react';
import { memo } from 'react';

import { flex, fontCss, palettes, themeColorVars } from '~/styles/utils';

const VacantSquareAvatar = memo(() => {
  return (
    <div css={selfCss}>
      <span css={titleCss}>vacant</span>
      <span css={textCss} data-theme="recruit">
        리쿠르팅 모집중
      </span>
    </div>
  );
});

VacantSquareAvatar.displayName = 'VacantSquareAvatar';

const selfCss = css(flex('center', 'center', 'column'), {
  width: 104,
  height: 113,
  borderRadius: 8,
  border: `1px solid ${palettes.font.blueGrey}}`,
});

const titleCss = css(fontCss.family.auto, fontCss.style.R18, {
  color: palettes.font.blueGrey,
});

const textCss = css(fontCss.family.auto, fontCss.style.R12, {
  color: themeColorVars.mainColor.var,
});

export default VacantSquareAvatar;
