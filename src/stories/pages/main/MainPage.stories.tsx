import type { Meta, StoryObj } from '@storybook/react';
import type { InfiniteData } from '@tanstack/query-core';
import type { GetHotArticlesApiData } from '~/services/article';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import {
  getEmptyLunchMenusWithPollStatus,
  getHotArticles,
  getLunchMenusWithPollStatus,
} from '~/mocks/handlers';
import { userInfo } from '~/mocks/handlers/member/data';
import MainPage from '~/pages/main';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { RecruitCategoryName } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MainPage> = {
  title: 'Page/Main',
  component: MainPage,
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      const [queryRemoved, setQueryRemoved] = useState(false);

      if (!queryRemoved) {
        queryClient.removeQueries(queryKeys.lunch.self());
        queryClient.removeQueries(queryKeys.articles.hot());
        queryClient.removeQueries(
          queryKeys.recruit.list({ category: RecruitCategoryName.PROJECT })
        );
        setQueryRemoved(true);
      }

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

type MainPageStory = StoryObj<typeof MainPage>;

export const SignedIn: MainPageStory = {
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();

      useEffect(() => {
        setMyInfo(userInfo.certifiedSsafyUserInfo);
      }, [setMyInfo]);

      return <Story />;
    },
  ],
  parameters: {
    msw: {
      handlers: {
        lunch: [getLunchMenusWithPollStatus],
        article: [getHotArticles],
        // recruit: []
      },
    },
  },
};

export const NotSignedIn: MainPageStory = {
  ...SignedIn,
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();

      useEffect(() => {
        // eslint-disable-next-line
        // @ts-ignore
        setMyInfo(null);
      }, [setMyInfo]);

      return <Story />;
    },
  ],
};

export const Error: MainPageStory = {
  parameters: {
    msw: {
      handlers: {
        lunch: [],
        article: [],
        recruit: [],
      },
    },
  },
};

const emptyHotArticles = {
  pages: [{ posts: [], cursor: null }],
  pageParams: [null],
};

export const NotExistData: MainPageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      queryClient.setQueryData<InfiniteData<GetHotArticlesApiData['data']>>(
        queryKeys.articles.hot(),
        emptyHotArticles
      );

      return <Story />;
    },
  ],
  parameters: {
    msw: {
      handlers: {
        lunch: [getEmptyLunchMenusWithPollStatus],
        article: [],
        recruit: [],
      },
    },
  },
};
