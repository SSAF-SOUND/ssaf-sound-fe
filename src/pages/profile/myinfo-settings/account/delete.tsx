import type { CustomNextPage } from 'next/types';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { BreadCrumbs } from '~/components/BreadCrumbs';
import { Button } from '~/components/Common/Button';
import { Modal } from '~/components/Common/Modal';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Alert } from '~/components/ModalContent';
import TitleBar from '~/components/TitleBar';
import { useDeleteAccount } from '~/services/auth';
import { flex, fontCss, pageMinHeight, titleBarHeight } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
  customToast,
  handleAxiosError,
  routes,
} from '~/utils';

const titleBarTitle = '회원 탈퇴';
const metaTitle = titleBarTitle;

const DeleteAccountPage: CustomNextPage = () => {
  const router = useRouter();
  const {
    mutateAsync: deleteAccount,
    isLoading: isDeletingAccount,
    isSuccess: accountDeleted,
  } = useDeleteAccount();

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      customToast.success('회원 탈퇴가 완료되었습니다.');
      router.replace(routes.main());
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return (
    <>
      <PageHeadingText text={titleBarTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          title={titleBarTitle}
          withoutClose
          footer={
            <BreadCrumbs
              entries={[
                { name: '프로필', link: routes.profile.self() },
                { name: '내 정보 설정', link: routes.profile.myInfoSettings() },
                {
                  name: '회원 탈퇴',
                  link: routes.profile.delete.account(),
                  active: true,
                },
              ]}
            />
          }
        />
        <div css={descriptionCss}>
          <p>탈퇴 하시겠습니까?</p>
        </div>
        <div css={buttonLayerCss}>
          <Button size="lg" variant="inverse" css={buttonCss} asChild>
            <Link href={routes.profile.myInfoSettings()}>아니오</Link>
          </Button>
          <Modal
            trigger={
              <Button
                size="lg"
                css={buttonCss}
                disabled={accountDeleted}
                loading={isDeletingAccount}
              >
                네
              </Button>
            }
            content={
              <Alert
                actionText="회원 탈퇴"
                cancelText="취소"
                title="알림"
                description="SSAF SOUND의 회원 탈퇴를 진행합니다."
                onClickAction={handleDeleteAccount}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default DeleteAccountPage;
DeleteAccountPage.auth = createAuthGuard();
DeleteAccountPage.meta = createNoIndexPageMetaData(metaTitle);

const selfCss = css(
  {
    padding: `${titleBarHeight}px 0`,
    minHeight: `max(${pageMinHeight}px, 100vh)`,
  },
  flex('', '', 'column')
);
const descriptionCss = css(
  { flexGrow: 1 },
  flex('center', 'center'),
  fontCss.style.R16
);
const buttonCss = css({ width: '50%' });
const buttonLayerCss = css(flex('center', 'stretch', 'row', 16));
