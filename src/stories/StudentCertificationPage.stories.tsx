import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import { certifyStudentAttemptsCountError, certifyStudentIncorrectError } from "~/mocks/handlers";
import { userInfo } from '~/mocks/handlers/member/data';
import StudentCertificationPage from '~/pages/certification/student';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof StudentCertificationPage> = {
  title: 'Page/StudentCertification',
  component: StudentCertificationPage,
  decorators: [
    (Story) => {
      return (
        <PageLayout>
          <Story />
        </PageLayout>
      );
    },
  ],
};

export default meta;

type StudentCertificationPageStory = StoryObj<{ certified: boolean }>;

export const CorrectAnswer: StudentCertificationPageStory = {
  render: function Render() {
    const setMyInfo = useSetMyInfo();

    useEffect(() => {
      setMyInfo(userInfo.uncertifiedSsafyUserInfo);
    }, []);

    return <StudentCertificationPage />;
  },
};

export const IncorrectAnswer: StudentCertificationPageStory = {
  ...CorrectAnswer,
  parameters: {
    msw: {
      handlers: {
        member: [certifyStudentIncorrectError]
      }
    }
  }
}

export const NoMoreAttempts: StudentCertificationPageStory = {
  ...CorrectAnswer,
  parameters: {
    msw: {
      handlers: {
        member: [certifyStudentAttemptsCountError]
      }
    }
  }
}
