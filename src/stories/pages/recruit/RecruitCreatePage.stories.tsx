import type { Meta, StoryObj } from '@storybook/react';

import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockCreateRecruit } from '~/mocks/handlers/recruit/apis/mockCreateRecruit';
import RecruitCreatePage from '~/pages/recruits/new';
import { useMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof RecruitCreatePage> = {
  title: 'Page/리쿠르팅/리쿠르팅 만들기',
  component: RecruitCreatePage,
  decorators: [
    (Story) => {
      useMyInfo({ enabled: true });
      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    ...createMswParameters({
      member: [mockGetCertifiedSsafyMyInfo],
      recruit: [mockCreateRecruit],
    }),
  },
};

export default meta;

type RecruitCreatePageStory = StoryObj<typeof RecruitCreatePage>;

export const Default: RecruitCreatePageStory = {};
