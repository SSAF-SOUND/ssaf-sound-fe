import type { Meta, StoryObj } from '@storybook/react';
import type { UserInfo } from '~/services/member';

import { userInfo } from '~/mocks/handlers/member/data';
import { SsafyTrack } from '~/services/member';
import { disableArgs } from '~/stories/utils';

import NameCard from './index';

const meta: Meta<typeof NameCard> = {
  title: 'Profile/NameCard',
  component: NameCard,
  tags: ['autodocs'],
  argTypes: {
    ...disableArgs(['userInfo']),
  },
};

export default meta;

type NameCardStory = StoryObj<NameCardStoryProps>;
interface NameCardStoryProps {
  withBackground?: boolean;
  track: SsafyTrack;
  nickname: string;
}

export const Default: NameCardStory = {
  args: {
    withBackground: false,
    track: SsafyTrack.EMBEDDED,
    nickname: 'Kimee',
  },
  argTypes: {
    track: {
      control: 'radio',
      options: Object.values(SsafyTrack),
    },
  },
  render: (args) => {
    const { withBackground, track, nickname } = args;
    const user: UserInfo = userInfo.certifiedSsafyUserInfo;
    user.nickname = nickname;
    user.ssafyInfo.majorTrack = track;

    return <NameCard userInfo={user} withBackground={withBackground} />;
  },
};
