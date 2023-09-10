import type { Meta, StoryObj } from '@storybook/react';

import {
  getRecruitDetail,
  updateRecruit,
  updateRecruitError,
} from '~/mocks/handlers';
import { userInfo } from '~/mocks/handlers/member/data';
import { recruitDetails } from '~/mocks/handlers/recruit/data';
import RecruitEditPage from '~/pages/recruits/[recruitId]/edit';
import { useSetMyInfo } from '~/services/member';
import { useSetRecruitDetail } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';

const myRecruitDetail = recruitDetails[1];

const meta: Meta<typeof RecruitEditPage> = {
  title: 'Page/Recruit/Edit',
  component: RecruitEditPage,
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const setRecruitDetail = useSetRecruitDetail(NaN);
      setRecruitDetail(myRecruitDetail);

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
        recruit: [updateRecruit],
      },
    },
  },
};

export default meta;

type RecruitEditPageStory = StoryObj<typeof RecruitEditPage>;

export const Success: RecruitEditPageStory = {};
export const Error: RecruitEditPageStory = {
  parameters: {
    msw: {
      handlers: {
        member: [],
        recruit: [updateRecruitError],
      },
    },
  },
};
