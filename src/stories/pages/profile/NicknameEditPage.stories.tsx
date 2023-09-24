import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import {
  updateNickname,
  validateNicknameRespondWithDuplicatedNickname,
} from '~/mocks/handlers/member';
import { mockValidateNickname } from '~/mocks/handlers/member/apis/mockValidateNickname';
import { userInfo } from '~/mocks/handlers/member/data';
import MyInfoSettingsNicknameEditPage from '~/pages/profile/myinfo-settings/nickname/edit';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MyInfoSettingsNicknameEditPage> = {
  title: 'Page/Profile/MyInfoSettings/NicknameEdit',
  component: MyInfoSettingsNicknameEditPage,
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
        member: [updateNickname, mockValidateNickname],
      },
    },
  },
};

export default meta;

type NicknameEditPageStory = StoryObj<typeof MyInfoSettingsNicknameEditPage>;

export const Success: NicknameEditPageStory = {
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

export const DuplicatedNickname: NicknameEditPageStory = {
  ...Success,
  parameters: {
    msw: {
      handlers: {
        member: [validateNicknameRespondWithDuplicatedNickname],
      },
    },
  },
};
