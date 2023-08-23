import { css } from '@emotion/react';

import { Toggle } from '~/components/Common';
import { fontCss } from '~/styles/utils';

interface RecruitApplicantsPinToggleProps {
  onPressedChange?: (pressed: boolean) => void;
  pressed?: boolean;
  defaultPressed?: boolean;
}

export const RecruitApplicantLikeToggle = (
  props: RecruitApplicantsPinToggleProps
) => {
  return (
    <Toggle
      css={selfCss}
      thumbSize={24}
      textWidth={48}
      text="하트"
      theme="recruit"
      {...props}
    />
  );
};

const selfCss = css({ padding: '3px 4px' }, fontCss.style.B14);
