import type { RecruitFormValues } from '~/components/RecruitForm/utils';

import { useWatch } from 'react-hook-form';

import StudyParticipants from './/StudyParticipants';
import ProjectParticipants from './ProjectParticipants';

export const Participants = () => {
  const category = useWatch<RecruitFormValues>({
    name: 'category'
  });

  return (
    <div>
      {category === '프로젝트' ? (
        <ProjectParticipants />
      ) : (
        <StudyParticipants />
      )}
    </div>
  );
};
