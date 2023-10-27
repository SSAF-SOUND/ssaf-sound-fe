import { css } from '@emotion/react';
import { useMemo } from 'react';

import { fontCss, palettes } from '~/styles/utils';
import { sanitizeHtml } from '~/utils';

export interface TermsDetailProps {
  className?: string;
  html: string;
}

export const TermsDetail = (props: TermsDetailProps) => {
  const { html: dirty, ...restProps } = props;
  const sanitized = useMemo(() => sanitizeHtml(dirty), [dirty]);
  return (
    <article
      css={selfCss}
      {...restProps}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

const selfCss = css(fontCss.style.R16, {
  '& h2': [fontCss.style.B24, { margin: '40px 0 10px' }],
  '& p': { marginTop: 12, marginBottom: 12 },
  '& ol': {
    listStyleType: 'number',
  },
  '& ul': {
    listStyleType: 'disc',
  },
  '& ol, & ul': {
    paddingLeft: 32,
    margin: '12px 0',
  },
  '& strong': {
    display: 'block',
    color: palettes.primary.default,
    fontWeight: 700,
  },
  '& em': [
    { fontStyle: 'italic', color: palettes.primary.default },
    fontCss.style.B18,
  ],
});
