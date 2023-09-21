import type { StorybookConfig } from '@storybook/nextjs';

import { storybookWebpackConfig } from './config';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config, options) => {
    storybookWebpackConfig.tsconfigPaths?.(config, options);
    storybookWebpackConfig.svgr?.(config, options);
    storybookWebpackConfig.nextRouterMock?.(config, options);
    return config;
  },
  babel: async (options) => {
    options.presets?.push('@emotion/babel-preset-css-prop');
    return options;
  },
  staticDirs: ['../public'],
};
export default config;
