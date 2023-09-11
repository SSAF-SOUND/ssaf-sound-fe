import type {
  RecruitSummary,
  RecruitParticipantsDetailWithPart,
} from '~/services/recruit';

import { css } from '@emotion/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { Avatar } from '~/components/Common';
import { recruitCardPaddingX } from '~/components/Recruit/RecruitCard/constants';
import { RecruitParts } from '~/services/recruit';
import { expandCss, flex, fontCss, palettes } from '~/styles/utils';

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
    <ScrollArea.Root
      className={className}
      css={[expandCss(`${recruitCardPaddingX}px`)]}
    >
      <ScrollArea.Viewport>
        <div css={[selfCss, { padding: '0 24px' }]}>
          {participants.map((participantsDetail) => (
            <RecruitCardParticipantsRow
              key={participantsDetail.recruitType}
              participantsDetail={participantsDetail}
            />
          ))}
        </div>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        orientation="horizontal"
        css={scrollAreaScrollbarCss}
      >
        <ScrollArea.Thumb css={scrollAreaThumbCss} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
const selfCss = css(flex('center', 'flex-start', 'row', 16));

const scrollAreaScrollbarCss = css({
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  padding: 2,
  backgroundColor: palettes.white2,
  overflow: 'hidden',
  transform: 'translate3d(0, 10px,0)',
  transition: 'background 160ms ease-out',
  '&:[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: 4,
  },
});

const scrollAreaThumbCss = css({
  backgroundColor: palettes.font.grey,
  borderRadius: 40,
  minHeight: 3,
});

interface RecruitCardParticipantsRowProps {
  participantsDetail: RecruitParticipantsDetailWithPart;
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

      <Avatar.Group overridableSize="md2" maxCount={maxParticipantsCount}>
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
