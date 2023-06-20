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
    withoutBackward = true,
    withoutTitle = true,
    withoutClose = true,
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
        withoutBackward && (
          <IconButton
            css={buttonCss}
            onClick={onClickBackward || handleClickBackward}
          >
            <Icon name="backward" size={iconSize} />
          </IconButton>
        )
      }
      center={withoutTitle && <div>{title}</div>}
      right={
        withoutClose && (
          <IconButton css={buttonCss} onClick={onClickClose}>
            <Icon name="close" size={iconSize} />
          </IconButton>
        )
      }
    />
  );
};

export default DefaultTitleBar;

const iconSize = 28;

const buttonCss = css({
  padding: 4,
});
