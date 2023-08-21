import type { Meta } from '@storybook/react';

import { IsRecruitingToggle } from './IsRecruitingToggle';

const meta: Meta<typeof IsRecruitingToggle> = {
  title: 'Recruit/IsRecruitingToggle',
  component: IsRecruitingToggle,
  argTypes: {},
};

export default meta;

export const Default = () => {
  return <IsRecruitingToggle />;
};
