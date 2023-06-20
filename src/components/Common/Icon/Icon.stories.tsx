import type { Meta, StoryObj } from '@storybook/react';

import Icon, { icons } from './index';

const meta: Meta<typeof Icon> = {
  title: 'Icon/Normal',
  component: Icon,
};

export default meta;

type IconStory = StoryObj<typeof Icon>;

export const SingleIcon: IconStory = {
  name: 'Icon',
  args: { name: 'apple', size: 24 },
  argTypes: {
    label: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
  },
};

export const AllIcons: IconStory = {
  render: () => {
    const iconNames = Object.keys(icons) as (keyof typeof icons)[];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {iconNames.map((iconName) => (
          <div key={iconName}>
            <div>{iconName}</div>
            <Icon name={iconName} />
          </div>
        ))}
      </div>
    );
  },
};
