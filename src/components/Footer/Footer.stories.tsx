import type { Meta } from '@storybook/react';

import { PageLayout } from '~/stories/Layout';

import { Footer } from './index';

const meta: Meta<typeof Footer> = {
  title: 'Navigation/Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <PageLayout css={{ paddingTop: 20 }}>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

export const Default = {};
