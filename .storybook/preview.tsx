import type { Preview } from '@storybook/react';
import { Global, css } from '@emotion/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import 'react-loading-skeleton/dist/skeleton.css';

import AppGlobalStyles from '../src/styles/GlobalStyles';
import {
  articleHandlers,
  authHandlers,
  articleCommentHandlers,
  recruitCommentHandlers,
  memberHandlers,
  metaHandlers,
  s3Handlers,
  lunchHandlers,
  recruitHandlers,
  reportHandlers,
  notificationHandlers,
} from '../src/mocks/handlers';
import { palettes } from '../src/styles/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '../src/react-query/common';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalModal } from '../src/components/GlobalModal';
import { Toaster } from 'react-hot-toast';
import { useResetQueriesEffect } from '~/stories/utils';
import { useMyInfo } from '~/services/member';

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
        article: articleHandlers,
        articleComment: articleCommentHandlers,
        recruitComment: recruitCommentHandlers,
        meta: metaHandlers,
        s3: s3Handlers,
        lunch: lunchHandlers,
        recruit: recruitHandlers,
        report: reportHandlers,
        notification: notificationHandlers,
      },
    },
  },
  decorators: [
    (Story) => {
      useResetQueriesEffect();
      useMyInfo({ enabled: true });

      return <Story />;
    },
    (Story) => (
      <QueryClientProvider client={getQueryClient()}>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} position={'bottom-left'} />
        <GlobalModal />
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
