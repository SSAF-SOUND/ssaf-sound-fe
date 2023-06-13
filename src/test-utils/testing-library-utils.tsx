import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '~/store';

const AllProviders = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper: AllProviders, ...options });
};

export * from '@testing-library/react';
export { renderWithContext as customRender };
