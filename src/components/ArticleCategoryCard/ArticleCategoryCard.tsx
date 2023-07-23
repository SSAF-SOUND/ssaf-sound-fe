import type { ArticleCategory } from '~/services/articles';

import Link from 'next/link';

import { css } from '@emotion/react';

import { flex, fontCss, palettes } from '~/styles/utils';
import { routes } from '~/utils';

interface ArticleCategoryCardProps {
  articleCategory: ArticleCategory;
}

const suffix = '게시판';

const ArticleCategoryCard = (props: ArticleCategoryCardProps) => {
  const { articleCategory } = props;
  const { boardId, title } = articleCategory;
  const titleWithoutSuffix = title.replace(suffix, '').trim();

  return (
    <Link css={selfCss} href={routes.articles.category(boardId)}>
      {titleWithoutSuffix}
      <br />
      {suffix}
    </Link>
  );
};

export default ArticleCategoryCard;

const selfCss = css(
  {
    width: '100%',
    backgroundColor: palettes.white,
    color: palettes.black,
    padding: 28,
    borderRadius: 20,
    transition: 'transform 200ms',
    '&:hover, &:focus-visible': {
      transform: 'scale(1.02)',
    },
    '&:active': {
      transform: 'scale(0.99)',
    },
  },
  flex('center', 'flex-start', 'row'),
  fontCss.style.B20,
  fontCss.family.auto
);
