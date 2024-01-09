import type { RestHandler } from 'msw';

type HandlerCategory =
  | 'auth'
  | 'member'
  | 'article'
  | 'articleComment'
  | 'recruitComment'
  | 'meta'
  | 's3'
  | 'lunch'
  | 'recruit'
  | 'report'
  | 'common'
  | 'notification';

type CreateMswParametersParams = Partial<
  Record<HandlerCategory, RestHandler[]>
>;

export const createMswParameters = (
  handlersMap?: CreateMswParametersParams
) => {
  return {
    msw: {
      handlers: {
        ...handlersMap,
      },
    },
  };
};
