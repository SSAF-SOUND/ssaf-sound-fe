import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import {
  certifyStudent,
  certifyStudentAttemptsCountError,
  certifyStudentIncorrectError,
} from '~/mocks/handlers';
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
    }, [setMyInfo]);

    return <StudentCertificationPage />;
  },
  parameters: {
    msw: {
      handlers: {
        // 기본적으로 정의한 유저 정보 핸들러가 데이터를 `userInfo.initialUser`로 채우기 때문에
        // Effect 에서 세팅하는 `userInfo.uncertifiedSsafyUserInfo`와 충돌합니다. (500ms 딜레이를 가지고 API를 응답하기 때문에)
        // 해당 핸들러를 제거할 목적으로 override 합니다.
        member: [certifyStudent],
      },
    },
  },
};

export const IncorrectAnswer: StudentCertificationPageStory = {
  ...CorrectAnswer,
  parameters: {
    msw: {
      handlers: {
        member: [certifyStudentIncorrectError],
      },
    },
  },
};

export const NoMoreAttempts: StudentCertificationPageStory = {
  ...CorrectAnswer,
  parameters: {
    msw: {
      handlers: {
        member: [certifyStudentAttemptsCountError],
      },
    },
  },
};
