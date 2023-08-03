import type { ResponseComposition, RestContext, RestRequest } from 'msw';
import type { ArticleSummary, GetArticlesApiData } from '~/services/article';


import { articleSummaries } from '~/mocks/handlers/article/data';
import { mockSuccess } from '~/mocks/utils';

export const restInfiniteArticlesSuccess = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => {
  const searchParams = req.url.searchParams;
  // const size = Number(searchParams.get('size'));
  const size = 10;
  const cursor = Number(searchParams.get('cursor'));
  // if (cursor > 10) {
  //   return res(ctx.delay(500), ...mockError(ctx, '100', 'ㅁ'));
  // }

  // 데이터는 `size`개 만큼 보내야 하는데
  // 이후 데이터가 더 있는지 확인하기 위해 `size + 1`개를 가져옵니다.
  // 데이터가 더 있다면, `size + 1`개가 가져와지고
  // 데이터가 더 없다면, `size + 1`개보다 적은 개수만 가져와집니다.
  const startIndex = cursor < 0 || Number.isNaN(cursor) ? 0 : cursor;
  const endIndex = startIndex + size;

  const data = articleSummaries.slice(startIndex, endIndex + 1);
  const isReachingEnd = data.length < size + 1;

  if (!isReachingEnd) data.pop();

  const lastArticleSummaries = data.at(-1) as ArticleSummary;
  const nextCursor = isReachingEnd ? null : lastArticleSummaries.postId;

  return res(
    ctx.delay(500),
    ...mockSuccess<GetArticlesApiData['data']>(ctx, {
      posts: data,
      cursor: nextCursor,
    })
  );
};
