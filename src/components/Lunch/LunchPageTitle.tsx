import { css } from '@emotion/react';

import { LunchTitle } from '~/components/Lunch/LunchTitle';
import { flex, fontCss, palettes } from '~/styles/utils';

export const LunchPageTitle = () => {
  return (
    <div css={selfCss}>
      <LunchTitle color={palettes.white} />
      <p css={textCss}>가장 먹고 싶은 점심메뉴는?</p>
    </div>
  );
};

const selfCss = css(flex('center', '', 'column', 12));
const textCss = css(fontCss.family.auto, fontCss.style.R18);
