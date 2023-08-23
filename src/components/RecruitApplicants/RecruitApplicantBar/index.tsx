import type { RecruitApplicant } from '~/services/recruit';

import { css } from '@emotion/react';

import { Avatar, Dot, Icon, IconButton } from '~/components/Common';
import { flex, fontCss, lineClamp, palettes } from '~/styles/utils';
import { formatFullDate } from '~/utils';

import { RecruitApplicantBarHeader } from './RecruitApplicantBarHeader';

export interface RecruitApplicantBar {
  applicant: RecruitApplicant;
}

export const RecruitApplicantBar = (props: RecruitApplicantBar) => {
  const { applicant } = props;

  const { author, liked, appliedAt, matchStatus, reply } = applicant;

  const { nickname } = author;
  const date = formatFullDate(appliedAt);

  return (
    <li css={selfCss}>
      <RecruitApplicantBarHeader matchStatus={matchStatus} liked={liked} />

      <div css={applicantInfoContainerCss}>
        <Avatar size="lg" userInfo={author} />

        <div css={applicantInfoDetailContainerCss}>
          <div css={applicantInfoDetailCss}>
            <div>
              <p css={applicantInfoHeaderCss}>{nickname}님의 리쿠르팅 신청</p>
              <p css={applicantInfoReplyCss}>{reply}</p>
            </div>
            <div css={applicantInfoLinkCss}>
              <Dot theme="recruit" />
              <IconButton size={32}>
                <Icon name="chevron.right" size={24} />
              </IconButton>
            </div>
          </div>

          <time dateTime={date} css={dateCss}>
            {date}
          </time>
        </div>
      </div>
    </li>
  );
};

const selfCss = css(flex('center', '', 'row', 10));
const applicantInfoContainerCss = css(
  { flexGrow: 1 },
  flex('center', 'space-between', 'row', 16)
);
const applicantInfoDetailCss = css(flex('center', 'space-between', 'row', 12));
const applicantInfoDetailContainerCss = css(
  { flexGrow: 1 },
  flex('', 'flex-start')
);

const applicantInfoHeaderCss = css(
  fontCss.family.auto,
  fontCss.style.B16,
  lineClamp(1)
);

const applicantInfoReplyCss = css(
  fontCss.family.auto,
  fontCss.style.B12,
  lineClamp(1)
);

const applicantInfoLinkCss = css({}, flex('center', 'center', 'row', 6));

const dateCss = css(fontCss.family.auto, fontCss.style.R12, {
  color: palettes.font.blueGrey,
});
