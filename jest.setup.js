import '@testing-library/jest-dom';

import { server } from '~/mocks/server';

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'bypass',
  });
});
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

jest.mock('next/router', () => require('next-router-mock'));
