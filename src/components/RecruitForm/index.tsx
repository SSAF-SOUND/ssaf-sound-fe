import { FormProvider, useForm } from 'react-hook-form';

import SubmitBar from '~/components/RecruitForm/SubmitBar';

interface RecruitFormOptions {
  barTitle: string;
  submitButtonText: string;
}

interface RecruitFormProps {
  options?: Partial<RecruitFormOptions>;
}

const RecruitForm = (props: RecruitFormProps) => {
  const { options = {} } = props;

  const { barTitle = '', submitButtonText = '' } = options;

  const methods = useForm({
    defaultValues: {},
  });
  const { handleSubmit } = methods;
  const onValid = (value: unknown) => console.log(value);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onValid)}>
        <SubmitBar title={barTitle} submitButtonText={submitButtonText} />
      </form>
    </FormProvider>
  );
};

export default RecruitForm;
