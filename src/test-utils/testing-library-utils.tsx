import type { DehydratedState, QueryClient } from '@tanstack/react-query';
import type { RenderOptions } from '@testing-library/react';
import type { NextPageAuthConfig } from 'next/types';
import type { ReactElement, ReactNode } from 'react';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { Toaster } from 'react-hot-toast';

import AuthChecker from '~/components/AuthChecker';
import { GlobalModal } from '~/components/GlobalModal';
import { getQueryClient } from '~/react-query/common';

export interface RenderCustomOptions {
  queryClient?: QueryClient;
  dehydratedState?: DehydratedState;
  auth?: NextPageAuthConfig;
}

const renderWithContext = (
  ui: ReactElement,
  options: RenderOptions = {},
  customOptions: RenderCustomOptions = {}
) => {
  const { queryClient, dehydratedState, auth } = customOptions;
  const ourQueryClient = queryClient ?? getQueryClient();

  return render(
    <QueryClientProvider client={ourQueryClient}>
      <Hydrate state={dehydratedState}>
        <Toaster />
        {auth ? <AuthChecker auth={auth}>{ui}</AuthChecker> : <>{ui}</>}
        <GlobalModal />
      </Hydrate>
    </QueryClientProvider>,
    options
  );
};

export * from '@testing-library/react';
export { renderWithContext as customRender };
