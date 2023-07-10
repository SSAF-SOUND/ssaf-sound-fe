import type { Meta, StoryObj } from '@storybook/react';

import RecruitForm from './index';

const meta: Meta<typeof RecruitForm> = {
  title: 'RecruitForm',
  component: RecruitForm,
};

export default meta;

type Story = StoryObj<typeof RecruitForm>;

export const Default: Story = {
  args: {
    options: {
      barTitle: '리크루팅 등록하기',
      isProjectDisabled: false,
      isStudyDisabled: false,
      submitButtonText: '완료',
    },
  },
};
