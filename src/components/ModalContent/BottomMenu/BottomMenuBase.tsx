import type { MouseEventHandler, ReactElement } from 'react';

import { css } from '@emotion/react';

import { Modal, VisuallyHidden } from '~/components/Common';
import { flex, fontCss, palettes, position } from '~/styles/utils';

import { BottomMenuCloseButton } from './BottomMenuButton';

interface BottomMenuBaseProps {
  title: string;
  buttonElements: ReactElement;
  onClickDefaultCloseButton?: MouseEventHandler<HTMLButtonElement>;
}

const BottomMenuBase = (props: BottomMenuBaseProps) => {
  const { title, buttonElements, onClickDefaultCloseButton } = props;
  return (
    <div css={selfCss}>
      <div css={buttonContainerCss}>
        <Modal.Title css={titleCss}>{title}</Modal.Title>
        {buttonElements}
      </div>

      <div css={buttonContainerCss}>
        <BottomMenuCloseButton
          css={closeButtonCss}
          onClick={onClickDefaultCloseButton}
        >
          <VisuallyHidden>닫기 버튼</VisuallyHidden>
        </BottomMenuCloseButton>
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
  position.x('center', 'fixed'),
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

const closeButtonCss = css({
  borderTop: 0,
});
