import type { Meta, StoryObj } from '@storybook/react';

import { articleError, articles } from '~/mocks/handlers/article/data';
import ArticleDetailPage from '~/pages/articles/[articleId]';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof ArticleDetailPage> = {
  title: 'Page/Article/Detail',
  component: ArticleDetailPage,
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

type ArticleDetailPageStory = StoryObj<typeof ArticleDetailPage>;

export const Exists: ArticleDetailPageStory = {
  render: () => {
    return (
      <ArticleDetailPage articleId={1} initialArticleDetail={articles[1]} />
    );
  },
};

export const NotExists: ArticleDetailPageStory = {
  render: () => {
    return (
      <ArticleDetailPage articleId={100} initialArticleDetail={articleError} />
    );
  },
};
