import type { Meta, StoryObj } from '@storybook/react';

import {
  mockGetCertifiedSsafyMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import {
  mockGetEmptyRecruitsByOffset,
  mockGetRecruitsByOffset,
} from '~/mocks/handlers/recruit/apis/mockGetRecruitsByOffset';
import RecruitsPage from '~/pages/recruits';
import { RecruitCategoryName } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof RecruitsPage> = {
  title: 'Page/리쿠르팅/전체 리쿠르팅 조회',
  component: RecruitsPage,
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
      member: [mockGetCertifiedSsafyMyInfo],
      recruit: [mockGetRecruitsByOffset],
    }),
  },
};

export default meta;

type RecruitsPageStory = StoryObj<typeof RecruitsPage>;

export const SignedIn: RecruitsPageStory = {
  name: '로그인',
};

export const NotSignedIn: RecruitsPageStory = {
  name: '로그인 하지 않음',
  parameters: {
    ...createMswParameters({
      member: [mockGetMyInfoError],
    }),
  },
};

export const NotExist: RecruitsPageStory = {
  name: '빈 리쿠르팅 데이터',
  parameters: {
    ...createMswParameters({
      recruit: [mockGetEmptyRecruitsByOffset],
    }),
  },
};

export const Study: RecruitsPageStory = {
  name: '스터디 조회',
  parameters: {
    nextjs: {
      router: {
        query: {
          category: RecruitCategoryName.STUDY,
        },
      },
    },
  },
};
