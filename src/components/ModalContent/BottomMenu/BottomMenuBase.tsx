import type { ReactElement } from 'react';

import { css } from '@emotion/react';

import { Modal, VisuallyHidden } from '~/components/Common';
import BottomMenuButton from '~/components/ModalContent/BottomMenu/BottomMenuButton';
import { flex, fontCss, palettes, position } from '~/styles/utils';

interface BottomMenuBaseProps {
  title?: string;
  buttons?: ReactElement;
}

const BottomMenuBase = (props: BottomMenuBaseProps) => {
  const { title = 'Menu', buttons } = props;
  return (
    <div css={selfCss}>
      <div css={buttonContainerCss}>
        {title && <Modal.Title css={titleCss}>{title}</Modal.Title>}
        {buttons}
      </div>

      <div css={buttonContainerCss}>
        <BottomMenuButton>
          <VisuallyHidden>닫기 버튼</VisuallyHidden>
        </BottomMenuButton>
      </div>
    </div>
  );
};

export default BottomMenuBase;

const selfCss = css(
  {
    width: '100vw',
    maxWidth: 576,
    borderRadius: 16,
    padding: 12,
    bottom: 20,
  },
  position.x('center'),
  flex('', '', 'column', 8),
  fontCss.family.auto
);

const titleCss = css(
  {
    height: 40,
    width: '100%',
    backgroundColor: palettes.white,
    color: palettes.background.grey,
  },
  fontCss.style.R12,
  flex('center', 'center')
);

const buttonContainerCss = css(
  {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: palettes.white,
  },
  flex('center', 'center', 'column')
);
