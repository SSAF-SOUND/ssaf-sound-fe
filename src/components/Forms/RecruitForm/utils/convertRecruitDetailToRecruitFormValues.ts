import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils/type';
import type {
  RecruitDetail,
  RecruitParticipantsCount,
} from '~/services/recruit';


import { convertSkillsArrayToObject } from '~/components/Forms/RecruitForm/utils/convertSkillsArrayToObject';
import { toEndDateFormValue } from '~/components/Forms/RecruitForm/utils/toEndDateFormValue';
import { RecruitCategoryName, RecruitParts } from '~/services/recruit';

export const convertRecruitDetailToRecruitFormValues = (
  recruitDetail: RecruitDetail
): RecruitFormValues => {
  const {
    category,
    title,
    content,
    contactURI,
    questions,
    skills,
    recruitEnd,
    limits,
  } = recruitDetail;

  const formValues: RecruitFormValues = {
    category,
    title,
    content,
    contact: contactURI,
    questionToApplicants: questions[0],
    skills: convertSkillsArrayToObject(skills.map(({ name }) => name)),
    participants: {
      [RecruitCategoryName.PROJECT]: [],
      [RecruitCategoryName.STUDY]: [],
    },
    /* TODO: recruitDetail.myPart 타입 업데이트한 후 교체 */
    myPart: RecruitParts.FRONTEND,
    endDate: toEndDateFormValue(recruitEnd),
  };

  const participants: RecruitParticipantsCount[] = limits.map(
    ({ recruitType: part, limit: maxParticipantsCount }) => {
      return {
        part,
        count: maxParticipantsCount,
      };
    }
  );

  formValues.participants[category] = participants;

  return formValues;
};
