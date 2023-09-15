import type { RecruitApplicant } from '~/services/recruit';

import Link from 'next/link';

import { css } from '@emotion/react';
import { memo } from 'react';

import { Avatar, Icon, IconButton } from '~/components/Common';
import { FullDateTime } from '~/components/FullDateTime';
import { RecruitApplicantLikeButton } from '~/components/RecruitApplicants/RecruitApplicantBar/RecruitApplicantLikeButton';
import { flex, fontCss, inlineFlex, lineClamp } from '~/styles/utils';
import { routes } from '~/utils';

export interface RecruitApplicantBar {
  recruitId: number;
  applicant: RecruitApplicant;
}

export const RecruitApplicantBar = memo((props: RecruitApplicantBar) => {
  const { applicant, recruitId } = props;

  const { author, liked, appliedAt, reply, recruitApplicationId } = applicant;

  const { nickname } = author;

  // 지원자에게 어떤 방식으로든 응답이 된 상태

  return (
    <li css={selfCss}>
      <div css={applicantHeaderCss}>
        <RecruitApplicantLikeButton
          liked={liked}
          onLikedChange={(v) => console.log(v)}
        />
      </div>

      <div css={applicantInfoContainerCss}>
        <Avatar size="lg" css={{ flexShrink: 0 }} userInfo={author} />

        <div css={applicantInfoDetailContainerCss}>
          <div css={applicantInfoDetailCss}>
            <div css={applicantInfoDescriptionCss}>
              <p css={applicantInfoDescriptionHeaderCss}>
                {nickname}님의 리쿠르팅 신청
              </p>
              <p css={applicantInfoDescriptionReplyCss}>{reply}</p>
            </div>

            <div css={applicantInfoLinkCss}>
              {/* <Dot theme="recruit" /> */}
              <IconButton size={32} asChild>
                {/* NOTE: 현 유저의 신청 내역으로 이동 */}
                <Link
                  href={routes.recruit.applications.detail({
                    recruitId,
                    recruitApplicationId,
                  })}
                >
                  <Icon name="chevron.right" size={24} />
                </Link>
              </IconButton>
            </div>
          </div>

          <FullDateTime dateTimeString={appliedAt} />
        </div>
      </div>
    </li>
  );
});

RecruitApplicantBar.displayName = 'RecruitApplicantBar';

const selfCss = css(flex('center', '', 'row', 10));
const applicantHeaderCss = css(
  { width: 46, flexShrink: 0 },
  inlineFlex('center', 'center')
);

const applicantInfoContainerCss = css(
  { width: '100%' },
  flex('center', '', 'row', 16)
);
const applicantInfoDetailContainerCss = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 100%)',
  gridTemplateRows: 'auto',
  gridAutoRows: 'auto',
  width: '100%',
  rowGap: 6,
});
const applicantInfoDetailCss = css(flex('center', 'space-between', 'row', 12));

const applicantInfoDescriptionCss = css({
  // 내부 콘텐츠의 text `ellipsis`를 위해서 필요
  // `break`되지 않으면 `ellipsis`가 보이지 않음.
  overflow: 'hidden',
  wordBreak: 'break-word',
});

const applicantInfoDescriptionHeaderCss = css(
  fontCss.family.auto,
  fontCss.style.B16,
  lineClamp(1)
);

const applicantInfoDescriptionReplyCss = css(
  fontCss.family.auto,
  fontCss.style.B12,
  lineClamp(1)
);

const applicantInfoLinkCss = css({}, flex('center', '', 'row', 6));
