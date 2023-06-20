import type { MouseEventHandler } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Bar, Icon } from '~/components/Common';
import IconButton from '~/components/Common/IconButton';

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

  const handleClickBackward = () => {
    router.back();
  };

  return (
    <Bar
      {...restProps}
      left={
        <IconButton
          css={[buttonCss, withoutBackward && visuallyHiddenCss]}
          onClick={onClickBackward || handleClickBackward}
          aria-hidden={withoutBackward && 'true'}
        >
          <Icon name="backward" size={iconSize} />
        </IconButton>
      }
      center={
        <div
          css={withoutTitle && visuallyHiddenCss}
          aria-hidden={withoutTitle && 'true'}
        >
          {title}
        </div>
      }
      right={
        <IconButton
          css={[buttonCss, withoutClose && visuallyHiddenCss]}
          onClick={onClickClose}
          aria-hidden={withoutClose && 'true'}
        >
          <Icon name="close" size={iconSize} />
        </IconButton>
      }
    />
  );
};

export default DefaultTitleBar;

const iconSize = 28;

const visuallyHiddenCss = css({
  opacity: 0,
  pointerEvents: 'none',
});

const buttonCss = css({
  padding: 4,
});
