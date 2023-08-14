import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import { deleteAccountError } from '~/mocks/handlers';
import { userInfo } from '~/mocks/handlers/member/data';
import DeleteAccountPage from '~/pages/profile/myinfo-settings/account/delete';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof DeleteAccountPage> = {
  title: 'Page/Profile/MyInfoSettings/DeleteAccount',
  component: DeleteAccountPage,
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
        member: [],
      },
    },
  },
};

export default meta;

type DeleteAccountPageStory = StoryObj<typeof DeleteAccountPage>;

export const Success: DeleteAccountPageStory = {
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

export const Error: DeleteAccountPageStory = {
  ...Success,
  parameters: {
    msw: {
      handlers: {
        auth: [deleteAccountError],
      },
    },
  },
};
