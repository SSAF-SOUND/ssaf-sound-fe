import type { RecruitParticipantsDetail } from '~/services/recruit';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Avatar } from '~/components/Common';
import { classnames as avatarClassnames } from '~/components/Common/Avatar/classnames';
import { routes } from '~/utils';

interface RecruitMembersAvatarsProps {
  recruitMembers: RecruitParticipantsDetail;
  limit: number;
}

const RecruitMembersAvatarsComponent = (props: RecruitMembersAvatarsProps) => {
  const { recruitMembers, limit } = props;

  return (
    <Avatar.Group
      css={avatarGroupCss}
      visibleCount={limit}
      maxCount={limit}
      overridableSize="lg"
    >
      {recruitMembers?.members.map((userInfo) => (
        <Link
          key={userInfo.memberId}
          href={routes.profile.detail(userInfo.memberId)}
        >
          <Avatar size="lg" userInfo={userInfo} />
        </Link>
      ))}
    </Avatar.Group>
  );
};

interface RecruitMembersAvatarsSkeletonsProps {
  skeletonCount: number;
}

const RecruitMembersAvatarsSkeleton = (
  props: RecruitMembersAvatarsSkeletonsProps
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
  gap: 6,
  [`> .${avatarClassnames.avatar}`]: {
    marginLeft: 0,
  },
});

export const RecruitMembersAvatars = Object.assign(
  RecruitMembersAvatarsComponent,
  {
    Skeleton: RecruitMembersAvatarsSkeleton,
  }
);
