import { css } from '@emotion/react';
import { memo } from 'react';

import { Button } from '~/components/Common/Button';
import { flex, fontCss } from '~/styles/utils';

interface RecruitFilterFieldTitleBarProps {
  title: string;
  onClickReset: () => void;
  className?: string;
}

export const RecruitFilterFieldTitleBar = memo(
  (props: RecruitFilterFieldTitleBarProps) => {
    const { title, className, onClickReset } = props;
    return (
      <div css={selfCss} className={className}>
        <h3 css={fontCss.style.B16}>{title}</h3>
        <Button variant="literal" css={resetButtonCss} onClick={onClickReset}>
          선택 초기화
        </Button>
      </div>
    );
  }
);
RecruitFilterFieldTitleBar.displayName = 'RecruitFilterFieldTitleBar';

const selfCss = css(
  { marginBottom: 16 },
  flex('center', 'space-between', 'row', 12)
);

const resetButtonCss = css(fontCss.style.R14, {
  textDecoration: 'underline',
  height: 24
});
