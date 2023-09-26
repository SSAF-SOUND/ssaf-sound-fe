import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    viewportWidth: 500,
    viewportHeight: 700,
    specPattern: 'cypress/component/**/*.cy.{ts,tsx}',
  },

  e2e: {
    baseUrl: 'http://localhost:6006',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integrations/**/*.cy.{ts,tsx}',
  },
});
