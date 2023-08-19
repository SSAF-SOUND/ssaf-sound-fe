import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
  likeArticleCommentError,
  likeArticleError,
  removeArticleCommentError,
  replyArticleCommentError,
  scrapArticleError,
  updateArticleCommentError,
} from '~/mocks/handlers';
import { articles } from '~/mocks/handlers/article/data';
import { userInfo } from '~/mocks/handlers/member/data';
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
  render: function Render() {
    const articleId = 1; // 홀수 id는 `mine`값이 `true`
    const queryClient = useQueryClient();
    const queryKey = queryKeys.articles.detail(articleId);
    queryClient.setQueryData(queryKey, articles[articleId]);

    return <ArticleDetailPage articleId={articleId} />;
  },
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);
      return <Story />;
    },
  ],
};

export const NotMine: ArticleDetailPageStory = {
  render: function Render() {
    const articleId = 2; // 짝수 id는 `mine`값이 `false`
    const queryClient = useQueryClient();
    const queryKey = queryKeys.articles.detail(articleId);
    queryClient.setQueryData(queryKey, articles[articleId]);

    return <ArticleDetailPage articleId={articleId} />;
  },
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);
      return <Story />;
    },
  ],
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
    return <ArticleDetailPage articleId={100} />;
  },
};

export const ArticleLikeAndScrapError = {
  ...MyArticle,
  parameters: {
    msw: {
      handlers: {
        article: [likeArticleError, scrapArticleError],
      },
    },
  },
};

export const CommentInteractionError = {
  ...MyArticle,
  parameters: {
    msw: {
      handlers: {
        articleComment: [
          likeArticleCommentError,
          replyArticleCommentError,
          updateArticleCommentError,
          removeArticleCommentError,
        ],
      },
    },
  },
};
