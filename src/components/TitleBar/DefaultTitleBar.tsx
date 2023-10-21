import type { MouseEventHandler, ReactNode } from 'react';
import type { Route } from '~/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Bar } from '~/components/Common/Bar';
import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { fixTopCenter, zIndex } from '~/styles/utils';

export interface DefaultTitleBarProps {
  title?: string;
  className?: string;
  withoutBackward?: boolean;
  withoutTitle?: boolean;
  withoutClose?: boolean;
  onClickBackward?: Route | MouseEventHandler<HTMLButtonElement>;
  onClickClose?: Route | MouseEventHandler<HTMLButtonElement>;
  footer?: ReactNode;
}

export enum DefaultTitleBarIconLabel {
  BACKWARD = '뒤로가기',
  CLOSE = '닫기',
}

export const DefaultTitleBar = (props: DefaultTitleBarProps) => {
  const {
    title = '',
    withoutBackward = false,
    withoutTitle = false,
    withoutClose = false,
    onClickBackward,
    onClickClose,
    footer,
    ...restProps
  } = props;

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

  const handleClickBackward: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!onClickBackward) {
      defaultHandleClickClose();
      return;
    }

    if (typeof onClickBackward === 'function') {
      onClickBackward(e);
      return;
    }

    router.push(onClickBackward);
  };

  return (
    <div css={selfCss}>
      <Bar
        css={barCss}
        {...restProps}
        left={
          <IconButton
            size={iconButtonSize}
            css={withoutBackward && visuallyHiddenCss}
            onClick={handleClickBackward}
            aria-hidden={withoutBackward && 'true'}
            disabled={withoutBackward}
          >
            <Icon
              name="backward"
              label={DefaultTitleBarIconLabel.BACKWARD}
              size={iconSize}
            />
          </IconButton>
        }
        center={
          <h2
            css={withoutTitle && visuallyHiddenCss}
            aria-hidden={withoutTitle && 'true'}
          >
            {title}
          </h2>
        }
        right={
          <IconButton
            size={iconButtonSize}
            css={withoutClose && visuallyHiddenCss}
            onClick={handleClickClose}
            aria-hidden={withoutClose && 'true'}
            disabled={withoutClose}
          >
            <Icon
              name="close"
              label={DefaultTitleBarIconLabel.CLOSE}
              size={iconSize}
            />
          </IconButton>
        }
      />
      {footer}
    </div>
  );
};

const iconSize = 28;
const iconButtonSize = iconSize + 8;

const selfCss = css(
  {
    zIndex: zIndex.fixed.normal,
  },
  fixTopCenter
);

const barCss = css({
  padding: '0 25px',
});

const visuallyHiddenCss = css({
  opacity: 0,
  pointerEvents: 'none',
});
