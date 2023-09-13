import type { RecruitFilterFormProps } from '~/components/Forms/RecruitFilterForm';

import { css } from '@emotion/react';

import { Icon, IconButton, Modal } from '~/components/Common';
import { Scroll } from '~/components/Common/Scroll';
import { RecruitFilterForm } from '~/components/Forms/RecruitFilterForm';
import {
  fixBottomCenter,
  flex,
  fontCss,
  palettes,
  position,
} from '~/styles/utils';

export interface RecruitFilterModalFormProps extends RecruitFilterFormProps {
  onClickClose?: () => void;
}

export const RecruitFilterModalForm = (props: RecruitFilterModalFormProps) => {
  const { onClickClose } = props;
  return (
    <div css={selfCss}>
      <header css={headerCss}>
        <Modal.Close asChild css={closeButtonCss} onClick={onClickClose}>
          <IconButton size={28}>
            <Icon name="close" size={24} />
          </IconButton>
        </Modal.Close>

        <Modal.Title css={titleCss}>상세 옵션 선택</Modal.Title>
      </header>

      <Scroll.Root css={scrollRootCss}>
        <Scroll.Viewport css={scrollViewportCss}>
          <RecruitFilterForm css={formCss} {...props} />
        </Scroll.Viewport>
        <Scroll.Bar forceMount>
          <Scroll.Thumb />
        </Scroll.Bar>
      </Scroll.Root>
    </div>
  );
};

const scrollRootHeight = 'max(500px, 50vh)';
const headerHeight = 52;
const borderRadius = 40;
const selfCss = css(
  fixBottomCenter,
  {
    borderRadius: 16,
    padding: '0 3px',
    paddingTop: headerHeight,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    backgroundColor: palettes.background.default,
    width: 'calc(100% - 12px)',
    marginLeft: 0,
  },
  fontCss.family.auto
);

const headerCss = css(
  position.xy('center', 'start'),
  {
    width: '100%',
    height: headerHeight,
    textAlign: 'center',
  },
  flex('center', 'center', 'row')
);
const closeButtonCss = css({ position: 'absolute', left: 24 });
const titleCss = css(fontCss.style.R12, { color: palettes.font.lightGrey });
const scrollRootCss = css({ height: scrollRootHeight });
const scrollViewportCss = css({
  borderRadius: 16,
  height: '100%',
  display: 'grid',

  // RadixScrollArea.Viewport > div 가 `display: table`로 고정되어 있어서 `height`가 고정되는 문제
  // 내부 구현에서 `display: table`을 사용하는 이유?
  // https://github.com/radix-ui/primitives/issues/926#issuecomment-1111961689
  '& > div': {
    display: 'flex !important',
  },
});
const formCss = css(
  {
    backgroundColor: palettes.background.default,
    borderRadius: 'inherit',
    padding: '12px 18px 36px',
  },
  flex('', 'space-between')
);
