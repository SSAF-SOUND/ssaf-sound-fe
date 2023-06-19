import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './index';

const meta: Meta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
};

export default meta;

type AvatarStory = StoryObj<typeof Avatar>;
export const SingleAvatar: AvatarStory = {
  name: 'Avatar',
  args: {
    size: 'sm',
    major: true,
    nickName: '전공자',
  },
};

export const AvatarGroup = () => {
  const data = [
    {
      major: true,
      nickName: '전공자',
    },
    {
      major: false,
      nickName: '비전공자',
    },
    {
      major: true,
      nickName: 'Eng',
    },
    {
      major: false,
      nickName: 'Test',
    },
    {
      major: true,
      nickName: 'Extra',
    },
  ];
  return (
    <Avatar.Group>
      {data.map((d) => (
        <Avatar {...d} key={d.nickName} />
      ))}
    </Avatar.Group>
  );
};
