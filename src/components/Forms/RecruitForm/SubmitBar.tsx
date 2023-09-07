import type { MouseEvent } from 'react';

import { memo } from 'react';
import { useFormState } from 'react-hook-form';

import { useRecruitCreateReconfirmModal } from '~/components/Forms/RecruitForm/utils';
import TitleBar from '~/components/TitleBar';

interface SubmitBarProps {
  editMode: boolean;
  title: string;
  submitButtonText: string;
  onClickClose?: () => void;
  onSubmit?: () => void;
}

const SubmitBar = (props: SubmitBarProps) => {
  const { editMode, title, submitButtonText, onClickClose, onSubmit } = props;
  const { openRecruitCreateReconfirmModal } = useRecruitCreateReconfirmModal({
    onClickAction: onSubmit,
  });

  const { isSubmitting } = useFormState();

  const onClickSubmitButton = editMode
    ? onSubmit
    : (e: MouseEvent) => {
        e.preventDefault();
        openRecruitCreateReconfirmModal();
      };

  return (
    <TitleBar.Form
      title={title}
      submitButtonText={submitButtonText}
      onClickClose={onClickClose}
      isSubmitting={isSubmitting}
      onClickSubmitButton={onClickSubmitButton}
    />
  );
};

export default memo(SubmitBar);
