/* eslint-disable @typescript-eslint/ban-ts-comment */

import { mockGetLunchMenusWithPollStatus } from '~/mocks/handlers/lunch/apis/mockGetLunchMenusWithPollStatus';
import { mockPollLunchMenu } from '~/mocks/handlers/lunch/apis/mockPollLunchMenu';
import { mockRevertPolledLunchMenu } from '~/mocks/handlers/lunch/apis/mockRevertPolledLunchMenu';

export const lunchHandlers = [
  mockGetLunchMenusWithPollStatus,
  mockPollLunchMenu,
  mockRevertPolledLunchMenu,
];
