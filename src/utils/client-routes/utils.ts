import { isNullOrUndefined } from 'is-what';

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
  (query?: Query): Route<Query, Pathname> => {
    if (query) {
      const mapped = Object.fromEntries(
        Object.entries(query).filter(
          ([key, value]) => !isNullOrUndefined(value)
        )
      ) as Query;

      return { pathname, query: mapped };
    }

    return { pathname } as const;
  };
