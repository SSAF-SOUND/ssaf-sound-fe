import { css } from '@emotion/react';

import { AlertText, SsafyIcon, TrackSize } from '~/components/Common';
import { flex } from '~/styles/utils';

export interface LunchErrorIndicatorProps {
  message?: string;
  className?: string;
}

export const LunchErrorIndicator = (props: LunchErrorIndicatorProps) => {
  const {
    message = '점심 데이터를 불러오는 중 오류가 발생했습니다.',
    className,
  } = props;
  return (
    <div css={selfCss} className={className}>
      <SsafyIcon.Track size={TrackSize.LG2} />
      <AlertText size="lg" bold>
        {message}
      </AlertText>
    </div>
  );
};

const selfCss = css(flex('center', 'center', 'column', 24));
