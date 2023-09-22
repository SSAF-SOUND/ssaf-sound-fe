import { StorybookWebpackConfiguration } from './types';

export const nextRouterMock: StorybookWebpackConfiguration = (config) => {
  if (config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'next/router': 'next-router-mock',
    };
  }

  return config;
};
