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

type IntroStudentCertificationPageStory = StoryObj<{
  certified: boolean;
  ssafyMember: boolean;
}>;

export const Default: IntroStudentCertificationPageStory = {
  args: { certified: false, ssafyMember: true },
  render: function Render(args) {
    const { certified, ssafyMember } = args;
    const setMyInfo = useSetMyInfo();

    useEffect(() => {
      const myInfo = !ssafyMember
        ? userInfo.nonSsafyUserInfo
        : certified
        ? userInfo.certifiedSsafyUserInfo
        : userInfo.uncertifiedSsafyUserInfo;

      setMyInfo(myInfo);
    }, [certified, setMyInfo, ssafyMember]);

    return <IntroStudentCertificationPage />;
  },
  parameters: {
    msw: {
      handlers: {
        member: [],
      },
    },
  },
};
