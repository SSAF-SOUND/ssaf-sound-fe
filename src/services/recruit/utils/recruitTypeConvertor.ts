import type { RecruitCategory, RecruitParts, SkillName } from './types';
import type { RecruitParams } from '../apis';

import { stringBooleanToBool } from '~/utils';

/**
 *
 * @param queries
 * @returns
 */
export const recruitTypeConvertor = (queries?: {
  [key in keyof RecruitParams]?: string;
}): RecruitParams => {
  const {
    category = 'project',
    isFinished = 'false',
    skills,
    recruitTypes,
    keyword,
  } = queries || {};

  return {
    category: category as RecruitCategory,
    isFinished: stringBooleanToBool(isFinished),
    skills: skills?.split(',') as SkillName[],
    recruitTypes: recruitTypes?.split(',') as RecruitParts[],
    keyword,
  };
};
