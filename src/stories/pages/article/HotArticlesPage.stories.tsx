import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getHotArticlesError } from '~/mocks/handlers';
import HotArticlesPage from '~/pages/hot-articles';
import { queryKeys } from '~/react-query/common';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof HotArticlesPage> = {
  title: 'Page/Article/Hot',
  component: HotArticlesPage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type HotArticlesPageStory = StoryObj<typeof HotArticlesPage>;

export const Success: HotArticlesPageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      useEffect(() => {
        queryClient.resetQueries(queryKeys.articles.hot());
      }, [queryClient]);

      return <Story />;
    },
  ],
};

export const InfiniteScrollError: HotArticlesPageStory = {
  ...Success,
  parameters: {
    msw: {
      handlers: {
        article: [getHotArticlesError],
      },
    },
  },
};
