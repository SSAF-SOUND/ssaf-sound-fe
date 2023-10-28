import type { CustomAppProps } from 'next/app';

import Head from 'next/head';
import Script from 'next/script';

import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css';

import AuthChecker from '~/components/AuthChecker';
import Background from '~/components/Background';
import { PageHead } from '~/components/Common/PageHead';
import { GlobalModal } from '~/components/GlobalModal';
import { MainLayout } from '~/components/Layout';
import RouterProgress from '~/components/RouterProgress';
import { useMSW } from '~/hooks';
import { initServerMocks } from '~/mocks';
import { getQueryClient } from '~/react-query/common';
import GlobalStyles from '~/styles/GlobalStyles';
import { useGtagPageView } from '~/utils/gtag';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') initServerMocks();

export default function App({ Component, pageProps }: CustomAppProps) {
  const [queryClient] = useState(getQueryClient);
  const isMSWReady = useMSW();
  useGtagPageView();

  if (!isMSWReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `,
            }}
          />
          {/* https://nextjs.org/docs/messages/no-document-viewport-meta */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <RouterProgress />
        <GlobalStyles />
        <Background />
        <Toaster />
        <MainLayout style={Component.mainLayoutStyle}>
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
