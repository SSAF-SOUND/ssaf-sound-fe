import type { ResponseComposition, RestContext, RestRequest } from 'msw';
import type {
  GetAppliedRecruitsByCursorApiData,
  GetRecruitsByCursorApiData,
  GetRecruitsByOffsetApiData,
} from '~/services/recruit';

import { articleSummaries } from '~/mocks/handlers/article/data';
import {
  appliedProjectRecruitSummaries,
  appliedStudyRecruitSummaries,
  projectRecruitSummaries,
  studyRecruitSummaries,
} from '~/mocks/handlers/recruit/data';
import { mockSuccess } from '~/mocks/utils';
import {
  defaultArticlesPageKey,
  GetArticlesByOffsetApiData,
} from '~/services/article';
import { RecruitCategoryName } from '~/services/recruit';

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
      ctx.delay(100),
      ...mockSuccess<GetRecruitsByCursorApiData['data']>(ctx, {
        recruits: data,
        nextCursor,
        isLast: isReachingEnd,
      })
    );
  };
};

const infiniteAppliedRecruitsHandler = () => {
  return (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const searchParams = req.url.searchParams;

    const recruitSummaries =
      searchParams.get('category') === RecruitCategoryName.STUDY
        ? appliedStudyRecruitSummaries
        : appliedProjectRecruitSummaries;

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
      ...mockSuccess<GetAppliedRecruitsByCursorApiData['data']>(ctx, {
        recruits: data,
        nextCursor,
        isLast: isReachingEnd,
      })
    );
  };
};

export const restInfiniteRecruitsSuccess = infiniteRecruitsHandler();
export const restInfiniteAppliedRecruitsSuccess =
  infiniteAppliedRecruitsHandler();

export const paginatedRecruitsHandler = (
  empty = false,
  totalPageCount = 200
) => {
  return (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const unsafePage = Number(req.url.searchParams.get(defaultArticlesPageKey));
    const page = Number.isNaN(unsafePage) ? 1 : unsafePage;

    return res(
      ctx.delay(0),
      ...mockSuccess<GetRecruitsByOffsetApiData['data']>(ctx, {
        recruits: empty ? [] : projectRecruitSummaries.slice(0, 20),
        currentPage: page,
        totalPageCount,
      })
    );
  };
};
