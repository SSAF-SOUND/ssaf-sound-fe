import { css } from '@emotion/react';

import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { Modal } from '~/components/Common/Modal';
import { Scroll } from '~/components/Common/Scroll';
import { flex, fontCss, palettes, position } from '~/styles/utils';
import { sanitizeHtml } from '~/utils';

export interface TermsOfServiceProps {
  title: string;
  html: string;
}

export const TermsOfService = (props: TermsOfServiceProps) => {
  const { title, html } = props;
  const sanitizedHtml = sanitizeHtml(html);

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
            <article
              css={termsDetailCss}
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
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

const termsDetailCss = css(fontCss.style.R16, {
  '& h2': [fontCss.style.B24, { margin: '40px 0 10px' }],
  '& p': { marginTop: 12, marginBottom: 12 },
  '& ol': {
    listStyleType: 'number',
  },
  '& ul': {
    listStyleType: 'disc',
  },
  '& ol, & ul': {
    paddingLeft: 32,
    margin: '12px 0',
  },
  '& strong': {
    display: 'block',
    color: palettes.primary.default,
    fontWeight: 700,
  },
  '& em': [
    { fontStyle: 'italic', color: palettes.primary.default },
    fontCss.style.B18,
  ],
});
