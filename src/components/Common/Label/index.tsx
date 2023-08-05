import type { ComponentPropsWithoutRef, ReactElement } from 'react';

import { css } from '@emotion/react';

import { flex, fontCss, palettes } from '~/styles/utils';

interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  name?: string;
  customNameElement?: ReactElement;
  children: ReactElement;
}

const Label = (props: LabelProps) => {
  const { name, customNameElement, children, ...restProps } = props;
  return (
    <label css={selfCss} {...restProps}>
      {customNameElement || <span css={labelCss}>{name}</span>}
      {children}
    </label>
  );
};

export default Label;

const selfCss = css(flex('flex-start', '', 'column', 10));
const labelCss = css({ color: palettes.font.blueGrey }, fontCss.style.R12);
