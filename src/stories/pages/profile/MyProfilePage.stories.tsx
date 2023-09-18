import type { Meta, StoryObj } from '@storybook/react';

import { userInfo } from '~/mocks/handlers/member/data';
import MyProfilePage from '~/pages/profile/';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MyProfilePage> = {
  title: 'Page/Profile/MyProfile',
  component: MyProfilePage,
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);

      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type MyProfilePageStory = StoryObj<typeof MyProfilePage>;

export const MyProfile: MyProfilePageStory = {};
