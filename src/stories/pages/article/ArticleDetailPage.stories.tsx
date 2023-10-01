import type { Meta, StoryObj } from '@storybook/react';
import type { ArticleDetail } from '~/services/article';

import { createMockGetArticleDetail } from '~/mocks/handlers/article/apis/mockGetArticleDetail';
import { createMockLikeArticle } from '~/mocks/handlers/article/apis/mockLikeArticle';
import { mockRemoveArticle } from '~/mocks/handlers/article/apis/mockRemoveArticle';
import { createMockScrapArticle } from '~/mocks/handlers/article/apis/mockScrapArticle';
import { createMockArticle } from '~/mocks/handlers/article/data';
import {
  createMockGetMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import ArticleDetailPage from '~/pages/articles/[articleId]';
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
      common: [mockRemoveArticle],
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

const modifiedArticleDetail: ArticleDetail = {
  ...myArticleDetail,
  modified: true,
};

export const Modified: ArticleDetailPageStory = {
  name: '수정된 게시글',
  parameters: {
    ...createMswParameters({
      article: [
        createMockGetArticleDetail(modifiedArticleDetail),
        createMockLikeArticle(modifiedArticleDetail),
        createMockScrapArticle(modifiedArticleDetail),
      ],
    }),
  },
};
