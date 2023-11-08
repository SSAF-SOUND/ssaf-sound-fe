import type { LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Logo } from '~/components/Common/Logo';
import { colorMix, expandCss, fontCss, palettes } from '~/styles/utils';
import { routes } from '~/utils/routes';

const teamMail = 'ssafsound@gmail.com';

export const Footer = (props: ComponentPropsWithoutRef<'footer'>) => {
  return (
    <footer css={selfCss} {...props}>
      <h2 css={{ marginBottom: 36 }}>
        <Link href={routes.main()}>
          <Logo size="sm" />
        </Link>
      </h2>

      <FooterRow>
        <FooterInternalLink css={fontCss.style.B12} href={routes.legal(1)}>
          커뮤니티 이용 약관 및 개인정보 처리 방침
        </FooterInternalLink>
      </FooterRow>

      <FooterRow>
        <span>팀 연락처: </span>
        <FooterExternalLink href={`mailto:${teamMail}`}>
          {teamMail}
        </FooterExternalLink>
      </FooterRow>

      <FooterRow>© 2023. SSAF SOUND. All rights reserved.</FooterRow>
    </footer>
  );
};

const selfCss = css(
  {
    backgroundColor: colorMix('30%', palettes.grey0),
    color: palettes.grey4,
    padding: '40px 25px 90px',
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
    color: palettes.warning.default,
  },
  '&:active': {
    color: palettes.warning.dark,
  },
});
