import type { Parameters } from '@storybook/react';
import type { Router } from 'next/router';

import { jest } from '@storybook/jest';

export const createMockRouterMethods = () => {
  return {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  };
};

export const getMockRouter = (parameters: Parameters) => {
  return parameters?.nextjs?.router as Router;
};
