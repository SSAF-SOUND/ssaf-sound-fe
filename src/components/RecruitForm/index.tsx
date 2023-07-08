import type { RecruitFormValues } from './utils';

import { FormProvider, useForm } from 'react-hook-form';

import SubmitBar from '~/components/RecruitForm/SubmitBar';

import { Category, Participants, EndDate, Title } from './Fields';

interface RecruitFormOptions {
  // SubmitBar
  barTitle: string;
  submitButtonText: string;

  // Category
  isProjectDisabled: boolean;
  isStudyDisabled: boolean;
}

interface RecruitFormProps {
  options?: Partial<RecruitFormOptions>;
}

const defaultValues = {
  category: '프로젝트',
  participants: {
    project: [
      {
        part: '',
        count: 1,
      },
    ],
    study: [
      {
        part: '스터디',
        count: 1,
      },
    ],
  },
  endDate: '',
  title: '',
  content: '',
};

const RecruitForm = (props: RecruitFormProps) => {
  const { options = {} } = props;

  const {
    barTitle = '',
    submitButtonText = '',
    isProjectDisabled,
    isStudyDisabled,
  } = options;

  const methods = useForm<RecruitFormValues>({
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onValid = (value: unknown) => console.log(value);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onValid)}>
        <SubmitBar title={barTitle} submitButtonText={submitButtonText} />
        <Category
          isProjectDisabled={isProjectDisabled}
          isStudyDisabled={isStudyDisabled}
        />
        <Participants />
        <EndDate />
        <Title />
      </form>
    </FormProvider>
  );
};

export default RecruitForm;