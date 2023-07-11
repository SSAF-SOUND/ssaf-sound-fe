import type { CustomAppProps } from 'next/app';

import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import AuthChecker from '~/components/AuthChecker';
import Background from '~/components/Background';
import { GlobalModal } from '~/components/GlobalModal';
import { MainLayout } from '~/components/Layout';
import { useMSW } from '~/hooks';
import { initServerMocks } from '~/mocks';
import { getQueryClient } from '~/react-query/common';
import GlobalStyles from '~/styles/GlobalStyles';

initServerMocks();

export default function App({ Component, pageProps }: CustomAppProps) {
  const [queryClient] = useState(getQueryClient);
  const isMSWReady = useMSW();

  if (!isMSWReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyles />
        <Background />
        <Toaster />
        <MainLayout>
          {Component.auth ? (
            <AuthChecker auth={Component.auth}>
              <Component {...pageProps} />
            </AuthChecker>
          ) : (
            <Component {...pageProps} />
          )}
        </MainLayout>
        <GlobalModal />
      </Hydrate>
    </QueryClientProvider>
  );
}
