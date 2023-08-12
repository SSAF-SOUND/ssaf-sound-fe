import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import {
  getProfileVisibility,
  updateProfileVisibility,
} from '~/mocks/handlers/member';
import { userInfo } from '~/mocks/handlers/member/data';
import MyInfoSettingsPage from '~/pages/profile/myinfo-settings';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MyInfoSettingsPage> = {
  title: 'Page/Profile/MyInfoSettings/Root',
  component: MyInfoSettingsPage,
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
        member: [getProfileVisibility, updateProfileVisibility],
      },
    },
  },
};

export default meta;

type MyInfoSettingsPageStory = StoryObj<typeof MyInfoSettingsPage>;

export const NonSsafyUser: MyInfoSettingsPageStory = {
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      useEffect(() => {
        setMyInfo(userInfo.nonSsafyUserInfo);
      }, [setMyInfo]);

      return <Story />;
    },
  ],
};

export const UnCertifiedSsafyUser: MyInfoSettingsPageStory = {
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      useEffect(() => {
        setMyInfo(userInfo.uncertifiedSsafyUserInfo);
      }, [setMyInfo]);

      return <Story />;
    },
  ],
};

export const CertifiedSsafyUser: MyInfoSettingsPageStory = {
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
