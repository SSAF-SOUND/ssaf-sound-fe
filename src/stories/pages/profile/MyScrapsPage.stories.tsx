import type { Meta, StoryObj } from '@storybook/react';

import { userInfo } from '~/mocks/handlers/member/data';
import MyScrapsPage from '~/pages/profile/my-scraps';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MyScrapsPage> = {
  title: 'Page/Profile/MyScraps',
  component: MyScrapsPage,
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

type MyScrapsPageStory = StoryObj<typeof MyScrapsPage>;

export const Default: MyScrapsPageStory = {
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);
      return <Story />;
    },
  ],
};
