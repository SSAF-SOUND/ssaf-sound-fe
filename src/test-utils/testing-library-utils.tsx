import type { StoryObj } from '@storybook/react';
import type { DehydratedState, QueryClient } from '@tanstack/react-query';
import type { RenderOptions } from '@testing-library/react';
import type { RestHandler } from 'msw';
import type { NextPageAuthConfig } from 'next/types';
import type { ReactElement, ReactNode } from 'react';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { Toaster } from 'react-hot-toast';

import AuthChecker from '~/components/AuthChecker';
import { GlobalModal } from '~/components/GlobalModal';
import { server } from '~/mocks/server';
import { getQueryClient } from '~/react-query/common';
import { concat } from '~/utils';

export interface RenderCustomOptions {
  queryClient?: QueryClient;
  dehydratedState?: DehydratedState;
  auth?: NextPageAuthConfig;
}

type MockStoryHandlersParam = { type: StoryObj };
const mockStoryHandlers = (story: MockStoryHandlersParam) => {
  const handlers =
    (
      Object.values(story?.type?.parameters?.msw?.handlers ?? []).filter(
        Boolean
      ) as RestHandler[][]
    ).reduce(concat, []) ?? [];
  server.use(...handlers);
};

const renderWithContext = (
  ui: ReactElement,
  options: Omit<RenderOptions, 'wrapperq'> = {},
  customOptions: RenderCustomOptions = {}
) => {
  mockStoryHandlers(ui as MockStoryHandlersParam);

  const { queryClient, dehydratedState, auth } = customOptions;
  const ourQueryClient = queryClient ?? getQueryClient();

  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={ourQueryClient}>
        <Hydrate state={dehydratedState}>
          <Toaster />
          {auth ? <AuthChecker auth={auth}>{children}</AuthChecker> : children}
          <GlobalModal />
        </Hydrate>
      </QueryClientProvider>
    ),
    ...options,
  });
};

export * from '@testing-library/react';
export { renderWithContext as customRender };
