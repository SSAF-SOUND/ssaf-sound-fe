import type { Meta, StoryObj } from '@storybook/react';
import type { UserInfo } from '~/services/member';

import { useQueryClient } from '@tanstack/react-query';

import { userInfo } from '~/mocks/handlers/member/data';
import ProfilePage from '~/pages/profile/[userId]';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const mockMyInfo: UserInfo = {
  ...userInfo.certifiedSsafyUserInfo,
  memberId: 1,
};
const mockUserInfo: UserInfo = {
  ...userInfo.certifiedSsafyUserInfo,
  memberId: 2,
};
const meta: Meta<typeof ProfilePage> = {
  title: 'Page/Profile/UserProfile',
  component: ProfilePage,
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      setMyInfo(mockMyInfo);

      const queryClient = useQueryClient();
      queryClient.setQueryData(queryKeys.user.userInfo(NaN), mockUserInfo);
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

type ProfilePageStory = StoryObj<typeof ProfilePage>;

export const Default: ProfilePageStory = {};
