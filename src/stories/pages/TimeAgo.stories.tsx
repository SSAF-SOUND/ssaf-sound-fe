import type { Meta } from '@storybook/react';

import dayjs from 'dayjs';

import { PageLayout } from '~/stories/Layout';
import { flex } from '~/styles/utils';
import { timeAgo } from '~/utils';

export const TimeAgoTexts = () => {
  const s = dayjs().subtract(1, 's');
  const m = dayjs().subtract(1, 'm');
  const mm = dayjs().subtract(2, 'm');
  const h = dayjs().subtract(1, 'h');
  const hh = dayjs().subtract(2, 'h');
  const d = dayjs().subtract(1, 'd');
  const dd = dayjs().subtract(2, 'd');
  const M = dayjs().subtract(1, 'M');
  const MM = dayjs().subtract(2, 'M');
  const Y = dayjs().subtract(1, 'y');
  const YY = dayjs().subtract(2, 'y');

  const args = [s, m, mm, h, hh, d, dd, M, MM, Y, YY];

  return (
    <div css={flex('flex-start', '', 'column', 10)}>
      {args.map((arg, index) => (
        <p key={index}>{timeAgo(arg)}</p>
      ))}
    </div>
  );
};

const meta: Meta<typeof TimeAgoTexts> = {
  title: 'System/TimeAgoTexts',
  component: TimeAgoTexts,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
};

export default meta;
