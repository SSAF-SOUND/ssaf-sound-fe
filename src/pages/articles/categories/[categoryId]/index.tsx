import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';

import { ArticleCard } from '~/components/ArticleCard';
import ArticleCardList from '~/components/ArticleCardList';
import ErrorCard from '~/components/ErrorCard';
import SearchBarForm from '~/components/Forms/SearchBarForm';
import NoSearchResults from '~/components/NoSearchResults';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import {
  getArticleCategories,
  getArticles,
  useArticleCategories,
  useArticles,
} from '~/services/article';
import {
  flex,
  fontCss,
  globalVars,
  pageMaxWidth,
  pageMinHeight,
  pageMinWidth,
  palettes,
  position,
  titleBarHeight,
} from '~/styles/utils';
import { add, customToast, routes, scrollUpBy } from '~/utils';

const minKeywordLength = 3;
const validateKeyword = (keyword?: string) =>
  keyword && keyword.trim().length >= minKeywordLength;

const ArticleCategoryPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { categoryId } = props;
  const router = useRouter();
  const { keyword } = router.query as QueryString;

  const { data: articleCategories } = useArticleCategories();
  const categoryName = articleCategories?.find(
    (category) => category.boardId === categoryId
  )?.title;

  return (
    <div css={selfCss}>
      <TitleBar.Default
        css={fontCss.style.B16}
        title={categoryName}
        onClickBackward={routes.articles.categories()}
        withoutClose
      />

      <SearchBar categoryId={categoryId} />

      <div css={articleContainerCss}>
        <ArticleLayer categoryId={categoryId} keyword={keyword} />
      </div>
    </div>
  );
};

interface ArticleLayerProps {
  categoryId: number;
  keyword?: string;
}

const ArticleLayer = (props: ArticleLayerProps) => {
  const { categoryId, keyword } = props;
  const isValidKeyword = validateKeyword(keyword);
  const {
    data: articles,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useArticles(categoryId, { keyword });

  const [hasError, setHasError] = useState(false);

  const fetchNextArticles = async () => {
    if (!hasNextPage || isFetchingNextPage) return;
    await fetchNextPage();

    /* 스크롤이 바닥에 닿아있으면, 자동 스크롤 조절이 되지 않기 때문에 `fetch`되자마자 스크롤을 1 올려줍니다. */
    scrollUpBy(1);
  };

  const hasNextArticles = hasError ? false : hasNextPage;

  useEffect(() => {
    setHasError(!!error);
  }, [error, keyword]);

  const isArticleEmpty =
    articles?.pages.map((page) => page.posts.length).reduce(add) === 0;

  const notExistSearchResults = isValidKeyword && isArticleEmpty;
  const notExistArticles = !isValidKeyword && isArticleEmpty;

  if (isLoading) return <ArticleCardSkeletons />;

  if (notExistSearchResults) return <NoSearchResults keyword={keyword} />;

  if (notExistArticles)
    return (
      <div css={position.xy('center', 'center', 'absolute')}>
        아직 게시글이 없습니다.
      </div>
    );

  return (
    <>
      {articles && (
        <>
          <ArticleCardList
            articlesPages={articles.pages}
            fetchNextPage={fetchNextArticles}
            hasNextPage={hasNextArticles}
          />

          {hasNextArticles && <ArticleCardSkeletons />}
          {hasError && (
            <ErrorCard
              css={{ marginTop: 16 }}
              onClickRetry={() => setHasError(false)}
            />
          )}
        </>
      )}
    </>
  );
};

const ArticleCardSkeletons = memo(() => {
  const skeletonCount = 6;
  return (
    <div css={[skeletonsCss, { marginTop: 16 }]}>
      {Array(skeletonCount)
        .fill(undefined)
        .map((_, index) => {
          return <ArticleCard.Skeleton key={index} />;
        })}
    </div>
  );
});
ArticleCardSkeletons.displayName = 'ArticleCardSkeletons';

interface SearchBarProps {
  categoryId: number;
}

const SearchBar = (props: SearchBarProps) => {
  const { categoryId } = props;
  const router = useRouter();
  const { keyword: queryKeyword } = router.query as QueryString;
  const isValidKeyword = validateKeyword(queryKeyword);
  const defaultKeyword = isValidKeyword ? queryKeyword : '';

  const onValidSubmit: SearchBarFormProps['onValidSubmit'] = async (
    reset,
    formValues
  ) => {
    const { keyword } = formValues;
    if (keyword === queryKeyword) {
      return;
    }
    reset({ keyword });
    router.push(routes.articles.category(categoryId, keyword));
  };

  const onInvalidSubmit: SearchBarFormProps['onInvalidSubmit'] = (
    errorMessage: string
  ) => {
    if (errorMessage) {
      customToast.clientError(errorMessage);
    }
  };

  return (
    <SearchBarForm
      css={searchBarContainerCss}
      onValidSubmit={onValidSubmit}
      onInvalidSubmit={onInvalidSubmit}
      defaultValues={{
        keyword: defaultKeyword,
      }}
      options={{ minKeywordLength }}
    />
  );
};

export default ArticleCategoryPage;

/* css */

const selfPaddingX = 10;
const selfMinHeight = `max(${pageMinHeight}px, 100vh)`;
const searchBarTop = titleBarHeight;
const searchBarContainerPaddingX = `calc(${selfPaddingX}px + ${globalVars.mainLayoutPaddingX.var})`;
const searchBarContainerHeight = 72;
const searchBarZIndex = 10;
const selfPaddingTop = searchBarTop + searchBarContainerHeight;

const selfCss = css(
  {
    padding: `${selfPaddingTop}px ${selfPaddingX}px 15px`,
    minHeight: selfMinHeight,
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

const articleContainerCss = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  flexGrow: 1,
  marginTop: 4,
});

const skeletonsCss = css(flex('', '', 'column', 16));

/* ssr */

interface Props {
  categoryId: number;
}

// `interface`로 작성하면, `GetServerSideProps`의 Generic에 할당이 안되어서, type으로 작성
type Params = {
  categoryId: string;
};

type QueryString = Partial<{
  keyword: string;
}>;

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const categoryId = Number(context.params?.categoryId);
  const isValidCategoryId = !Number.isNaN(categoryId);

  const { keyword: queryKeyword } = context.query as QueryString;
  const isValidKeyword = validateKeyword(queryKeyword);
  const keyword = isValidKeyword ? queryKeyword?.trim() : undefined;

  if (!isValidCategoryId) {
    return {
      notFound: true,
    };
  }

  /* prefetch start */
  const queryClient = new QueryClient();
  const articleListQueryKey = queryKeys.articles.list(categoryId, keyword);
  const articleCategoriesQueryKey = queryKeys.articles.categories();

  try {
    // https://github.com/TanStack/query/discussions/3306
    await Promise.all([
      queryClient.fetchInfiniteQuery({
        queryKey: articleListQueryKey,
        queryFn: ({ pageParam }) =>
          getArticles({
            categoryId,
            cursor: pageParam,
            keyword: keyword,
          }),
      }),
      queryClient.fetchQuery({
        queryKey: articleCategoriesQueryKey,
        queryFn: getArticleCategories,
      }),
    ]);
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
