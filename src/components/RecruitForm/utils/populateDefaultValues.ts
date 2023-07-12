import type { RecruitFormValues } from './type';

import dayjs from 'dayjs';

import { SkillNameSet } from '~/services/recruit';
import { defaultify } from '~/utils';
import { pickBy } from '~/utils/object';

export const populateDefaultValues = (
  unsafeValues: Partial<RecruitFormValues> = {}
) => {
  const {
    category = '',
    participants: { project = [], study = [] } = {},
    skills = {},
    endDate = '',
    title = '',
    content = '',
    contact = '',
    questionToApplicants = '',
  } = unsafeValues;

  const tomorrow = dayjs().add(1, 'day');
  const safeValues: RecruitFormValues = {
    title,
    content,
    contact,
    questionToApplicants,
    category: defaultify(category, [
      (v) => !['프로젝트', '스터디'].includes(v),
    ]).to(defaultCategory),
    participants: {
      project: defaultify(project, [undefined, null, (p) => !p.length]).to(
        defaultProjectParticipants
      ),
      study: defaultify(study, [undefined, null, (p) => p.length !== 1]).to(
        defaultStudyParticipants
      ),
    },
    skills: pickBy(([k]) => SkillNameSet.has(k), skills),
    endDate: defaultify(endDate, [
      undefined,
      null,
      '',
      (d) => {
        return dayjs(d).isBefore(tomorrow, 'day');
      },
    ]).to(tomorrow.format('YYYY-MM-DD')),
  };

  return safeValues;
};

const defaultCategory = '프로젝트';
const defaultProjectParticipants = [{ part: '', count: 1 }];
const defaultStudyParticipants = [{ part: '스터디', count: 1 }];
