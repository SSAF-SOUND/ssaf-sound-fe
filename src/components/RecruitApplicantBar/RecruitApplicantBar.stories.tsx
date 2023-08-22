import type { Meta } from '@storybook/react';

import { RecruitApplicantBar } from './index';

const meta: Meta<typeof RecruitApplicantBar> = {
  title: 'Recruit/RecruitApplicantBar',
  component: RecruitApplicantBar,
  argTypes: {},
};

export default meta;

export const Default = () => {
  return <RecruitApplicantBar />;
};

export const Confirmed = () => {
  return <RecruitApplicantBar status={'confirmed'} />;
};

export const Declined = () => {
  return <RecruitApplicantBar status={'declined'} />;
};

export const WithHeart = () => {
  return <RecruitApplicantBar status={'withHeart'} />;
};

export const Waiting = () => {
  return <RecruitApplicantBar status={'waiting'} />;
};
