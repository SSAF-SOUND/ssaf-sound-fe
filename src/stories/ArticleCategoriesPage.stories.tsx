import type { Meta, StoryObj } from '@storybook/react';

import ArticleCategoriesPage from '~/pages/articles';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof ArticleCategoriesPage> = {
  title: 'Page/ArticleCategories',
  component: ArticleCategoriesPage,
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

type ArticleCategoriesPageStory = StoryObj<typeof ArticleCategoriesPage>;

export const Default: ArticleCategoriesPageStory = {};
