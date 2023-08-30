import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getHotArticles, getLunchMenusWithPollStatus } from '~/mocks/handlers';
import { userInfo } from '~/mocks/handlers/member/data';
import MainPage from '~/pages/main';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MainPage> = {
  title: 'Page/Main',
  component: MainPage,
  decorators: [
    (Story) => {
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
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      const [removed, setRemoved] = useState(false);

      if (!removed) {
        queryClient.removeQueries(queryKeys.lunch.self());
        queryClient.removeQueries(queryKeys.articles.hot());
        queryClient.removeQueries(queryKeys.recruit.list());
        setRemoved(true);
      }

      return <Story />;
    },
  ],
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
