import * as RadixToggle from '@radix-ui/react-toggle';

import { Icon, IconButton } from '~/components/Common';
import { palettes } from '~/styles/utils';

interface RecruitApplicantLikeButtonProps {
  liked?: boolean;
  onLikedChange?: (liked: boolean) => void;
}

export const RecruitApplicantLikeButton = (
  props: RecruitApplicantLikeButtonProps
) => {
  const { liked, onLikedChange } = props;

  return (
    <IconButton asChild theme="recruit" size={32}>
      <RadixToggle.Root pressed={liked} onPressedChange={onLikedChange}>
        <Icon
          name={liked ? 'heart' : 'heart.outlined'}
          size={24}
          color={palettes.recruit.default}
        />
      </RadixToggle.Root>
    </IconButton>
  );
};
