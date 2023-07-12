import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

import { getQueryClient } from '~/react-query/common';

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper: AllProviders, ...options });
};

export * from '@testing-library/react';
export { renderWithContext as customRender };
