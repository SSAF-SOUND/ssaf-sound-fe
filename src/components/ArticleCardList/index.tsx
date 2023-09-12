import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import type { ForwardedRef, ReactNode } from 'react';
import type { GetArticlesApiData } from '~/services/article';

import { css } from '@emotion/react';
import { forwardRef, isValidElement, memo, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { ArticleCard, HotArticleCard } from '~/components/ArticleCard';
import DefaultEmptyElement from '~/components/ArticleCardList/DefaultEmptyElement';
import { InfiniteQueryErrorCard } from '~/components/InfiniteQueryErrorCard';
import { flex } from '~/styles/utils';
import { concat, scrollUpBy } from '~/utils';

interface ArticleCardListProps {
  infiniteQuery: UseInfiniteQueryResult<GetArticlesApiData['data']>;

  className?: string;
  hot?: boolean;

  emptyElement?: ReactNode;
  skeletonCount?: number;
}

const ArticleCardList = (props: ArticleCardListProps) => {
  const {
    infiniteQuery,
    className,
    hot = false,
    emptyElement,
    skeletonCount = 4,
  } = props;
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isError,
    refetch,
  } = infiniteQuery;
  const [showErrorCard, setShowErrorCard] = useState(false);
  const showFetchNextPageSkeletons = hasNextPage && !showErrorCard;

  useEffect(() => {
    setShowErrorCard(!!error);
  }, [error]);

  if (isLoading) {
    const loadingSkeletonCount = 6;
    return <Skeletons count={loadingSkeletonCount} />;
  }

  if (isError && !data) {
    return <InfiniteQueryErrorCard onClickRetry={refetch} />;
  }

  const articles = data.pages.map((pages) => pages.posts).reduce(concat);
  const isEmpty = articles.length === 0;

  if (isEmpty) {
    return isValidElement(emptyElement) ? (
      emptyElement
    ) : (
      <DefaultEmptyElement />
    );
  }

  const fetchNextArticles = async (forceFetch = false) => {
    const disableFetchNextPage =
      !hasNextPage || isFetchingNextPage || showErrorCard;
    if (disableFetchNextPage && !forceFetch) return;

    await fetchNextPage();

    /* 스크롤이 바닥에 닿아있으면, 자동 스크롤 조절이 되지 않기 때문에 `fetch`되자마자 스크롤을 1 올려줍니다. */
    scrollUpBy(1);
  };

  const retryFetchNextArticles = () => {
    setShowErrorCard(false);
    fetchNextArticles(true);
  };

  const Card = hot ? HotArticleCard : ArticleCard;

  return (
    <>
      <Virtuoso
        css={virtuosoCss}
        className={className}
        useWindowScroll
        data={articles}
        endReached={() => fetchNextArticles()}
        // overscan={200} --> https://github.com/petyosi/react-virtuoso/issues/946
        components={{ List }}
        itemContent={(index, article) => {
          return <Card key={article.postId} article={article} />;
        }}
      />
      {showFetchNextPageSkeletons && <Skeletons count={skeletonCount} />}
      {showErrorCard && (
        <InfiniteQueryErrorCard onClickRetry={retryFetchNextArticles} />
      )}
    </>
  );
};

const List = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div css={listCss} {...props} ref={ref} />;
});
List.displayName = 'ArticleCardList';

interface SkeletonsProps {
  hot?: boolean;
  count: number;
}

const Skeletons = memo((props: SkeletonsProps) => {
  const { hot, count } = props;
  const SkeletonElement = hot ? HotArticleCard.Skeleton : ArticleCard.Skeleton;
  return (
    <div css={skeletonsCss}>
      {Array(count)
        .fill(undefined)
        .map((_, index) => (
          <SkeletonElement key={index} />
        ))}
    </div>
  );
});

Skeletons.displayName = 'ArticleCardSkeleton';

export default ArticleCardList;

const itemGap = 16;
const virtuosoCss = css({ marginBottom: itemGap });
const listCss = css(flex('', '', 'column', itemGap));
const skeletonsCss = css(flex('', '', 'column', itemGap));
