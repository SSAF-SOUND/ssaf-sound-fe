import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { likeArticleError, scrapArticleError } from '~/mocks/handlers';
import { articleError, articles } from '~/mocks/handlers/article/data';
import ArticleDetailPage from '~/pages/articles/[articleId]';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof ArticleDetailPage> = {
  title: 'Page/Article/Detail',
  component: ArticleDetailPage,
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      useEffect(() => {
        queryClient.invalidateQueries(queryKeys.user.myInfo());
      }, [queryClient]);

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

type ArticleDetailPageStory = StoryObj<typeof ArticleDetailPage>;

export const MyArticle: ArticleDetailPageStory = {
  render: () => {
    const articleId = 1;
    return (
      <ArticleDetailPage
        articleId={articleId}
        initialArticleDetail={articles[articleId]}
      />
    );
  },
};

export const NotMine: ArticleDetailPageStory = {
  render: () => {
    const articleId = 2;
    return (
      <ArticleDetailPage
        articleId={articleId}
        initialArticleDetail={articles[articleId]}
      />
    );
  },
};

export const NotSignedIn: ArticleDetailPageStory = {
  ...NotMine,
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
  parameters: {
    msw: {
      handlers: {
        member: [],
      },
    },
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
  ...MyArticle,
  parameters: {
    msw: {
      handlers: {
        article: [likeArticleError, scrapArticleError],
      },
    },
  },
};
