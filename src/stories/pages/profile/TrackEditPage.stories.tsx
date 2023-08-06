import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import { updateTrack } from '~/mocks/handlers/member';
import { userInfo } from '~/mocks/handlers/member/data';
import MyInfoSettingsTrackEditPage from '~/pages/profile/myinfo-settings/track/edit';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MyInfoSettingsTrackEditPage> = {
  title: 'Page/Profile/MyInfoSettings/TrackEdit',
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

    msw: {
      handlers: {
        member: [updateTrack],
      },
    },
  },
};

export default meta;

type TrackEditPageStory = StoryObj<typeof MyInfoSettingsTrackEditPage>;

export const Default: TrackEditPageStory = {
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      useEffect(() => {
        setMyInfo(userInfo.certifiedSsafyUserInfo);
      }, [setMyInfo]);

      return <Story />;
    },
  ],
};
