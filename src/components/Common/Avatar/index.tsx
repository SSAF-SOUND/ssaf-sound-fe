import AvatarGroup from './AvatarGroup';
import AvatarSkeleton from './AvatarSkeleton';
import SingleAvatar from './SingleAvatar';

const Avatar = Object.assign(SingleAvatar, {
  Group: AvatarGroup,
  Skeleton: AvatarSkeleton,
});

export default Avatar;
