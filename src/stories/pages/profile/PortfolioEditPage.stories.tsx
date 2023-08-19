import type { Meta, StoryObj } from '@storybook/react';

import { updateMyPortfolioError } from '~/mocks/handlers';
import { userInfo } from '~/mocks/handlers/member/data';
import PortfolioEditPage from '~/pages/profile/portfolio/edit';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof PortfolioEditPage> = {
  title: 'Page/Profile/PortfolioEdit',
  component: PortfolioEditPage,
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

type PortfolioEditPageStory = StoryObj<typeof PortfolioEditPage>;

export const Success: PortfolioEditPageStory = {};

export const Failure: PortfolioEditPageStory = {
  parameters: {
    msw: {
      handlers: {
        member: [updateMyPortfolioError],
      },
    },
  },
};
