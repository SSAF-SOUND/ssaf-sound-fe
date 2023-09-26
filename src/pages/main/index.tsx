import type { GetStaticProps } from 'next';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';

import { Clock } from '~/components/Clock';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { HotArticlesPreview } from '~/components/HotArticlesPreview';
import { LunchMenusPreview } from '~/components/Lunch';
import NavigationGroup from '~/components/NavigationGroup';
import { RecruitsPreview } from '~/components/RecruitsPreview';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import { toSSRSafeDehydratedState } from '~/react-query/server/toSSRSafeDehydratedState';
import { getHotArticles } from '~/services/article';
import { useMyInfo } from '~/services/member';
import { getRecruits } from '~/services/recruit';
import { globalVars, topBarHeight } from '~/styles/utils';
import { routes } from '~/utils';
import { globalMetaData } from '~/utils/metadata';

const metaTitle = '메인';
const metaDescription = `${globalMetaData.description} 점심 메뉴, 리쿠르팅, 핫 게시글 등 다양한 SSAF SOUND의 기능을 활용해보세요.`;

const MainPage = () => {
  const { data: myInfo } = useMyInfo();
  const myCampus = myInfo?.ssafyInfo?.campus;

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.main(),
        }}
      />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <NavigationGroup />
        <Clock css={{ marginBottom: 32 }} />
        <LunchMenusPreview css={{ marginBottom: 80 }} campus={myCampus} />
        <HotArticlesPreview css={{ marginBottom: 50 }} />
        <RecruitsPreview
          css={{ marginBottom: 50 }}
          marginForExpand={globalVars.mainLayoutPaddingX.var}
        />
      </div>
    </>
  );
};

export default MainPage;

const selfPaddingY = topBarHeight + 30;

const selfCss = css({
  padding: `${selfPaddingY}px 0px`,
});

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const recruitsQueryKey = JSON.parse(JSON.stringify(queryKeys.recruit.list()));
  const hotArticlesQueryKey = JSON.parse(
    JSON.stringify(queryKeys.articles.hot())
  );

  await Promise.allSettled([
    queryClient.prefetchInfiniteQuery({
      queryKey: hotArticlesQueryKey,
      queryFn: () => getHotArticles(),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: recruitsQueryKey,
      queryFn: () => getRecruits(),
    }),
  ]);

  const { dehydratedState } = dehydrate(queryClient);
  return {
    props: {
      dehydratedState:
        toSSRSafeDehydratedState.infiniteQueries(dehydratedState),
    },
    revalidate: 20,
  };
};
