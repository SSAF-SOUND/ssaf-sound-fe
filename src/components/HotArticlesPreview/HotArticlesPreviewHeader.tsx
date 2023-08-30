import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { flex, fontCss } from '~/styles/utils';
import { routes } from '~/utils';

export const HotArticlesPreviewHeader = () => {
  return (
    <header css={selfCss}>
      <h3 css={titleCss}>HOT 게시글</h3>

      <Button asChild css={fontCss.style.B16} variant="literal">
        <Link href={routes.articles.hot()}>더보기</Link>
      </Button>
    </header>
  );
};

const selfCss = css(flex('center', 'space-between', 'row'));
const titleCss = css(fontCss.style.B24);
