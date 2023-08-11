import type { CustomNextPage } from 'next/types';

import Link from 'next/link';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';

import { ArticleCategoryCard } from '~/components/ArticleCategoryCard';
import { PageHead } from '~/components/Common';
import NavigationGroup from '~/components/NavigationGroup';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import { getArticleCategories, useArticleCategories } from '~/services/article';
import { flex, fontCss, palettes, topBarHeight } from '~/styles/utils';
import { routes } from '~/utils';

const metaTitle = '게시글 카테고리 모음';
const metaDescription =
  'SSAF SOUND의 모든 게시글 카테고리를 모아볼 수 있는 페이지입니다.';

const ArticleCategoriesPage: CustomNextPage = () => {
  const { data: articleCategories } = useArticleCategories();

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
        }}
      />

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
    </>
  );
};

export default ArticleCategoriesPage;
ArticleCategoriesPage.headingText = metaTitle;

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

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: queryKeys.articles.categories(),
      queryFn: getArticleCategories,
    });
  } catch (err) {
    throw new Error('getArticleCategories 실패');
  }

  const { dehydratedState } = dehydrate(queryClient);

  return {
    props: {
      dehydratedState,
    },
  };
};
