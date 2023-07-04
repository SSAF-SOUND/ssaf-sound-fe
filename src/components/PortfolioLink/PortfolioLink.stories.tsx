import type { Meta } from '@storybook/react';

import PortfolioLink from './index';

const meta: Meta<typeof PortfolioLink> = {
  title: 'PortfolioLink',
  tags: ['autodocs'],
  argTypes: {
    Root: {
      description: '`Anchor` 태그의 역할',
    },
    Icon: {
      description: '아이콘',
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
  },
  render: ({ text, link }: { text: string; link: string }) => {
    return (
      <>
        <div>
          <PortfolioLink.Root href={link} onClick={(e) => e.preventDefault()}>
            <PortfolioLink.Icon />
            <PortfolioLink.Text>{text}</PortfolioLink.Text>
          </PortfolioLink.Root>
        </div>
      </>
    );
  },
};
