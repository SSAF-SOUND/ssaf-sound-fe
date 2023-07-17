import type { CustomNextPage } from 'next/types';

import { css } from '@emotion/react';
import { useState } from 'react';

import { DefaultFullPageLoader, Toggle } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import MyInfoSettings from '~/components/MyInfoSettings';
import TitleBar from '~/components/TitleBar';
import { useSignOut } from '~/services/auth';
import { CertificationState, useMyInfo } from '~/services/member';
import { fontCss, globalVars, pageMinHeight, palettes } from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';

const MyInfoSettingsPage: CustomNextPage = () => {
  const { data: myInfo } = useMyInfo();
  const isCertified =
    myInfo?.ssafyInfo?.certificationState === CertificationState.CERTIFIED;
  const { openModal, closeModal } = useModal();
  const { mutate: signOut, isLoading: isSigningOut } = useSignOut();
  const handleSignOut = async () => {
    signOut(undefined, {
      onError: (err) => {
        handleAxiosError(err);
      },
    });
  };

  const openSignOutAlertModal = () => {
    openModal('alert', {
      title: '알림',
      description: `${myInfo?.nickname}님 로그아웃 하시겠습니까?`,
      cancelText: '취소',
      actionText: '로그아웃',
      onClickAction: handleSignOut,
      onClickCancel: closeModal,
    });
  };

  return (
    <div css={selfCss}>
      <TitleBar.Default
        css={{ marginBottom: 30 }}
        title="프로필 설정"
        withoutClose
      />

      <nav css={[expandCss, { marginBottom: 40 }]}>
        <MyInfoSettings.NavTitle css={navTitleCss}>
          내 정보
        </MyInfoSettings.NavTitle>

        <MyInfoSettings.NavItem href={routes.profile.edit.nickname()}>
          닉네임 수정
        </MyInfoSettings.NavItem>
        {!isCertified && (
          <MyInfoSettings.NavItem href={routes.certification.student()}>
            학생 인증
          </MyInfoSettings.NavItem>
        )}
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

        <MyInfoSettings.NavItem href={routes.profile.edit.year()}>
          SSAFY 기수
        </MyInfoSettings.NavItem>
        <MyInfoSettings.NavItem href={routes.profile.edit.campus()}>
          SSAFY 캠퍼스
        </MyInfoSettings.NavItem>
        <MyInfoSettings.NavItem href={routes.profile.edit.isMajor()}>
          SSAFY 전공자
        </MyInfoSettings.NavItem>
        <MyInfoSettings.NavItem href={routes.profile.edit.track()}>
          SSAFY 트랙
        </MyInfoSettings.NavItem>
      </nav>

      <div css={[expandCss, separatorCss, { marginBottom: 20 }]} />

      <div css={expandCss}>
        <button
          type="button"
          css={signOutButtonCss}
          onClick={openSignOutAlertModal}
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
  const { openModal, closeModal } = useModal();
  const [isPublic, setIsPublic] = useState(false);
  const toggleText = isPublic ? '공개' : '비공개';
  const handlePressedChange = () => {
    if (isPublic) {
      openModal('alert', {
        title: '알림',
        description: '포트폴리오 및 프로젝트, 스터디 정보가 비공개됩니다.',
        actionText: '확인',
        onClickAction: closeModal,
      });
    }
    setIsPublic((p) => !p);
  };

  return (
    <Toggle
      pressed={isPublic}
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
