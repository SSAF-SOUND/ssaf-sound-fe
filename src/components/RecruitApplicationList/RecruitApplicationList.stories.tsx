import type { Meta } from '@storybook/react';

import { RecruitApplicationList } from './index';

const meta: Meta<typeof RecruitApplicationList> = {
  title: 'Recruit/RecruitApplicationList',
  component: RecruitApplicationList,
  argTypes: {},
};

export default meta;

export const Default = () => {
  return <RecruitApplicationList />;
};

export const Confirmed = () => {
  return <RecruitApplicationList status={'confirmed'} />;
};

export const Declined = () => {
  return <RecruitApplicationList status={'declined'} />;
};

export const WithHeart = () => {
  return <RecruitApplicationList status={'withHeart'} />;
};

export const Waiting = () => {
  return <RecruitApplicationList status={'waiting'} />;
};
