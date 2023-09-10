import type { Meta, StoryObj } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
  getRecruitDetail,
  getRecruitParticipantsError,
  removeRecruitError,
  reportError,
  scrapRecruitError,
} from '~/mocks/handlers';
import { userInfo } from '~/mocks/handlers/member/data';
import { recruitDetails } from '~/mocks/handlers/recruit/data';
import RecruitDetailPage from '~/pages/recruits/[recruitId]';
import { queryKeys } from '~/react-query/common';
import { useSetMyInfo } from '~/services/member';
import { useSetRecruitDetail } from '~/services/recruit';
import { PageLayout } from '~/stories/Layout';
import { disableArgs } from '~/stories/utils';

const projectRecruitId = 0;
const studyRecruitId = 1;

const mineRecruitId = 1;
const notMineRecruitId = 0;

const meta: Meta<typeof RecruitDetailPage> = {
  title: 'Page/Recruit/Detail',
  component: RecruitDetailPage,
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
  argTypes: {
    recruitId: {
      options: [projectRecruitId, studyRecruitId],
      control: {
        type: 'radio',
        labels: {
          [0]: 'Project',
          [1]: 'Study',
        },
      },
    },
  },
  args: {
    recruitId: projectRecruitId,
  },
};

export default meta;

type RecruitDetailPageStory = StoryObj<typeof RecruitDetailPage>;

export const Success: RecruitDetailPageStory = {
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

export const NotSignedIn: RecruitDetailPageStory = {
  decorators: [
    (Story) => {
      const setMyInfo = useSetMyInfo();
      useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setMyInfo(null);
      }, [setMyInfo]);

      return <Story />;
    },
  ],
};

export const NotMine: RecruitDetailPageStory = {
  args: { recruitId: notMineRecruitId },
  argTypes: { ...disableArgs(['recruitId']) },
  render: function Render(args) {
    const { recruitId } = args;
    const setMyInfo = useSetMyInfo();
    const setRecruitDetail = useSetRecruitDetail(recruitId);

    useEffect(() => {
      setMyInfo(userInfo.certifiedSsafyUserInfo);

      setRecruitDetail((p) => {
        if (!p) return;
        return { ...p, mine: false };
      });
    }, [setRecruitDetail, setMyInfo]);

    return <RecruitDetailPage {...args} />;
  },
};

export const Mine: RecruitDetailPageStory = {
  args: { recruitId: mineRecruitId },
  argTypes: { ...disableArgs(['recruitId']) },
  render: function Render(args) {
    const setMyInfo = useSetMyInfo();

    useEffect(() => {
      setMyInfo(userInfo.certifiedSsafyUserInfo);
    }, [setMyInfo]);

    return <RecruitDetailPage {...args} />;
  },
};

export const Completed: RecruitDetailPageStory = {
  args: { recruitId: 10 },
  argTypes: { ...disableArgs(['recruitId']) },
  render: function Render(args) {
    const { recruitId } = args;
    const setMyInfo = useSetMyInfo();
    const setRecruitDetail = useSetRecruitDetail(recruitId);
    const queryClient = useQueryClient();

    useEffect(() => {
      setMyInfo(userInfo.certifiedSsafyUserInfo);
      setRecruitDetail({
        ...recruitDetails[mineRecruitId],
        finishedRecruit: true,
      });
      queryClient.cancelQueries(queryKeys.recruit.detail(recruitId));
    }, [setMyInfo, setRecruitDetail, queryClient, recruitId]);

    return <RecruitDetailPage {...args} />;
  },
};

export const Error: RecruitDetailPageStory = {
  parameters: {
    msw: {
      handlers: {
        recruit: [
          getRecruitDetail,
          getRecruitParticipantsError,
          scrapRecruitError,
          removeRecruitError,
        ],
        report: [reportError],
      },
    },
  },
};
