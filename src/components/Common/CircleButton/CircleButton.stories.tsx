import type { Meta, StoryObj } from '@storybook/react';

import { flex } from '~/styles/utils';

import { CircleButton } from './index';

const meta: Meta<typeof CircleButton> = {
  title: 'Button/CircleButton',
  tags: ['autodocs'],
  component: CircleButton,
};

export default meta;

type CircleButtonStory = StoryObj<typeof CircleButton>;
export const Default: CircleButtonStory = {
  args: {
    name: 'pencil.plus',
    theme: 'primary',
  },
};
export const AllVariants: CircleButtonStory = {
  render: () => {
    const variants = [
      'filled',
      'outlined',
      'inverse',
      'text',
      'literal',
    ] as const;
    return (
      <div css={flex('', '', 'column', 10)}>
        {variants.map((variant) => (
          <CircleButton key={variant} name="pencil.plus" variant={variant} />
        ))}
      </div>
    );
  },
};
