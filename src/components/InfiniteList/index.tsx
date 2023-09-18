import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import type {
  ForwardedRef,
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
  RefAttributes,
} from 'react';

import { css } from '@emotion/react';
import {
  forwardRef,
  Fragment,
  isValidElement,
  memo,
  useEffect,
  useState,
} from 'react';
import { Virtuoso } from 'react-virtuoso';

import { InfiniteQueryErrorCard } from '~/components/InfiniteQueryErrorCard';
import { flex } from '~/styles/utils';
import { scrollUpBy } from '~/utils';

interface InfiniteListProps<T> {
  data: T[];
  infiniteQuery: UseInfiniteQueryResult;

  className?: string;

  emptyElement?: ReactNode;

  useWindowScroll?: boolean;

  skeleton: ReactElement;
  skeletonCount: number;
  skeletonGap?: number;

  itemContent: (index: number, data: T) => ReactElement;

  // virtuoso options
  List?: ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>;
  customScrollParent?: HTMLElement | null;
}

export const InfiniteList = <T,>(props: InfiniteListProps<T>) => {
  const {
    data,

    infiniteQuery,
    className,
    emptyElement,

    skeleton,
    skeletonCount,
    skeletonGap = itemGap,
    useWindowScroll = false,

    itemContent,

    // virtuoso options
    List,
    customScrollParent,
  } = props;

  const {
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isError,
    refetch,
  } = infiniteQuery;

  const [showErrorCard, setShowErrorCard] = useState(false);
  const showFetchNextPageSkeletons = isFetchingNextPage && !showErrorCard;

  useEffect(() => {
    setShowErrorCard(!!error);
  }, [error]);

  if (isLoading) {
    return (
      <Skeletons count={skeletonCount} skeleton={skeleton} gap={skeletonGap} />
    );
  }

  if (isError && !data) {
    return <InfiniteQueryErrorCard css={errorCss} onClickRetry={refetch} />;
  }

  const isEmpty = data.length === 0;

  if (isEmpty) {
    return isValidElement(emptyElement) ? emptyElement : <div>None</div>;
  }

  const loadMore = async (forceFetch = false) => {
    const disableFetchNextPage =
      !hasNextPage || isFetchingNextPage || showErrorCard;
    if (disableFetchNextPage && !forceFetch) return;

    await fetchNextPage();

    scrollUpBy(1);
  };

  const retryLoadMore = () => {
    setShowErrorCard(false);
    loadMore(true);
  };

  const ItemList = List ?? DefaultList;

  return (
    <>
      <Virtuoso
        css={virtuosoCss}
        className={className}
        useWindowScroll={useWindowScroll}
        data={data}
        endReached={() => loadMore()}
        components={{ List: ItemList }}
        itemContent={itemContent}
        customScrollParent={customScrollParent ?? undefined}
      />
      {showFetchNextPageSkeletons && (
        <Skeletons
          count={skeletonCount}
          skeleton={skeleton}
          gap={skeletonGap}
        />
      )}
      {showErrorCard && (
        <InfiniteQueryErrorCard css={errorCss} onClickRetry={retryLoadMore} />
      )}
    </>
  );
};

const DefaultList = memo(
  forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
    return <div css={listCss} {...props} ref={ref} />;
  })
);
DefaultList.displayName = 'InfiniteListContainer';

interface SkeletonsProps {
  count: number;
  skeleton: ReactElement;
  gap: number;
}
const Skeletons = memo((props: SkeletonsProps) => {
  const { count, skeleton, gap = itemGap } = props;
  return (
    <div css={skeletonsCss(gap)}>
      {Array(count)
        .fill(undefined)
        .map((_, index) => (
          <Fragment key={index}>{skeleton}</Fragment>
        ))}
    </div>
  );
});
Skeletons.displayName = 'Skeleton';

const itemGap = 16;
const virtuosoCss = css({ marginBottom: itemGap });
const listCss = css(flex('', '', 'column', itemGap));
const skeletonsCss = (gap: number) =>
  css({ marginBottom: gap }, flex('', '', 'column', gap));
const errorCss = css({
  borderRadius: 30,
  marginBottom: itemGap,
});
