import Link from 'next/link';

import { css } from '@emotion/react';

import { ArticleCategoryCard } from '~/components/ArticleCategoryCard';
import { PageHead, PageHeadingText } from '~/components/Common';
import NavigationGroup from '~/components/NavigationGroup';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import { getArticleCategories, useArticleCategories } from '~/services/article';
import { flex, fontCss, palettes, topBarHeight } from '~/styles/utils';
import { routes } from '~/utils';
import { globalMetaData } from '~/utils/metadata';

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
          url: routes.articles.categories(),
        }}
      />

      <PageHeadingText text={metaTitle} />

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
