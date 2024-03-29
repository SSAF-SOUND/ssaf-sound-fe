import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { BreadCrumbs, breadcrumbsHeight } from '~/components/BreadCrumbs';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import { useModal } from '~/components/GlobalModal';
import MyInfoSettings from '~/components/MyInfoSettings';
import TitleBar from '~/components/TitleBar';
import { ProfileVisibilityToggle } from '~/components/Toggles';
import { useSignOutReconfirmModal } from '~/hooks';
import {
  CertificationState,
  useMyInfo,
  useProfileVisibility,
  useUpdateProfileVisibility,
} from '~/services/member';
import {
  expandCss,
  flex,
  globalVars,
  pageCss,
  palettes,
  titleBarHeight,
} from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  handleAxiosError,
  routes,
} from '~/utils';
import { EditableMyInfoFields } from '~/utils/client-routes/profile';

const metaTitle = '프로필 설정';

const MyInfoSettingsPage: CustomNextPage = () => {
  const { data: myInfo } = useMyInfo();

  const isSsafyMember = !!myInfo?.ssafyMember;
  const isCertified =
    myInfo?.ssafyInfo?.certificationState === CertificationState.CERTIFIED;
  const router = useRouter();

  const { openSignOutReconfirmModal, isSigningOut } = useSignOutReconfirmModal({
    onSignOutSuccess: () => router.replace(routes.main()),
  });

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <main css={selfCss}>
        <div>
          <TitleBar.Default
            title="프로필 설정"
            withoutClose
            footer={
              <BreadCrumbs
                entries={[
                  { name: '프로필', link: routes.profile.self() },
                  {
                    name: '내 정보 설정',
                    link: routes.profile.myInfoSettings(),
                    active: true,
                  },
                ]}
              />
            }
          />

          <nav css={[pageExpandCss, { marginBottom: 40 }]}>
            <MyInfoSettings.NavTitle css={navTitleCss}>
              내 정보
            </MyInfoSettings.NavTitle>

            <MyInfoSettings.NavItem
              href={routes.profile.edit.myInfo(EditableMyInfoFields.NICKNAME)}
            >
              닉네임 수정
            </MyInfoSettings.NavItem>

            <MyInfoSettings.NavItem
              href={routes.profile.edit.myInfo(EditableMyInfoFields.IS_MAJOR)}
            >
              전공자 여부
            </MyInfoSettings.NavItem>

            {isSsafyMember && !isCertified && (
              <MyInfoSettings.NavItem href={routes.certification.student()}>
                SSAFY 인증
              </MyInfoSettings.NavItem>
            )}

            <MyInfoSettings.NavItem
              withStateCss={false}
              withIcon={false}
              asLink={false}
            >
              <span>내 프로필 공개</span>
              <ProfileVisibilityToggleLayer />
            </MyInfoSettings.NavItem>
          </nav>

          <nav css={[pageExpandCss, { marginBottom: 40 }]}>
            <MyInfoSettings.NavTitle css={navTitleCss}>
              SSAFY 정보
            </MyInfoSettings.NavTitle>

            <MyInfoSettings.NavItem
              href={routes.profile.edit.myInfo(
                EditableMyInfoFields.SSAFY_BASIC_INFO
              )}
            >
              SSAFY 기본 정보
            </MyInfoSettings.NavItem>
            {isCertified && (
              <MyInfoSettings.NavItem
                href={routes.profile.edit.myInfo(EditableMyInfoFields.TRACK)}
              >
                SSAFY 트랙
              </MyInfoSettings.NavItem>
            )}
          </nav>
        </div>

        <div css={[pageExpandCss, bottomNavLayerCss]}>
          <div css={[separatorCss, { marginBottom: 20 }]} />

          <MyInfoSettings.NavButton
            onClick={() => openSignOutReconfirmModal()}
            disabled={isSigningOut}
            css={cursorCss}
          >
            로그아웃
          </MyInfoSettings.NavButton>

          <MyInfoSettings.NavItem href={routes.profile.delete.account()}>
            회원 탈퇴
          </MyInfoSettings.NavItem>
        </div>
      </main>

      <Footer />
    </>
  );
};

const selfPaddingY = `${titleBarHeight + breadcrumbsHeight + 30}px`;
const selfCss = css(
  {
    padding: `${selfPaddingY} 0`,
  },
  pageCss.minHeight,
  flex('', '', 'column')
);

const pageExpandCss = expandCss(globalVars.mainLayoutPaddingX.var);

const separatorCss = css({
  width: 'auto',
  height: 1,
  backgroundColor: palettes.font.blueGrey,
});

const navTitleCss = css({ padding: `0 ${globalVars.mainLayoutPaddingX.var}` });

const bottomNavLayerCss = css({ flexGrow: 1 }, flex('', 'flex-end'));

const cursorCss = css({ cursor: 'pointer' });

export default MyInfoSettingsPage;
MyInfoSettingsPage.auth = createAuthGuard();
MyInfoSettingsPage.meta = createNoIndexPageMetaData(metaTitle);

const ProfileVisibilityToggleLayer = () => {
  const { openModal, closeModal } = useModal();
  const { data: profileVisibility } = useProfileVisibility();
  const {
    mutateAsync: updatePortfolioVisibility,
    isLoading: isUpdatingPortfolioVisibility,
  } = useUpdateProfileVisibility();

  const openPrivateProfileAlertModal = () => {
    openModal('alert', {
      title: '알림',
      description: '포트폴리오 및 프로젝트, 스터디 정보가 비공개됩니다.',
      actionText: '확인',
      onClickAction: closeModal,
    });
  };

  const handleToggleProfileVisibility = async (isPublic: boolean) => {
    if (!isPublic) {
      openPrivateProfileAlertModal();
    }

    try {
      await updatePortfolioVisibility({ isPublic });
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return !profileVisibility ? (
    <ProfileVisibilityToggle.Skeleton />
  ) : (
    <ProfileVisibilityToggle
      isPublic={profileVisibility.isPublic}
      disabled={isUpdatingPortfolioVisibility}
      onPressedChange={handleToggleProfileVisibility}
    />
  );
};
