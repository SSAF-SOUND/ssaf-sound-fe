import type { Meta, StoryObj } from '@storybook/react';

import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import {
  mockUpdateTrack,
  mockUpdateTrackError,
} from '~/mocks/handlers/member/apis/mockUpdateTrack';
import MyInfoSettingsTrackEditPage from '~/pages/profile/myinfo-settings/track/edit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof MyInfoSettingsTrackEditPage> = {
  title: 'Page/프로필/내 정보 세팅/트랙 수정',
  component: MyInfoSettingsTrackEditPage,
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
      member: [],
      common: [mockGetCertifiedSsafyMyInfo],
    }),
  },
};

export default meta;

type TrackEditPageStory = StoryObj<typeof MyInfoSettingsTrackEditPage>;

export const Default: TrackEditPageStory = {
  name: '정상',
  parameters: {
    ...createMswParameters({
      member: [mockUpdateTrack],
    }),
  },
};

export const Error: TrackEditPageStory = {
  name: '트랙 수정 오류',
  parameters: {
    ...createMswParameters({
      member: [mockUpdateTrackError],
    }),
  },
};
