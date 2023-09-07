import type { CustomAppProps } from 'next/app';

import Head from 'next/head';

import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css';

import AuthChecker from '~/components/AuthChecker';
import Background from '~/components/Background';
import { PageHead } from '~/components/Common';
import { GlobalModal } from '~/components/GlobalModal';
import { MainLayout } from '~/components/Layout';
import { useMSW } from '~/hooks';
import { initServerMocks } from '~/mocks';
import { getQueryClient } from '~/react-query/common';
import GlobalStyles from '~/styles/GlobalStyles';


if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') initServerMocks();

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
        <Head>
          {/* https://nextjs.org/docs/messages/no-document-viewport-meta */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <GlobalStyles />
        <Background />
        <Toaster />
        <MainLayout>
          {Component.meta && <PageHead {...Component.meta} />}
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
