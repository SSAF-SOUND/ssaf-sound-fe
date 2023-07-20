import type { Meta } from '@storybook/react';

import { userInfo } from '~/mocks/handlers/member/data';
import { PageLayout } from '~/stories/Layout';
import { disableArgs } from '~/stories/utils';

import PreviewCertifiedMyInfo from './index';

const meta: Meta<typeof PreviewCertifiedMyInfo> = {
  title: 'Certification/PreviewCertifiedMyInfo',
  component: PreviewCertifiedMyInfo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  argTypes: {
    ...disableArgs(['userInfo']),
  },
};

export default meta;

export const Default = {
  args: {
    userInfo: userInfo.certifiedSsafyUserInfo,
  },
};
