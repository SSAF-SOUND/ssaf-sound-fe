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
        display: 'grid',
        gridTemplateColumns: `repeat(${colors.length}, 80px)`,
        gridTemplateRows: `repeat(${sizes.length}, auto)`,
        gap: 20,
        justifyItems: 'center',
      }}
    >
      {colors.map((color) => (
        <span key={color}>{color}</span>
      ))}
      {sizes.map((size) => {
        return (
          <>
            {colors.map((color) => {
              return (
                <Button key={color} size={size} variant={variant} theme={color}>
                  버튼
                </Button>
              );
            })}
          </>
        );
      })}

      {/* Disabled */}
      {colors.map((color) => {
        return (
          <Button
            key={color}
            size="md"
            variant={variant}
            theme={color}
            disabled
          >
            버튼
          </Button>
        );
      })}

      {/* Loading */}
      {colors.map((color) => {
        return (
          <Button
            style={{ width: 80 }}
            key={color}
            size="md"
            variant={variant}
            theme={color}
            loading
          >
            버튼
          </Button>
        );
      })}
    </div>
  );
};

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
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
    loading: false,
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
