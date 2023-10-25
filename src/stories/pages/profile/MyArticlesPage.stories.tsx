import type { Meta, StoryObj } from '@storybook/react';

import {
  mockGetEmptyMyArticlesByOffset,
  mockGetMyArticlesByOffset,
  mockGetMyArticlesByOffsetError,
} from '~/mocks/handlers/article/apis/mockGetMyArticlesByOffset';
import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import MyArticlesPage from '~/pages/profile/my-articles';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;

const meta: Meta<typeof MyArticlesPage> = {
  title: 'Page/프로필/내가 작성한 게시글',
  component: MyArticlesPage,
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

type MyArticlesPageStory = StoryObj<typeof MyArticlesPage>;

export const Default: MyArticlesPageStory = {
  name: '정상',
  parameters: {
    ...createMswParameters({
      article: [mockGetMyArticlesByOffset],
    }),
  },
};

export const Empty: MyArticlesPageStory = {
  name: '빈 데이터',
  parameters: {
    ...createMswParameters({
      article: [mockGetEmptyMyArticlesByOffset],
    }),
  },
};

export const Error: MyArticlesPageStory = {
  name: '에러',
  parameters: {
    ...createMswParameters({
      article: [mockGetMyArticlesByOffsetError],
    }),
  },
};
