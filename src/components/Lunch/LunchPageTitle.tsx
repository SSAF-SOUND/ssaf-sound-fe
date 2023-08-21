import { css } from '@emotion/react';
import { memo } from 'react';

import LunchTitle from '~/assets/images/lunch-title.svg';
import { Icon, VisuallyHidden } from '~/components/Common';
import { flex, fontCss } from '~/styles/utils';

export const LunchPageTitle = memo(() => {
  return (
    <div css={selfCss}>
      <div css={containerCss}>
        <Icon name="spoon" size={25} />
        <LunchTitle />
        <VisuallyHidden>
          <h2>싸피의 점심메뉴추천</h2>
        </VisuallyHidden>
      </div>

      <p css={textCss}>가장 먹고 싶은 점심메뉴는?</p>
    </div>
  );
});

LunchPageTitle.displayName = 'LunchPageTitle';

const selfCss = css(flex('center', '', 'column', 12));
const containerCss = css(flex('', '', 'row', 6));
const textCss = css(fontCss.family.auto, fontCss.style.R18);
