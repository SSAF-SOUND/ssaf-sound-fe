import type { GetServerSideProps } from 'next/types';
import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';
import type { ArticleSummary } from '~/services/article/utils';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';

import { HotArticleCard } from '~/components/ArticleCard';
import { PageHead, PageHeadingText } from '~/components/Common';
import SearchBarForm from '~/components/Forms/SearchBarForm';
import { InfiniteList } from '~/components/InfiniteList';
import EmptyInfiniteList from '~/components/InfiniteList/EmptyInfiniteList';
import NoSearchResults from '~/components/NoSearchResults';
import TitleBar from '~/components/TitleBar';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import { getHotArticles } from '~/services/article/apis';
import { useHotArticles } from '~/services/article/hooks';
import { validateSearchKeyword } from '~/services/common/utils/searchBar';
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
import { concat, customToast, routes } from '~/utils';
import { globalMetaData } from '~/utils/metadata';

const titleBarTitle = 'HOT 게시판';
const metaTitle = titleBarTitle;
const metaDescription = `${globalMetaData.description} 삼성 청년 SW 아카데미(SSAFY) 학생들의 최대 관심사를 모아볼 수 있는 Hot 게시판 기능을 이용해보세요.`;

const HotArticlesPage = () => {
  const router = useRouter();
  const { keyword } = router.query as QueryString;

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.article.hot().pathname,
        }}
      />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <TitleBar.Default
          css={fontCss.style.B16}
          title={titleBarTitle}
          onClickBackward={routes.article.categories()}
          withoutClose
        />

        <SearchBar />

        <div css={articleContainerCss}>
          <HotArticleLayer keyword={keyword} />
        </div>
      </div>
    </>
  );
};

interface HotArticleLayerProps {
  keyword?: string;
}

const HotArticleLayer = (props: HotArticleLayerProps) => {
  const { keyword } = props;
  const isValidKeyword = validateSearchKeyword(keyword);
  const infiniteQuery = useHotArticles({ keyword });

  const infiniteData = infiniteQuery.data
    ? infiniteQuery.data.pages.map(({ posts }) => posts).reduce(concat)
    : ([] as ArticleSummary[]);

  return (
    <InfiniteList
      data={infiniteData}
      infiniteQuery={infiniteQuery}
      skeleton={<HotArticleCard.Skeleton />}
      skeletonCount={6}
      useWindowScroll={true}
      skeletonGap={16}
      itemContent={(_, article) => <HotArticleCard article={article} />}
      emptyElement={
        isValidKeyword ? (
          <NoSearchResults keyword={keyword} />
        ) : (
          <EmptyInfiniteList text="아직 핫 게시글이 없습니다." />
        )
      }
    />
  );
};

const SearchBar = () => {
  const router = useRouter();
  const { keyword: queryKeyword } = router.query as QueryString;
  const isValidKeyword = validateSearchKeyword(queryKeyword);
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
    await router.push(routes.article.hot({ keyword }));
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
    />
  );
};

export default HotArticlesPage;

/* css */

const selfMinHeight = `max(${pageMinHeight}px, 100vh)`;
const searchBarTop = titleBarHeight;
const searchBarContainerPaddingX = globalVars.mainLayoutPaddingX.var;
const searchBarContainerHeight = 72;
const searchBarZIndex = 10;
const selfPaddingTop = searchBarTop + searchBarContainerHeight;

const selfCss = css(
  {
    padding: `${selfPaddingTop}px 0px 15px`,
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
  const { keyword = '' } = context.query as QueryString;

  const trimmedKeyword = keyword.trim();
  const safeKeyword = validateSearchKeyword(trimmedKeyword)
    ? trimmedKeyword
    : undefined;

  /* prefetch start */
  const queryClient = new QueryClient();
  const hotArticleListQueryKey = queryKeys.articles.hot(safeKeyword);

  await queryClient.prefetchInfiniteQuery({
    queryKey: hotArticleListQueryKey,
    queryFn: ({ pageParam }) =>
      getHotArticles({
        cursor: pageParam,
        keyword: safeKeyword,
      }),
  });

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
