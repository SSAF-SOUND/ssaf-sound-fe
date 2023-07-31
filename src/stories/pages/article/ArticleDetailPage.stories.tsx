import type { Meta, StoryObj } from '@storybook/react';

import { likeArticleError, scrapArticleError } from '~/mocks/handlers';
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

export const Normal: ArticleDetailPageStory = {
  render: () => {
    return (
      <ArticleDetailPage articleId={1} initialArticleDetail={articles[1]} />
    );
  },
};

export const NotExistsArticle: ArticleDetailPageStory = {
  render: () => {
    return (
      <ArticleDetailPage articleId={100} initialArticleDetail={articleError} />
    );
  },
};

export const LikeAndScrapError = {
  ...Normal,
  parameters: {
    msw: {
      handlers: {
        article: [likeArticleError, scrapArticleError],
      },
    },
  },
};
