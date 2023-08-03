import { css } from '@emotion/react';

import { AlertText, SsafyIcon, TrackSize } from '~/components/Common';
import { flex, fontCss } from '~/styles/utils';

interface NoSearchResultsProps {
  keyword?: string;
}

const NoSearchResults = (props: NoSearchResultsProps) => {
  const { keyword = '' } = props;
  return (
    <div css={selfCss}>
      <p css={[fontCss.style.R18, { marginBottom: 'max(20vh, 120px)' }]}>
        {keyword} 검색 결과
      </p>
      <div css={indicatorCss}>
        <SsafyIcon.Track size={TrackSize.LG2} />
        <AlertText size="lg" bold>
          검색된 결과가 없습니다.
        </AlertText>
      </div>
    </div>
  );
};

export default NoSearchResults;

const selfCss = css(flex('center', 'center', 'column'));
const indicatorCss = css(flex('', '', 'column', 20));
