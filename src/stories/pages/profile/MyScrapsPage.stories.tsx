import type { Meta, StoryObj } from '@storybook/react';

import {
  mockGetEmptyMyScrapedArticlesByOffset,
  mockGetMyScrapedArticlesByOffset,
  mockGetMyScrapedArticlesByOffsetError,
} from '~/mocks/handlers/article/apis/mockGetMyScrapedArticlesByOffset';
import { createMockGetMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUserInfo } from '~/mocks/handlers/member/data';
import {
  mockGetEmptyMyScrapedRecruitsByOffset,
  mockGetMyScrapedRecruitsByOffset,
  mockGetMyScrapedRecruitsByOffsetError,
} from '~/mocks/handlers/recruit/apis/mockGetMyScrapedRecruitsByOffset';
import MyScrapsPage from '~/pages/profile/my-scraps';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const myInfo = mockUserInfo.certifiedSsafyUserInfo;

const meta: Meta<typeof MyScrapsPage> = {
  title: 'Page/프로필/내 스크랩',
  component: MyScrapsPage,
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

type MyScrapsPageStory = StoryObj<typeof MyScrapsPage>;

export const Default: MyScrapsPageStory = {
  name: '정상',
  parameters: {
    ...createMswParameters({
      article: [mockGetMyScrapedArticlesByOffset],
      recruit: [mockGetMyScrapedRecruitsByOffset],
    }),
  },
};

export const Empty: MyScrapsPageStory = {
  name: '빈 데이터',
  parameters: {
    ...createMswParameters({
      article: [mockGetEmptyMyScrapedArticlesByOffset],
      recruit: [mockGetEmptyMyScrapedRecruitsByOffset],
    }),
  },
};

export const Error: MyScrapsPageStory = {
  name: '에러',
  parameters: {
    ...createMswParameters({
      article: [mockGetMyScrapedArticlesByOffsetError],
      recruit: [mockGetMyScrapedRecruitsByOffsetError],
    }),
  },
};
