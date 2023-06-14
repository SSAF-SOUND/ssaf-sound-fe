import type { Preview } from '@storybook/react';
import { Global, css } from '@emotion/react';

import AppGlobalStyles from '../src/styles/GlobalStyles';

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
