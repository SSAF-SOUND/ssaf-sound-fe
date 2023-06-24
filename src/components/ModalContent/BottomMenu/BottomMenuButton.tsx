import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { css } from '@emotion/react';

import { Modal } from '~/components/Common';
import { fontCss, palettes } from '~/styles/utils';

interface BottomMenuButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  bold?: boolean;
}

const BottomMenuButton = (props: BottomMenuButtonProps) => {
  const { children, bold = false, ...restProps } = props;
  return (
    <Modal.Close css={[buttonCss, bold && boldCss]} {...restProps}>
      {children}
    </Modal.Close>
  );
};

export default BottomMenuButton;

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
    ':focus-visible': {
      backgroundColor: palettes.grey4,
    },
  },
  fontCss.style.R18
);
const boldCss = css({
  fontWeight: 700,
});
