import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { flex, fontCss } from '~/styles/utils';
import { routes } from '~/utils';

interface HotArticlesPreviewHeaderProps {
  className?: string;
}

export const HotArticlesPreviewHeader = (
  props: HotArticlesPreviewHeaderProps
) => {
  const { className } = props;

  return (
    <header css={selfCss} className={className}>
      <h3 css={titleCss}>HOT 게시글</h3>

      <Button asChild css={moreLinkCss} variant="literal">
        <Link href={routes.articles.hot()}>더보기</Link>
      </Button>
    </header>
  );
};

const selfCss = css(flex('center', 'space-between', 'row'));
const titleCss = css(fontCss.style.B24);
const moreLinkCss = css({ padding: 0 });
