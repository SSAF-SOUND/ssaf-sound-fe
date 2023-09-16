import type { UserInfo } from '~/services/member';
import type {
  RecruitApplicant,
  RecruitDetail,
  RecruitParticipantsDetail,
  RecruitParticipantsProgress,
  RecruitParts,
} from '~/services/recruit';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { useModal } from '~/components/GlobalModal';
import { RecruitApplicantsAccordion } from '~/components/RecruitApplicants';
import { RecruitApplicantBarList } from '~/components/RecruitApplicants/RecruitApplicantBarList';
import { RecruitApplicantsCount } from '~/components/RecruitApplicants/RecruitApplicantsCount';
import { RecruitMembersAvatars } from '~/components/RecruitApplicants/RecruitMembersAvatars';
import { MatchStatus, useRecruitParticipants } from '~/services/recruit';
import { useExcludeRecruitParticipant } from '~/services/recruit/hooks/useExcludeRecruitParticipant';
import { fontCss, palettes } from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';

interface RecruitApplicantsDetailProps {
  part: RecruitParts;
  recruitDetail: RecruitDetail;
  applicants: RecruitApplicant[];
}

export const RecruitApplicantsDetail = (
  props: RecruitApplicantsDetailProps
) => {
  const router = useRouter();
  const { part, applicants, recruitDetail } = props;
  const { data: recruitParticipants, isLoading: isRecruitMembersLoading } =
    useRecruitParticipants(recruitDetail.recruitId);
  const { openModal, closeModal } = useModal();

  const { limits, recruitId, mine } = recruitDetail;
  const { mutateAsync: excludeRecruitParticipant } =
    useExcludeRecruitParticipant(recruitId);

  const limitInfo = limits.find(
    ({ recruitType }) => recruitType === part
  ) as RecruitParticipantsProgress;

  const { limit, currentNumber } = limitInfo;

  const pendingApplicants = applicants.filter(
    (applicant) => applicant.matchStatus === MatchStatus.PENDING
  );

  const pendingApplicantsCount = pendingApplicants.length;

  const handleOpenRecruitParticipantModal = (params: {
    userInfo: UserInfo;
    recruitApplicationId: number;
  }) => {
    const { userInfo, recruitApplicationId } = params;

    openModal('recruitParticipantDetail', {
      userInfo,
      showPrivateButtons: mine,
      onClickUserProfileLink: () => {
        router.push(routes.profile.detail(userInfo.memberId));
        closeModal();
      },
      onClickRecruitApplicationLink: () => {
        router.push(
          routes.recruit.applications.detail({
            recruitId,
            recruitApplicationId,
          })
        );
        closeModal();
      },
      onClickClose: closeModal,
      onClickExcludeRecruitParticipant: async () => {
        try {
          await excludeRecruitParticipant(userInfo.memberId);
          closeModal();
        } catch (err) {
          handleAxiosError(err);
        }
      },
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

          {isRecruitMembersLoading ? (
            <RecruitMembersAvatars.Skeleton skeletonCount={limit} />
          ) : (
            recruitParticipants && (
              <RecruitMembersAvatars
                onClickAvatar={handleOpenRecruitParticipantModal}
                limit={limit}
                recruitMembers={
                  (recruitParticipants[part] as RecruitParticipantsDetail) ?? []
                }
              />
            )
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
            href={routes.recruit.applications.reject(recruitId)}
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
