import { StorybookWebpackConfiguration } from './types';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const tsconfigPaths: StorybookWebpackConfiguration = (config) => {
  config.resolve.plugins = [
    ...(config.resolve.plugins || []),
    new TsconfigPathsPlugin({
      extensions: config.resolve.extensions,
    }),
  ];

  return config;
};
