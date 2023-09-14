import AvatarGroup from './AvatarGroup';
import AvatarSkeleton from './AvatarSkeleton';
import SingleAvatar from './SingleAvatar';

export const Avatar = Object.assign(SingleAvatar, {
  Group: AvatarGroup,
  Skeleton: AvatarSkeleton,
});
