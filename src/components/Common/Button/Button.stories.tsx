import type { ButtonProps } from './index';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './index';

interface ButtonGroupProps {
  variant: ButtonProps['variant'];
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { variant } = props;
  const colors = [
    'primary',
    'secondary',
    'grey',
    'success',
    'warning',
    'error',
    'recruit',
  ] as const;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${colors.length}, 80px)`,
        gap: 20,
        justifyItems: 'center',
      }}
    >
      {colors.map((color) => (
        <span key={color}>{color}</span>
      ))}
      {colors.map((color) => {
        return (
          <Button size="sm" key={color} variant={variant} theme={color}>
            버튼
          </Button>
        );
      })}

      {/* Disabled */}
      {colors.map((color) => {
        return (
          <Button
            key={color}
            size="sm"
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
            size="sm"
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
  title: 'Button/Button',
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

export const Inverse: ButtonGroupStory = {
  render: () => <ButtonGroup variant="inverse" />,
};

export const Text: ButtonGroupStory = {
  render: () => <ButtonGroup variant="text" />,
};

export const Literal: ButtonGroupStory = {
  render: () => <ButtonGroup variant="literal" />,
};
