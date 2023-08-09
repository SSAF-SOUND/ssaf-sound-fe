import Link from 'next/link';

import { css } from '@emotion/react';

import { ArticleCategoryCard } from '~/components/ArticleCategoryCard';
import NavigationGroup from '~/components/NavigationGroup';
import { useArticleCategories } from '~/services/article';
import { flex, fontCss, palettes, topBarHeight } from '~/styles/utils';
import { routes } from '~/utils';

const ArticleCategoriesPage = () => {
  const { data: articleCategories } = useArticleCategories();

  return (
    <div css={selfCss}>
      <Link
        href={routes.articles.hot()}
        css={[hotLinkCss, { marginBottom: 56 }]}
      >
        Hot 게시글
      </Link>

      <div css={categoriesCss}>
        {articleCategories ? (
          articleCategories.map((articleCategory) => (
            <ArticleCategoryCard
              key={articleCategory.boardId}
              articleCategory={articleCategory}
            />
          ))
        ) : (
          <>
            {Array(5)
              .fill(undefined)
              .map((_, i) => (
                <ArticleCategoryCard.Skeleton key={i} />
              ))}
          </>
        )}
      </div>
      <NavigationGroup />
    </div>
  );
};

export default ArticleCategoriesPage;

const selfCss = css({ padding: `${topBarHeight + 40}px 15px` });

const hotLinkCss = css(
  {
    color: palettes.secondary.dark,
    '&:hover, &:focus-visible': { color: palettes.secondary.default },
    '&:active': { color: palettes.secondary.dark },
  },
  fontCss.style.B16,
  flex('center', 'flex-end', 'row')
);

const categoriesCss = css(flex('', '', 'column', 12));
