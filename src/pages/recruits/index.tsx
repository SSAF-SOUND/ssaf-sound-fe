import type { GetServerSideProps } from 'next';

import { css } from '@emotion/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { PageHead, PageHeadingText } from '~/components/Common';
import NavigationGroup from '~/components/NavigationGroup';
import TopBar from '~/components/TopBar';
import {
  colorMix,
  flex,
  globalVars,
  pageMinHeight,
  titleBarHeight,
  topBarHeight,
} from '~/styles/utils';
import { routes } from '~/utils';

// /recruits
// ? category=PROJECT | STUDY
// & skills=React
// & skills=Vue
// & part=프론트엔드
// & part=백엔드
// & keyword=ABC
const RecruitsPage = () => {
  return (
    <>
      <div css={selfCss}>
        <NavigationGroup />
        <div css={{ height: 50, background: 'tomato' }}>검색창</div>

        <div css={{ height: 50, background: 'blue' }}>파트 탭</div>

        <div
          css={[
            { marginBottom: 20 },
            flex('center', 'space-between', 'row', 24),
            { height: 50, background: 'green' },
          ]}
        >
          <div css={flex('center', 'flex-start', 'row', 24)}>
            <div>필터 도구</div>
            <div>필터 도구</div>
          </div>
          <div>글 작성 버튼</div>
        </div>

        <div css={[flex('', '', 'column', 12)]}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};
const Card = () => {
  return (
    <div
      css={{ border: '1px solid white', height: 140, background: 'darkorange' }}
    >
      카드
    </div>
  );
};

const selfMinHeight = `max(${pageMinHeight}px, 100vh)`;
const selfCss = css({
  padding: `${titleBarHeight}px 0`,
  minHeight: selfMinHeight,
});

export default RecruitsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const queryClient = new QueryClient();
  // const recruitsQueryKey = queryKeys.recruit.list({ ...context.query });
  //
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: recruitsQueryKey,
  //   queryFn: (d) => {
  //     return getRecruits({});
  //   },
  // });
  //
  // const { dehydratedState } = dehydrate(queryClient);
  // dehydratedState.queries.forEach((query) => {
  //   // https://github.com/TanStack/query/issues/1458#issuecomment-1022396964
  //   // eslint-disable-next-line
  //   // @ts-ignore
  //   if ('pageParams' in query.state.data) {
  //     query.state.data.pageParams = [null];
  //   }
  // });
  return {
    props: {
      // dehydratedState,
    },
  };
};
