import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';

import { toCssVar } from '~/styles/utils';

interface Props extends ComponentPropsWithoutRef<'button'> {
  checked?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const VoteButton = (props: Props) => {
  const { checked = false, loading = false, disabled = false } = props;

  return (
    <button
      css={selfCss}
      disabled={disabled}
      onClick={() => {
        // fetch
      }}
      style={{ backgroundColor: checked ? '#9ADFA1' : '#D1D1D1' }}
    >
      <span
        css={css`
          font-size: 10px;
          color: #fff;
        `}
      >
        {/* Icon */}
        맛있어요!
      </span>
    </button>
  );
};

const selfCss = css({
  position: 'absolute',
  width: '70px',
  height: '66px',
  top: '34px',
  left: '223px',
  borderRadius: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  cursor: 'pointer',
});

export default VoteButton;
