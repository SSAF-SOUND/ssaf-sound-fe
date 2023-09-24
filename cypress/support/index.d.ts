import type { mount, MountOptions } from 'cypress/react18';

type OriginalMount = typeof mount;
type CustomMountOptions = Partial<
  MountOptions & Omit<AllProviderProps, 'children'>
>;

type CustomMount = (
  jsx: Parameters<OriginalMount>[0],
  options?: CustomMountOptions,
  renderKey?: Parameters<OriginalMount>[2]
) => ReturnType<OriginalMount>;

declare global {
  namespace Cypress {
    interface Chainable {
      mount: CustomMount;
      visitStory(
        storyName: string,
        options?: Partial<Cypress.VisitOptions>
      ): Chainable<any>;
    }
  }
}
