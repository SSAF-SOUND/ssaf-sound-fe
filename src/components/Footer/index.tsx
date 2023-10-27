import type { LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Logo } from '~/components/Common/Logo';
import { expandCss, fontCss, palettes } from '~/styles/utils';
import { routes } from '~/utils';

export const Footer = () => {
  return (
    <footer css={selfCss}>
      <h2 css={{ marginBottom: 36 }}>
        <Logo size="sm" />
      </h2>

      <FooterRow>
        <FooterInternalLink css={fontCss.style.B12} href={routes.legal}>
          커뮤니티 이용 약관 및 개인정보 처리 방침
        </FooterInternalLink>
      </FooterRow>

      <FooterRow>
        <span>팀 연락처: </span>
        <FooterExternalLink href="mailto:ssafsound@gmail.com">
          ssafsound@gmail.com
        </FooterExternalLink>
      </FooterRow>

      <FooterRow>© 2023. SSAF SOUND. All rights reserved.</FooterRow>
    </footer>
  );
};

const selfCss = css(
  {
    padding: 10,
    backgroundColor: palettes.grey0,
    color: palettes.grey4,
  },
  fontCss.family.pretendard,
  fontCss.style.R12,
  expandCss()
);

const FooterRow = (props: ComponentPropsWithoutRef<'div'>) => {
  return <div css={{ marginBottom: 20 }} {...props} />;
};

const FooterInternalLink = (props: LinkProps & PropsWithChildren) => {
  return <Link css={footerLinkCss} {...props} />;
};

const FooterExternalLink = (props: ComponentPropsWithoutRef<'a'>) => {
  return <a css={footerLinkCss} {...props} />;
};

const footerLinkCss = css({
  '&:hover, &:focus-visible': {
    color: palettes.recruit.default,
  },
  '&:active': {
    color: palettes.recruit.dark,
  },
});
