import { css } from '@emotion/react';

import { AlertText, SsafyIcon, TrackSize } from '~/components/Common';
import { flex } from '~/styles/utils';

export interface ErrorMessageWithSsafyIconProps {
  className?: string;
  message: string;
  iconSize?: TrackSize;
  textSize?: 'sm' | 'md' | 'lg';
}

export const ErrorMessageWithSsafyIcon = (
  props: ErrorMessageWithSsafyIconProps
) => {
  const { className, message, iconSize = TrackSize.LG2, textSize } = props;

  return (
    <div css={selfCss} className={className}>
      <SsafyIcon.Track size={iconSize} />
      <AlertText size={textSize} bold>
        {message}
      </AlertText>
    </div>
  );
};

const selfCss = css(flex('center', 'center', 'column', 24));
