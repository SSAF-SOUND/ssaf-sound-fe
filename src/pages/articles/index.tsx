import Link from 'next/link';

import { css } from '@emotion/react';

import { ArticleCategoryCard } from '~/components/ArticleCategoryCard';
import NavigationGroup from '~/components/NavigationGroup';
import { useArticleCategories } from '~/services/article';
import { flex, fontCss, palettes, topBarHeight } from '~/styles/utils';

const ArticleCategoriesPage = () => {
  const { data: articleCategories } = useArticleCategories();

  return (
    <div css={selfCss}>
      <div css={[descriptionCss, { marginBottom: 24 }]}>
        <span>모아보기</span>
        <Link href="/" css={hotLinkCss}>
          Hot
        </Link>
      </div>
      <div css={categoriesCss}>
        {!articleCategories ? (
          <>
            {Array(6)
              .fill(undefined)
              .map((_, i) => (
                <ArticleCategoryCard.Skeleton key={i} />
              ))}
          </>
        ) : (
          articleCategories.map((articleCategory) => (
            <ArticleCategoryCard
              key={articleCategory.boardId}
              articleCategory={articleCategory}
            />
          ))
        )}
      </div>
      <NavigationGroup />
    </div>
  );
};

export default ArticleCategoriesPage;

const selfCss = css({ padding: `${topBarHeight + 40}px 15px` });

const descriptionCss = css(
  flex('center', 'space-between', 'row'),
  fontCss.style.B16
);

const hotLinkCss = css({
  color: palettes.secondary.dark,
});

const categoriesCss = css(flex('', '', 'column', 12));
