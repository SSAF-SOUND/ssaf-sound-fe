import type { Meta } from '@storybook/react';

import {
  createMockCertifyStudent,
  mockCertifyStudent,
  mockCertifyStudentExceedAttemptCountError,
} from '~/mocks/handlers/member/apis/mockCertifyStudent';
import { mockGetUncertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import StudentCertificationPage from '~/pages/certification/student';
import { useMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';

const meta: Meta<typeof StudentCertificationPage> = {
  title: 'Page/Certification/Student Certification',
  component: StudentCertificationPage,
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

export const CorrectAnswer = {
  parameters: createMswParameters({
    member: [mockGetUncertifiedSsafyMyInfo, mockCertifyStudent],
  }),
};

export const IncorrectAnswer = {
  parameters: createMswParameters({
    member: [mockGetUncertifiedSsafyMyInfo, createMockCertifyStudent(false)],
  }),
};

export const NoMoreAttempts = {
  parameters: createMswParameters({
    member: [
      mockGetUncertifiedSsafyMyInfo,
      mockCertifyStudentExceedAttemptCountError,
    ],
  }),
};
