import type { MouseEventHandler } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { Bar, Icon, IconButton } from '~/components/Common';
import { fixTopCenter, fontCss, zIndex } from '~/styles/utils';

interface DefaultTitleBarProps {
  title?: string;
  className?: string;
  withoutBackward?: boolean;
  withoutTitle?: boolean;
  withoutClose?: boolean;
  onClickBackward?: MouseEventHandler<HTMLButtonElement>;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;

  /**
   * - onClickBackward를 명시하지 않고, 여기에 path 를 입력하면 뒤로가기 버튼 누를 시 해당 path로 이동합니다.
   * - onClickBackward와 backwardAs를 모두 입력하지 않으면 기본값은 뒤로가기입니다.
   */
  backwardAs?: string;
}

const DefaultTitleBar = (props: DefaultTitleBarProps) => {
  const {
    title = '',
    withoutBackward = false,
    withoutTitle = false,
    withoutClose = false,
    onClickBackward,
    onClickClose,
    backwardAs,
    ...restProps
  } = props;
  const router = useRouter();

  const defaultHandleClickBackward = () => {
    if (backwardAs) return router.push(backwardAs);
    return router.back();
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
