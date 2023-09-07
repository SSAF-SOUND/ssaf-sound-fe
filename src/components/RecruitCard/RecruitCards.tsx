import type { ForwardedRef } from 'react';
import type { RecruitCategory } from '~/services/recruit';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { forwardRef } from 'react';
import { Virtuoso } from 'react-virtuoso';

import ErrorCard from '~/components/ErrorCard';
import { RecruitCard } from '~/components/RecruitCard';
import { SkeletonRecruitCard } from '~/components/RecruitCard/Wide';
import {
  getRecruitThemeByCategory,
  useInfiniteRecruits,
} from '~/services/recruit';
import { recruitTypeConvertor } from '~/services/recruit/utils/recruitTypeConvertor';
import { flex, palettes } from '~/styles/utils';
import { concat, scrollUpBy } from '~/utils';

import { EmptyCardFallback } from './EmptyCardFallback';
import { HalfLoadingSpinner } from '../Common';

const List = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div css={listCss} {...props} ref={ref} />;
});
const listCss = css(flex('center', '', 'column', 15));

List.displayName = 'RecruitCardList';

export const RecruitCards = ({ category }: { category: RecruitCategory }) => {
  const router = useRouter();

  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    isRefetching,
    isRefetchError,
    isLoading,
  } = useInfiniteRecruits(recruitTypeConvertor(router?.query));

  const cards = data?.pages.map((pages) => pages.recruits).reduce(concat);

  if (cards?.length === 0) return <EmptyCardFallback category={category} />;
  if (isLoading)
    return (
      <HalfLoadingSpinner
        color={category === 'study' ? palettes.secondary.default : undefined}
      />
    );
  return (
    <div css={flex('center', '', 'column', 15)}>
      <Virtuoso
        data={cards}
        components={{ List }}
        itemContent={(index, article) => {
          return (
            <RecruitCard
              key={article?.recruitId}
              recruitId={article?.recruitId}
              title={article?.title}
              participants={article?.participants}
              recruitEnd={article?.recruitEnd}
              finishedRecruit={article?.finishedRecruit}
              // skills={['React']}
            />
          );
        }}
        useWindowScroll
        endReached={() => {
          if (isError || isRefetchError) return;
          fetchNextPage();
          scrollUpBy(5);
        }}
      />
      {isFetchingNextPage && hasNextPage && (
        <div css={flex('', '', 'column', 15)}>
          <SkeletonRecruitCard />
          <SkeletonRecruitCard />
          <SkeletonRecruitCard />
        </div>
      )}

      {(isError || isRefetchError) && (
        <ErrorCard
          onClickRetry={refetch}
          css={{
            maxWidth: 400,
          }}
          isLoading={isRefetching}
        />
      )}
    </div>
  );
};
