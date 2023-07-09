import type { RecruitFormValues } from '~/components/RecruitForm/utils/type';
import type { SkillName } from '~/services/recruit';

import is from '@sindresorhus/is';
import dayjs from 'dayjs';

import { SkillNameSet } from '~/services/recruit';
import { defaultify } from '~/utils';
import { pickBy } from '~/utils/object';

import undefined = is.undefined;

export const populateDefaultValues = (unsafeValues: RecruitFormValues) => {
  const safeValues = { ...unsafeValues };

  safeValues.category = defaultify(safeValues.category, defaultCategory, {
    matchers: [undefined, null, ''],
  });

  safeValues.participants.project = defaultify(
    safeValues.participants.project,
    defaultProjectParticipants,
    {
      matchers: [undefined, null, (participants) => !participants.length],
    }
  );

  safeValues.participants.study = defaultify(
    safeValues.participants.study,
    defaultStudyParticipants,
    {
      matchers: [undefined, null, (participants) => participants.length !== 1],
    }
  );

  safeValues.skills = pickBy(([k]) => SkillNameSet.has(k), safeValues.skills);

  safeValues.endDate = defaultify(safeValues.endDate, '');
};

const defaultCategory = '프로젝트';
const defaultProjectParticipants = [{ part: '', count: 1 }];
const defaultStudyParticipants = [{ part: '스터디', count: 1 }];

const isAfterToday = (date: string) => {
  return dayjs(date).isAfter(dayjs(), 'day');
};
