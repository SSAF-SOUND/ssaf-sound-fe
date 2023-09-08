import dayjs from 'dayjs';
import { memo } from 'react';

import { RecruitInfoHighlightText } from './RecruitInfoHighlightText';

interface RecruitDateInfoProps {
  startDate: string;
  endDate: string;
}

export const RecruitDateInfo = memo((props: RecruitDateInfoProps) => {
  const { startDate, endDate } = props;
  const formattedStartDate = dayjs(startDate).format('YYYY.MM.DD');
  const formattedEndDateYear = dayjs(endDate).format('YYYY.');
  const formattedEndDateMonthAndDate = dayjs(endDate).format('MM.DD');

  return (
    <span>
      {formattedStartDate} ~ {formattedEndDateYear}
      <RecruitInfoHighlightText>
        {formattedEndDateMonthAndDate}
      </RecruitInfoHighlightText>
    </span>
  );
});

RecruitDateInfo.displayName = 'RecruitDateInfo';
