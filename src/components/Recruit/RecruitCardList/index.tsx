import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import type {
  ForwardedRef,
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
  RefAttributes,
} from 'react';
import type { GetRecruitsApiData, RecruitSummary } from '~/services/recruit';

import { css } from '@emotion/react';
import { forwardRef, isValidElement, memo, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { InfiniteQueryErrorCard } from '~/components/InfiniteQueryErrorCard';
import { RecruitCard } from '~/components/Recruit/RecruitCard';
import { RecruitCardSkeleton } from '~/components/Recruit/RecruitCard/RecruitCardSkeleton';
import { DefaultEmptyElement } from '~/components/Recruit/RecruitCardList/DefaultEmptyElement';
import { flex } from '~/styles/utils';
import { concat, scrollUpBy } from '~/utils';

interface RecruitCardListProps {
  infiniteQuery: UseInfiniteQueryResult<GetRecruitsApiData['data']>;

  className?: string;

  emptyElement?: ReactNode;
  skeletonCount?: number;
  useWindowScroll?: boolean;

  // virtuoso options
  itemContent?: (index: number, recruit: RecruitSummary) => ReactElement;
  List?: ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>;
  customScrollParent?: HTMLElement | null;
}

export const RecruitCardList = memo((props: RecruitCardListProps) => {
  const {
    infiniteQuery,
    className,
    emptyElement,
    skeletonCount = 4,
    useWindowScroll = false,

    itemContent,
    List,
    customScrollParent,
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
  const showFetchNextPageSkeletons = isFetchingNextPage && !showErrorCard;

  useEffect(() => {
    setShowErrorCard(!!error);
  }, [error]);

  if (isLoading) {
    const loadingSkeletonCount = 6;
    return <Skeletons count={loadingSkeletonCount} />;
  }

  if (isError && !data) {
    return <InfiniteQueryErrorCard css={errorCss} onClickRetry={refetch} />;
  }

  const recruits = data.pages.map((page) => page.recruits).reduce(concat);
  const isEmpty = recruits.length === 0;

  if (isEmpty) {
    return isValidElement(emptyElement) ? (
      emptyElement
    ) : (
      <DefaultEmptyElement />
    );
  }

  const fetchNextRecruits = async (forceFetch = false) => {
    const disableFetchNextPage =
      !hasNextPage || isFetchingNextPage || showErrorCard;
    if (disableFetchNextPage && !forceFetch) return;

    await fetchNextPage();

    scrollUpBy(1);
  };

  const retryFetchNextRecruits = () => {
    setShowErrorCard(false);
    fetchNextRecruits(true);
  };

  const ItemComponent = itemContent ?? DefaultItemContent;
  const ItemList = List ?? DefaultList;

  return (
    <>
      <Virtuoso
        css={virtuosoCss}
        className={className}
        useWindowScroll={useWindowScroll}
        data={recruits}
        endReached={() => fetchNextRecruits()}
        components={{
          List: ItemList,
        }}
        itemContent={ItemComponent}
        customScrollParent={customScrollParent ?? undefined}
      />
      {showFetchNextPageSkeletons && <Skeletons count={skeletonCount} />}
      {showErrorCard && (
        <InfiniteQueryErrorCard
          css={errorCss}
          onClickRetry={retryFetchNextRecruits}
        />
      )}
    </>
  );
});

RecruitCardList.displayName = 'RecruitCardList';

const DefaultItemContent: RecruitCardListProps['itemContent'] = (
  index,
  recruit
) => {
  return (
    <RecruitCard
      key={recruit.recruitId}
      recruitSummary={recruit}
      withBadge={false}
    />
  );
};

const DefaultList = memo(
  forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
    return <div css={listCss} {...props} ref={ref} />;
  })
);
DefaultList.displayName = 'RecruitCardList';

interface SkeletonsProps {
  count: number;
}
const Skeletons = memo((props: SkeletonsProps) => {
  const { count } = props;
  return (
    <div css={skeletonsCss}>
      {Array(count)
        .fill(undefined)
        .map((_, index) => (
          <RecruitCardSkeleton key={index} />
        ))}
    </div>
  );
});
Skeletons.displayName = 'RecruitCardSkeleton';

const itemGap = 16;
const virtuosoCss = css({ marginBottom: itemGap });
const listCss = css(flex('', '', 'column', itemGap));
const skeletonsCss = css(
  { marginBottom: itemGap },
  flex('', '', 'column', itemGap)
);
const errorCss = css({
  borderRadius: 30,
  marginBottom: itemGap,
});
