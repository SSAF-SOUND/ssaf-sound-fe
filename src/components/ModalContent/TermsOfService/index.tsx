import { css } from '@emotion/react';

import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { Modal } from '~/components/Common/Modal';
import { Scroll } from '~/components/Common/Scroll';
import { TermsDetail } from '~/components/TermsDetail';
import { fontCss, palettes, position } from '~/styles/utils';

export interface TermsOfServiceProps {
  title: string;
  html: string;
}

export const TermsOfService = (props: TermsOfServiceProps) => {
  const { title, html } = props;

  return (
    <section css={selfCss}>
      <Scroll.Root css={scrollRootCss}>
        <header css={headerCss}>
          <Modal.Title css={titleCss}>{title}</Modal.Title>
          <Modal.Close asChild>
            <IconButton css={closeButtonCss}>
              <Icon name="close" label="약관 모달 닫기" size={40} />
            </IconButton>
          </Modal.Close>
        </header>

        <Scroll.Viewport css={scrollViewportCss}>
          <Modal.Description asChild>
            <TermsDetail html={html} />
          </Modal.Description>
        </Scroll.Viewport>

        <Scroll.Bar css={{ transform: 'translateX(0px)' }}>
          <Scroll.Thumb />
        </Scroll.Bar>
      </Scroll.Root>
    </section>
  );
};

const selfCss = css(
  {
    position: 'fixed',
    inset: 10,
    top: 40,
    bottom: 40,
    borderRadius: 10,
    backgroundColor: palettes.background.grey,
    overflow: 'hidden',
  },
  fontCss.family.auto
);

const scrollRootCss = css({ width: '100%', height: '100%', padding: 20 });

const scrollViewportCss = css({
  width: '100%',
  height: '90%',
});

const headerCss = css({
  position: 'relative',
  textAlign: 'center',
  marginBottom: 40,
});

const titleCss = css(fontCss.style.B24);

const closeButtonCss = css(position.xy('start', 'center', 'absolute'));
