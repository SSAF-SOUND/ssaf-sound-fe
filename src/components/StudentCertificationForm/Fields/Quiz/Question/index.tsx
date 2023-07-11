import type { StudentCertificationFormValues } from '~/components/StudentCertificationForm/utils';

import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { SelectBox } from '~/components/Common';
import { useStudentCertificationFormContext } from '~/components/StudentCertificationForm/utils';
import { years } from '~/services/member';

import QuestionMap from './QuestionMap';

const fieldName = 'year';

const Question = () => {
  const {
    setValue,
    formState: { defaultValues: { year: defaultYear } = {} },
  } = useStudentCertificationFormContext();
  const items = useMemo(() => years.map(String), []);

  const year = useWatch<StudentCertificationFormValues>({
    name: fieldName,
    defaultValue: defaultYear,
  }) as number;

  return (
    <>
      <SelectBox
        size="lg"
        items={items}
        textAs={(item) => item + '기'}
        defaultValue={String(year)}
        onValueChange={(value) => setValue(fieldName, Number(value))}
      />
      <QuestionMap year={year} />
    </>
  );
};

export default Question;
