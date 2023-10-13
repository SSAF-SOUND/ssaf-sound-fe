import { ProfileTabs, ProfileTabSet } from '~/components/Profile/utils';
import { createRoute } from '~/utils/client-routes/utils';

export type ProfilePageRouteQuery = {
  tab?: string;
};

export type SafeProfilePageRouteQuery = {
  tab: ProfileTabs;
};

// ---------- profile self ----------

const profileSelfRoute = (query: ProfilePageRouteQuery = {}) => {
  return createRoute<SafeProfilePageRouteQuery>('/profile')(
    toSafeProfilePageRouteQuery(query)
  );
};

const toSafeProfilePageRouteQuery = (
  query: ProfilePageRouteQuery
): SafeProfilePageRouteQuery => {
  const { tab } = query;

  const safeTab =
    !!tab && ProfileTabSet.has(tab)
      ? (tab as ProfileTabs)
      : ProfileTabs.PORTFOLIO;

  return { tab: safeTab };
};

// ---------- profile detail (user-profile) ----------;

const profileDetailRoute = (userId: number) => {
  const pathname = `${profileSelfRoute().pathname}/${userId}` as const;
  return createRoute(pathname)();
};

// ---------- profile myInfo settings ----------

const myInfoSettingsRoute = () => {
  const pathname = `${profileSelfRoute().pathname}/myinfo-settings` as const;
  return createRoute(pathname)();
};

// ---------- profile my articles ----------

const myArticlesRoute = () => {
  const pathname = `${profileSelfRoute().pathname}/my-articles` as const;
  return createRoute(pathname)();
};

// ---------- profile my scraps ----------

export enum PossibleMyScrapsTabValue {
  ARTICLES = 'articles',
  RECRUITS = 'recruits',
}

export const PossibleMyScrapsTabValueSet = new Set<string>(
  Object.values(PossibleMyScrapsTabValue)
);

export type MyScrapsRouteQuery = {
  tab?: string;
};

export type SafeMyScrapsRouteQuery = {
  tab: PossibleMyScrapsTabValue;
};

const myScrapsRoute = (query: MyScrapsRouteQuery = {}) => {
  const pathname = `${profileSelfRoute().pathname}/my-scraps` as const;
  return createRoute<SafeMyScrapsRouteQuery>(pathname)(
    toSafeMyScrapsRouteQuery(query)
  );
};

const toSafeMyScrapsRouteQuery = (
  query: MyScrapsRouteQuery
): SafeMyScrapsRouteQuery => {
  const { tab } = query;
  const safeTab =
    tab && PossibleMyScrapsTabValueSet.has(tab)
      ? (tab as PossibleMyScrapsTabValue)
      : PossibleMyScrapsTabValue.ARTICLES;

  return { tab: safeTab };
};

// ---------- myinfo edit ----------

export enum EditableMyInfoFields {
  SSAFY_BASIC_INFO = 'ssafy-basic-info', // 기수, 캠퍼스, 멤버여부(학생 인증시 못바꿈)
  NICKNAME = 'nickname',
  IS_MAJOR = 'is-major',
  TRACK = 'track', // 인증된 상태에서만 바꿀 수 있음
}

const myInfoEditRoute = (field: EditableMyInfoFields) => {
  const pathname = `${myInfoSettingsRoute().pathname}/${field}/edit` as const;
  return createRoute(pathname)();
};

// ---------- portfolio edit ----------

const portfolioEditRoute = () => {
  const pathname = `${profileSelfRoute().pathname}/portfolio/edit` as const;
  return createRoute(pathname)();
};

// ---------- account delete ----------

const accountDeleteRoute = () => {
  const pathname = `${myInfoSettingsRoute().pathname}/account/delete` as const;
  return createRoute(pathname)();
};

export const profile = {
  self: profileSelfRoute,
  detail: profileDetailRoute,
  myInfoSettings: myInfoSettingsRoute,
  myArticles: myArticlesRoute,
  myScraps: myScrapsRoute,
  edit: {
    myInfo: myInfoEditRoute,
    portfolio: portfolioEditRoute,
  },
  delete: {
    account: accountDeleteRoute,
  },
};
