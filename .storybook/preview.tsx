import type { Preview } from '@storybook/react';
import { Global, css } from '@emotion/react';

import AppGlobalStyles from '../src/styles/GlobalStyles';

const StorybookGlobalStyles = () => {
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
      `}
    />
  );
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
