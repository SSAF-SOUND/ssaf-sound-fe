import type { ResponseComposition, RestContext, RestRequest } from 'msw';
import type { GetRecruitsApiData } from '~/services/recruit';

import { mockSuccess } from '~/mocks/utils';

import { recruitMocks } from './data';

const infiniteRecruitHandler = () => {
  return (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const searchParams = req.url.searchParams;
    const size = 10;
    const cursor = Number(searchParams.get('cursor'));
    let isLastPage = false;
    let error = true;
    const startIndex = cursor < 0 || Number.isNaN(cursor) ? 0 : cursor;
    const endIndex = startIndex + size;

    const data = recruitMocks.slice(startIndex, endIndex + 1);
    // .filter(
    //   (v) => v.finishedRecruit === stringBooleanToBool(isFinished ?? 'false')
    // );

    const isReachingEnd = data.length < size + 1;

    if (!isReachingEnd) data.pop();

    const lastRecruitSummaries = data.at(-1) as any;
    const nextCursor = isReachingEnd ? null : lastRecruitSummaries.recruitId;
    if (lastRecruitSummaries.recruitId === 54 && error === true) {
      error = false;
      return res(ctx.status(500));
    }
    if (lastRecruitSummaries.recruitId === 99) isLastPage = true;
    return res(
      ctx.delay(500),
      ...mockSuccess<GetRecruitsApiData['data']>(ctx, {
        recruits: data,
        cursor: nextCursor,
        isLast: isLastPage,
      })
    );
  };
};

export const restInfiniteRecruitsSuccess = infiniteRecruitHandler();
