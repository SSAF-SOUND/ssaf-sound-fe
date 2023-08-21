import type { Meta } from '@storybook/react';

import { RecruitFilterTabs } from './RecruitFilterTabs';

const meta: Meta<typeof RecruitFilterTabs> = {
  title: 'Recruit/RecruitFilterTabs',
  component: RecruitFilterTabs,
  argTypes: {},
};

export default meta;

export const Default = () => {
  return <RecruitFilterTabs />;
};
