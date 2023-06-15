import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { MdHome, MdArticle, MdGroupAdd, MdAccountCircle } from 'react-icons/md';

import { flexCss, fontCss, gutter } from '~/styles/utils';

const navItems = [
  {
    text: '홈',
    icon: <MdHome />,
    href: '/',
  },
  {
    text: '게시판',
    icon: <MdArticle />,
    href: '/boards',
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
];

interface GnbProps {}

const Gnb = (props: GnbProps) => {
  const router = useRouter();
  const { pathname } = router;
  console.log(pathname);

  return (
    <nav css={selfCss}>
      <div css={itemContainerCss}>
        {navItems.map((navItem) => {
          const { text, icon, href } = navItem;
          const isActive = href === pathname;

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

const selfCss = css({
  width: `calc(100% + ${gutter.mainLayout}px)`,
  height: '100%',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  overflow: 'hidden',
  boxShadow: '0px -7px 18px rgba(0, 0, 0, 0.05)',
  marginLeft: -(gutter.mainLayout / 2),
  padding: '0 20px',
});

const itemContainerCss = css(
  {
    width: '100%',
    height: '100%',
  },
  flexCss('center', 'center')
);

const itemCss = css(
  {
    width: '25%',
    height: 64,
    gap: 4,
  },
  flexCss('center', 'center', 'column')
);

const iconCss = css(
  {
    fontSize: 24,
  },
  flexCss('center', 'center')
);

const textCss = css(fontCss.style.B12);

const iconHighlightCss = css({
  color: '#0066ff',
});

export default Gnb;
