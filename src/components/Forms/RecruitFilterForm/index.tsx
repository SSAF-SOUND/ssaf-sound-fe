import type { RecruitFilterFormValues } from './utils';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '~/components/Common';
import {
  RecruitPartsField,
  RecruitSkillsField,
} from '~/components/Forms/RecruitFilterForm/Fields';
import {
  getRecruitThemeByCategory,
  RecruitCategoryName,
} from '~/services/recruit';

export interface RecruitFilterFormProps {
  className?: string;
  defaultValues?: RecruitFilterFormValues;
  onValidSubmit: SubmitHandler<RecruitFilterFormValues>;
  onInvalidSubmit?: SubmitErrorHandler<RecruitFilterFormValues>;
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

  const { category } = defaultValues;
  const isCategoryProject = category === RecruitCategoryName.PROJECT;
  const recruitTheme = getRecruitThemeByCategory(category);

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      >
        {isCategoryProject && <RecruitPartsField css={{ marginBottom: 40 }} />}
        <RecruitSkillsField css={{ marginBottom: 48 }} />

        <Button
          theme={recruitTheme}
          type="submit"
          size="lg"
          css={{ width: '100%' }}
        >
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
