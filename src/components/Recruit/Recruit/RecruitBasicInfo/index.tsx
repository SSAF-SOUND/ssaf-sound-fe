import type { ReactNode } from 'react';
import type { IconNames } from '~/components/Common';
import type { RecruitDetail } from '~/services/recruit';

import { css } from '@emotion/react';

import { Icon } from '~/components/Common';
import { RecruitSkillInfo } from '~/components/Recruit/Recruit/RecruitBasicInfo/RecruitSkillInfo';
import { flex, fontCss, palettes } from '~/styles/utils';

import { RecruitDateInfo } from './RecruitDateInfo';
import { RecruitParticipantsInfo } from './RecruitParticipantsInfo';

export interface RecruitBasicInfoProps {
  className?: string;
  recruitDetail: RecruitDetail;
}

export const RecruitBasicInfo = (props: RecruitBasicInfoProps) => {
  const { recruitDetail, ...restProps } = props;
  const {
    limits: participantsInfoList,
    recruitStart,
    recruitEnd,
    skills,
  } = recruitDetail;

  return (
    <div css={selfCss} {...restProps}>
      <RecruitBasicInfoRow iconName="group" rowTitle="모집 인원">
        {participantsInfoList.map((participantsInfo, index, array) => (
          <RecruitParticipantsInfo
            key={participantsInfo.recruitType}
            participantsInfo={participantsInfo}
            isLastInfo={array.length - 1 === index}
          />
        ))}
      </RecruitBasicInfoRow>

      <RecruitBasicInfoRow iconName="calendar" rowTitle="모집 기간">
        <RecruitDateInfo startDate={recruitStart} endDate={recruitEnd} />
      </RecruitBasicInfoRow>

      <RecruitBasicInfoRow iconName="skill" rowTitle="기술 스택">
        <RecruitSkillInfo skills={skills.map(({ name }) => name)} />
      </RecruitBasicInfoRow>
    </div>
  );
};

const selfCss = css(
  { padding: '16px 20px', backgroundColor: palettes.background.grey },
  flex('', '', 'column', 8)
);

interface RecruitBasicInfoRowProps {
  iconName: IconNames;
  rowTitle?: string;
  children?: ReactNode;
}

const RecruitBasicInfoRow = (props: RecruitBasicInfoRowProps) => {
  const { rowTitle, iconName, children } = props;

  return (
    <div css={recruitBasicInfoRowSelfCss}>
      <Icon name={iconName} size={16} label={rowTitle} />
      <div css={recruitBasicInfoRowTextCss}>
        <h3 css={recruitBasicInfoRowTitleCss}>{rowTitle}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

const recruitBasicInfoRowSelfCss = css(flex('center', 'flex-start', 'row', 6));

const recruitBasicInfoRowTextCss = css(
  { color: palettes.white },
  fontCss.style.B14,
  flex('center', 'flex-start', 'row', 24)
);

const recruitBasicInfoRowTitleCss = css({ width: 60, flexShrink: 0 });
