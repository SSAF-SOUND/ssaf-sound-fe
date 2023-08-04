import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getArticleCategories, getArticlesError } from '~/mocks/handlers';
import ArticleCategoryPage from '~/pages/articles/categories/[categoryId]';
import { queryKeys } from '~/react-query/common';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof ArticleCategoryPage> = {
  title: 'Page/Article/Category',
  component: ArticleCategoryPage,
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

type ArticleCategoryPageStory = StoryObj<typeof ArticleCategoryPage>;

const successCaseCategoryId = 1;

export const Success: ArticleCategoryPageStory = {
  args: {
    categoryId: successCaseCategoryId,
  },
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      useEffect(() => {
        queryClient.resetQueries(
          queryKeys.articles.list(successCaseCategoryId)
        );
      }, [queryClient]);

      return <Story />;
    },
  ],
};

const errorCaseCategoryId = 2;
export const InfiniteScrollError: ArticleCategoryPageStory = {
  args: {
    categoryId: errorCaseCategoryId,
  },
  parameters: {
    msw: {
      handlers: {
        article: [getArticlesError, getArticleCategories],
      },
    },
  },
};
