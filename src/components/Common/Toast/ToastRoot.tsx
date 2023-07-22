import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { css } from '@emotion/react';

import { flex, fontCss } from '~/styles/utils';

interface ToastRootProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  icon: ReactNode;
}

const ToastRoot = (props: ToastRootProps) => {
  const { children, icon, ...restProps } = props;

  return (
    <div css={selfCss} {...restProps}>
      <div css={iconLayerCss}>{icon}</div>
      <div>{children}</div>
    </div>
  );
};

export default ToastRoot;

const selfCss = css(
  {
    cursor: 'pointer',
    transition: 'transform 200ms',
    padding: 10,
    paddingLeft: 6,
    margin: '-4px -10px', // 기본 스타일때문에.
    ':hover': {
      transform: 'translate3d(0, -2px, 0)',
    },
    ':active': {
      transform: 'translate3d(0, 2px, 0)',
    },
  },
  fontCss.family.auto,
  fontCss.style.B12,
  flex('center', 'space-between', 'row', 8)
);

const iconLayerCss = css(flex('center'));
