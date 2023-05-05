import { setupServer } from 'msw/node';

import * as handlers from './handlers';

const allHandlers = Object.values(handlers).reduce((a, b) => a.concat(b));

export const server = setupServer(...allHandlers);
