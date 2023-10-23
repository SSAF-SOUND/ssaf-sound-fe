import type { Meta, StoryObj } from '@storybook/react';

import { produce } from 'immer';

import {
  mockGetEmptyHotArticlesByCursor,
  mockGetHotArticlesByCursor,
} from '~/mocks/handlers/article/apis/mockGetHotArticlesByCursor';
import {
  mockGetEmptyLunchMenusWithPollStatus,
  mockGetLunchMenusWithPollStatus,
} from '~/mocks/handlers/lunch/apis/mockGetLunchMenusWithPollStatus';
import {
  createMockGetMyInfo,
  mockGetCertifiedSsafyMyInfo,
  mockGetMyInfoError,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { userInfo } from '~/mocks/handlers/member/data';
import {
  mockGetEmptyRecruits,
  mockGetRecruits,
} from '~/mocks/handlers/recruit/apis/mockGetRecruits';
import MainPage from '~/pages';
import { SsafyCampus } from '~/services/meta/utils';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const certifiedUserInfo = userInfo.certifiedSsafyUserInfo;

const meta: Meta<typeof MainPage> = {
  title: 'Page/메인 페이지',
  component: MainPage,
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
      lunch: [mockGetLunchMenusWithPollStatus],
      article: [mockGetHotArticlesByCursor],
      recruit: [mockGetRecruits],
    }),
  },
};

export default meta;

type MainPageStory = StoryObj<typeof MainPage>;

export const NotSignedIn: MainPageStory = {
  name: '로그인 하지 않은 경우',
  parameters: {
    ...createMswParameters({
      member: [mockGetMyInfoError],
    }),
  },
};

const createStoryByUserCampus = (campus: SsafyCampus): MainPageStory => {
  return {
    parameters: {
      ...createMswParameters({
        member: [
          createMockGetMyInfo(
            produce(certifiedUserInfo, (draft) => {
              draft.ssafyInfo.campus = campus;
            })
          ),
        ],
      }),
    },
  };
};

export const Seoul: MainPageStory = {
  name: '서울 캠퍼스 유저',
  ...createStoryByUserCampus(SsafyCampus.SEOUL),
};

export const Gwangju: MainPageStory = {
  name: '광주 캠퍼스 유저',
  ...createStoryByUserCampus(SsafyCampus.GWANGJU),
};

export const Gumi: MainPageStory = {
  name: '구미 캠퍼스 유저',
  ...createStoryByUserCampus(SsafyCampus.GUMI),
};

export const Deajeon: MainPageStory = {
  name: '대전 캠퍼스 유저',
  ...createStoryByUserCampus(SsafyCampus.DAEJEON),
};

export const Buulgyeong: MainPageStory = {
  name: '부울경 캠퍼스 유저',
  ...createStoryByUserCampus(SsafyCampus.BUULGYEONG),
};

export const Error: MainPageStory = {
  name: '에러',
  parameters: {
    msw: {
      handlers: {
        lunch: [],
        article: [],
        recruit: [],
      },
    },
  },
};

export const Empty: MainPageStory = {
  name: '빈 데이터',
  parameters: {
    msw: {
      handlers: {
        lunch: [mockGetEmptyLunchMenusWithPollStatus],
        article: [mockGetEmptyHotArticlesByCursor],
        recruit: [mockGetEmptyRecruits],
      },
    },
  },
};
