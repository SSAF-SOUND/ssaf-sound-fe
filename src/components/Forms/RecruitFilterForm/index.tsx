import type { SubmitHandler } from 'react-hook-form';
import type {
  RecruitCategory,
  RecruitType,
  SkillsType,
} from '~/services/recruit';

import { useForm } from 'react-hook-form';

import { Button } from '~/components/Common';
import { useRecruitTypes } from '~/services/meta';

import { RecruitTypeFilter, SkillsFilter } from './Fields';
import { RecruitFormLabel } from './RecruitFormLabel';

type DefaultValues = {
  recruitType?: RecruitType[];
  skills?: SkillsType[];
};

interface RecruitFilterFormProps {
  submitHandler?: SubmitHandler<DefaultValues>;
  category?: RecruitCategory;
  defaultValues: DefaultValues;
}

export const RecruitFilterForm = (props: RecruitFilterFormProps) => {
  //   const { data } = useRecruitTypes();
  const {
    category = 'project',
    defaultValues = { skills: [], recruitType: [] },
    submitHandler = console.log,
  } = props;
  const { skills: defaultSkills, recruitType: defaultRecruitType } =
    defaultValues;

  const categoryIsProject = category === 'project';
  const { control, handleSubmit, reset, watch } = useForm<DefaultValues>({
    defaultValues,
  });

  return (
    <form
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        width: '100%',
      }}
      onSubmit={handleSubmit(submitHandler)}
    >
      <RecruitFormLabel />
      {categoryIsProject && (
        <RecruitTypeFilter
          reset={() => reset({ ...watch(), recruitType: [] })}
          control={control}
          defaultValue={defaultRecruitType}
        />
      )}

      <SkillsFilter
        reset={() => reset({ ...watch(), skills: [] })}
        control={control}
        defaultValue={defaultSkills as unknown as string[]}
      />

      <Button type="submit">선택완료</Button>
    </form>
  );
};
