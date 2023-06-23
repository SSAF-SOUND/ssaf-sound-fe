import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

type AlertTextSize = 'sm' | 'md' | 'lg';

interface AlertTextProps {
  children: ReactNode;
  className?: string;
  size?: AlertTextSize;
  bold?: boolean;
}

const AlertText = (props: AlertTextProps) => {
  const { children, className, size = 'sm', bold = false } = props;

  return (
    <p
      role="alert"
      css={[selfCss, sizeCss[size], bold && boldCss]}
      className={className}
    >
      {children}
    </p>
  );
};

export default AlertText;

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
