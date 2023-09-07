import type { Meta, StoryObj } from '@storybook/react';

import { userInfo } from '~/mocks/handlers/member/data';
import RecruitCreatePage from '~/pages/recruits/new';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof RecruitCreatePage> = {
  title: 'Page/Recruit/Create',
  component: RecruitCreatePage,
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
    msw: {
      handlers: {
        member: [],
      },
    },
  },
};

export default meta;

type RecruitCreatePageStory = StoryObj<typeof RecruitCreatePage>;

export const Success: RecruitCreatePageStory = {};
