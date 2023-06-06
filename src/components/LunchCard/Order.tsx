import { css } from '@emotion/react';

interface Props {
  order: number;
}

const Order = ({ order }: Props) => {
  return (
    <div css={[baseCss]}>
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

const baseCss = css({
  position: 'absolute',
  width: 0,
  height: 0,
  'border-top-left-radius': '10px',
  'border-top': '65px solid #ffa7a7',
  'border-left': '0px solid transparent',
  'border-right': '65px solid transparent',
});

export default Order;
