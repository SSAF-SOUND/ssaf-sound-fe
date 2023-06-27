import type { RestHandler } from 'msw';

import { setupWorker } from 'msw';

import * as handlers from './handlers';

const allHandlers = (
  Object.values(handlers).filter((handler) =>
    Array.isArray(handler)
  ) as RestHandler[][]
).reduce((a, b) => a.concat(b));

export const worker = setupWorker(...allHandlers);
