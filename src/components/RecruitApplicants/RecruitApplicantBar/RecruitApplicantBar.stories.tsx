import type { Meta, StoryObj } from '@storybook/react';

import { createMockRecruitApplicant } from '~/mocks/handlers/recruit/data';
import { MatchStatus } from '~/services/recruit';
import { disableArgs } from '~/stories/utils';

import { RecruitApplicantBar } from './index';

const meta: Meta<typeof RecruitApplicantBar> = {
  title: 'Recruit/RecruitApplicantBar',
  component: RecruitApplicantBar,
  argTypes: {
    ...disableArgs(['applicant']),
  },
};

const recruitApplicant = createMockRecruitApplicant(1);

export default meta;

type RecruitApplicantStory = StoryObj<RecruitApplicantArgs>;
interface RecruitApplicantArgs {
  matchStatus: MatchStatus;
  liked: boolean;
}

export const Default: RecruitApplicantStory = {
  args: {
    matchStatus: MatchStatus.WAITING_APPLICANT,
    liked: false,
  },
  argTypes: {
    matchStatus: {
      options: Object.values(MatchStatus),
      control: {
        type: 'select',
      },
    },
  },

  render: (args: RecruitApplicantArgs) => {
    const { matchStatus, liked } = args;
    const applicant = { ...recruitApplicant };
    applicant.matchStatus = matchStatus;
    applicant.liked = liked;

    return <RecruitApplicantBar applicant={applicant} />;
  },
};
