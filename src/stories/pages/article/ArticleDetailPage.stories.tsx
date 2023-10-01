import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
  likeArticleCommentError,
  removeArticleCommentError,
  replyArticleCommentError,
  updateArticleCommentError,
} from '~/mocks/handlers';
import {
  createMockGetArticleDetail,
  mockGetArticleDetail,
} from '~/mocks/handlers/article/apis/mockGetArticleDetail';
import {
  createMockLikeArticle,
  mockLikeArticleError,
} from '~/mocks/handlers/article/apis/mockLikeArticle';
import {
  createMockScrapArticle,
  mockScrapArticleError,
} from '~/mocks/handlers/article/apis/mockScrapArticle';
import { articles, createMockArticle } from '~/mocks/handlers/article/data';
import {
  createMockGetMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo, userInfo } from '~/mocks/handlers/member/data';
import ArticleDetailPage from '~/pages/articles/[articleId]';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;
const otherUserInfo = mockUserInfo.uncertifiedSsafyUserInfo;
const articleId = 10000;

const meta: Meta<typeof ArticleDetailPage> = {
  title: 'Page/게시글/게시글 상세',
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
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
    }),
  },
  args: {
    articleId,
  },
};

export default meta;

type ArticleDetailPageStory = StoryObj<typeof ArticleDetailPage>;

const myArticleDetail = createMockArticle(articleId, {
  mine: true,
  author: myInfo,
});

export const MyArticle: ArticleDetailPageStory = {
  name: '내 게시글',
  parameters: {
    ...createMswParameters({
      article: [
        createMockGetArticleDetail(myArticleDetail),
        createMockLikeArticle(myArticleDetail),
        createMockScrapArticle(myArticleDetail),
      ],
    }),
  },
};

const notMyArticleDetail = createMockArticle(articleId, {
  mine: false,
  author: otherUserInfo,
});

export const NotMine: ArticleDetailPageStory = {
  name: '다른 사람의 게시글',
  parameters: {
    ...createMswParameters({
      article: [
        createMockGetArticleDetail(notMyArticleDetail),
        createMockLikeArticle(notMyArticleDetail),
        createMockScrapArticle(notMyArticleDetail),
      ],
    }),
  },
};

export const NotSignedIn: ArticleDetailPageStory = {
  name: '로그인 하지 않은 경우',
  parameters: {
    msw: {
      ...NotMine.parameters?.msw,
      ...createMswParameters({
        member: [mockGetMyInfoError],
      }).msw,
    },
  },
};
