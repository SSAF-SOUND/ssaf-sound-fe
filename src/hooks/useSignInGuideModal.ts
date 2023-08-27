import { useRouter } from 'next/router';

import { useModal } from '~/components/GlobalModal';
import { getPathname, routes, webStorage } from '~/utils';

export const useSignInGuideModal = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const onClickAction = () => {
    closeModal();
    webStorage.setSignInReturnPage(getPathname());
    router.push(routes.signIn());
  };

  const openSignInGuideModal = () => {
    openModal('alert', {
      title: '알림',
      description: '로그인이 필요한 기능입니다.',
      cancelText: '취소',
      actionText: '로그인 하러 가기',
      onClickAction,
      onClickCancel: closeModal,
    });
  };

  return { openSignInGuideModal };
};
