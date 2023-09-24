import '@testing-library/jest-dom';

import { server } from './src/mocks/server';
import { createMockPointerEvent } from './src/test-utils/pointerEvent.mock';
import { createMockResizeObserver } from './src/test-utils/resizeObserver.mock';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('./src/components/Common/SsafyIcon', () => {
  return {
    SsafyIcon: {
      Track: () => <div>TrackIcon</div>,
      LogoCharacter: () => <div>LogoCharacter</div>,
    },
  };
});

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

createMockPointerEvent();
createMockResizeObserver();
