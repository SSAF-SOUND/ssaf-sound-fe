import type { MouseEventHandler } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Bar, Button, Icon } from '~/components/Common';
import { fontCss } from '~/styles/utils';

import IconButton from '../Common/IconButton';

interface FormTitleBarProps {
  title: string;
  submitButtonText: string;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const FormTitleBar = (props: FormTitleBarProps) => {
  const {
    title,
    submitButtonText,
    isSubmitDisabled = false,
    isSubmitting = false,
    onClickClose,
    ...restProps
  } = props;

  const isSubmitButtonDisabled = isSubmitDisabled || isSubmitting;

  const router = useRouter();

  const defaultHandleClickClose = () => {
    router.back();
  };

  return (
    <Bar
      {...restProps}
      left={
        <IconButton
          size={iconButtonSize}
          onClick={onClickClose || defaultHandleClickClose}
        >
          <Icon name="close" size={iconSize} />
        </IconButton>
      }
      center={<h2 css={titleCss}>{title}</h2>}
      right={
        <Button
          variant="literal"
          type="submit"
          css={submitButtonCss}
          loading={isSubmitting}
          disabled={isSubmitButtonDisabled}
        >
          {submitButtonText}
        </Button>
      }
    />
  );
};

export default FormTitleBar;

const iconSize = 28;
const iconButtonSize = iconSize + 8;

const titleCss = css(
  {
    flexGrow: 1,
    textAlign: 'left',
  },
  fontCss.style.R16
);

const submitButtonCss = css(
  {
    padding: 6,
  },
  fontCss.style.R16
);
