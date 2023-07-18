import { useModal } from '~/components/GlobalModal';
import { palettes } from '~/styles/utils';

interface DescriptionProps {
  nickname: string;
}
const Description = (props: DescriptionProps) => {
  const { nickname } = props;
  return (
    <p>
      닉네임을{' '}
      <strong style={{ color: palettes.primary.darken }}>{nickname}</strong>
      (으)로 설정하시겠습니까?
    </p>
  );
};

interface OpenNicknameReconfirmModalParams {
  onClickAction: () => void;
  nickname: string;
}

export const useNicknameReconfirmModal = () => {
  const { openModal, closeModal } = useModal();
  const openNicknameReconfirmModal = (
    params: OpenNicknameReconfirmModalParams
  ) => {
    const { nickname, onClickAction } = params;

    openModal('alert', {
      title: '알림',
      description: <Description nickname={nickname} />,
      actionText: '확인',
      cancelText: '취소',
      onClickAction: onClickAction,
      onClickCancel: closeModal,
    });
  };

  return { openNicknameReconfirmModal };
};
