import type { Meta } from '@storybook/react';

import { Badge } from './index';

const meta: Meta<typeof Badge> = {
  title: 'Input/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

export const Default = () => {
  return <Badge>뱃지 컴포넌트</Badge>;
};
