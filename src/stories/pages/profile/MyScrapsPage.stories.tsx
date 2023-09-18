import type { Meta, StoryObj } from '@storybook/react';
import type { InfiniteData } from '@tanstack/query-core';
import type { GetMyScrapedArticlesApiData } from '~/services/article';
import type { GetMyScrapedRecruitsApiData } from '~/services/recruit';

import { useQueryClient } from '@tanstack/react-query';

import { userInfo } from '~/mocks/handlers/member/data';
import MyScrapsPage from '~/pages/profile/my-scraps';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MyScrapsPage> = {
  title: 'Page/Profile/MyScraps',
  component: MyScrapsPage,
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      setMyInfo(mockUser);
      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type MyScrapsPageStory = StoryObj<typeof MyScrapsPage>;

const mockUser = userInfo.certifiedSsafyUserInfo;
const myScrapedArticlesQueryKey = queryKeys.articles.myScraped();
const myScrapedRecruitsQueryKey = queryKeys.recruit.myScraped();
const emptyMyScrapedArticles: InfiniteData<
  GetMyScrapedArticlesApiData['data']
> = {
  pages: [{ cursor: null, posts: [] }],
  pageParams: [null],
};
const emptyMyScrapedRecruits: InfiniteData<
  GetMyScrapedRecruitsApiData['data']
> = {
  pages: [{ nextCursor: null, recruits: [], isLast: true }],
  pageParams: [null],
};
export const Default: MyScrapsPageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      queryClient.removeQueries(myScrapedArticlesQueryKey);
      queryClient.removeQueries(myScrapedRecruitsQueryKey);
      return <Story />;
    },
  ],
};

export const Empty: MyScrapsPageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      queryClient.setQueryData(
        myScrapedArticlesQueryKey,
        emptyMyScrapedArticles
      );
      queryClient.setQueryData(
        myScrapedRecruitsQueryKey,
        emptyMyScrapedRecruits
      );
      return <Story />;
    },
  ],
};
