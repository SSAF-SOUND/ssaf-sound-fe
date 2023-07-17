import type { MouseEventHandler } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Bar, Icon, IconButton } from '~/components/Common';
import {
  fixTopCenter,
  fontCss,
  pageMaxWidth,
  pageMinWidth,
  position,
  zIndex,
} from '~/styles/utils';

interface DefaultTitleBarProps {
  title?: string;
  className?: string;
  withoutBackward?: boolean;
  withoutTitle?: boolean;
  withoutClose?: boolean;
  onClickBackward?: MouseEventHandler<HTMLButtonElement>;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;
}

const DefaultTitleBar = (props: DefaultTitleBarProps) => {
  const {
    title = '',
    withoutBackward = false,
    withoutTitle = false,
    withoutClose = false,
    onClickBackward,
    onClickClose,
    ...restProps
  } = props;
  const router = useRouter();

  const defaultHandleClickBackward = () => {
    router.back();
  };

  return (
    <Bar
      {...restProps}
      css={selfCss}
      left={
        <IconButton
          size={iconButtonSize}
          css={withoutBackward && visuallyHiddenCss}
          onClick={onClickBackward || defaultHandleClickBackward}
          aria-hidden={withoutBackward && 'true'}
          disabled={withoutBackward}
        >
          <Icon name="backward" size={iconSize} />
        </IconButton>
      }
      center={
        <h2
          css={[fontCss.style.R16, withoutTitle && visuallyHiddenCss]}
          aria-hidden={withoutTitle && 'true'}
        >
          {title}
        </h2>
      }
      right={
        <IconButton
          size={iconButtonSize}
          css={withoutClose && visuallyHiddenCss}
          onClick={onClickClose}
          aria-hidden={withoutClose && 'true'}
          disabled={withoutClose}
        >
          <Icon name="close" size={iconSize} />
        </IconButton>
      }
    />
  );
};

export default DefaultTitleBar;

const iconSize = 28;
const iconButtonSize = iconSize + 8;

const selfCss = css(
  {
    padding: '0 25px',
    zIndex: zIndex.fixed.normal,
  },
  fixTopCenter
);

const visuallyHiddenCss = css({
  opacity: 0,
  pointerEvents: 'none',
});
