import type { MouseEventHandler } from 'react';
import type { Route } from '~/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Bar, Button, Icon, IconButton } from '~/components/Common';
import { fixTopCenter, fontCss, zIndex } from '~/styles/utils';

interface FormTitleBarProps {
  title: string;
  submitButtonText: string;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
  onClickClose?: Route | MouseEventHandler<HTMLButtonElement>;
  onClickSubmitButton?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const FormTitleBar = (props: FormTitleBarProps) => {
  const {
    title,
    submitButtonText,
    isSubmitDisabled = false,
    isSubmitting = false,
    onClickClose,
    onClickSubmitButton,
    ...restProps
  } = props;

  const isSubmitButtonDisabled = isSubmitDisabled || isSubmitting;

  const router = useRouter();

  const defaultHandleClickClose = () => {
    router.back();
  };

  const handleClickClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!onClickClose) {
      defaultHandleClickClose();
      return;
    }

    if (typeof onClickClose === 'function') {
      onClickClose(e);
      return;
    }

    router.push(onClickClose);
  };

  return (
    <Bar
      css={selfCss}
      {...restProps}
      left={
        <IconButton size={iconButtonSize} onClick={handleClickClose}>
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
          onClick={onClickSubmitButton}
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

const selfCss = css(
  {
    padding: '0 25px',
    zIndex: zIndex.fixed.normal,
  },
  fixTopCenter
);

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
