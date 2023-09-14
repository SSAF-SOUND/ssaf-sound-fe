import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { flex, palettes } from '~/styles/utils';

interface BarProps {
  className?: string;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

/**
 * - `left`, `center`, `right` 세가지 section을 가지고 있는 Box
 */
export const Bar = (props: BarProps) => {
  const { className = '', left, center, right } = props;
  return (
    <div css={selfCss} className={className}>
      {left || Division}
      {center || Division}
      {right || Division}
    </div>
  );
};

const Division = <div />;

const selfCss = css(
  {
    height: 50,
    backgroundColor: palettes.background.default,
  },
  flex('center', 'space-between', 'row', 30)
);
