import { BoldText } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';

const RecruitCreateReconfirmModalDescription = () => (
  <>
    <p css={{ margin: '12px 0' }}>수정할 때 몇가지 제약사항이 있습니다.</p>
    <p>
      1. 리크루팅을 등록한 뒤, <BoldText>등록자 질문</BoldText>은{' '}
      <BoldText>수정이 불가능합니다.</BoldText>
    </p>
    <p css={{ marginBottom: 12 }}>
      2. <BoldText>모집기간</BoldText>을 기준으로 모집날짜가 지날 시,{' '}
      <BoldText>자동으로 모집 완료됩니다.</BoldText>
    </p>
    <p>리쿠르팅을 등록하시겠습니까?</p>
  </>
);

interface UseRecruitCreateReconfirmModalParams {
  onClickAction?: () => void;
}

export const useRecruitCreateReconfirmModal = (
  params: UseRecruitCreateReconfirmModalParams
) => {
  const { onClickAction } = params;
  const { openModal, closeModal } = useModal();

  const openRecruitCreateReconfirmModal = () => {
    openModal('alert', {
      title: '등록전 안내사항',
      description: <RecruitCreateReconfirmModalDescription />,
      actionText: '등록',
      cancelText: '취소',
      onClickCancel: closeModal,
      onClickAction: () => {
        onClickAction?.();
        closeModal();
      },
    });
  };

  return {
    openRecruitCreateReconfirmModal,
  };
};
