import type {
  RecruitSummary,
  RecruitParticipantsSummaryWithPart,
} from '~/services/recruit';

import { css } from '@emotion/react';

import { Avatar } from '~/components/Common';
import { Scroll } from '~/components/Common/Scroll';
import { middleRecruitCardPaddingX } from '~/components/Recruit/RecruitCard/constants';
import { RecruitParts } from '~/services/recruit';
import { expandCss, flex, fontCss } from '~/styles/utils';

interface RecruitCardParticipantsProps {
  recruitSummary: RecruitSummary;
  className?: string;
}

export const RecruitCardParticipants = (
  props: RecruitCardParticipantsProps
) => {
  const { recruitSummary, className } = props;
  const { participants } = recruitSummary;

  return (
    <Scroll.Root
      className={className}
      css={[expandCss(`${middleRecruitCardPaddingX}px`)]}
    >
      <Scroll.Viewport>
        <div css={[selfCss, { padding: '4px 24px 8px' }]}>
          {participants.map((participantsDetail) => (
            <RecruitCardParticipantsRow
              key={participantsDetail.recruitType}
              participantsDetail={participantsDetail}
            />
          ))}
        </div>
      </Scroll.Viewport>

      <Scroll.Bar orientation="horizontal" css={scrollbarCss}>
        <Scroll.Thumb />
      </Scroll.Bar>
    </Scroll.Root>
  );
};
const selfCss = css(flex('center', 'flex-start', 'row', 16));

const scrollbarCss = css({
  transform: 'translate3d(0, 12px,0)',
});

interface RecruitCardParticipantsRowProps {
  participantsDetail: RecruitParticipantsSummaryWithPart;
}

const RecruitCardParticipantsRow = (props: RecruitCardParticipantsRowProps) => {
  const { participantsDetail } = props;
  const {
    recruitType: recruitPart,
    members,
    limit: maxParticipantsCount,
  } = participantsDetail;

  const recruitPartText = recruitPartTextMap[recruitPart];

  return (
    <div css={rowSelfCss}>
      {recruitPartText && (
        <strong css={fontCss.style.B14}>{recruitPartText}</strong>
      )}

      <Avatar.Group
        overridableSize="md2"
        // visibleCount={maxParticipantsCount}
        maxCount={maxParticipantsCount}
      >
        {members.map((member) => (
          <Avatar key={member.memberId} size="md2" userInfo={member} />
        ))}
      </Avatar.Group>
    </div>
  );
};

const recruitPartTextMap = {
  [RecruitParts.FRONTEND]: 'FE',
  [RecruitParts.BACKEND]: 'BE',
  [RecruitParts.APP]: 'APP',
  [RecruitParts.PM]: 'PM',
  [RecruitParts.STUDY]: '',
};

const rowSelfCss = css(flex('center', 'flex-start', 'row', 8));
