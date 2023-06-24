import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { Modal } from '~/components/Common';
import { fontCss, palettes } from '~/styles/utils';

interface BottomMenuButtonProps {
  children: ReactNode;
}

const BottomMenuButton = (props: BottomMenuButtonProps) => {
  const { children } = props;
  return <Modal.Close css={buttonCss}>{children}</Modal.Close>;
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
      backgroundColor: palettes.grey5,
    },
    ':active': {
      backgroundColor: palettes.grey4,
    },
    ':focus-visible': {
      backgroundColor: palettes.grey5,
    },
  },
  fontCss.style.R18
);
