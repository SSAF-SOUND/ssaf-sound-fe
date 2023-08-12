import type { Meta, StoryObj } from '@storybook/react';

import { userInfo } from '~/mocks/handlers/member/data';
import MyArticlesPage from '~/pages/profile/my-articles';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof MyArticlesPage> = {
  title: 'Page/Profile/MyArticles',
  component: MyArticlesPage,
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

type MyArticlesPageStory = StoryObj<typeof MyArticlesPage>;

export const Default: MyArticlesPageStory = {
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);
      return <Story />;
    },
  ],
};
