import type { Meta } from '@storybook/react';

import { RecruitCategoryName } from '~/services/recruit';

import { RecruitFilterModal } from './RecruitFilterModal';

const meta: Meta<typeof RecruitFilterModal> = {
  title: 'Recruit/RecruitFilterModal',
  component: RecruitFilterModal,
  argTypes: {},
};

export default meta;

export const Project = () => {
  return <RecruitFilterModal category={RecruitCategoryName.PROJECT} />;
};

export const Study = () => {
  return <RecruitFilterModal category={RecruitCategoryName.STUDY} />;
};
