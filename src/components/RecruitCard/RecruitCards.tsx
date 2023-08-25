import type { ForwardedRef } from 'react';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { forwardRef } from 'react';
import { Virtuoso } from 'react-virtuoso';

import ErrorCard from '~/components/ErrorCard';
import { RecruitCard } from '~/components/RecruitCard';
import { SkeletonRecruitCard } from '~/components/RecruitCard/Wide';
import { useInfiniteRecruits } from '~/services/recruit';
import { recruitTypeConvertor } from '~/services/recruit/utils/recruitTypeConvertor';
import { flex } from '~/styles/utils';
import { concat, scrollUpBy } from '~/utils';

const List = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div css={listCss} {...props} ref={ref} />;
});
const listCss = css(flex('center', '', 'column', 15));

List.displayName = 'RecruitCardList';

export const RecruitCards = () => {
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
  } = useInfiniteRecruits(recruitTypeConvertor(router?.query));

  const articles = data?.pages.map((pages) => pages.recruits).reduce(concat);
  // 조건에 맞지 않는 데이터 처리 어떻게 해주실 지 여쭈어보고 수정
  if (data?.pages === null) return <div>조건에 맞는 카드가 없어요</div>;

  return (
    <div css={flex('center', '', 'column', 15)}>
      <Virtuoso
        data={articles}
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
