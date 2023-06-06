import type { ProgressBarProps } from '../Common/ProgressBar';

import { css } from '@emotion/react';

import { ProgressBar } from '../Common';

interface Props extends ProgressBarProps {}
const LikeProgress = (props: Props) => {
  const { now } = props;
  return (
    <div css={selfCss}>
      <span css={textCss}>{now}명이 좋아합니다.</span>
      <ProgressBar
        now={now}
        backgroundColor="#F9F9F9"
        foregroundColor="#9ADFA1"
      />
    </div>
  );
};

const selfCss = css({
  margin: '25px 18px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

const textCss = css({
  fontSize: '14px',
  lineHeight: '20px',
  color: '#fff',
});

export default LikeProgress;
