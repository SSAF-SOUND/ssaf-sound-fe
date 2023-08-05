import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

import { Modal } from '~/components/Common';
import { fontCss, palettes } from '~/styles/utils';

const ButtonLoader = () => {
  return <ClipLoader color={palettes.primary.darken} size={24} />;
};

interface BottomMenuButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  bold?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export const BottomMenuCloseButton = (props: BottomMenuButtonProps) => {
  const { children, bold = false, loading, disabled, ...restProps } = props;
  const buttonDisabled = loading || disabled;
  return (
    <Modal.Close
      css={[buttonCss, bold && boldCss]}
      disabled={buttonDisabled}
      {...restProps}
    >
      {loading ? <ButtonLoader /> : children}
    </Modal.Close>
  );
};

export const BottomMenuButton = (props: BottomMenuButtonProps) => {
  const { children, bold = false, loading, disabled, ...restProps } = props;
  const buttonDisabled = loading || disabled;
  return (
    <button
      css={[buttonCss, bold && boldCss]}
      disabled={buttonDisabled}
      {...restProps}
    >
      {loading ? <ButtonLoader /> : children}
    </button>
  );
};

const buttonHeight = 60;
const buttonCss = css(
  {
    height: buttonHeight,
    cursor: 'pointer',
    width: '100%',
    backgroundColor: palettes.white,
    borderTop: `1px solid ${palettes.background.grey}`,
    color: palettes.primary.darken,
    ':hover': {
      backgroundColor: palettes.grey4,
    },
    ':active': {
      backgroundColor: palettes.grey5,
    },
    ':focus': {
      backgroundColor: palettes.grey4,
    },
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: palettes.white,
    },
  },
  fontCss.style.R18
);
const boldCss = css({
  fontWeight: 700,
});
