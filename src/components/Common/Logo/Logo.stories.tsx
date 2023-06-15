import type { Meta, StoryObj } from '@storybook/react';

import Logo from './index';

const meta: Meta<typeof Logo> = {
  title: 'Logo',
  component: Logo,
};

export default meta;

type LogoStory = StoryObj<typeof Logo>;

export const Default: LogoStory = {
  render: () => {
    return (
      <>
        <div>
          <Logo size="sm" />
        </div>
        <div>
          <Logo size="lg" />
        </div>
      </>
    );
  },
};
