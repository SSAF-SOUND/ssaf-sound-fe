import type { RecruitParts, SkillName } from '~/services/recruit/utils/types';

import { isArray, isBoolean, isString } from 'is-what';

import { validateSearchKeyword } from '~/services/common/utils/searchBar';
import {
  ProjectPartsSet,
  RecruitCategoryName,
  RecruitCategoryNameSet,
  SkillNameSet,
} from '~/services/recruit/utils/types';
import { createRoute } from '~/utils/client-routes/utils';

type ProjectParts = Exclude<RecruitParts, RecruitParts.STUDY>;

const getSafeCategory = (category?: string) => {
  if (category && RecruitCategoryNameSet.has(category))
    return category as RecruitCategoryName;
  return RecruitCategoryName.PROJECT;
};

const recruitsSelfRoute = () => createRoute('/recruits')();

// ---------- recruits list ----------

export type RecruitsListPageRouteQuery = {
  category?: RecruitCategoryName;

  includeCompleted?: boolean;
  recruitParts?: ProjectParts | ProjectParts[];
  skills?: SkillName | SkillName[];
  keyword?: string;
};

export type SafeRecruitsListPageRouteQuery = {
  category: RecruitCategoryName;
  includeCompleted: boolean;
  recruitParts: ProjectParts[];
  skills: SkillName[];
  keyword?: string;
};

const recruitsListPageRoute = (query: RecruitsListPageRouteQuery = {}) => {
  const pathname = recruitsSelfRoute().pathname;
  return createRoute<SafeRecruitsListPageRouteQuery>(pathname)(
    toSafeRecruitsListPageQuery(query)
  );
};

const toSafeRecruitsListPageQuery = (
  query: RecruitsListPageRouteQuery
): SafeRecruitsListPageRouteQuery => {
  const { category, keyword, recruitParts, skills, includeCompleted } = query;

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

  return {
    category: safeCategory,
    keyword: safeKeyword,
    includeCompleted: safeIncludeCompleted,
    recruitParts: safeRecruitParts,
    skills: safeSkills,
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
  const pathname = recruitsSelfRoute().pathname;
  return createRoute<SafeRecruitCreatePageRouteQuery>(pathname)(
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
  const pathname = recruitsSelfRoute().pathname;
  return createRoute(`${pathname}/${recruitId}`)();
};

// ---------- recruit edit ----------

const recruitEditPageRoute = (recruitId: number) => {
  const pathname = recruitsSelfRoute().pathname;
  return createRoute(`${pathname}/${recruitId}/edit`)();
};

// ---------- recruit apply ----------

const recruitApplyPageRoute = (recruitId: number) => {
  const pathname = recruitsSelfRoute().pathname;
  return createRoute(`${pathname}/${recruitId}/apply`)();
};

// ---------- recruit application ----------

export const recruits = {
  self: recruitsSelfRoute,
  list: recruitsListPageRoute,
  create: recruitCreatePageRoute,
  detail: recruitDetailPageRoute,
  edit: recruitEditPageRoute,
  apply: recruitApplyPageRoute,
};
