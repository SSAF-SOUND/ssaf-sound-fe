import type { Meta, StoryObj } from '@storybook/react';

import { PageLayout } from '~/stories/Layout';

import RedirectionGuide from './index';

const meta: Meta<typeof RedirectionGuide> = {
  title: 'System/RedirectionGuide',
  component: RedirectionGuide,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  argTypes: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    redirectionText: {
      type: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<typeof RedirectionGuide>;

export const Default: Story = {
  args: {
    theme: 'primary',
    title: 'Title',
    description: 'Description',
    redirectionText: 'Redirection Text',
    redirectionTo: '/',
  },
  render: (args) => {
    return <RedirectionGuide {...args} indicator={undefined} />;
  },
};
