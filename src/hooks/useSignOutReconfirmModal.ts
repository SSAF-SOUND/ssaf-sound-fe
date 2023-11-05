import { useModal } from '~/components/GlobalModal';
import { useSignOut } from '~/services/auth';
import { useMyInfo } from '~/services/member';
import { handleAxiosError } from '~/utils';

interface UseSignOutReconfirmModalOptions {
  onSignOutSuccess: () => void;
}

interface OpenSignOutReconfirmModalParams {
  description?: string;
  actionText?: string;
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

  const openSignOutReconfirmModal = (
    params: OpenSignOutReconfirmModalParams = {}
  ) => {
    if (!myInfo) return;
    const {
      description = `${myInfo?.nickname}님 로그아웃 하시겠습니까?`,
      actionText = '로그아웃',
    } = params;

    openModal('alert', {
      title: '알림',
      description,
      cancelText: '취소',
      actionText,
      onClickAction: handleClickAction,
      onClickCancel: closeModal,
    });
  };

  return {
    openSignOutReconfirmModal,
    isSigningOut,
  };
};
