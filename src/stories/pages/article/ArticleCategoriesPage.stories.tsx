import type { Meta, StoryObj } from '@storybook/react';

import ArticleCategoriesPage from '~/pages/articles/categories';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof ArticleCategoriesPage> = {
  title: 'Page/게시글/게시판 목록',
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

export const Default: ArticleCategoriesPageStory = {
  name: '게시판 목록',
};
