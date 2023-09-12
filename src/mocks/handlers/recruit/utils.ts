import type { ResponseComposition, RestContext, RestRequest } from 'msw';
import type { GetRecruitsApiData, RecruitSummary } from '~/services/recruit';

import {
  projectRecruitSummaries,
  studyRecruitSummaries,
} from '~/mocks/handlers/recruit/data';
import { mockSuccess } from '~/mocks/utils';
import { RecruitCategoryName } from '~/services/recruit';

// import { recruitMocks } from './data';

const infiniteRecruitsHandler = () => {
  return (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const searchParams = req.url.searchParams;

    const recruitSummaries =
      searchParams.get('category') === RecruitCategoryName.STUDY
        ? studyRecruitSummaries
        : projectRecruitSummaries;

    const size = 10;
    const cursor = Number(searchParams.get('cursor'));

    const startIndex = cursor < 0 || Number.isNaN(cursor) ? 0 : cursor;
    const endIndex = startIndex + size;

    const data = recruitSummaries.slice(startIndex, endIndex + 1);
    const isReachingEnd = data.length < size + 1;

    if (!isReachingEnd) data.pop();

    const lastRecruitSummary = data.at(-1);
    const lastRecruitSummaryIndex = recruitSummaries.findIndex(
      (recruitSummary) => lastRecruitSummary === recruitSummary
    );
    const nextCursor =
      lastRecruitSummaryIndex === -1 ? null : lastRecruitSummaryIndex;

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
