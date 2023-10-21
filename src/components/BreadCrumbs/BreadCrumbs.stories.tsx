import type { Meta, StoryObj } from '@storybook/react';

import { PageLayout } from '~/stories/Layout';

import { BreadCrumbs } from './index';

const meta: Meta<typeof BreadCrumbs> = {
  title: 'Navigation/BreadCrumbs',
  component: BreadCrumbs,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type BreadCrumbsStory = StoryObj<typeof BreadCrumbs>;

export const Default: BreadCrumbsStory = {
  args: {
    entries: [
      { name: 'Link1', link: '#', active: false },
      { name: 'Link2', link: '#', active: true },
      { name: 'Link3', link: '#', active: false },
    ],
  },
};
