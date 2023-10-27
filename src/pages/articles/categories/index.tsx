import Link from 'next/link';

import { css } from '@emotion/react';

import { ArticleCategoryCard } from '~/components/ArticleCategoryCard';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import NavigationGroup from '~/components/NavigationGroup';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import { getArticleCategories } from '~/services/article/apis';
import { useArticleCategories } from '~/services/article/hooks';
import { flex, fontCss, pageCss, palettes, topBarHeight } from '~/styles/utils';
import { globalMetaData } from '~/utils/metadata';
import { routes } from '~/utils/routes';

const metaTitle = '게시판 모음';
const metaDescription = `${globalMetaData.description} 다양한 주제로 소통할 수 있는 게시판 기능을 이용해보세요.`;

const ArticleCategoriesPage = () => {
  const { data: articleCategories } = useArticleCategories();

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.article.categories().pathname,
        }}
      />

      <PageHeadingText text={metaTitle} />

      <main css={selfCss}>
        <NavigationGroup />

        <div css={hotArticlesPageLinkLayerCss}>
          <Link
            href={routes.article.hot()}
            css={[hotArticlesPageLinkCss, { marginBottom: 56 }]}
          >
            Hot 게시글
          </Link>
        </div>

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
      </main>

      <Footer />
    </>
  );
};

export default ArticleCategoriesPage;

const selfCss = css({ padding: `${topBarHeight + 40}px 0` }, pageCss.minHeight);

const hotArticlesPageLinkLayerCss = css(flex('center', 'flex-end', 'row'));

const hotArticlesPageLinkCss = css(
  {
    color: palettes.secondary.dark,
    '&:hover, &:focus-visible': { color: palettes.secondary.default },
    '&:active': { color: palettes.secondary.dark },
  },
  fontCss.style.B16
);

const categoriesCss = css(flex('', '', 'column', 12));

export const getStaticProps = async () => {
  const dehydrate = prefetch({
    queryKey: queryKeys.articles.categories(),
    queryFn: getArticleCategories,
  });

  const { dehydratedState } = await dehydrate();

  return {
    props: {
      dehydratedState,
    },
  };
};
