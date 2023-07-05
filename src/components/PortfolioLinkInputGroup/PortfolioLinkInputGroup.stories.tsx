import type { Meta } from '@storybook/react';

import { Source } from '@storybook/blocks';
import { useState } from 'react';

import PortfolioLinkInputGroup from './index';

const meta: Meta<typeof PortfolioLinkInputGroup> = {
  title: 'PortfolioLinkInputGroup',
  tags: ['autodocs'],
  argTypes: {
    Root: {
      description: '`viewHref` prop은 ',
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
