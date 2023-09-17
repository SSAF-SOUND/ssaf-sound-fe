import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';

import { userInfo } from '~/mocks/handlers/member/data';
import ProfilePage from '~/pages/profile/[userId]';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof ProfilePage> = {
  title: 'Page/Profile/MyProfile',
  component: ProfilePage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type ProfilePageStory = StoryObj<typeof ProfilePage>;

export const MyProfile: ProfilePageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);
      queryClient.setQueryData(
        queryKeys.user.userInfo(NaN),
        userInfo.certifiedSsafyUserInfo
      );

      return <Story />;
    },
  ],
};

export const NotMine: ProfilePageStory = {
  decorators: [
    (Story) => {
      const queryClient = useQueryClient();
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);
      queryClient.setQueryData(
        // 스토리북의 path parameter (id)는 undefined이므로, 숫자 변환시 NaN -> queryKey값은 ['userInfo', null]
        queryKeys.user.userInfo(NaN),
        userInfo.uncertifiedSsafyUserInfo
      );

      return <Story />;
    },
  ],
};
