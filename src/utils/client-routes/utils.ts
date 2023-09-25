import { isNullOrUndefined } from 'is-what';

import { identity } from '~/utils';

export type PossibleRouteValue =
  | string
  | boolean
  | string[]
  | boolean[]
  | undefined
  | null;

export type Route<
  Query extends Record<string, unknown> | Record<string, never> | undefined,
  Pathname extends string = string
> = {
  pathname: Pathname;
  query?: Query;
};

export const createRoute =
  <
    Query extends Record<string, unknown> | Record<string, never> | undefined,
    Pathname extends string = string
  >(
    pathname: Pathname
  ) =>
  (
    query?: Query,
    mapper: (query: Query) => Query = identity
  ): Route<Query, Pathname> => {
    if (query) {
      const nonNullableQuery = Object.fromEntries(
        Object.entries(query).filter(
          ([key, value]) => !isNullOrUndefined(value)
        )
      ) as Query;

      return { pathname, query: mapper(nonNullableQuery) };
    }

    return { pathname } as const;
  };
