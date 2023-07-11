import { css } from '@emotion/react';
import { useMemo, useId, useState } from 'react';

import {
  Button,
  DefaultFullPageLoader,
  SelectBox,
  TextInput,
} from '~/components/Common';
import { years } from '~/services/member';

import Question from './Question';
import { useStudentCertificationFormContext } from '../../utils';

const fieldName = 'answer';
const maxTries = 3;

export const Answer = () => {
  const answerId = useId();
  const {
    watch,
    setValue,
    register,
    formState: { defaultValues: { year: defaultYear } = {}, isSubmitting },
  } = useStudentCertificationFormContext();
  const [tries, setTries] = useState(0);
  const items = useMemo(() => years.map(String), []);
  const year = watch('year', defaultYear);
  const answer = watch(fieldName);

  if (!year) return <DefaultFullPageLoader text="기수 정보를 확인중입니다." />;

  return (
    <div>
      <SelectBox
        size="lg"
        items={items}
        textAs={(item) => item + '기'}
        defaultValue={String(year)}
        onValueChange={(value) => setValue('year', Number(value))}
      />

      <div>
        <label htmlFor={answerId}>
          <Question year={year} />
        </label>

        <p>인증가능한 횟수는 총 {maxTries}회 주어집니다!</p>
      </div>

      <TextInput
        css={textInputCss}
        id={answerId}
        size="lg"
        placeholder="단어를 입력해주세요"
        {...register(fieldName, { required: true })}
      />

      <Button
        css={buttonCss}
        size="lg"
        loading={isSubmitting}
        disabled={!answer.length}
        type="submit"
      >
        확인
      </Button>
    </div>
  );
};

const textInputCss = css({ width: '100%' });
const buttonCss = css({ width: '100%' });
