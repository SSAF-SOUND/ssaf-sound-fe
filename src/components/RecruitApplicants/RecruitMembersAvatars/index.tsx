import type { RecruitParticipantsDetail , RecruitParticipantUserInfo } from '~/services/recruit';

import { css } from '@emotion/react';

import { Avatar } from '~/components/Common';
import { classnames as avatarClassnames } from '~/components/Common/Avatar/classnames';
import { palettes } from '~/styles/utils';

type OnClickAvatar = (params: {
  recruitApplicationId: number;
  userInfo: RecruitParticipantUserInfo;
}) => void;

interface RecruitMembersAvatarsProps {
  recruitMembers: RecruitParticipantsDetail;
  limit: number;
  onClickAvatar: OnClickAvatar;
}

const RecruitMembersAvatarsComponent = (props: RecruitMembersAvatarsProps) => {
  const { recruitMembers, limit, onClickAvatar } = props;

  return (
    <Avatar.Group
      css={avatarGroupCss}
      visibleCount={limit}
      maxCount={limit}
      overridableSize="lg"
    >
      {recruitMembers?.members.map((userInfo) => (
        // TODO: recruitApplicationId Type  추가
        <button
          onClick={() => onClickAvatar({ userInfo, recruitApplicationId: 1 })}
          css={avatarButtonCss}
          type="button"
          key={userInfo.memberId}
        >
          <Avatar size="lg" userInfo={userInfo} />
        </button>
      ))}
    </Avatar.Group>
  );
};

const avatarButtonCss = css({
  background: 'inherit',
  padding: 0,
  cursor: 'pointer',
  borderRadius: '50%',
  ':focus-visible': {
    outline: `3px solid ${palettes.primary.default}`,
  },
});

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
