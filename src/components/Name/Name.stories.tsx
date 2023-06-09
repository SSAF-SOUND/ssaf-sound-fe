import type { Meta, StoryObj } from '@storybook/react';

import { SsafyTrack, CertificationState } from '~/services/member/utils';

import Name from './index';

const meta: Meta<typeof Name> = {
  title: 'Name',
  component: Name,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type NameStory = StoryObj<typeof Name>;

export const NameStory: NameStory = {
  name: 'Name',
};

export const Certified = () => {
  return (
    <Name
      userSsafyInfo={{
        ssafyMember: true,
        ssafyInfo: {
          majorTrack: SsafyTrack.MOBILE,
          certificationState: CertificationState.CERTIFIED,
          semester: 2,
          campus: '서울',
        },
      }}
      nickname="쌒사운드"
      isMajor={true}
    />
  );
};

export const UnCertified = () => {
  return (
    <Name
      userSsafyInfo={{
        ssafyMember: false,
      }}
      nickname="쌒사운드"
      isMajor={false}
    />
  );
};
