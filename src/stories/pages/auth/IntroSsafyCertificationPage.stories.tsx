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
  title: 'Page/SSAFY 인증/SSAFY 인증 소개',
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
  name: 'SSAFY 유저가 아님',
  parameters: createMswParameters({
    member: [mockGetNonSsafyMyInfo],
  }),
};

export const UncertifiedUser = {
  name: 'SSAFY 유저 + 인증 전',
  parameters: createMswParameters({
    member: [mockGetUncertifiedSsafyMyInfo],
  }),
};

export const CertifiedUser = {
  name: 'SSAFY 유저 + 인증 후',
  parameters: createMswParameters({
    member: [mockGetCertifiedSsafyMyInfo],
  }),
};
