import type { Meta } from '@storybook/react';

import { useState } from 'react';

import PortfolioLinkInputGroup from './index';

const meta: Meta<typeof PortfolioLinkInputGroup> = {
  title: 'Profile/PortfolioLinkInputGroup',
  tags: ['autodocs'],
  argTypes: {
    Root: {
      description:
        '`viewHref`는 미리보기 엘리먼트의 `href`값입니다. \n\n `viewText`값은 미리보기 엘리먼트의 `text`값입니다.',
    },
    Input: {
      description:
        '`inputType`으로 `href input`인지 `text input`인지 선택할 수 있습니다.',
    },
  },
};

export default meta;

export const Default = {
  args: {
    color: '#FFF',
  },
  render: function Render(args: { color?: string }) {
    const [href, setHref] = useState('');
    const [text, setText] = useState('');

    return (
      <div>
        <PortfolioLinkInputGroup.Root
          color={args.color}
          viewHref={href}
          viewText={text}
        >
          <PortfolioLinkInputGroup.Input
            value={href}
            onChange={(e) => setHref(e.target.value)}
            css={{ width: '30%', ':focus-within': { width: '70%' } }}
            inputType="href"
          />
          <PortfolioLinkInputGroup.Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            css={{ flexGrow: 1 }}
            inputType="text"
          />
        </PortfolioLinkInputGroup.Root>
      </div>
    );
  },
};
