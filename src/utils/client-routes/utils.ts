import { isNullOrUndefined } from 'is-what';

export type PossibleRouteValue =
  | string
  | boolean
  | string[]
  | boolean[]
  | undefined
  | null;

export type Route<Query extends object, Pathname extends string = string> = {
  pathname: Pathname;
  query: Query;
};

export const createRoute =
  <Query extends object, Pathname extends string = string>(
    pathname: Pathname
  ) =>
  (query?: Query): Route<Query, Pathname> => {
    if (query) {
      const nonNullableQuery = Object.fromEntries(
        Object.entries(query).filter(([, value]) => !isNullOrUndefined(value))
      ) as Query;

      return { pathname, query: nonNullableQuery };
    }

    return { pathname, query: Object.assign({}) };
  };
