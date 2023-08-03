import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';

import { ArticleCard } from '~/components/ArticleCard';
import { IntersectionArea, TextInput } from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import { getArticles, useArticles } from '~/services/article';
import {
  flex,
  globalVars,
  pageMaxWidth,
  pageMinHeight,
  pageMinWidth,
  palettes,
  position,
  titleBarHeight,
} from '~/styles/utils';
import { routes, scrollUpBy } from '~/utils';

const ArticleCategoryPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { categoryId } = props;
  const router = useRouter();
  const skeletonCount = 6;
  const {
    data: articles,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useArticles(categoryId);

  const categoryName = articles?.pages[0].posts[0].boardTitle;

  const getNextArticles = async () => {
    if (!hasNextPage || isFetchingNextPage) return;
    await fetchNextPage();

    /* 스크롤이 바닥에 닿아있으면, 자동 스크롤 조절이 되지 않기 때문에 `fetch`되자마자 스크롤을 1 올려줍니다. */
    scrollUpBy(1);
  };

  if (!articles) {
    return <div>No articles</div>;
  }

  return (
    <div css={selfCss}>
      <TitleBar.Default
        title={categoryName}
        onClickBackward={routes.articles.categories()}
        withoutClose
      />

      <div css={searchBarContainerCss}>
        <TextInput rounded size="md" css={searchBarCss} />
      </div>

      <div>
        <div css={articleContainerCss}>
          {articles.pages.map((page, index) => {
            return (
              <Fragment key={index}>
                {page.posts.map((article) => (
                  <ArticleCard key={article.postId} article={article} />
                ))}
              </Fragment>
            );
          })}
        </div>

        {hasNextPage && (
          <IntersectionArea
            css={skeletonContainerCss}
            onIntersection={getNextArticles}
          >
            {Array(skeletonCount)
              .fill(undefined)
              .map((_, index) => (
                <ArticleCard.Skeleton key={index} />
              ))}
          </IntersectionArea>
        )}
      </div>
    </div>
  );
};

export default ArticleCategoryPage;

/* css */

const selfPaddingX = 10;
const searchBarTop = titleBarHeight;
const searchBarContainerPaddingX = `calc(${selfPaddingX}px + ${globalVars.mainLayoutPaddingX.var})`;
const searchBarContainerHeight = 72;
const searchBarZIndex = 10;
const selfPaddingTop = searchBarTop + searchBarContainerHeight;

const selfCss = css(
  {
    padding: `${selfPaddingTop}px ${selfPaddingX}px 15px`,
    minHeight: pageMinHeight,
  },
  flex('', '', 'column')
);

const searchBarContainerCss = css(
  {
    width: '100%',
    minWidth: pageMinWidth,
    maxWidth: pageMaxWidth,
    padding: `8px ${searchBarContainerPaddingX} 0`,
    height: searchBarContainerHeight,
    top: searchBarTop,
    zIndex: searchBarZIndex,
    backgroundColor: palettes.background.default,
  },
  position.x('center', 'fixed')
);

const searchBarCss = css({
  width: '100%',
});

const listCss = css(flex('', '', 'column', 16));

const articleContainerCss = css(
  { width: '100%', height: '100%', flexGrow: 0 },
  listCss
);
const skeletonContainerCss = css(
  { width: '100%', height: '100%', marginTop: 16 },
  listCss
);

/* ssr */

interface Props {
  categoryId: number;
}

type Params = {
  categoryId: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const categoryId = Number(context.params?.categoryId);

  if (Number.isNaN(categoryId)) {
    return {
      notFound: true,
    };
  }

  /* prefetch start */
  const queryClient = new QueryClient();
  const queryKey = queryKeys.article.list(categoryId);

  try {
    // https://github.com/TanStack/query/discussions/3306
    await queryClient.fetchInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) =>
        getArticles({ categoryId, cursor: pageParam }),
    });
  } catch (err) {
    // err handling
  }

  const { dehydratedState } = dehydrate(queryClient);
  dehydratedState.queries.forEach((query) => {
    // https://github.com/TanStack/query/issues/1458#issuecomment-1022396964
    // eslint-disable-next-line
    // @ts-ignore
    if ('pageParams' in query.state.data) {
      query.state.data.pageParams = [null];
    }
  });

  /* prefetch end */

  return {
    props: {
      dehydratedState,
      categoryId,
    },
  };
};
