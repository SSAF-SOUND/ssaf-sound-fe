import type { Meta, StoryObj } from '@storybook/react';

import { createArticleError } from '~/mocks/handlers';
import ArticleCreatePage from '~/pages/articles/new';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof ArticleCreatePage> = {
  title: 'Page/Article/Create',
  component: ArticleCreatePage,
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

type ArticleCreatePageStory = StoryObj<typeof ArticleCreatePage>;

export const Success: ArticleCreatePageStory = {};

export const FailToCreateArticle: ArticleCreatePageStory = {
  parameters: {
    msw: {
      handlers: {
        article: [createArticleError],
      },
    },
  },
};
