import type { NameProps } from './index';
import type { Meta, StoryObj } from '@storybook/react';

import { userInfo } from '~/mocks/handlers/member/data';
import { CertificationState, SsafyTrack } from '~/services/member';

import Name from './index';

const meta: Meta<typeof Name> = {
  title: 'Profile/Name',
  component: Name,
  tags: ['autodocs'],
  argTypes: {
    userInfo: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type NameStory = StoryObj<NameStoryArgs>;
interface NameStoryArgs {
  nickname: string;
  isMajor: boolean;
  certificationState: CertificationState;
  track: SsafyTrack;
  size: NameProps['size'];
}

export const Default: NameStory = {
  args: {
    nickname: 'Kimee',
    isMajor: false,
    certificationState: CertificationState.UNCERTIFIED,
    track: SsafyTrack.EMBEDDED,
    size: 'sm',
  },
  argTypes: {
    certificationState: {
      control: 'radio',
      options: Object.values(CertificationState),
    },
    track: {
      control: 'radio',
      options: Object.values(SsafyTrack),
    },
  },

  render: (args: NameStoryArgs) => {
    const { nickname, isMajor, certificationState, track, size, ...restArgs } =
      args;
    const ssafyInfo =
      certificationState === CertificationState.CERTIFIED
        ? {
            certificationState,
            majorTrack: track,
          }
        : {
            certificationState,
            majorTrack: null,
          };

    const user = {
      ...userInfo.certifiedSsafyUserInfo,
      nickname,
      isMajor,
      ssafyInfo: {
        ...userInfo.certifiedSsafyUserInfo.ssafyInfo,
        ...ssafyInfo,
      },
    };

    return <Name userInfo={user} size={size} {...restArgs} />;
  },
};

export const Certified = () => {
  return <Name userInfo={userInfo.certifiedSsafyUserInfo} />;
};

export const UnCertified = () => {
  return <Name userInfo={userInfo.uncertifiedSsafyUserInfo} />;
};

export const LongName = () => {
  const user = {
    ...userInfo.certifiedSsafyUserInfo,
    nickname: '한글한글한글한글한글한',
  };
  return <Name userInfo={user} size="lg" />;
};

export const AnonymousName: NameStory = {
  args: {
    size: 'lg',
  },
  render: ({ size }) => {
    const user = userInfo.uncertifiedSsafyUserInfo;
    user.nickname = '익명119';

    return <Name userInfo={user} size={size} anonymous />;
  },
};

export const DeletedUser = () => {
  return <Name userInfo={userInfo.deletedUserInfo} />;
};
