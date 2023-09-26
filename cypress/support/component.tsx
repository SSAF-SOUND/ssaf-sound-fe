// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../src/types/next.d.ts" />

import type { DehydratedState, QueryClient } from '@tanstack/react-query';
import type { NextPageAuthConfig } from 'next';
import type { NextRouter } from 'next/router';
import type { ReactNode } from 'react';

import { RouterContext } from 'next/dist/shared/lib/router-context';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { mount } from 'cypress/react18';
import 'cypress-real-events';
import { Toaster } from 'react-hot-toast';

import AuthChecker from '~/components/AuthChecker';
import { GlobalModal } from '~/components/GlobalModal';
import { getQueryClient } from '~/react-query/common';

import './commands';

import GlobalStyles from '~/styles/GlobalStyles';
import { MainLayout } from '~/components/Layout';

interface AllProviderProps {
  children?: ReactNode;
  queryClient?: QueryClient;
  dehydratedState?: DehydratedState;
  auth?: NextPageAuthConfig;
  router: NextRouter;
}

const AllProvider = (props: AllProviderProps) => {
  const { dehydratedState, auth, queryClient, router, children } = props;

  const client = queryClient ?? getQueryClient();

  return (
    <RouterContext.Provider value={router}>
      <QueryClientProvider client={client}>
        <Hydrate state={dehydratedState}>
          <Toaster />
          <MainLayout>
            {auth ? (
              <AuthChecker auth={auth}>{children}</AuthChecker>
            ) : (
              children
            )}
          </MainLayout>
        </Hydrate>
        <GlobalStyles />
        <GlobalModal />
      </QueryClientProvider>
    </RouterContext.Provider>
  );
};

Cypress.Commands.add('mount', (component, options = {}) => {
  const router = {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    back: cy.stub().as('router:back'),
    forward: cy.stub().as('router:forward'),
    push: cy.stub().as('router:push'),
    reload: cy.stub().as('router:reload'),
    replace: cy.stub().as('router:replace'),
    isReady: true,
    ...(options?.router || {}),
  };

  const { dehydratedState, auth, queryClient, ...originalMountOptions } =
    options;
  return mount(
    <AllProvider
      router={router}
      dehydratedState={dehydratedState}
      auth={auth}
      queryClient={queryClient}
    >
      {component}
    </AllProvider>,
    originalMountOptions
  );
});

// Example use:
// cy.mount(<MyComponent />)
