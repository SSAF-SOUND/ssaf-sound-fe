import type { Preview } from '@storybook/react';
import { Global, css } from '@emotion/react';

import AppGlobalStyles from '../src/styles/GlobalStyles';

import { palettes } from '../src/styles/utils';

const StorybookGlobalStyles = () => {
  return <Global styles={css``} />;
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: palettes.background.default,
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div>
        <StorybookGlobalStyles />
        <AppGlobalStyles />
        <Story />
      </div>
    ),
  ],
};

export default preview;
