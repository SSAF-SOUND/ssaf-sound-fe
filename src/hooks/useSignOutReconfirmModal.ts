import { useModal } from '~/components/GlobalModal';
import { useSignOut } from '~/services/auth';
import { useMyInfo } from '~/services/member';
import { handleAxiosError } from '~/utils';

interface UseSignOutReconfirmModalOptions {
  onSignOutSuccess: () => void;
}

export const useSignOutReconfirmModal = (
  options: Partial<UseSignOutReconfirmModalOptions> = {}
) => {
  const { onSignOutSuccess } = options;
  const { data: myInfo } = useMyInfo();
  const { openModal, closeModal } = useModal();
  const { mutateAsync: signOut, isLoading: isSigningOut } = useSignOut();

  const handleClickAction = async () => {
    closeModal();

    try {
      await signOut(undefined);
      onSignOutSuccess?.();
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const openSignOutReconfirmModal = () => {
    if (!myInfo) return;

    openModal('alert', {
      title: '알림',
      description: `${myInfo?.nickname}님 로그아웃 하시겠습니까?`,
      cancelText: '취소',
      actionText: '로그아웃',
      onClickAction: handleClickAction,
      onClickCancel: closeModal,
    });
  };

  return {
    openSignOutReconfirmModal,
    isSigningOut,
  };
};
