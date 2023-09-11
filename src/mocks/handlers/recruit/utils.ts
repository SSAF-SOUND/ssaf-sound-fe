import type { ResponseComposition, RestContext, RestRequest } from 'msw';
import type { GetRecruitsApiData, RecruitSummary } from '~/services/recruit';

import { recruitSummaries } from '~/mocks/handlers/recruit/data';
import { mockSuccess } from '~/mocks/utils';

// import { recruitMocks } from './data';

const infiniteRecruitsHandler = () => {
  return (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const searchParams = req.url.searchParams;
    const size = 10;
    const cursor = Number(searchParams.get('cursor'));

    const startIndex = cursor < 0 || Number.isNaN(cursor) ? 0 : cursor;
    const endIndex = startIndex + size;

    const data = recruitSummaries.slice(startIndex, endIndex + 1);
    const isReachingEnd = data.length < size + 1;

    if (!isReachingEnd) data.pop();

    const lastRecruitSummary = data.at(-1) as RecruitSummary;
    const nextCursor = lastRecruitSummary.recruitId;

    return res(
      ctx.delay(500),
      ...mockSuccess<GetRecruitsApiData['data']>(ctx, {
        recruits: data,
        nextCursor,
        isLast: isReachingEnd,
      })
    );
  };
};

export const restInfiniteRecruitsSuccess = infiniteRecruitsHandler();
