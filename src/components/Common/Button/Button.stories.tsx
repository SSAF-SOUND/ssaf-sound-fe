import type { ButtonProps } from './index';
import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

interface ButtonGroupProps {
  variant: ButtonProps['variant'];
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { variant } = props;
  const sizes = ['sm', 'md', 'lg'] as const;
  const colors = [
    'primary',
    'secondary',
    'grey',
    'success',
    'warning',
    'error',
  ] as const;

  return (
    <div
      style={{
        fontFamily: 'Manrope',
        display: 'grid',
        gridTemplateColumns: `repeat(${colors.length}, 80px)`,
        gridTemplateRows: `repeat(${sizes.length}, auto)`,
        gap: 20,
        justifyItems: 'center',
      }}
    >
      {colors.map((color) => (
        <span>{color}</span>
      ))}
      {sizes.map((size) => {
        return (
          <>
            {colors.map((color) => {
              return (
                <Button key={color} size={size} variant={variant} color={color}>
                  버튼
                </Button>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;
type ButtonGroupStory = StoryObj<typeof ButtonGroup>;

export const SingleButton: ButtonStory = {
  name: 'Button',
  args: {
    children: '버튼',
    variant: 'filled',
    size: 'sm',
    color: 'primary',
  },
  argTypes: {
    children: {
      name: 'text',
    },
    className: {
      table: {
        disable: true,
      },
    },
    asChild: {
      table: {
        disable: true,
      },
    },
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
