import { useModal } from '~/components/GlobalModal';

export const useSignInGuideModal = () => {
  const { openModal, closeModal } = useModal();

  const openSignInGuideModal = () => {
    openModal('alert', {
      title: '알림',
      description: '로그인이 필요한 기능입니다.',
      actionText: '확인',
      onClickAction: closeModal,
    });
  };

  return { openSignInGuideModal };
};
