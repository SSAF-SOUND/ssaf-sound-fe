import type { ForwardedRef } from 'react';
import type { Recruit, SkillName, RecruitCategory } from '~/services/recruit';

import { useRouter } from 'next/router';

import { forwardRef, memo } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { Button } from '~/components/Common';
import { useRecruits } from '~/services/recruit';
import { flex } from '~/styles/utils';
import { concat, scrollUpBy } from '~/utils';

import { RecruitCard } from './index';
import { SkeletonRecruitCard } from './Wide';

export const RecruitCards = () => {
  const router = useRouter();
  const { keyword, recruitType, skills, category } = router?.query as Record<
    string,
    string
  >;

  const {
    data,
    status,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useRecruits({
    keyword: keyword ? keyword : '',
    skills: skills ? (skills.split(',') as SkillName[]) : [],
    category: (category ?? 'project') as RecruitCategory,
  });

  const articles = data?.pages
    .map((pages: { recruits: Recruit[] }) => pages.recruits)
    .reduce(concat);

  return (
    <>
      <Virtuoso
        data={articles}
        css={[
          flex('center', '', 'column', 15),
          {
            width: '100%',
          },
        ]}
        components={{ List }}
        itemContent={(index, article) => {
          return (
            <RecruitCard
              key={article.recruitId}
              recruitId={article.recruitId}
              title={article.title}
              participants={article.participants}
              recruitEnd={article.recruitEnd}
              finishedRecruit={article.finishedRecruit}
              // skills={['React']}
            />
          );
        }}
        useWindowScroll
        endReached={() => {
          if (status === 'error') return;
          fetchNextPage();
          scrollUpBy(10);
        }}
      />

      {isFetchingNextPage && hasNextPage && (
        <div css={flex('', '', 'column', 15)}>
          <SkeletonRecruitCard />
          <SkeletonRecruitCard />
          <SkeletonRecruitCard />
        </div>
      )}

      {isError && (
        <div>
          <Button onClick={() => refetch()} loading={isRefetching}>
            다시 시도하기
          </Button>
        </div>
      )}
    </>
  );
};

const List = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return <div {...props} ref={ref} css={flex('center', '', 'column', '20')} />;
});

List.displayName = 'RecruitCardsContainer';
