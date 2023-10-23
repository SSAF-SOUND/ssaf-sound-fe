import type { ResponseComposition, RestContext, RestRequest } from 'msw';
import type {
  GetArticlesByCursorApiData,
  GetArticlesByOffsetApiData,
} from '~/services/article/apis';
import type { ArticleSummary } from '~/services/article/utils';

import { articleSummaries } from '~/mocks/handlers/article/data';
import { mockError, mockSuccess } from '~/mocks/utils';
import { defaultArticlesPageKey } from '~/services/article/apis';

interface InfiniteArticlesHandlerOptions {
  error: boolean;
}
const infiniteArticlesHandler = (
  options: Partial<InfiniteArticlesHandlerOptions> = {}
) => {
  const { error = false } = options;

  return (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const searchParams = req.url.searchParams;
    // const size = Number(searchParams.get('size'));
    const size = 10;
    const cursor = Number(searchParams.get('cursor'));

    // error options가 true인 경우 데이터 불러오는데 에러 발생
    if (error) {
      if (cursor >= 1) {
        return res(ctx.delay(500), ...mockError(ctx, '', '에러'));
      }
    }

    // 데이터는 `size`개 만큼 보내야 하는데
    // 이후 데이터가 더 있는지 확인하기 위해 `size + 1`개를 가져옵니다.
    // 데이터가 더 있다면, `size + 1`개가 가져와지고
    // 데이터가 더 없다면, `size + 1`개보다 적은 개수만 가져와집니다.
    const startIndex = cursor < 0 || Number.isNaN(cursor) ? 0 : cursor;
    const endIndex = startIndex + size;

    const data = articleSummaries.slice(startIndex, endIndex + 1);
    const isReachingEnd = data.length < size + 1;

    if (!isReachingEnd) data.pop();

    const lastArticleSummary = data.at(-1) as ArticleSummary;
    const nextCursor = isReachingEnd ? null : lastArticleSummary.postId;

    return res(
      ctx.delay(500),
      ...mockSuccess<GetArticlesByCursorApiData['data']>(ctx, {
        posts: data,
        cursor: nextCursor,
      })
    );
  };
};

export const paginatedArticlesHandler = (
  empty = false,
  totalPageCount = 200
) => {
  return (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const unsafePage = Number(req.url.searchParams.get(defaultArticlesPageKey));
    const page = Number.isNaN(unsafePage) ? 1 : unsafePage;

    return res(
      ctx.delay(0),
      ctx.json<GetArticlesByOffsetApiData['data']>({
        posts: empty ? [] : articleSummaries.slice(0, 20),
        currentPage: page,
        totalPageCount,
      })
    );
  };
};

export const restInfiniteArticlesSuccess = infiniteArticlesHandler();
export const restInfiniteArticlesError = infiniteArticlesHandler({
  error: true,
});
