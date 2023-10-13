import type { ReactElement } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useMemo } from 'react';
import { MdHome, MdArticle, MdGroupAdd, MdAccountCircle } from 'react-icons/md';

import { useMyInfo } from '~/services/member';
import {
  flex,
  fontCss,
  gnbHeight,
  palettes,
  fixBottomCenter,
  zIndex,
  colorMix,
} from '~/styles/utils';
import { routes } from '~/utils';

export interface GnbProps {
  className?: string;
}

interface NavigationDetail {
  text: string;
  icon: ReactElement;
  pathname: string;
  auth: boolean;
}

const createNavigationDetail = (
  text: string,
  icon: ReactElement,
  pathname: string,
  auth?: boolean
): NavigationDetail => {
  return {
    text,
    icon,
    pathname,
    auth: auth ?? false,
  };
};

export const Gnb = (props: GnbProps) => {
  const { className } = props;
  const navItems = useMemo(
    () => [
      createNavigationDetail('홈', <MdHome />, routes.main()),
      createNavigationDetail(
        '게시판',
        <MdArticle />,
        routes.article.categories().pathname
      ),
      createNavigationDetail(
        '리쿠르팅',
        <MdGroupAdd />,
        routes.recruit.list().pathname
      ),
      createNavigationDetail(
        '프로필',
        <MdAccountCircle />,
        routes.profile.self().pathname,
        true
      ),
    ],
    []
  );
  const router = useRouter();
  const { pathname: currentPathname } = router;
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;

  return (
    <nav css={selfCss} className={className}>
      <div css={itemContainerCss}>
        {navItems.map((navItem) => {
          const { text, icon, pathname: itemPathname, auth } = navItem;
          const isActive = currentPathname === itemPathname;
          const isDisabled = auth && !isSignedIn;

          return (
            <Link
              key={text}
              href={itemPathname}
              css={[
                itemCss,
                isActive && iconHighlightCss,
                isDisabled && disableCss,
              ]}
            >
              <div css={iconCss}>{icon}</div>
              <p css={textCss}>{text}</p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

const selfCss = css(fixBottomCenter, {
  transition: 'opacity 200ms',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  overflow: 'hidden',
  boxShadow: '0px -7px 18px rgba(0, 0, 0, 0.05)',
  padding: '0 20px',
  background: palettes.white,
  color: palettes.black,
  zIndex: zIndex.fixed.normal,
});

const itemContainerCss = css(
  { width: '100%' },
  flex('center', 'center', 'row', 10)
);

const itemCss = css(
  {
    width: '25%',
    height: gnbHeight,
    ':hover': {
      color: palettes.primary.dark,
    },
    transition: 'color 200ms',
  },
  flex('center', 'center', 'column', 4)
);

const iconCss = css(
  {
    fontSize: 24,
  },
  flex('center', 'center', 'row')
);

const textCss = css(fontCss.style.B12);

const iconHighlightCss = css({
  color: palettes.primary.darken,
  ':hover': {
    color: palettes.primary.darken,
  },
});

const disableCss = css({
  color: colorMix('50%', palettes.font.grey),
  pointerEvents: 'none',
});
