import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useMemo } from 'react';
import { MdHome, MdArticle, MdGroupAdd, MdAccountCircle } from 'react-icons/md';

import {
  flex,
  fontCss,
  gnbHeight,
  palettes,
  fixBottomCenter,
  zIndex,
} from '~/styles/utils';
import { routes } from '~/utils';

interface GnbProps {
  className?: string;
}

const Gnb = (props: GnbProps) => {
  const { className } = props;
  const navItems = useMemo(
    () => [
      {
        text: '홈',
        icon: <MdHome />,
        href: routes.main(),
      },
      {
        text: '게시판',
        icon: <MdArticle />,
        href: routes.articles.categories(),
      },
      {
        text: '리쿠르팅',
        icon: <MdGroupAdd />,
        href: '/recruit',
      },
      {
        text: '프로필',
        icon: <MdAccountCircle />,
        href: '/profile',
      },
    ],
    []
  );
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav css={selfCss} className={className}>
      <div css={itemContainerCss}>
        {navItems.map((navItem) => {
          const { text, icon, href } = navItem;
          const isActive = pathname.startsWith(href);

          return (
            <Link
              key={text}
              href={href}
              css={[itemCss, isActive && iconHighlightCss]}
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
      color: palettes.primary.default,
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

const iconHighlightCss = {
  color: palettes.primary.dark,
  ':hover': {
    color: palettes.primary.dark,
  },
};

export default Gnb;
