import type { RecruitFilterFormValues } from './utils';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '~/components/Common';
import {
  RecruitPartsField,
  RecruitSkillsField,
} from '~/components/Forms/RecruitFilterForm/Fields';
import { RecruitCategoryName } from '~/services/recruit';

interface RecruitFilterFormOptions {}

export interface RecruitFilterFormProps {
  className?: string;
  defaultValues?: RecruitFilterFormValues;
  onValidSubmit: SubmitHandler<RecruitFilterFormValues>;
  onInvalidSubmit?: SubmitErrorHandler<RecruitFilterFormValues>;
  options?: Partial<RecruitFilterFormOptions>;
}

export const RecruitFilterForm = (props: RecruitFilterFormProps) => {
  const {
    className,
    defaultValues = defaultRecruitFilterFormValues,
    onValidSubmit,
    onInvalidSubmit,
  } = props;

  const methods = useForm<RecruitFilterFormValues>({
    defaultValues,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      >
        <RecruitPartsField css={{ marginBottom: 40 }} />
        <RecruitSkillsField css={{ marginBottom: 48 }} />

        <Button size="lg" css={{ width: '100%' }}>
          선택 완료
        </Button>
      </form>
    </FormProvider>
  );
};

const defaultRecruitFilterFormValues: RecruitFilterFormValues = {
  category: RecruitCategoryName.PROJECT,
  recruitParts: [],
  skills: [],
};
