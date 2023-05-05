import { setupWorker } from 'msw';

import * as handlers from './handlers';

const allHandlers = Object.values(handlers).reduce((a, b) => a.concat(b));

export const worker = setupWorker(...allHandlers);
