import type { RecruitParts, SkillName } from '~/services/recruit/utils/types';

import { isArray, isBoolean, isString } from 'is-what';

import { toSafePageValue } from '~/services/common/utils/pagination';
import { validateSearchKeyword } from '~/services/common/utils/searchBar';
import {
  ProjectPartsSet,
  RecruitCategoryName,
  RecruitCategoryNameSet,
  SkillNameSet,
  MatchStatus,
} from '~/services/recruit/utils/types';
import { profile } from '~/utils/client-routes/profile';
import { createRoute } from '~/utils/client-routes/utils';

type ProjectParts = Exclude<RecruitParts, RecruitParts.STUDY>;

const getSafeCategory = (category?: string) => {
  if (category && RecruitCategoryNameSet.has(category))
    return category as RecruitCategoryName;
  return RecruitCategoryName.PROJECT;
};

// ---------- recruit self ----------

const recruitSelfRoute = () => createRoute('/recruits')();

// ---------- recruit list ----------

export type RecruitsListPageRouteQuery = {
  category?: RecruitCategoryName;
  page?: number;

  includeCompleted?: boolean;
  recruitParts?: ProjectParts | ProjectParts[];
  skills?: SkillName | SkillName[];
  keyword?: string;
};

export type SafeRecruitsListPageRouteQuery = {
  category: RecruitCategoryName;
  page: number;

  includeCompleted: boolean;
  recruitParts: ProjectParts[];
  skills: SkillName[];
  keyword?: string;
};

const recruitListPageRoute = (query: RecruitsListPageRouteQuery = {}) => {
  const pathname = recruitSelfRoute().pathname;
  return createRoute<SafeRecruitsListPageRouteQuery>(pathname)(
    toSafeRecruitsListPageQuery(query)
  );
};

const toSafeRecruitsListPageQuery = (
  query: RecruitsListPageRouteQuery
): SafeRecruitsListPageRouteQuery => {
  const { category, keyword, recruitParts, skills, includeCompleted, page } =
    query;

  const safeCategory = getSafeCategory(category);
  const safeKeyword =
    isString(keyword) && validateSearchKeyword(keyword.trim())
      ? keyword.trim()
      : undefined; // default
  const safeIncludeCompleted = isBoolean(includeCompleted)
    ? includeCompleted
    : false; // default

  const safeRecruitParts = (
    isArray(recruitParts) ? recruitParts : [recruitParts]
  ).filter((dirty) => dirty && ProjectPartsSet.has(dirty)) as ProjectParts[];

  const safeSkills = (isArray(skills) ? skills : [skills]).filter(
    (dirty) => dirty && SkillNameSet.has(dirty)
  ) as SkillName[];

  const safePage = toSafePageValue(page);

  return {
    category: safeCategory,
    keyword: safeKeyword,
    includeCompleted: safeIncludeCompleted,
    recruitParts: safeRecruitParts,
    skills: safeSkills,
    page: safePage,
  };
};

// ---------- recruit create ----------

export type RecruitCreatePageRouteQuery = {
  category?: RecruitCategoryName;
};
export type SafeRecruitCreatePageRouteQuery = {
  category: RecruitCategoryName;
};
const recruitCreatePageRoute = (query: RecruitCreatePageRouteQuery = {}) => {
  const pathname = recruitSelfRoute().pathname;
  return createRoute<SafeRecruitCreatePageRouteQuery>(`${pathname}/new`)(
    toSafeRecruitCreatePageQuery(query)
  );
};

const toSafeRecruitCreatePageQuery = (
  query: RecruitCreatePageRouteQuery
): SafeRecruitCreatePageRouteQuery => {
  const { category } = query;
  return { category: getSafeCategory(category) };
};

// ---------- recruit detail ----------

const recruitDetailPageRoute = (recruitId: number) => {
  const pathname = recruitSelfRoute().pathname;
  return createRoute(`${pathname}/${recruitId}`)();
};

// ---------- recruit edit ----------

const recruitEditPageRoute = (recruitId: number) => {
  const pathname = recruitSelfRoute().pathname;
  return createRoute(`${pathname}/${recruitId}/edit`)();
};

// ---------- recruit apply ----------

const recruitApplyPageRoute = (recruitId: number) => {
  const pathname = recruitSelfRoute().pathname;
  return createRoute(`${pathname}/${recruitId}/apply`)();
};

// ---------- recruit application self (== applicants) ----------

const recruitApplicationSelfRoute = (recruitId: number) => {
  const pathname = recruitDetailPageRoute(recruitId).pathname;
  return createRoute(`${pathname}/applications`)();
};

// ---------- recruit application detail -----------

interface RecruitApplicationDetailPageRouteParams {
  recruitId: number;
  recruitApplicationId: number;
}
const recruitApplicationDetailPageRoute = (
  params: RecruitApplicationDetailPageRouteParams
) => {
  const { recruitId, recruitApplicationId } = params;
  const pathname = recruitApplicationSelfRoute(recruitId).pathname;
  return createRoute(`${pathname}/${recruitApplicationId}`)();
};

// ---------- recruit my application detail ----------
const recruitMyApplicationPageRoute = (recruitId: number) => {
  const pathname = recruitApplicationSelfRoute(recruitId).pathname;
  return createRoute(`${pathname}/mine`)();
};

// ---------- recruit rejected applicants ----------
const recruitRejectedApplicantsPageRoute = (recruitId: number) => {
  const pathname = recruitApplicationSelfRoute(recruitId).pathname;
  return createRoute(`${pathname}/rejected`)();
};

// ---------- applied recruits list ----------
const PossibleMatchStatusSet = new Set(
  Object.values(MatchStatus).filter((v) => v !== MatchStatus.INITIAL)
);

export interface AppliedRecruitsPageRouteParams {
  category: RecruitCategoryName;
  matchStatus?: MatchStatus;
  page?: number;
}

export type AppliedRecruitsPageRouteQuery = {
  matchStatus?: MatchStatus;
  page?: number;
};

const appliedRecruitsPageRoute = (params: AppliedRecruitsPageRouteParams) => {
  const { category, matchStatus } = params;
  const query = { matchStatus };

  const pathname = `${
    profile.self().pathname
  }/applied-recruits/${category}` as const;
  return createRoute<AppliedRecruitsPageRouteQuery>(pathname)(
    toSafeAppliedRecruitsPageRouteQuery(query)
  );
};

const toSafeAppliedRecruitsPageRouteQuery = (
  query: AppliedRecruitsPageRouteQuery
): AppliedRecruitsPageRouteQuery => {
  const { matchStatus, page } = query;
  const safeMatchStatus =
    matchStatus && PossibleMatchStatusSet.has(matchStatus)
      ? matchStatus
      : undefined;
  const safePage = toSafePageValue(page);

  return {
    matchStatus: safeMatchStatus,
    page: safePage,
  };
};

export const recruit = {
  self: recruitSelfRoute,
  list: recruitListPageRoute,
  create: recruitCreatePageRoute,
  detail: recruitDetailPageRoute,
  edit: recruitEditPageRoute,
  apply: recruitApplyPageRoute,
  applications: {
    self: recruitApplicationSelfRoute,
    detail: recruitApplicationDetailPageRoute,
    mine: recruitMyApplicationPageRoute,
    rejected: recruitRejectedApplicantsPageRoute,
  },
  appliedList: appliedRecruitsPageRoute,
};
