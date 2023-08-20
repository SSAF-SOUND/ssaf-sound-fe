import { css } from '@emotion/react';
import { memo } from 'react';

import LunchTitleSVG from '~/assets/images/lunch-menu-title.svg';
import { VisuallyHidden } from '~/components/Common';
import { flex } from '~/styles/utils';

export interface LunchTitleProps {
  color?: string;
}

export const LunchTitle = memo((props: LunchTitleProps) => {
  const { color } = props;
  const style = { fill: color };

  return (
    <div css={selfCss}>
      <LunchTitleSVG style={style} />
      {/* NOTE: PageHeadingText */}
      <VisuallyHidden>
        <h2>싸피의 점심메뉴추천</h2>
      </VisuallyHidden>
    </div>
  );
});

LunchTitle.displayName = 'LunchTitle';

const selfCss = css(flex('', '', 'row', 6));
