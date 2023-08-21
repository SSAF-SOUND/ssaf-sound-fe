/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { GetLunchMenusWithPollStatusApiData } from '~/services/lunch';

import { rest } from 'msw';

import { mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

import { lunchMock } from './data';

// export const getLunchMenusErrorMocking = restError(
//   'get',
//   composeUrls(API_URL, 'lunch/error'),
//   {
//     code: '500',
//     data: null,
//     statusCode: 500,
//   }
// );

const getLunchMenusWithPollStatusEndpoint = composeUrls(
  API_URL,
  endpoints.lunch.list({ campus: '서울', date: 'today' })
);

export const getLunchMenusWithPollStatus = restSuccess<
  GetLunchMenusWithPollStatusApiData['data']
>('get', getLunchMenusWithPollStatusEndpoint, {
  data: lunchMock.menus,
});

export const getLunchMenusWithPollStatusError = restError(
  'get',
  getLunchMenusWithPollStatusEndpoint,
  {
    message: '데이터가 없습니다.',
  }
);

export const pollLunchMenuEndpoint =
  // @ts-ignore
  composeUrls(API_URL, endpoints.lunch.vote(':id'));

export const pollLunchMenu = rest.post(
  pollLunchMenuEndpoint,
  async (req, res, ctx) => {
    const query = req.params as { id: string };
    const id = Number(query.id);

    const targetIndex = lunchMock.menus.menus.findIndex(
      (menu) => menu.lunchId === id
    );

    const prevPolledAt = lunchMock.menus.polledAt;
    if (prevPolledAt > -1) lunchMock.menus.menus[prevPolledAt].pollCount -= 1;

    lunchMock.menus.polledAt = targetIndex;
    if (targetIndex > -1) lunchMock.menus.menus[targetIndex].pollCount += 1;

    return res(ctx.delay(500), ...mockSuccess(ctx, null));
  }
);
export const pollLunchMenuError = restError('post', pollLunchMenuEndpoint, {
  message: '투표 실패',
});

const revertPolledLunchMenuEndpoint =
  // @ts-ignore
  composeUrls(API_URL, endpoints.lunch.revertVote(':id'));

export const revertPolledLunchMenu = rest.post(
  revertPolledLunchMenuEndpoint,
  (req, res, ctx) => {
    const query = req.params as { id: string };
    const id = Number(query.id);

    const targetIndex = lunchMock.menus.menus.findIndex(
      (menu) => menu.lunchId === id
    );

    lunchMock.menus.polledAt = -1;
    if (targetIndex > -1) lunchMock.menus.menus[targetIndex].pollCount -= 1;

    return res(ctx.delay(500), ...mockSuccess(ctx, null));
  }
);

export const revertPolledLunchMenuError = restError(
  'post',
  revertPolledLunchMenuEndpoint,
  {
    message: '메뉴 투표 취소 실패',
  }
);

//
// export const getLunchDetailMocking = restSuccess<LunchMenuDetail>(
//   'get',
//   composeUrls(API_URL, endpoints.lunch.detail(2)),
//   {
//     data: LunchData.detail,
//   }
// );
//
// export const voteLunchMenuMocking = restSuccess<{ pollCount: number }>(
//   'post',
//   composeUrls(API_URL, endpoints.lunch.vote(2)),
//   {
//     data: LunchData.vote,
//   }
// );
//
// export const revertVoteLunchMenuMocking = restSuccess<{ pollCount: number }>(
//   'post',
//   composeUrls(API_URL, endpoints.lunch.revertVote(2)),
//   {
//     data: LunchData.revertVote,
//   }
// );

export const lunchHandlers = [
  getLunchMenusWithPollStatus,
  // getLunchMenusWithPollStatusError,
  pollLunchMenu,
  // pollLunchMenuError,
  revertPolledLunchMenu,
  // revertPolledLunchMenuError,
];
