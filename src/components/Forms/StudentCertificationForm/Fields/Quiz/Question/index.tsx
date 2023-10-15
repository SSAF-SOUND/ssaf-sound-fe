import type { StudentCertificationFormValues } from '~/components/Forms/StudentCertificationForm/utils';

import { css } from '@emotion/react';
import { useId } from 'react';
import { useWatch } from 'react-hook-form';

import { SelectBox } from '~/components/Common/SelectBox';
import { useStudentCertificationFormContext } from '~/components/Forms/StudentCertificationForm/utils';
import { useYears } from '~/services/meta';
import { flex, fontCss, palettes } from '~/styles/utils';

import Blank from './Blank';
import QuestionMap from './QuestionMap';

const fieldName = 'year';

const Question = () => {
  const selectBoxId = useId();
  const {
    setValue,
    formState: { defaultValues: { year: defaultYear = 1 } = {} },
  } = useStudentCertificationFormContext();
  const { data: years } = useYears();

  const yearItems = years.map(String);
  const year =
    (useWatch<StudentCertificationFormValues>({
      name: fieldName,
    }) as number) ?? defaultYear;

  return (
    <div>
      <div css={yearCss}>
        <label css={labelCss} htmlFor={selectBoxId}>
          기수 선택
        </label>
        <SelectBox
          id={selectBoxId}
          size="lg"
          items={yearItems}
          textAs={(item) => item + '기'}
          defaultValue={String(year)}
          onValueChange={(value) => setValue(fieldName, Number(value))}
          triggerTextAlign="center"
          itemPaddingX={40}
        />
      </div>

      <div css={questionCss}>
        <p css={{ marginBottom: 16 }}>
          {'"'}
          <QuestionMap year={year} />
          {'"'}
        </p>
        <p css={fontCss.style.B20}>{`빈칸에 들어갈 단어를 입력해주세요.`}</p>
        <p css={fontCss.style.B20}>
          <Blank length={1} />는 한글, <Blank length={1} isAlphabet />는
          영문이며 대소문자는 상관없습니다.
        </p>
        <p css={alertCss}>인증가능한 횟수는 총 3회 주어집니다!</p>
      </div>
    </div>
  );
};

export default Question;

const labelCss = css(
  { display: 'block', marginBottom: 6, color: palettes.font.blueGrey },
  fontCss.style.R12
);
const yearCss = css({ marginBottom: 56 });
const questionCss = css(
  { marginBottom: 48 },
  flex('', '', 'column', 12),
  fontCss.style.B28
);

const alertCss = css(
  {
    color: palettes.primary.dark,
  },
  fontCss.style.B16
);
