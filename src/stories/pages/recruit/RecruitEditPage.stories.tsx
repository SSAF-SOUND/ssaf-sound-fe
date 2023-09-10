import type { Meta, StoryObj } from '@storybook/react';
import type { RecruitDetail } from '~/services/recruit';

import { updateRecruit, updateRecruitError } from '~/mocks/handlers';
import { userInfo } from '~/mocks/handlers/member/data';
import { createMockRecruitDetail } from '~/mocks/handlers/recruit/data';
import RecruitEditPage from '~/pages/recruits/[recruitId]/edit';
import { useSetMyInfo } from '~/services/member';
import { useSetRecruitDetail } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';

// `query string`에서 id를 읽어오는데, 스토리북에선 `undefined`이므로, 숫자로 변환시 NaN이 됨.
const myRecruitId = NaN;
const myRecruitDetail = createMockRecruitDetail(myRecruitId, false, {
  completed: false,
  mine: true,
});
const completedRecruitDetail: RecruitDetail = {
  ...myRecruitDetail,
  finishedRecruit: true,
};

const meta: Meta<typeof RecruitEditPage> = {
  title: 'Page/Recruit/Edit',
  component: RecruitEditPage,
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      setMyInfo(userInfo.certifiedSsafyUserInfo);

      const setRecruitDetail = useSetRecruitDetail(myRecruitId);
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

export const CompletedRecruit: RecruitEditPageStory = {
  render: function Render() {
    const setRecruitDetail = useSetRecruitDetail(myRecruitId);
    setRecruitDetail(completedRecruitDetail);
    return <RecruitEditPage />;
  },
};
