import { Icon, IconButton } from '~/components/Common';
import { palettes, Theme } from '~/styles/utils';

interface RecruitLikeButtonProps {
  liked: boolean;
}
export const RecruitLikeButton = (props: RecruitLikeButtonProps) => {
  const { liked } = props;

  return (
    <IconButton size={32} theme={Theme.RECRUIT}>
      <Icon
        size={24}
        name={`${liked ? 'heart' : 'heart.outlined'}`}
        color={palettes.recruit.default}
      />
    </IconButton>
  );
};
