import type { CustomNextPage } from 'next/types';

import { css } from '@emotion/react';
import { useState } from 'react';

import { DefaultFullPageLoader, Toggle } from '~/components/Common';
import MyInfoSettings from '~/components/MyInfoSettings';
import TitleBar from '~/components/TitleBar';
import { useSignOut } from '~/services/auth';
import { fontCss, globalVars, pageMinHeight, palettes } from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';

const MyInfoSettingsPage: CustomNextPage = () => {
  const { mutateAsync: signOut, isLoading: isSigningOut } = useSignOut();
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <div css={selfCss}>
      <TitleBar.Default
        css={{ marginBottom: 30 }}
        title="내정보 설정"
        withoutClose
      />

      <nav css={[expandCss, { marginBottom: 40 }]}>
        <MyInfoSettings.NavTitle css={navTitleCss}>
          내 정보
        </MyInfoSettings.NavTitle>

        <MyInfoSettings.NavItem>닉네임 수정</MyInfoSettings.NavItem>
        <MyInfoSettings.NavItem>학생 인증</MyInfoSettings.NavItem>
        <MyInfoSettings.NavItem
          withStateCss={false}
          withIcon={false}
          asLink={false}
        >
          <span>내 프로필 공개</span>
          <ProfileVisibilityToggle />
        </MyInfoSettings.NavItem>
      </nav>

      <nav css={[expandCss, { marginBottom: 40 }]}>
        <MyInfoSettings.NavTitle css={navTitleCss}>
          SSAFY 정보
        </MyInfoSettings.NavTitle>
        <MyInfoSettings.NavItem>SSAFY 기수</MyInfoSettings.NavItem>
        <MyInfoSettings.NavItem>SSAFY 캠퍼스</MyInfoSettings.NavItem>
        <MyInfoSettings.NavItem>SSAFY 전공자</MyInfoSettings.NavItem>
        <MyInfoSettings.NavItem>SSAFY 트랙</MyInfoSettings.NavItem>
      </nav>

      <div css={[expandCss, separatorCss, { marginBottom: 20 }]} />

      <div css={expandCss}>
        <button
          type="button"
          css={signOutButtonCss}
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <MyInfoSettings.NavItem asLink={false}>
            로그아웃
          </MyInfoSettings.NavItem>
        </button>
      </div>
    </div>
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

const separatorCss = css({
  width: 'auto',
  height: 1,
  backgroundColor: palettes.font.blueGrey,
});

const navTitleCss = css({ padding: `0 ${totalPaddingX}` });

const signOutButtonCss = css({
  width: '100%',
  color: palettes.white,
  padding: 0,
  cursor: 'pointer',
  backgroundColor: palettes.background.default,
  transition: 'background-color 200ms',
  ':focus-visible': {
    backgroundColor: palettes.background.grey,
  },
});
