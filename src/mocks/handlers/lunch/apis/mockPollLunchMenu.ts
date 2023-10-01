import type { GetLunchMenusWithPollStatusApiData } from '~/services/lunch';

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

export const createMockPollLunchMenu = (
  data: GetLunchMenusWithPollStatusApiData['data']
) => {
  return rest[pollLunchMenuMethod](
    pollLunchMenuEndpoint,
    async (req, res, ctx) => {
      const query = req.params as { lunchId: string };
      const lunchId = Number(query.lunchId);

      const targetIndex = data.menus.findIndex(
        (menu) => menu.lunchId === lunchId
      );

      const prevPolledAt = data.polledAt;
      if (prevPolledAt > -1) data.menus[prevPolledAt].pollCount -= 1;

      data.polledAt = targetIndex;
      if (targetIndex > -1) data.menus[targetIndex].pollCount += 1;

      return res(ctx.delay(100), ...mockSuccess(ctx, null));
    }
  );
};

export const mockPollLunchMenu = createMockPollLunchMenu(lunchMock.menus);

export const mockPollLunchMenuError = restError(
  pollLunchMenuMethod,
  pollLunchMenuEndpoint,
  {
    message: 'mockPollLunchMenu Error',
  }
);
