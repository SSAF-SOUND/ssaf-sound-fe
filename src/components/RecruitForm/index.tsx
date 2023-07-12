import type { RecruitFormValues } from './utils';
import type { SubmitHandler } from 'react-hook-form';

import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SkillName } from '~/services/recruit';
import { noop } from '~/utils';

import {
  Category,
  Participants,
  EndDate,
  Title,
  Content,
  Skills,
  QuestionToApplicants,
  Contact,
} from './Fields';
import SubmitBar from './SubmitBar';
import { populateDefaultValues } from './utils';

interface RecruitFormOptions {
  // SubmitBar
  barTitle: string;
  submitButtonText: string;

  // Category
  isProjectDisabled: boolean;
  isStudyDisabled: boolean;
}

interface RecruitFormProps {
  onSubmit?: SubmitHandler<RecruitFormValues>;
  defaultValues?: Partial<RecruitFormValues>;
  options?: Partial<RecruitFormOptions>;
}

const RecruitForm = (props: RecruitFormProps) => {
  const {
    options = {},
    onSubmit = noop,
    defaultValues = defaultRecruitFormValues,
  } = props;

  const {
    barTitle = '',
    submitButtonText = '',
    isProjectDisabled,
    isStudyDisabled,
  } = options;

  const methods = useForm<RecruitFormValues>({
    defaultValues: useMemo(() => populateDefaultValues(defaultValues), []),
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SubmitBar title={barTitle} submitButtonText={submitButtonText} />
        <Category
          isProjectDisabled={isProjectDisabled}
          isStudyDisabled={isStudyDisabled}
        />
        <Participants />
        <EndDate />
        <Skills />
        <Title />
        <Content />
        <QuestionToApplicants />
        <Contact />
      </form>
    </FormProvider>
  );
};

const defaultRecruitFormValues: RecruitFormValues = {
  category: '',
  participants: {
    project: [],
    study: [],
  },
  endDate: '',
  skills: {},
  title: '',
  content: '',
  questionToApplicants: '',
  contact: '',
};

export default RecruitForm;
