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

type PossibleRecruitParts = Exclude<RecruitParts, RecruitParts.STUDY>;

export type RecruitsPageRouteQuery = {
  category?: RecruitCategoryName;

  includeCompleted?: boolean;
  recruitParts?: PossibleRecruitParts | PossibleRecruitParts[];
  skills?: SkillName | SkillName[];
  keyword?: string;
};

export type SafeRecruitsPageRouteQuery = {
  category: RecruitCategoryName;
  includeCompleted: boolean;
  recruitParts: PossibleRecruitParts[];
  skills: SkillName[];
  keyword?: string;
};

const recruitsSelfRoute = createRoute('/recruits');

// ---------- recruits ----------
const recruitsPageRoute = (query: RecruitsPageRouteQuery = {}) => {
  const pathname = recruitsSelfRoute().pathname;
  return createRoute<SafeRecruitsPageRouteQuery>(pathname)(
    toSafeRecruitsPageQuery(query)
  );
};

const toSafeRecruitsPageQuery = (
  query: RecruitsPageRouteQuery
): SafeRecruitsPageRouteQuery => {
  const { category, keyword, recruitParts, skills, includeCompleted } = query;

  const safeCategory =
    category && RecruitCategoryNameSet.has(category)
      ? category
      : RecruitCategoryName.PROJECT; // default;
  const safeKeyword =
    isString(keyword) && validateSearchKeyword(keyword.trim())
      ? keyword.trim()
      : undefined; // default
  const safeIncludeCompleted = isBoolean(includeCompleted)
    ? includeCompleted
    : false; // default

  const safeRecruitParts = (
    isArray(recruitParts) ? recruitParts : [recruitParts]
  ).filter(
    (dirty) => dirty && ProjectPartsSet.has(dirty)
  ) as PossibleRecruitParts[];

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

export const recruits = {
  self: recruitsSelfRoute,
  list: recruitsPageRoute,
};
