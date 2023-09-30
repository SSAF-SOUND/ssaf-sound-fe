import type { Meta, StoryObj } from '@storybook/react';

import {
  mockGetCertifiedSsafyMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import {
  mockGetEmptyRecruits,
  mockGetRecruits,
} from '~/mocks/handlers/recruit/apis/mockGetRecruits';
import RecruitsPage from '~/pages/recruits';
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
      recruit: [mockGetRecruits],
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
      recruit: [mockGetEmptyRecruits],
    }),
  },
};
