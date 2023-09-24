import type { LinkProps } from 'next/link';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { flex, fontCss } from '~/styles/utils';

export interface PreviewTitleBarProps {
  className?: string;
  title: string;
  moreLinkRoute: LinkProps['href'];
}

export const PreviewTitleBar = (props: PreviewTitleBarProps) => {
  const { className, title, moreLinkRoute } = props;

  return (
    <header css={selfCss} className={className}>
      <h3 css={titleCss}>{title}</h3>

      <Button asChild css={moreLinkCss} variant="literal">
        <Link href={moreLinkRoute}>더보기</Link>
      </Button>
    </header>
  );
};

const selfCss = css(flex('center', 'space-between', 'row'));
const titleCss = css(fontCss.style.B24);
const moreLinkCss = css({ padding: 0 });
