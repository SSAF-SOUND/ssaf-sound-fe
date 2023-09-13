import type {
  RecruitCategoryName,
  RecruitParts,
  SkillName,
} from '~/services/recruit';

export interface RecruitFilterFormValues {
  category: RecruitCategoryName;
  recruitParts: RecruitParts[];
  skills: SkillName[];
}
