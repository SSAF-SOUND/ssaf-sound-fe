import type { GetStaticProps } from 'next';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';

import { ArticlesPreview } from '~/components/ArticlesPreview';
import { Clock } from '~/components/Clock';
import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import { JsonLD } from '~/components/JsonLD';
import { LunchMenusPreview } from '~/components/Lunch';
import NavigationGroup from '~/components/NavigationGroup';
import { RecruitsPreview } from '~/components/RecruitsPreview';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import {
  getAllArticlesByOffset,
  useAllArticlesByOffset,
  useHotArticlesByOffset,
} from '~/services/article';
import { getHotArticlesByOffset } from '~/services/article/apis';
import { useMyInfo } from '~/services/member';
import { getRecruitsByOffset } from '~/services/recruit';
import { expandCss, globalVars, palettes, topBarHeight } from '~/styles/utils';
import { globalMetaData } from '~/utils/metadata';
import { routes } from '~/utils/routes';

const metaTitle = '홈';
const metaDescription = `${globalMetaData.description} 점심 메뉴, 리쿠르팅, 핫 게시글 등 다양한 SSAF SOUND의 기능을 활용해보세요.`;
const siteNameSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SSAF SOUND',
  url: process.env.NEXT_PUBLIC_APP_URL as string,
};

const MainPage = () => {
  const { data: myInfo } = useMyInfo();
  const myCampus = myInfo?.ssafyInfo?.campus;
  const hotArticlesQuery = useHotArticlesByOffset();
  const allArticlesQuery = useAllArticlesByOffset();

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

      <JsonLD object={siteNameSchema} />

      <main css={selfCss}>
        <NavigationGroup />
        <Clock css={{ marginBottom: 32 }} />
        <LunchMenusPreview css={{ marginBottom: 80 }} campus={myCampus} />

        <Divider />
        <ArticlesPreview
          css={{ marginBottom: 50 }}
          articlesQuery={hotArticlesQuery}
          title={'HOT 게시글'}
          moreLinkRoute={routes.article.hot()}
        />

        <Divider />
        <ArticlesPreview
          css={{ marginBottom: 50 }}
          articlesQuery={allArticlesQuery}
          title={'전체 게시글'}
          moreLinkRoute={routes.article.all()}
          maxViewCount={5}
        />

        <Divider />
        <RecruitsPreview
          css={{ marginBottom: 50 }}
          marginForExpand={globalVars.mainLayoutPaddingX.var}
        />
      </main>

      <Footer />
    </>
  );
};

const Divider = () => (
  <div
    css={[
      expandCss(),
      {
        height: 2,
        background: palettes.background.grey,
        marginBottom: 10,
      },
    ]}
  />
);

export default MainPage;

const selfPaddingY = topBarHeight + 30;

const selfCss = css({
  padding: `${selfPaddingY}px 0px`,
});

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const recruitsQueryKey = JSON.parse(
    JSON.stringify(queryKeys.recruit.listByOffset())
  );
  const hotArticlesQueryKey = JSON.parse(
    JSON.stringify(queryKeys.articles.hotByOffset({ page: 1 }))
  );
  const allArticlesQueryKey = JSON.parse(
    JSON.stringify(queryKeys.articles.allListByOffset({ page: 1 }))
  );

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: hotArticlesQueryKey,
      queryFn: () => getHotArticlesByOffset(),
    }),
    queryClient.prefetchQuery({
      queryKey: allArticlesQueryKey,
      queryFn: () => getAllArticlesByOffset(),
    }),
    queryClient.prefetchQuery({
      queryKey: recruitsQueryKey,
      queryFn: () => getRecruitsByOffset(),
    }),
  ]);

  const { dehydratedState } = dehydrate(queryClient);

  return {
    props: { dehydratedState },
    revalidate: 30,
  };
};
