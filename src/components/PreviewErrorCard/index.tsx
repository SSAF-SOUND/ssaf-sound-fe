import { css } from '@emotion/react';

import { Button } from '~/components/Common';
import { flex, palettes } from '~/styles/utils';

interface PreviewErrorCardProps {
  className?: string;
  onClickRetry: () => void;
}

export const PreviewErrorCard = (props: PreviewErrorCardProps) => {
  const { className, onClickRetry } = props;
  return (
    <div css={selfCss} className={className}>
      <p css={{ marginBottom: 12 }}>오류가 발생했습니다.</p>
      <Button
        theme="error"
        css={{ width: 130, color: palettes.white }}
        onClick={onClickRetry}
      >
        재시도
      </Button>
    </div>
  );
};

const selfCss = css({ width: '100%', height: 140 }, flex('center', 'center'));
