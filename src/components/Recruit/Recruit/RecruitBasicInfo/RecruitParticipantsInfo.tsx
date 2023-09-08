import type { RecruitParticipantsProgress } from '~/services/recruit';

import { memo } from 'react';

import { RecruitInfoHighlightText } from './RecruitInfoHighlightText';

export interface RecruitParticipantInfoProps {
  participantsInfo: RecruitParticipantsProgress;
  isLastInfo?: boolean;
}

export const RecruitParticipantsInfo = memo(
  (props: RecruitParticipantInfoProps) => {
    const {
      participantsInfo: {
        recruitType: recruitPart,
        currentNumber: currentParticipantsCount,
        limit: maxParticipantsCount,
      },
      isLastInfo,
    } = props;

    return (
      <span>
        {recruitPart}{' '}
        <RecruitInfoHighlightText>{currentParticipantsCount}</RecruitInfoHighlightText>/
        {maxParticipantsCount}명
        {!isLastInfo && <RecruitParticipantsSeparator />}
      </span>
    );
  }
);
RecruitParticipantsInfo.displayName = 'RecruitParticipantsInfo';

const RecruitParticipantsSeparator = () => <span>, </span>;
