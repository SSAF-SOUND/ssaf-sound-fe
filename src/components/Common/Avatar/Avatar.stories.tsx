import type { Meta, StoryObj } from '@storybook/react';
import type { SingleAvatarProps } from '~/components/Common/Avatar/SingleAvatar';

import { userInfo } from '~/mocks/handlers/member/data';

import Avatar from './index';

const disableArgs = ['userInfo'];
const disableArgsTypes = disableArgs.reduce((acc, cur) => {
  (acc as Record<string, unknown>)[cur] = {
    table: {
      disable: true,
    },
  };
  return acc;
}, {});

const meta: Meta = {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    ...disableArgsTypes,
  },
};

export default meta;

interface AvatarStoryProps {
  size: SingleAvatarProps['size'];
  empty: boolean;
}

type AvatarStory = StoryObj<AvatarStoryProps>;

export const SingleAvatar: AvatarStory = {
  name: 'Avatar',
  args: {
    size: 'sm',
    empty: false,
  },
  render: (args: AvatarStoryProps) => {
    const { size, empty } = args;
    return (
      <Avatar
        userInfo={empty ? undefined : userInfo.certifiedSsafyUserInfo}
        size={size}
      />
    );
  },
};

interface AvatarGroupStoryProps {
  avatarCount: number;
  maxCount: number;
  visibleCount: number;
  size: SingleAvatarProps['size'];
}
type AvatarGroupStory = StoryObj<AvatarGroupStoryProps>;

export const AvatarGroup: AvatarGroupStory = {
  name: 'AvatarGroup',
  argTypes: {},
  args: {
    avatarCount: 2,
    maxCount: 4,
    visibleCount: 4,
    size: 'sm',
  },

  render: (args: AvatarGroupStoryProps) => {
    const { avatarCount, maxCount, visibleCount, size } = args;
    const data = Array(avatarCount)
      .fill(undefined)
      .map(() => userInfo.certifiedSsafyUserInfo);

    return (
      <>
        <div>
          <Avatar.Group maxCount={maxCount} visibleCount={visibleCount}>
            {data.map((d) => (
              <Avatar size={size} userInfo={d} key={d.nickname} />
            ))}
          </Avatar.Group>
        </div>
      </>
    );
  },
};
