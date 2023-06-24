import type { ReactElement } from 'react';

import { css } from '@emotion/react';

import { Modal, VisuallyHidden } from '~/components/Common';
import { flex, fontCss, palettes, position } from '~/styles/utils';

import BottomMenuButton from './BottomMenuButton';

interface BottomMenuBaseProps {
  title: string;
  buttonElements: ReactElement;
}

const BottomMenuBase = (props: BottomMenuBaseProps) => {
  const { title, buttonElements } = props;
  return (
    <div css={selfCss}>
      <div css={buttonContainerCss}>
        <Modal.Title css={titleCss}>{title}</Modal.Title>
        {buttonElements}
      </div>

      <div css={buttonContainerCss}>
        <BottomMenuButton css={closeButtonCss}>
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
