import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';

import ArticleCardList from '~/components/ArticleCardList';
import { CircleButton, PageHead, PageHeadingText } from '~/components/Common';
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
import { customToast, routes } from '~/utils';

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

  const navigateToCreateArticlePage = () => {
    router.push(routes.articles.create(categoryId));
  };

  return (
    <>
      <PageHead
        title={categoryName}
        openGraph={{
          title: categoryName,
          url: routes.articles.category(categoryId),
        }}
      />

      <PageHeadingText text={categoryName ?? '게시판'} />

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

        <div css={fabContainerCss}>
          <CircleButton
            css={fabCss}
            name="pencil.plus"
            label="게시글 작성 버튼"
            onClick={navigateToCreateArticlePage}
          />
        </div>
      </div>
    </>
  );
};

interface ArticleLayerProps {
  categoryId: number;
  keyword?: string;
}

const ArticleLayer = (props: ArticleLayerProps) => {
  const { categoryId, keyword } = props;
  const isValidKeyword = validateKeyword(keyword);
  const articlesInfiniteQuery = useArticles(categoryId, { keyword });

  return (
    <ArticleCardList
      infiniteQuery={articlesInfiniteQuery}
      emptyElement={isValidKeyword && <NoSearchResults keyword={keyword} />}
      skeletonCount={5}
    />
  );
};

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
    errorMessage
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
const selfPaddingTop = searchBarTop + searchBarContainerHeight;

// `Skeleton`의 `zIndex`는 1
const searchBarZIndex = 10;
const fabZIndex = 30;

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

const fabContainerCss = css(flex('center', 'flex-end', 'row'));

const fabCss = css({ position: 'fixed', bottom: 40, zIndex: fabZIndex });

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
