import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils';

import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useFormState, useWatch } from 'react-hook-form';

import { DatePicker } from '~/components/Common/DatePicker';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
import { toEndDateFormValue } from '~/components/Forms/RecruitForm/utils/toEndDateFormValue';
import { RecruitCategoryName } from '~/services/recruit';
import { flex, Theme } from '~/styles/utils';

const fieldName = 'endDate';
const validateEndDate = (value: string) => {
  if (!value) {
    return '모집 종료 날짜를 반드시 선택해야합니다.';
  }

  const today = dayjs();
  return (
    dayjs(value).isAfter(today, 'day') ||
    '모집 종료 날짜는 오늘 이후의 날짜만 가능합니다.'
  );
};

interface EndDateProps {
  className?: string;
}

export const EndDate = (props: EndDateProps) => {
  const { className } = props;
  const {
    register,
    setValue,
    formState: { defaultValues: { endDate: defaultEndDate } = {} },
  } = useRecruitFormContext();
  const category = useWatch<RecruitFormValues>({
    name: 'category',
  });
  const endDate =
    (useWatch<RecruitFormValues>({
      name: fieldName,
    }) as RecruitFormValues['endDate']) || defaultEndDate;

  const {
    errors: { endDate: endDateErrors },
  } = useFormState({ name: fieldName });

  const datePickerTheme =
    category === RecruitCategoryName.PROJECT ? Theme.PRIMARY : Theme.SECONDARY;
  const tomorrow = dayjs().add(1, 'day').toDate();

  const handleChangeDate = (value: unknown) => {
    if (value instanceof Date) {
      setValue(fieldName, toEndDateFormValue(value), {
        shouldDirty: true,
        shouldValidate: !!endDateErrors,
      });

      return;
    }

    console.error(`[In DatePicker] 알 수 없는 값 ${value}이 입력되었습니다.`);
  };

  register(fieldName, {
    validate: validateEndDate,
  });

  return (
    <div className={className} css={selfCss}>
      <DatePicker
        value={endDate}
        minDetail="month"
        minDate={tomorrow}
        theme={datePickerTheme}
        onChange={handleChangeDate}
      />
    </div>
  );
};

const selfCss = css(flex('center', 'center'));
