import type { RecruitFormValues } from '~/components/Forms/RecruitForm/utils';

import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import { DatePicker } from '~/components/Common';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';
import { flex } from '~/styles/utils';

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

  const datePickerTheme = category === '프로젝트' ? 'primary' : 'secondary';
  const tomorrow = dayjs().add(1, 'day').toDate();

  const handleChangeDate = (value: unknown) => {
    if (value instanceof Date) {
      setValue(fieldName, dayjs(value).format('YYYY-MM-DD'));
      return;
    }

    console.error(`[In DatePicker] 알 수 없는 값 ${value}이 입력되었습니다.`);
  };

  useEffect(() => {
    if (defaultEndDate) {
      setValue(fieldName, defaultEndDate);
    }
    // eslint-disable-next-line
  }, []);

  register(fieldName, {
    validate: validateEndDate,
  });

  return (
    <div className={className} css={selfCss}>
      <DatePicker
        defaultValue={defaultEndDate}
        minDetail="month"
        minDate={tomorrow}
        theme={datePickerTheme}
        onChange={handleChangeDate}
      />
    </div>
  );
};

const selfCss = css(flex('center', 'center'));
