import type { Meta } from '@storybook/react';

import { RecruitFilterModal } from './RecruitFilterModal';

const meta: Meta<typeof RecruitFilterModal> = {
  title: 'Recruit/RecruitFilterModal',
  component: RecruitFilterModal,
  argTypes: {},
};

export default meta;

export const Project = () => {
  return <RecruitFilterModal category="project" />;
};

export const Study = () => {
  return <RecruitFilterModal category="study" />;
};
