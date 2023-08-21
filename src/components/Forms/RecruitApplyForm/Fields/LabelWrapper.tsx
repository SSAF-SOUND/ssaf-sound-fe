import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';

import { flex } from '~/styles/utils';

interface LabelWrapperProps extends ComponentPropsWithoutRef<'label'> {}

export const LabelWrapper = (props: LabelWrapperProps) => {
  const { children, ...restProps } = props;
  return (
    <label css={selfCss} {...restProps}>
      {children}
    </label>
  );
};

const selfCss = css(flex('', '', 'column', 10));
