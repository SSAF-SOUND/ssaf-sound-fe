import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

interface ArticleCardLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const ArticleCardLink = (props: ArticleCardLinkProps) => {
  return <Link {...props} css={selfCss} />;
};

export default ArticleCardLink;

const selfCss = css({
  display: 'block',
  backgroundColor: palettes.font.grey,
  border: `1px solid ${palettes.grey.default}`,
  borderRadius: 8,
  padding: '10px 20px',
  transition: 'transform 300ms, outline 100ms',
  ':hover, :focus-visible': {
    transform: 'translate3d(3px, 0, 0)',
    outline: `1px solid ${palettes.font.lightGrey}`,
  },
  ':active': {
    transform: 'translate3d(0, 0px, 0)',
    outlineWidth: 0,
  },
});
