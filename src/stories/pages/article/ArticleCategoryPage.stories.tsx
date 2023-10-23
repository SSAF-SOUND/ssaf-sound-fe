import type { Meta, StoryObj } from '@storybook/react';

import { mockGetArticleCategories } from '~/mocks/handlers/article/apis/mockGetArticleCategories';
import {
  mockGetArticlesByCursorError,
  mockGetEmptyArticlesByCursor,
} from '~/mocks/handlers/article/apis/mockGetArticlesByCursor';
import { mockGetEmptyArticlesByKeywordByCursor } from '~/mocks/handlers/article/apis/mockGetArticlesByKeywordByCursor';
import {
  createMockGetMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import ArticleCategoryPage from '~/pages/articles/categories/[categoryId]';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;
const categoryId = 1;

const meta: Meta<typeof ArticleCategoryPage> = {
  title: 'Page/게시글/게시글 목록',
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
    ...createMswParameters({
      member: [createMockGetMyInfo(myInfo)],
      common: [mockGetArticleCategories],
    }),
  },
  args: { categoryId },
};

export default meta;

type ArticleCategoryPageStory = StoryObj<typeof ArticleCategoryPage>;

export const SignedIn: ArticleCategoryPageStory = {
  name: '로그인 한 경우',
};

export const NotSignedIn: ArticleCategoryPageStory = {
  name: '로그인 하지 않은 경우',
  parameters: {
    ...createMswParameters({
      member: [mockGetMyInfoError],
    }),
  },
};

export const FetchError: ArticleCategoryPageStory = {
  name: '게시글 목록 불러오기 오류',
  parameters: {
    ...createMswParameters({
      article: [mockGetArticlesByCursorError],
    }),
  },
};

export const NotExist: ArticleCategoryPageStory = {
  name: '빈 게시글 목록',
  parameters: {
    ...createMswParameters({
      article: [mockGetEmptyArticlesByCursor],
    }),
  },
};

export const NoSearchResult: ArticleCategoryPageStory = {
  name: '빈 게시글 검색 목록',
  parameters: {
    ...createMswParameters({
      article: [mockGetEmptyArticlesByKeywordByCursor],
    }),
    nextjs: {
      router: {
        query: {
          keyword: 'keyword',
        },
      },
    },
  },
};
