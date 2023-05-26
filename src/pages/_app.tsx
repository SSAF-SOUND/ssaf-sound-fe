import type { AppProps } from 'next/app';

import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import createQueryClient from '~/react-query/queryClient';
import { store } from '~/store';
import '~/styles/globals.css';
import GlobalStyles from '~/styles/GlobalStyles';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('~/mocks');
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <ReduxProvider store={store}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ReduxProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
