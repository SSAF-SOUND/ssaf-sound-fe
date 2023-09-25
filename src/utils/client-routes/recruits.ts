import type {
  RecruitCategoryName,
  RecruitParts,
  SkillName,
} from '~/services/recruit';

import { createRoute } from '~/utils/client-routes/utils';

export type PossibleRecruitParts = Omit<RecruitParts, RecruitParts.STUDY>;

export type RecruitsListRouteQuery = {
  category?: RecruitCategoryName;

  includeCompleted?: boolean;
  recruitParts?: PossibleRecruitParts | PossibleRecruitParts[];
  skills?: SkillName | SkillName[];
  keyword?: string;
};

const recruitsSelfRoute = createRoute<undefined>('/recruits');

const recruitsListRoute = (query?: RecruitsListRouteQuery) => {
  const pathname = recruitsSelfRoute().pathname;
  return createRoute<RecruitsListRouteQuery>(pathname)(query);
};

export const recruits = {
  self: recruitsSelfRoute,
  list: recruitsListRoute,
};
