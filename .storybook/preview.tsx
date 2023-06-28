import type { Preview } from '@storybook/react';
import { Global, css } from '@emotion/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { Provider as ReduxProvider } from 'react-redux';

import AppGlobalStyles from '../src/styles/GlobalStyles';
import { authHandlers, memberHandlers } from '../src/mocks/handlers';
import { palettes } from '../src/styles/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '../src/react-query/common';
import { store } from '../src/store';

initialize();

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
        <ReduxProvider store={store}>
          <div>
            <StorybookGlobalStyles />
            <AppGlobalStyles />
            <Story />
          </div>
        </ReduxProvider>
      </QueryClientProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
