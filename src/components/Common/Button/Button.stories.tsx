import type { ButtonProps } from './index';
import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

interface ButtonGroupProps {
  variant: ButtonProps['variant'];
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { variant } = props;
  const sizes = ['sm', 'md', 'lg'] as const;
  const colors = ['primary', 'secondary'] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {sizes.map((size) => {
        return (
          <div key={size} style={{ display: 'flex', gap: 20 }}>
            {colors.map((color) => {
              return (
                <Button
                  key={color}
                  size={size}
                  variant={variant}
                  color={color}
                  style={{ textTransform: 'capitalize' }}
                >
                  {color}
                </Button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;
type ButtonGroupStory = StoryObj<typeof ButtonGroup>;

export const SingleButton: ButtonStory = {
  name: 'Button',
  args: {
    children: 'Button',
    variant: 'filled',
    size: 'sm',
    color: 'primary',
  },
};

export const Filled: ButtonGroupStory = {
  render: () => <ButtonGroup variant="filled" />,
};

export const Outlined: ButtonGroupStory = {
  render: () => <ButtonGroup variant="outlined" />,
};

export const Text: ButtonGroupStory = {
  render: () => <ButtonGroup variant="text" />,
};
