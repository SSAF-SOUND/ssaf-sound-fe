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
                cancelText="취소"
                title="탈퇴 안내"
                actionText="탈퇴합니다"
                description={
                  <div css={{ whiteSpace: 'pre-wrap' }}>{reconfirmMessage}</div>
                }
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

const reconfirmMessage = `회원 탈퇴를 하는 경우, 3개월간 SSAF SOUND 재가입이 불가능합니다. \n\n회원 탈퇴시 등록하신 리쿠르팅과 리쿠르팅 신청 및 참여는 자동으로 삭제됩니다. \n작성하신 게시글은 자동 삭제 처리가 되지 않고, 익명 처리 후 SSAF SOUND에 귀속됩니다.`;

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
