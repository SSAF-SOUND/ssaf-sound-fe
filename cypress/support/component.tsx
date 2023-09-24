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

// Alternatively you can use CommonJS syntax:
// require('./commands')

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../src/types/next.d.ts" />

import type { DehydratedState, QueryClient } from '@tanstack/react-query';
import type { NextPageAuthConfig } from 'next';
import type { ReactNode } from 'react';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { mount } from 'cypress/react18';
import { Toaster } from 'react-hot-toast';

// Import commands.js using ES2015 syntax:

import AuthChecker from '~/components/AuthChecker';
import { GlobalModal } from '~/components/GlobalModal';
import { getQueryClient } from '~/react-query/common';

import './commands';

interface AllProviderProps {
  children?: ReactNode;
  queryClient?: QueryClient;
  dehydratedState?: DehydratedState;
  auth?: NextPageAuthConfig;
}

const AllProvider = (props: AllProviderProps) => {
  const { dehydratedState, auth, queryClient, children } = props;

  const client = queryClient ?? getQueryClient();

  return (
    <QueryClientProvider client={client}>
      <Hydrate state={dehydratedState}>
        <Toaster />
        {auth ? <AuthChecker auth={auth}>{children}</AuthChecker> : children}
      </Hydrate>
      <GlobalModal />
    </QueryClientProvider>
  );
};

Cypress.Commands.add('mount', (component, options = {}) => {
  const { dehydratedState, auth, queryClient, ...originalMountOptions } =
    options;
  return mount(
    <AllProvider
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
