import type {
  LimitType,
  RecruitApplicant,
  RecruitDetail,
  RecruitMembers,
  RecruitParts,
} from '~/services/recruit';

import { css } from '@emotion/react';

import { RecruitApplicantsAccordion } from '~/components/RecruitApplicants';
import { RecruitApplicantBarList } from '~/components/RecruitApplicants/RecruitApplicantBarList';
import { RecruitApplicantsCount } from '~/components/RecruitApplicants/RecruitApplicantsCount';
import { RecruitMembersAvatars } from '~/components/RecruitApplicants/RecruitMembersAvatars';
import { MatchStatus, useRecruitMembers } from '~/services/recruit';
import { flex, fontCss, palettes } from '~/styles/utils';

import { RecruitApplicantsSortToggle } from '../RecruitApplicantsSortToggle';

interface RecruitApplicantsDetailProps {
  part: RecruitParts;
  recruitDetail: RecruitDetail;
  applicants: RecruitApplicant[];
}

export const RecruitApplicantsDetail = (
  props: RecruitApplicantsDetailProps
) => {
  const { part, applicants, recruitDetail } = props;
  const { data: recruitMembers, isLoading: isRecruitMembersLoading } =
    useRecruitMembers(recruitDetail.recruitId);

  const { limits } = recruitDetail;

  const limitInfo = limits.find(
    ({ recruitType }) => recruitType === part
  ) as LimitType;

  const { limit, currentNumber } = limitInfo;

  const unTouchedApplicants = applicants.filter(
    (applicant) =>
      applicant.matchStatus === MatchStatus.PENDING
  );
  const unTouchedApplicantsCount = unTouchedApplicants.length;

  const touchedApplicants = applicants.filter(
    (applicant) =>
      applicant.matchStatus !== MatchStatus.PENDING
  );

  return (
    <RecruitApplicantsAccordion.Item value={part} key={part}>
      <RecruitApplicantsAccordion.Trigger
        applicantsCount={unTouchedApplicantsCount}
      >
        {part}
      </RecruitApplicantsAccordion.Trigger>

      <RecruitApplicantsAccordion.Content>
        <div css={{ marginBottom: 52 }}>
          <p css={joinMemberCountCss}>
            {limit}명 중 {currentNumber}명 모집완료
          </p>

          {isRecruitMembersLoading ? (
            <RecruitMembersAvatars.Skeleton skeletonCount={limit} />
          ) : (
            recruitMembers && (
              <RecruitMembersAvatars
                limit={limit}
                recruitMembers={
                  recruitMembers.recruitTypes[part] ??
                  ([] as unknown as RecruitMembers)
                }
              />
            )
          )}
        </div>

        <div css={{ marginBottom: 52 }}>
          <RecruitApplicantsCount
            title="리쿠르팅 신청"
            count={unTouchedApplicantsCount}
          />

          {unTouchedApplicantsCount > 0 && (
            <div css={likeContainerCss}>
              <RecruitApplicantsSortToggle />
            </div>
          )}

          <RecruitApplicantBarList applicants={unTouchedApplicants} />
        </div>

        <div css={{ marginBottom: 40 }}>
          <RecruitApplicantsCount
            title="리쿠르팅 응답"
            count={touchedApplicants.length}
            css={{ marginBottom: 12 }}
          />

          <RecruitApplicantBarList applicants={touchedApplicants} />
        </div>
      </RecruitApplicantsAccordion.Content>
    </RecruitApplicantsAccordion.Item>
  );
};

const joinMemberCountCss = css(
  { color: palettes.recruit.default, marginBottom: 16 },
  fontCss.style.R12
);

const likeContainerCss = css(
  { marginBottom: 12 },
  flex('center', 'flex-end', 'row')
);
