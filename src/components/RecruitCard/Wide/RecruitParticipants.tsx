import type { RecruitParticipant } from '~/services/recruit';

import { css } from '@emotion/react';

import { Avatar } from '~/components/Common';
import { flex, fontCss } from '~/styles/utils';

interface RecruitParticipants {
  participants: RecruitParticipant[];
}

const RecruitParticipants = (props: RecruitParticipants) => {
  const { participants } = props;

  const isSingleParticipants = participants.length === 1;

  return (
    <div css={[flex('', '', 'row', 6)]}>
      {participants.map((participant) => (
        <RecruitAvatars
          {...participant}
          key={participant.recruitType}
          withLabel={!isSingleParticipants}
        />
      ))}
    </div>
  );
};

interface RecruitAvatarsProps extends RecruitParticipant {
  withLabel?: boolean;
}

const RECRUIT_TYPE_TEXT = {
  프론트엔드: 'F',
  백엔드: 'B',
  '기획/디자인': 'P',
};

const RecruitAvatars = (props: RecruitAvatarsProps) => {
  const { withLabel = false, recruitType, limit, members } = props;

  return (
    <div css={selfCss}>
      {withLabel && (
        <label css={textCss}>{RECRUIT_TYPE_TEXT[recruitType]}</label>
      )}
      <Avatar.Group maxCount={limit} visibleCount={limit >= 4 ? 4 : limit}>
        {members.map((member) => (
          <Avatar
            size="md2"
            key={member.nickName}
            userInfo={{
              nickname: member.nickName,
              isMajor: member.major,
            }}
          />
        ))}
      </Avatar.Group>
    </div>
  );
};

const selfCss = css(flex('center', '', 'row', 8));
const textCss = css(fontCss.family.auto, fontCss.style.B14);

export default RecruitParticipants;
