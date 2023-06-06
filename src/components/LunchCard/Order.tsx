import { css } from '@emotion/react';

interface Props {
  order: number;
}

const Order = ({ order }: Props) => {
  return (
    <div css={[selfCss]}>
      <span
        css={css`
          position: absolute;
          top: -55px;
          left: 20px;
          font-size: 20px;
          font-weight: 500;
          color: #fff;
        `}
      >
        {order}
      </span>
    </div>
  );
};

const selfCss = css({
  position: 'absolute',
  width: 0,
  height: 0,
  borderTopLeftRadius: 10,
  borderTop: '65px solid #ffa7a7',
  borderLeft: '0px solid transparent',
  borderRight: '65px solid transparent',
});

export default Order;
