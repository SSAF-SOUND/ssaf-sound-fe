import type { Meta } from '@storybook/react';

import PortfolioLink from './index';

const meta: Meta<typeof PortfolioLink> = {
  title: 'Profile/PortfolioLink',
  tags: ['autodocs'],
  argTypes: {
    Root: {
      description: '`Anchor` 태그의 역할',
    },
    Text: {
      description: '링크 텍스트',
    },
  },
};

export default meta;

export const Default = {
  args: {
    link: 'https://example.com/',
    text: '입력',
    color: '#FFF',
  },
  render: ({
    text,
    link,
    color,
  }: {
    text: string;
    link: string;
    color?: string;
  }) => {
    return (
      <>
        <div>
          <PortfolioLink.Root color={color} href={link}>
            <PortfolioLink.Text>{text}</PortfolioLink.Text>
          </PortfolioLink.Root>
        </div>
      </>
    );
  },
};
