import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

interface Props {
  order: number;
}

const Order = ({ order }: Props) => {
  return (
    <div css={[selfCss]}>
      <span css={textCss}>{order}</span>
    </div>
  );
};

const selfCss = css({
  position: 'absolute',
  width: 0,
  height: 0,
  borderTopLeftRadius: 32,
  borderTop: `90px solid ${palettes.secondary.dark}`,
  borderLeft: '0px solid transparent',
  borderRight: '90px solid transparent',
  zIndex: 10,
});

const textCss = css(fontCss.family.auto, fontCss.style.B24, {
  position: 'absolute',
  top: '-80px',
  left: '20px',
});
export default Order;
