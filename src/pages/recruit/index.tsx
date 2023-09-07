import type { GetServerSideProps } from 'next';
import type { RecruitCategory } from '~/services/recruit';

import { QueryClient } from '@tanstack/react-query';

import { RecruitSearchForm } from '~/components/Forms/RecruitSearchForm';
import { RecruitLayout } from '~/components/Layout';
import { RecruitCards } from '~/components/RecruitCard';
import { RecruitCreateButton } from '~/components/RecruitCreateLink';
import {
  IsRecruitingToggle,
  RecruitFilterModal,
  RecruitFilterTabs,
} from '~/components/RecruitFilter';
import TopBar from '~/components/TopBar';
import { useGetQueryString } from '~/hooks';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import { getRecruits } from '~/services/recruit';
import { recruitTypeConvertor } from '~/services/recruit/utils/recruitTypeConvertor';
import { flex } from '~/styles/utils';

const Recruit = () => {
  const categoryQuery = useGetQueryString('category');
  const category = (categoryQuery ?? 'project') as RecruitCategory;

  return (
    <RecruitLayout>
      <TopBar />
      <div
        css={[
          {
            marginBottom: 20,
          },
        ]}
      >
        <div css={{ height: 20 }} />
        <RecruitSearchForm />
        <div css={{ height: 20 }} />
        <div>
          <RecruitFilterTabs />
        </div>

        <div css={{ height: 10 }} />
        <div css={[flex('center', 'space-between', 'row')]}>
          <div css={flex('', '', 'row', 6)}>
            <IsRecruitingToggle />
            <RecruitFilterModal category={category} />
          </div>
          <RecruitCreateButton category={category} />
        </div>
      </div>
      <RecruitCards category={category} />
    </RecruitLayout>
  );
};

export default Recruit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const recruitsQueryKey = queryKeys.recruit.list({ ...context.query });

  await queryClient.prefetchInfiniteQuery({
    queryKey: recruitsQueryKey,
    queryFn: (d) => {
      return getRecruits({
        recruits: recruitTypeConvertor(context.query),
        cursor: d.pageParam,
      });
    },
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
  return {
    props: {
      dehydratedState,
    },
  };
};
