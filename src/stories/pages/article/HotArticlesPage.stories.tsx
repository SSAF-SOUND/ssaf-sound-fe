import type { Meta, StoryObj } from '@storybook/react';

import { mockGetEmptyHotArticlesByKeywordByOffset } from "~/mocks/handlers/article/apis/mockGetHotArticlesByKeywordByOffset";
import {
  mockGetEmptyHotArticlesByOffset,
  mockGetHotArticlesByOffsetError,
} from '~/mocks/handlers/article/apis/mockGetHotArticlesByOffset';
import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import HotArticlesPage from '~/pages/hot-articles';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;

const meta: Meta<typeof HotArticlesPage> = {
  title: 'Page/게시글/핫 게시글 목록',
  component: HotArticlesPage,
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
};

export default meta;

type HotArticlesPageStory = StoryObj<typeof HotArticlesPage>;

export const Normal: HotArticlesPageStory = {
  name: '핫 게시글 목록',
};

export const FetchError: HotArticlesPageStory = {
  name: '핫 게시글 목록 불러오기 오류',
  parameters: {
    ...createMswParameters({
      article: [mockGetHotArticlesByOffsetError],
    }),
  },
};

export const NotExist: HotArticlesPageStory = {
  name: '빈 핫 게시글 목록',
  parameters: {
    ...createMswParameters({
      article: [mockGetEmptyHotArticlesByOffset],
    }),
  },
};

export const NoSearchResult: HotArticlesPageStory = {
  name: '빈 핫 게시글 검색 목록',
  parameters: {
    ...createMswParameters({
      article:[mockGetEmptyHotArticlesByKeywordByOffset],
    }),
    nextjs: {
      router: {
        query: {
          keyword: 'keyword'
        }
      }
    }
  }
}
