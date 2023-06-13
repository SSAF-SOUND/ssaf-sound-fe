import type { AppProps } from 'next/app';

import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { MainLayout } from '~/components/Layout';
import useMSW from '~/hooks/useMSW';
import { initServerMocks } from '~/mocks';
import { getQueryClient } from '~/react-query/common';
import { store } from '~/store';
import GlobalStyles from '~/styles/GlobalStyles';

initServerMocks();

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(getQueryClient);
  const isMSWReady = useMSW();

  if (!isMSWReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <ReduxProvider store={store}>
          <GlobalStyles />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ReduxProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
