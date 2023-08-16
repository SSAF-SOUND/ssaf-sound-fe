import type { LinkProps } from 'next/link';

import { memo } from 'react';

import TitleBar from '~/components/TitleBar';

interface SubmitBarProps {
  title: string;
  submitButtonText: string;
  onClickClose?: LinkProps['href'];
}

const SubmitBar = (props: SubmitBarProps) => {
  const { title, submitButtonText, onClickClose } = props;
  return (
    <TitleBar.Form
      title={title}
      submitButtonText={submitButtonText}
      onClickClose={onClickClose}
    />
  );
};

export default memo(SubmitBar);
