import AvatarGroup from './AvatarGroup';
import SingleAvatar from './SingleAvatar';

const Avatar = Object.assign(SingleAvatar, {
  Group: AvatarGroup,
});

export default Avatar;
