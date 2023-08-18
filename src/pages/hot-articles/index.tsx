import type { GetServerSideProps } from 'next/types';
import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';

import ArticleCardList from '~/components/ArticleCardList';
import SearchBarForm from '~/components/Forms/SearchBarForm';
import NoSearchResults from '~/components/NoSearchResults';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import { getHotArticles, useHotArticles } from '~/services/article';
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

const titleBarTitle = 'HOT 게시판';

const minKeywordLength = 3;
const validateKeyword = (keyword?: string) =>
  keyword && keyword.trim().length >= minKeywordLength;

const HotArticlesPage = () => {
  const router = useRouter();
  const { keyword } = router.query as QueryString;

  return (
    <div css={selfCss}>
      <TitleBar.Default
        css={fontCss.style.B16}
        title={titleBarTitle}
        onClickBackward={routes.articles.categories()}
        withoutClose
      />

      <SearchBar />

      <div css={articleContainerCss}>
        <HotArticleLayer keyword={keyword} />
      </div>
    </div>
  );
};

interface HotArticleLayerProps {
  keyword?: string;
}

const HotArticleLayer = (props: HotArticleLayerProps) => {
  const { keyword } = props;
  const isValidKeyword = validateKeyword(keyword);
  const infiniteQuery = useHotArticles({ keyword });

  return (
    <ArticleCardList
      hot
      infiniteQuery={infiniteQuery}
      emptyElement={isValidKeyword && <NoSearchResults keyword={keyword} />}
      skeletonCount={4}
    />
  );
};

const SearchBar = () => {
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
    router.push(routes.articles.hot(keyword));
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
      defaultValues={{ keyword: defaultKeyword }}
      options={{ minKeywordLength }}
    />
  );
};

export default HotArticlesPage;

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

/* ssr */

type QueryString = Partial<{
  keyword: string;
}>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { keyword: queryKeyword } = context.query as QueryString;
  const isValidKeyword = validateKeyword(queryKeyword);
  const keyword = isValidKeyword ? queryKeyword?.trim() : undefined;

  /* prefetch start */
  const queryClient = new QueryClient();
  const hotArticleListQueryKey = queryKeys.articles.hot(keyword);

  try {
    // https://github.com/TanStack/query/discussions/3306
    await queryClient.fetchInfiniteQuery({
      queryKey: hotArticleListQueryKey,
      queryFn: ({ pageParam }) =>
        getHotArticles({
          cursor: pageParam,
          keyword: keyword,
        }),
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
    },
  };
};
