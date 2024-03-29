import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

type AlertTextSize = 'sm' | 'md' | 'lg';

export interface AlertTextProps {
  children: ReactNode;
  className?: string;
  size?: AlertTextSize;
  bold?: boolean;
  label?: string;
}

export const AlertText = (props: AlertTextProps) => {
  const { children, className, size = 'sm', bold = false, label } = props;
  const ariaLabel = label
    ? label
    : typeof children === 'string'
    ? children
    : undefined;

  return (
    <p
      aria-label={ariaLabel}
      role="alert"
      css={[selfCss, sizeCss[size], bold && boldCss]}
      className={className}
    >
      {children}
    </p>
  );
};

const selfCss = css(
  {
    color: palettes.error.default,
  },
  fontCss.family.auto
);

const sizeCss = {
  sm: css(fontCss.style.R14),
  md: css(fontCss.style.R16),
  lg: css(fontCss.style.R18),
};

const boldCss = css({
  fontWeight: 700,
});
