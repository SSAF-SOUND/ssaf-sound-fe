import type { Preview } from '@storybook/react';
import { Global, css } from '@emotion/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

import AppGlobalStyles from '../src/styles/GlobalStyles';
import { authHandlers, memberHandlers } from '../src/mocks/handlers';
import { palettes } from '../src/styles/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '../src/react-query/common';

initialize({
  onUnhandledRequest: 'bypass',
});

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
    msw: {
      handlers: {
        auth: authHandlers,
        member: memberHandlers,
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={getQueryClient()}>
        <div>
          <StorybookGlobalStyles />
          <AppGlobalStyles />
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
