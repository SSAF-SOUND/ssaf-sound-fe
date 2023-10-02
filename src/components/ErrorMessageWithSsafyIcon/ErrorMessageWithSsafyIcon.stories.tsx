import type { Meta, StoryObj } from '@storybook/react';

import { TrackSize } from '~/components/Common/SsafyIcon';
import { PageLayout } from '~/stories/Layout';
import { disableArgs } from '~/stories/utils';

import { ErrorMessageWithSsafyIcon } from './index';

const meta: Meta<typeof ErrorMessageWithSsafyIcon> = {
  title: 'System/ErrorMessageWithSsafyIcon',
  component: ErrorMessageWithSsafyIcon,
  argTypes: {
    ...disableArgs(['className']),
  },
  decorators: [
    (Story) => (
      <PageLayout css={{ padding: '80px 0' }}>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;

type ErrorMessageWithSsafyIconStory = StoryObj<
  typeof ErrorMessageWithSsafyIcon
>;

export const Default: ErrorMessageWithSsafyIconStory = {
  args: {
    iconSize: TrackSize.LG2,
    message: '에러가 발생했습니다.',
  },
};
