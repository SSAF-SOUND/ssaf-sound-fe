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
      css={[selfCss, checked ? highLightCss : defaultCss]}
      disabled={disabled}
      onClick={() => {
        // fetch
      }}
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

const highLightCss = css({
  background: '#9ADFA1',
});

const defaultCss = css({
  background: '#D1D1D1',
});

export default VoteButton;
