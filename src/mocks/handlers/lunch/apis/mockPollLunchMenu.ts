import { rest } from 'msw';

import { lunchMock } from '~/mocks/handlers/lunch/data';
import { mockSuccess, restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const pollLunchMenuMethod = 'post';
const pollLunchMenuEndpoint =
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.lunch.vote(':lunchId'));

export const mockPollLunchMenu = rest[pollLunchMenuMethod](
  pollLunchMenuEndpoint,
  async (req, res, ctx) => {
    const query = req.params as { lunchId: string };
    const lunchId = Number(query.lunchId);

    const targetIndex = lunchMock.menus.menus.findIndex(
      (menu) => menu.lunchId === lunchId
    );

    const prevPolledAt = lunchMock.menus.polledAt;
    if (prevPolledAt > -1) lunchMock.menus.menus[prevPolledAt].pollCount -= 1;

    lunchMock.menus.polledAt = targetIndex;
    if (targetIndex > -1) lunchMock.menus.menus[targetIndex].pollCount += 1;

    return res(ctx.delay(100), ...mockSuccess(ctx, null));
  }
);
export const mockPollLunchMenuError = restError(
  pollLunchMenuMethod,
  pollLunchMenuEndpoint,
  {
    message: 'mockPollLunchMenu Error',
  }
);
