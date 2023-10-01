import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import {
  mockGetEmptyLunchMenusWithPollStatus,
  mockGetLunchMenusWithPollStatus,
  mockGetLunchMenusWithPollStatusError,
} from '~/mocks/handlers/lunch/apis/mockGetLunchMenusWithPollStatus';
import {
  mockPollLunchMenu,
  mockPollLunchMenuError,
} from '~/mocks/handlers/lunch/apis/mockPollLunchMenu';
import {
  mockRevertPolledLunchMenu,
  mockRevertPolledLunchMenuError,
} from '~/mocks/handlers/lunch/apis/mockRevertPolledLunchMenu';
import {
  mockGetCertifiedSsafyMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import LunchPage from '~/pages/lunch';
import { LunchDateSpecifier } from '~/services/lunch/utils';
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
      lunch: [
        mockGetLunchMenusWithPollStatus,
        mockPollLunchMenu,
        mockRevertPolledLunchMenu,
      ],
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
        mockGetLunchMenusWithPollStatus,
        mockPollLunchMenuError,
        mockRevertPolledLunchMenuError,
      ],
    }),
  },
};

export const FailToLoadLunchMenu: LunchPageStory = {
  name: '점심 메뉴 로딩 오류',
  parameters: {
    ...createMswParameters({
      lunch: [mockGetLunchMenusWithPollStatusError],
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
      lunch: [mockGetEmptyLunchMenusWithPollStatus],
    }),
  },
};
