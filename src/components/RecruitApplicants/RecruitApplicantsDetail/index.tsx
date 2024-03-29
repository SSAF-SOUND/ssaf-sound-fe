import type {
  RecruitApplicant,
  RecruitDetail,
  RecruitParticipantsDetail,
  RecruitParticipantsProgress,
  RecruitParts,
  RecruitParticipantUserInfo,
} from '~/services/recruit';

import Link from 'next/link';

import { css } from '@emotion/react';

import { useModal } from '~/components/GlobalModal';
import { RecruitApplicantsAccordion } from '~/components/RecruitApplicants';
import { RecruitApplicantBarList } from '~/components/RecruitApplicants/RecruitApplicantBarList';
import { RecruitApplicantsCount } from '~/components/RecruitApplicants/RecruitApplicantsCount';
import { RecruitMembersAvatars } from '~/components/RecruitApplicants/RecruitMembersAvatars';
import { MatchStatus, useRecruitParticipants } from '~/services/recruit';
import { fontCss, palettes } from '~/styles/utils';
import { routes } from '~/utils';

interface RecruitApplicantsDetailProps {
  part: RecruitParts;
  recruitDetail: RecruitDetail;
  applicants: RecruitApplicant[];
}

export const RecruitApplicantsDetail = (
  props: RecruitApplicantsDetailProps
) => {
  const { part, applicants, recruitDetail } = props;
  const { openModal, closeModal } = useModal();

  const { limits, recruitId } = recruitDetail;

  const {
    data: recruitParticipants,
    isLoading: isRecruitParticipantsLoading,
    isError: isRecruitParticipantsError,
    isSuccess: isRecruitParticipantsSuccess,
  } = useRecruitParticipants(recruitId);

  const limitInfo = limits.find(
    ({ recruitType }) => recruitType === part
  ) as RecruitParticipantsProgress;

  const { limit, currentNumber } = limitInfo;

  const pendingApplicants = applicants.filter(
    (applicant) => applicant.matchStatus === MatchStatus.PENDING
  );

  const pendingApplicantsCount = pendingApplicants.length;

  const handleOpenRecruitParticipantDetailModal = (
    targetUserInfo: RecruitParticipantUserInfo
  ) => {
    openModal('recruitParticipantDetail', {
      recruitDetail: recruitDetail,
      userInfo: targetUserInfo,
      onClickClose: closeModal,
    });
  };

  return (
    <RecruitApplicantsAccordion.Item value={part} key={part}>
      <RecruitApplicantsAccordion.Trigger
        applicantsCount={pendingApplicantsCount}
      >
        {part}
      </RecruitApplicantsAccordion.Trigger>

      <RecruitApplicantsAccordion.Content>
        <div css={{ marginBottom: 52 }}>
          <p css={joinMemberCountCss}>
            {limit}명 중 {currentNumber}명 모집완료
          </p>

          {isRecruitParticipantsLoading && (
            <RecruitMembersAvatars.Skeleton skeletonCount={limit} />
          )}

          {isRecruitParticipantsError && (
            <div css={[fontCss.style.R14, { textAlign: 'center' }]}>
              참여자 목록을 불러오는데 실패했습니다.
            </div>
          )}

          {isRecruitParticipantsSuccess && (
            <RecruitMembersAvatars
              onClickAvatar={handleOpenRecruitParticipantDetailModal}
              limit={limit}
              recruitMembers={
                (recruitParticipants[part] as RecruitParticipantsDetail) ?? []
              }
            />
          )}
        </div>
        <div css={{ marginBottom: 52 }}>
          <RecruitApplicantsCount
            title="리쿠르팅 신청"
            count={pendingApplicantsCount}
          />

          <RecruitApplicantBarList
            recruitPart={part}
            recruitId={recruitId}
            applicants={pendingApplicants}
          />
        </div>

        <div css={{ textAlign: 'right', marginBottom: 52 }}>
          <Link
            css={[{ textDecoration: 'underline' }, fontCss.style.R14]}
            href={routes.recruit.applications.rejected(recruitId)}
          >
            거절한 리쿠르팅 보기
          </Link>
        </div>
      </RecruitApplicantsAccordion.Content>
    </RecruitApplicantsAccordion.Item>
  );
};

const joinMemberCountCss = css(
  { color: palettes.recruit.default, marginBottom: 16 },
  fontCss.style.R12
);
