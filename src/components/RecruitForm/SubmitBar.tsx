import { memo } from 'react';

import TitleBar from '~/components/TitleBar';

interface SubmitBarProps {
  title: string;
  submitButtonText: string;
  onClickClose?: () => void;
}

const SubmitBar = (props: SubmitBarProps) => {
  const { title, submitButtonText, onClickClose } = props;
  return (
    <TitleBar.RecruitForm
      title={title}
      submitButtonText={submitButtonText}
      onClickClose={onClickClose}
    />
  );
};

export default memo(SubmitBar);
