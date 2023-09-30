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

export const mockRevertPolledLunchMenu = rest[revertPolledLunchMenuMethod](
  revertPolledLunchMenuEndpoint,
  (req, res, ctx) => {
    const query = req.params as { lunchId: string };
    const lunchId = Number(query.lunchId);

    const targetIndex = lunchMock.menus.menus.findIndex(
      (menu) => menu.lunchId === lunchId
    );

    lunchMock.menus.polledAt = -1;
    if (targetIndex > -1) lunchMock.menus.menus[targetIndex].pollCount -= 1;

    return res(ctx.delay(100), ...mockSuccess(ctx, null));
  }
);

export const mockRevertPolledLunchMenuError = restError(
  revertPolledLunchMenuMethod,
  revertPolledLunchMenuEndpoint,
  {
    message: 'mockRevertPolledLunchMenu Error',
  }
);
