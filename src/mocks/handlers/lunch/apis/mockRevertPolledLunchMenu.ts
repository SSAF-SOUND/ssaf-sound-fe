import type { GetLunchMenusWithPollStatusApiData } from '~/services/lunch';

import { rest } from 'msw';

import { lunchMock } from '~/mocks/handlers/lunch/data';
import { mockSuccess, restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const revertPolledLunchMenuMethod = 'post';
const revertPolledLunchMenuEndpoint =
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.lunch.revertVote(':lunchId'));

export const createMockRevertPolledLunchMenu = (
  data: GetLunchMenusWithPollStatusApiData['data']
) => {
  return rest[revertPolledLunchMenuMethod](
    revertPolledLunchMenuEndpoint,
    (req, res, ctx) => {
      const query = req.params as { lunchId: string };
      const lunchId = Number(query.lunchId);

      const targetIndex = data.menus.findIndex(
        (menu) => menu.lunchId === lunchId
      );

      data.polledAt = -1;
      if (targetIndex > -1) data.menus[targetIndex].pollCount -= 1;

      return res(ctx.delay(100), ...mockSuccess(ctx, null));
    }
  );
};

export const mockRevertPolledLunchMenu = createMockRevertPolledLunchMenu(
  lunchMock.menus
);

export const mockRevertPolledLunchMenuError = restError(
  revertPolledLunchMenuMethod,
  revertPolledLunchMenuEndpoint,
  {
    message: 'mockRevertPolledLunchMenu Error',
  }
);
