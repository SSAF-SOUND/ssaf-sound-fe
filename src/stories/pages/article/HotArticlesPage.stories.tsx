import type { Meta, StoryObj } from '@storybook/react';
import type { InfiniteData } from '@tanstack/query-core';
import type { GetHotArticlesApiData } from '~/services/article';

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

export const FetchError: HotArticlesPageStory = {
  ...Success,
  parameters: {
    msw: {
      handlers: {
        article: [getHotArticlesError],
      },
    },
  },
};

const notExistData: InfiniteData<GetHotArticlesApiData['data']> = {
  pages: [
    {
      posts: [],
      cursor: null,
    },
  ],
  pageParams: [null],
};

export const NotExist: HotArticlesPageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      const queryKey = queryKeys.articles.hot();
      queryClient.setQueryData(queryKey, notExistData);

      return <Story />;
    },
  ],
};

/**
 * 검색 결과가 없는 스토리(NoSearchResultsStory)는 작성하지 않음
 * 검색어는 `query parameters`기반으로 동작하는데, 관련 애드온인 `@storybook/addon-queryparams`가 최신 스토리북 버전과 호환되지 않음
 */
