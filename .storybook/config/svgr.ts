import { StorybookWebpackConfiguration } from './types';
import { WebpackConfiguration } from '@storybook/core-webpack';

export const svgr: StorybookWebpackConfiguration = (config) => {
  const imageRule = config.module?.rules?.find((rule) => {
    const test = (rule as { test: RegExp }).test;

    if (!test) {
      return false;
    }

    return test.test('.svg');
  }) as { [key: string]: any };

  imageRule.exclude = /\.svg$/;

  config.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  return config;
};
