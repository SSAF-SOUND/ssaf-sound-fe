// ---------- lunch self ----------

import { LunchDateSpecifier, LunchDateSpecifierSet } from '~/services/lunch';
import { SsafyCampus, SsafyCampusSet } from '~/services/meta/utils';
import { createRoute } from '~/utils/client-routes/utils';

const lunchSelfRoute = () => createRoute('/lunch')();

// ---------- lunch list ----------

export type LunchListPageRouteQuery = {
  campus?: string;
  date?: LunchDateSpecifier;
};

export type SafeLunchListPageRouteQuery = {
  campus: string;
  date: LunchDateSpecifier;
};

const LunchListPageRoute = (query: LunchListPageRouteQuery = {}) => {
  const pathname = lunchSelfRoute().pathname;

  return createRoute<LunchListPageRouteQuery>(pathname)(
    toSafeLunchListPageQuery(query)
  );
};

const toSafeLunchListPageQuery = (
  query: LunchListPageRouteQuery
): SafeLunchListPageRouteQuery => {
  const { date: dateSpecifier, campus } = query;
  const safeCampus =
    campus && SsafyCampusSet.has(campus) ? campus : SsafyCampus.SEOUL;

  const safeDateSpecifier =
    dateSpecifier && LunchDateSpecifierSet.has(dateSpecifier)
      ? dateSpecifier
      : LunchDateSpecifier.TODAY;

  return {
    campus: safeCampus,
    date: safeDateSpecifier,
  };
};

export const lunch = {
  self: lunchSelfRoute,
  detail: LunchListPageRoute,
};
