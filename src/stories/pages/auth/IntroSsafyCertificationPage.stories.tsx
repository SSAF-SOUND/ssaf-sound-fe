import type { Meta } from '@storybook/react';

import {
  mockGetCertifiedSsafyMyInfo,
  mockGetNonSsafyMyInfo,
  mockGetUncertifiedSsafyMyInfo,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import IntroStudentCertificationPage from '~/pages/intro/student-certification';
import { useMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof IntroStudentCertificationPage> = {
  title: 'Page/Certification/Intro Student Certification',
  component: IntroStudentCertificationPage,
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
  },
};

export default meta;

export const NonSsafyUser = {
  parameters: createMswParameters({
    member: [mockGetNonSsafyMyInfo],
  }),
};

export const UncertifiedUser = {
  parameters: createMswParameters({
    member: [mockGetUncertifiedSsafyMyInfo],
  }),
};

export const CertifiedUser = {
  parameters: createMswParameters({
    member: [mockGetCertifiedSsafyMyInfo],
  }),
};
