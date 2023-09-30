import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import {
  getEmptyLunchMenusWithPollStatus,
  getLunchMenusWithPollStatus,
  getLunchMenusWithPollStatusError,
  pollLunchMenuError,
  revertPolledLunchMenuError,
} from '~/mocks/handlers';
import {
  mockGetCertifiedSsafyMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import LunchPage from '~/pages/lunch';
import { LunchDateSpecifier } from '~/services/lunch';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof LunchPage> = {
  title: 'Page/점심 메뉴',
  component: LunchPage,
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
    }),
    nextjs: {
      router: {
        query: {
          date: LunchDateSpecifier.TODAY,
        },
      },
    },
  },
};

export default meta;

type LunchPageStory = StoryObj<typeof LunchPage>;

export const Normal: LunchPageStory = {
  name: '정상',
};

export const PollError: LunchPageStory = {
  name: '투표 오류',
  parameters: {
    ...createMswParameters({
      lunch: [
        getLunchMenusWithPollStatus,
        pollLunchMenuError,
        revertPolledLunchMenuError,
      ],
    }),
  },
};

export const FailToLoadLunchMenu: LunchPageStory = {
  name: '점심 메뉴 로딩 오류',
  parameters: {
    ...createMswParameters({
      lunch: [getLunchMenusWithPollStatusError],
    }),
  },
};

export const NotSignedIn: LunchPageStory = {
  name: '로그인 하지 않은 경우',
  parameters: {
    ...createMswParameters({
      member: [mockGetMyInfoError],
    }),
  },
};

export const NotExistData: LunchPageStory = {
  name: '빈 점심 메뉴',
  parameters: {
    ...createMswParameters({
      lunch: [getEmptyLunchMenusWithPollStatus],
    }),
  },
};
