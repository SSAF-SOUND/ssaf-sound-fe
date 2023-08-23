import type {
  LimitType,
  RecruitApplicant,
  RecruitDetail,
  RecruitParts,
} from '~/services/recruit';

import { css } from '@emotion/react';

import { Avatar } from '~/components/Common';
import { classnames as avatarClassnames } from '~/components/Common/Avatar/classnames';
import {
  RecruitApplicantBar,
  RecruitApplicantsAccordion,
} from '~/components/RecruitApplicants';
import { MatchStatus, useRecruitMembers } from '~/services/recruit';
import { flex, fontCss, palettes } from '~/styles/utils';

import { RecruitApplicantSortToggle } from '../RecruitApplicantSortToggle';

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
      applicant.matchStatus === MatchStatus.WAITING_REGISTER_APPROVE
  );
  const unTouchedApplicantsCount = unTouchedApplicants.length;

  const touchedApplicants = applicants.filter(
    (applicant) =>
      applicant.matchStatus !== MatchStatus.WAITING_REGISTER_APPROVE
  );

  return (
    <RecruitApplicantsAccordion.Item value={part} key={part}>
      <RecruitApplicantsAccordion.Trigger
        applicantsCount={unTouchedApplicantsCount}
      >
        {part}
      </RecruitApplicantsAccordion.Trigger>
      <RecruitApplicantsAccordion.Content>
        <p css={joinMemberCountCss}>
          {limit}명 중 {currentNumber}명 모집완료
        </p>

        {isRecruitMembersLoading && (
          <RecruitMemberAvatarSkeletons skeletonCount={limit} />
        )}

        {recruitMembers && (
          <Avatar.Group
            css={avatarGroupCss}
            visibleCount={limit}
            maxCount={limit}
          >
            {recruitMembers.recruitTypes[part]?.members.map((userInfo) => (
              <Avatar size="lg" key={userInfo.memberId} userInfo={userInfo} />
            ))}
          </Avatar.Group>
        )}

        <p css={unTouchedApplicantsCountContainerCss}>
          <span>리쿠르팅 신청</span>
          <strong css={unTouchedApplicantsCountCss}>
            {unTouchedApplicantsCount}
          </strong>
        </p>

        <div css={likeContainerCss}>
          <RecruitApplicantSortToggle />
        </div>

        {/*  3개 보여주고 더보기 */}
        <div css={flex('', '', 'column', 12)}>
          <RecruitApplicantBar applicant={applicants[0]} />
          <RecruitApplicantBar applicant={applicants[1]} />
          <RecruitApplicantBar applicant={applicants[2]} />
          <RecruitApplicantBar applicant={applicants[3]} />
        </div>
      </RecruitApplicantsAccordion.Content>
    </RecruitApplicantsAccordion.Item>
  );
};

const joinMemberCountCss = css(
  { color: palettes.recruit.default, marginBottom: 16 },
  fontCss.style.R12
);

const unTouchedApplicantsCountContainerCss = css(
  fontCss.style.B18,
  flex('center', '', 'row', 4)
);

const unTouchedApplicantsCountCss = css({ color: palettes.recruit.default });

const likeContainerCss = css(
  { marginBottom: 12 },
  flex('center', 'flex-end', 'row')
);

interface RecruitMemberAvatarSkeletonsProps {
  skeletonCount: number;
}

const RecruitMemberAvatarSkeletons = (
  props: RecruitMemberAvatarSkeletonsProps
) => {
  const { skeletonCount } = props;

  return (
    <Avatar.Group
      visibleCount={skeletonCount}
      maxCount={skeletonCount}
      css={avatarGroupCss}
    >
      {Array(skeletonCount)
        .fill(undefined)
        .map((_, index) => (
          <Avatar.Skeleton key={index} size="lg" />
        ))}
    </Avatar.Group>
  );
};

const avatarGroupCss = css({
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  marginBottom: 52,
  gap: 4,
  [`> .${avatarClassnames.avatar}`]: {
    marginLeft: 0,
  },
});
