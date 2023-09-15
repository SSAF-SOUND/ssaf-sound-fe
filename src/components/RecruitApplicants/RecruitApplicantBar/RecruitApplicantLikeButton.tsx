import * as RadixToggle from '@radix-ui/react-toggle';
import { ClipLoader } from 'react-spinners';

import { Icon, IconButton } from '~/components/Common';
import { colorMix, palettes, Theme } from '~/styles/utils';

interface RecruitApplicantLikeButtonProps {
  liked?: boolean;
  onLikedChange?: (liked: boolean) => void;
  loading?: boolean;
}

export const RecruitApplicantLikeButton = (
  props: RecruitApplicantLikeButtonProps
) => {
  const { liked, onLikedChange, loading } = props;

  return (
    <IconButton asChild theme={Theme.RECRUIT} size={32} disabled={loading}>
      <RadixToggle.Root pressed={liked} onPressedChange={onLikedChange}>
        {loading ? (
          <ClipLoader
            size={24}
            color={colorMix('30%', palettes.recruit.light)}
          />
        ) : (
          <Icon
            name={liked ? 'heart' : 'heart.outlined'}
            size={24}
            color={palettes.recruit.default}
          />
        )}
      </RadixToggle.Root>
    </IconButton>
  );
};
