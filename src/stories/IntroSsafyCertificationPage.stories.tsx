import type { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';

import { userInfo } from '~/mocks/handlers/member/data';
import IntroStudentCertificationPage from '~/pages/intro/student-certification';
import { useSetMyInfo } from '~/services/member';
import { PageLayout } from '~/stories/Layout';

const meta: Meta<typeof IntroStudentCertificationPage> = {
  title: 'Page/IntroStudentCertification',
  component: IntroStudentCertificationPage,
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

type IntroStudentCertificationPageStory = StoryObj<{ certified: boolean }>;

export const Default: IntroStudentCertificationPageStory = {
  args: { certified: false },
  render: function Render(args) {
    const { certified } = args;
    const setMyInfo = useSetMyInfo();

    useEffect(() => {
      setMyInfo(
        certified
          ? userInfo.uncertifiedSsafyUserInfo
          : userInfo.certifiedSsafyUserInfo
      );
    }, [certified]);

    return <IntroStudentCertificationPage />;
  },
};
