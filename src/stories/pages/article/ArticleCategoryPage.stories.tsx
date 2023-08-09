import type { Meta, StoryObj } from '@storybook/react';

import { getArticleCategories, getArticlesError } from '~/mocks/handlers';
import ArticleCategoryPage from '~/pages/articles/categories/[categoryId]';
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

export const Default: ArticleCategoryPageStory = {
  args: {
    categoryId: successCaseCategoryId,
  },
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
