import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import { updateIsMajor } from '~/mocks/handlers/member';
import { userInfo } from '~/mocks/handlers/member/data';
import MyInfoSettingsIsMajorEditPage from '~/pages/profile/myinfo-settings/is-major/edit';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MyInfoSettingsIsMajorEditPage> = {
  title: 'Page/MyInfoSettings/IsMajorEdit',
  component: MyInfoSettingsIsMajorEditPage,
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
        member: [updateIsMajor],
      },
    },
  },
};

export default meta;

type IsMajorEditPageStory = StoryObj<typeof MyInfoSettingsIsMajorEditPage>;

export const Default: IsMajorEditPageStory = {
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
