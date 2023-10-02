import { css } from '@emotion/react';
import { useState } from 'react';

import { Button } from '~/components/Common/Button';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
import { useModal } from '~/components/GlobalModal';
import { useAsyncState } from '~/hooks';
import { RecruitCategoryName } from '~/services/recruit';
import { Theme } from '~/styles/utils';
import { noop } from '~/utils';

interface RecruitCompleteButtonProps {
  onClickRecruitComplete?: () => void;
}

export const RecruitCompleteButton = (props: RecruitCompleteButtonProps) => {
  const [completed, setCompleted] = useState(false);
  const { onClickRecruitComplete = noop } = props;
  const { loading, handleAsync: handleRecruitComplete } = useAsyncState(
    onClickRecruitComplete
  );
  const { openModal, closeModal } = useModal();

  const openRecruitCompleteReconfirmModal = () => {
    openModal('alert', {
      title: '알림',
      description: (
        <>
          <p>리쿠르팅 모집 기간이 지나지 않았습니다.</p>
          <p>모집완료 하시겠습니까?</p>
        </>
      ),
      actionText: '모집완료',
      cancelText: '취소',
      onClickAction: async () => {
        closeModal();
        await handleRecruitComplete();
        setCompleted(true);
      },
      onClickCancel: closeModal,
    });
  };

  const {
    formState: { defaultValues: { category: defaultCategory } = {} },
  } = useRecruitFormContext();

  const buttonTheme =
    defaultCategory === RecruitCategoryName.STUDY
      ? Theme.SECONDARY
      : Theme.PRIMARY;

  return completed ? (
    <Button css={completeButtonCss} size="lg" theme={buttonTheme} disabled>
      모집이 완료되었습니다
    </Button>
  ) : (
    <Button
      loading={loading}
      css={completeButtonCss}
      onClick={openRecruitCompleteReconfirmModal}
      size="lg"
      theme={buttonTheme}
    >
      리쿠르팅 모집완료
    </Button>
  );
};

const completeButtonCss = css({
  width: '100%',
  marginTop: 64,
});
