import type { ReactElement } from 'react';

import { css } from '@emotion/react';

import { flex, fontCss, palettes } from '~/styles/utils';

interface LabelProps {
  name: string;
  htmlFor?: string;
  className?: string;
  customNameElement?: ReactElement;
  children: ReactElement;
}

const Label = (props: LabelProps) => {
  const { name, htmlFor, className, customNameElement, children } = props;
  return (
    <label css={selfCss} className={className} htmlFor={htmlFor}>
      {customNameElement || <span css={labelCss}>{name}</span>}
      {children}
    </label>
  );
};

export default Label;

const selfCss = css(flex('flex-start', '', 'column', 10));
const labelCss = css({ color: palettes.font.blueGrey }, fontCss.style.R12);
