import type { CustomNextPage } from 'next/types';
import type { ReactNode } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';
import { useState } from 'react';

import { DefaultFullPageLoader, Icon, Toggle } from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import {
  colorMix,
  flex,
  fontCss,
  globalVars,
  pageMinHeight,
  palettes,
} from '~/styles/utils';
import { routes } from '~/utils';

const MyInfoSettingsPage: CustomNextPage = () => {
  const handleSignOut = () => {};

  return (
    <div css={selfCss}>
      <TitleBar.Default
        css={{ marginBottom: 30 }}
        title="내정보 설정"
        withoutClose
      />

      <Nav heading="내 정보" css={{ marginBottom: 40 }}>
        <LinkItem href={''}>닉네임 수정</LinkItem>
        <LinkItem href={''}>학생 인증</LinkItem>
        <li css={itemCss}>
          <span>내 프로필 공개</span>
          <ProfileVisibilityToggle />
        </li>
      </Nav>

      <Nav heading="SSAFY 정보" css={{ marginBottom: 40 }}>
        <LinkItem href={''}>SSAFY 기수</LinkItem>
        <LinkItem href={''}>SSAFY 캠퍼스</LinkItem>
        <LinkItem href={''}>SSAFY 전공자</LinkItem>
        <LinkItem href={''}>SSAFY 트랙</LinkItem>
      </Nav>

      <div css={[expandCss, separatorCss, { marginBottom: 20 }]} />

      <div css={expandCss}>
        <button
          type="button"
          css={[itemCss, itemStateCss, signOutButtonCss]}
          onClick={handleSignOut}
        >
          <span>로그아웃</span>
          <Icon name="chevron.right" size={20} />
        </button>
      </div>
    </div>
  );
};

interface NavProps {
  className?: string;
  heading: string;
  children: ReactNode;
}
const Nav = (props: NavProps) => {
  const { heading, children, className } = props;
  return (
    <nav css={[expandCss]} className={className}>
      <h3 css={headingCss}>{heading}</h3>
      <ul>{children}</ul>
    </nav>
  );
};

interface LinkItemProps {
  children: string;
  href: string;
}
const LinkItem = (props: LinkItemProps) => {
  const { children, href } = props;
  return (
    <li>
      <Link href={href} css={[itemCss, itemStateCss]}>
        <span>{children}</span>
        <Icon name="chevron.right" size={20} />
      </Link>
    </li>
  );
};

const ProfileVisibilityToggle = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const toggleText = isPrivate ? '공개' : '비공개';
  const handlePressedChange = () => setIsPrivate((p) => !p);

  return (
    <Toggle
      pressed={isPrivate}
      onPressedChange={handlePressedChange}
      padding="3px 5px"
      thumbSize={20}
      textWidth={40}
      text={toggleText}
      css={fontCss.style.B12}
    />
  );
};

export default MyInfoSettingsPage;
MyInfoSettingsPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};

const selfPaddingX = '15px';
const totalPaddingX = `calc(${selfPaddingX} + ${globalVars.mainLayoutPaddingX.var})`;
const selfCss = css({
  padding: `0 ${selfPaddingX}`,
  minHeight: pageMinHeight,
  height: '100vh',
});

const expandCss = css({
  margin: `0 calc(-1 * ${totalPaddingX})`,
});

const headingCss = css(
  {
    padding: `0 ${totalPaddingX}`,
    marginBottom: 10,
    color: palettes.font.blueGrey,
  },
  fontCss.style.B14
);

const itemCss = css(
  { padding: '8px 25px', outline: 0 },
  flex('center', 'space-between', 'row'),
  fontCss.style.B18
);

const itemStateCss = css({
  transition: 'background-color 200ms',
  ':hover, :focus-visible': {
    backgroundColor: palettes.background.grey,
  },
  ':active': {
    backgroundColor: palettes.majorDark,
  },
  ':disabled': {
    pointerEvents: 'none',
    color: colorMix('50%', palettes.white),
  },
});

const separatorCss = css({
  width: 'auto',
  height: 1,
  backgroundColor: palettes.font.blueGrey,
});

const signOutButtonCss = css({
  width: '100%',
  color: palettes.white,
  cursor: 'pointer',
  backgroundColor: palettes.background.default,
});
