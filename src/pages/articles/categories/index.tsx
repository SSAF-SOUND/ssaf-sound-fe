import Link from 'next/link';

import { css } from '@emotion/react';

import { ArticleCategoryCard } from '~/components/ArticleCategoryCard';
import { Button } from '~/components/Common/Button';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import NavigationGroup from '~/components/NavigationGroup';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import { getArticleCategories } from '~/services/article/apis';
import { useArticleCategories } from '~/services/article/hooks';
import { flex, pageCss, palettes, Theme, topBarHeight } from '~/styles/utils';
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

        <div css={extraLinkContainerCss}>
          <Button
            asChild
            variant="literal"
            css={{ color: palettes.primary.default }}
          >
            <Link css={extraLinkCss} href={routes.article.all()}>
              전체 게시판
            </Link>
          </Button>
          <Button
            asChild
            variant="literal"
            theme={Theme.SECONDARY}
            css={{ color: palettes.secondary.dark }}
          >
            <Link css={extraLinkCss} href={routes.article.hot()}>
              HOT 게시판
            </Link>
          </Button>
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

const extraLinkContainerCss = css(
  { marginBottom: 56 },
  flex('center', 'space-between', 'row')
);

const extraLinkCss = css({});

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
