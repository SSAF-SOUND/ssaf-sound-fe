import { memo } from 'react';

import LunchTitleSVG from '~/assets/images/lunch-menu-title.svg';
import { VisuallyHidden } from '~/components/Common';

export interface LunchTitleProps {
  color?: string;
  className?: string;
}

export const LunchTitle = memo((props: LunchTitleProps) => {
  const { color, className } = props;
  const style = { fill: color };

  return (
    <div className={className}>
      <LunchTitleSVG style={style} />
      <VisuallyHidden>
        <h2>싸피의 점심메뉴추천</h2>
      </VisuallyHidden>
    </div>
  );
});

LunchTitle.displayName = 'LunchTitle';
