import type { RecruitFilterFormProps } from '~/components/Forms/RecruitFilterForm';

import { css } from '@emotion/react';

import { Icon, IconButton, Modal, VisuallyHidden } from '~/components/Common';
import { Scroll } from '~/components/Common/Scroll';
import { RecruitFilterForm } from '~/components/Forms/RecruitFilterForm';
import {
  colorMix,
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
  return (
    <div css={selfCss}>
      <header css={headerCss}>
        <Modal.Close asChild css={closeButtonCss}>
          <IconButton size={28}>
            <Icon name="close" size={24} />
          </IconButton>
        </Modal.Close>

        <Modal.Title css={titleCss}>상세 옵션 선택</Modal.Title>
      </header>

      <Scroll.Root css={{ height: 'max(500px, 50vh)' }}>
        <Scroll.Viewport css={{ borderRadius: 16 }}>
          <RecruitFilterForm css={formCss} {...props} />
        </Scroll.Viewport>
        <Scroll.Bar forceMount>
          <Scroll.Thumb />
        </Scroll.Bar>
      </Scroll.Root>
    </div>
  );
};

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
const formCss = css({
  backgroundColor: palettes.background.default,
  borderRadius: 'inherit',
  padding: '12px 18px 36px',
});

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
