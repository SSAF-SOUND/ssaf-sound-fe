import type { RestHandler } from 'msw';

import { setupServer } from 'msw/node';

import * as handlers from './handlers';

const allHandlers = (
  Object.values(handlers).filter((handler) =>
    Array.isArray(handler)
  ) as RestHandler[][]
).reduce((a, b) => a.concat(b));

export const server = setupServer(...allHandlers);
