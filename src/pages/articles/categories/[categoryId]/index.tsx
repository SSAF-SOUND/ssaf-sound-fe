import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ArticleCard } from '~/components/ArticleCard';
import ArticleCardList from '~/components/ArticleCardList';
import { Icon, IconButton, TextInput } from '~/components/Common';
import NoSearchResults from '~/components/NoSearchResults';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import {
  getArticleCategories,
  getArticles,
  getArticlesByKeyword,
  useArticleCategories,
  useArticles,
} from '~/services/article';
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
          {hasError && <div onClick={() => setHasError(false)}>다시시도</div>}
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

interface SearchBarFieldValues {
  keyword: string;
}
interface SearchBarProps {
  categoryId: number;
}

const SearchBar = (props: SearchBarProps) => {
  const fieldName = 'keyword';
  const { categoryId } = props;
  const router = useRouter();
  const { keyword: queryKeyword } = router.query as QueryString;
  const isValidKeyword = validateKeyword(queryKeyword);
  const defaultKeyword = isValidKeyword ? queryKeyword : '';

  const { register, handleSubmit, resetField } = useForm<SearchBarFieldValues>({
    defaultValues: {
      keyword: defaultKeyword,
    },
  });

  const onValidSubmit: SubmitHandler<SearchBarFieldValues> = async (
    formValues
  ) => {
    const { keyword } = formValues;
    if (keyword === queryKeyword) {
      return;
    }
    resetField(fieldName, { defaultValue: keyword });
    router.push(routes.articles.category(categoryId, keyword));
  };

  const onInvalidSubmit: SubmitErrorHandler<SearchBarFieldValues> = (
    errors
  ) => {
    const errorMessage = errors.keyword?.message;
    if (errorMessage) {
      customToast.clientError(errorMessage);
    }
  };

  return (
    <form
      css={searchBarContainerCss}
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
    >
      <div css={inputContainerCss}>
        <TextInput
          autoComplete="off"
          rounded
          size="md"
          css={searchBarInputCss}
          {...register(fieldName, {
            validate: (value) => {
              return (
                validateKeyword(value) ||
                `검색어는 최소 ${minKeywordLength}자 이상이어야 합니다.`
              );
            },
          })}
        />
        <IconButton type="submit" css={searchButtonCss} theme="black" size={34}>
          <Icon name="search" size={28} />
        </IconButton>
      </div>
    </form>
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

const searchBarInputCss = css({
  width: '100%',
  padding: '0 44px 0 20px',
});

const articleContainerCss = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  flexGrow: 1,
  marginTop: 4,
});

const skeletonsCss = css(flex('', '', 'column', 16));

const inputContainerCss = css({
  position: 'relative',
});

const searchButtonCss = css(
  {
    right: 12,
  },
  position.y('center', 'absolute')
);

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
  const { keyword } = context.query as QueryString;
  const isValidKeyword = validateKeyword(keyword);
  const safeKeyword = isValidKeyword ? keyword?.trim() : undefined;

  if (Number.isNaN(categoryId)) {
    return {
      notFound: true,
    };
  }

  /* prefetch start */
  const queryClient = new QueryClient();
  const articleListQueryKey = queryKeys.article.list(categoryId, safeKeyword);
  const categoriesQueryKey = queryKeys.article.categories();
  const fetchArticles = isValidKeyword ? getArticlesByKeyword : getArticles;

  try {
    // https://github.com/TanStack/query/discussions/3306
    await Promise.all([
      queryClient.fetchInfiniteQuery({
        queryKey: articleListQueryKey,
        queryFn: ({ pageParam }) =>
          fetchArticles({
            categoryId,
            cursor: pageParam,
            keyword: safeKeyword,
          }),
      }),
      queryClient.fetchQuery({
        queryKey: categoriesQueryKey,
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
