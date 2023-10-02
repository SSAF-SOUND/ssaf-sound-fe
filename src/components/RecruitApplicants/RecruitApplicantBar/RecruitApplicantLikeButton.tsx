import * as RadixToggle from '@radix-ui/react-toggle';
import { ClipLoader } from 'react-spinners';

import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { colorMix, palettes, Theme } from '~/styles/utils';

interface RecruitApplicantLikeButtonProps {
  liked?: boolean;
  onLikedChange?: (liked: boolean) => void;
  loading?: boolean;
  showLoadingSpinner?: boolean;
}

export const RecruitApplicantLikeButton = (
  props: RecruitApplicantLikeButtonProps
) => {
  const { liked, onLikedChange, loading, showLoadingSpinner = true } = props;

  return (
    <IconButton asChild theme={Theme.RECRUIT} size={32} disabled={loading}>
      <RadixToggle.Root pressed={liked} onPressedChange={onLikedChange}>
        {loading ? (
          showLoadingSpinner ? (
            <ClipLoader
              size={24}
              color={colorMix('30%', palettes.recruit.default)}
            />
          ) : (
            <Icon
              name={liked ? 'heart' : 'heart.outlined'}
              size={24}
              color={colorMix('40%', palettes.recruit.default)}
            />
          )
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
