import { css } from '@emotion/react';

import { AlertText } from '~/components/Common/AlertText';
import { SsafyIcon, TrackSize } from '~/components/Common/SsafyIcon';
import { flex, fontCss, position } from '~/styles/utils';

interface NoSearchResultsProps {
  withKeyword?: boolean;
  keyword?: string;
  className?: string;
  description?: string;
}

const NoSearchResults = (props: NoSearchResultsProps) => {
  const {
    withKeyword = true,
    keyword = '',
    description = '검색된 결과가 없습니다.',
    className,
  } = props;

  return (
    <div css={selfCss} className={className}>
      {withKeyword && (
        <p css={[fontCss.style.R18, { marginBottom: 60 }]}>
          {"'"}
          {keyword}
          {"'"} 검색 결과
        </p>
      )}
      <div css={indicatorCss}>
        <SsafyIcon.Track size={TrackSize.LG1} />
        <AlertText size="sm" bold>
          {description}
        </AlertText>
      </div>
    </div>
  );
};

export default NoSearchResults;

const selfCss = css(
  { padding: '80px 0' },
  flex('center', 'center', 'column'),
  position.xy('center', 'center', 'absolute')
);
const indicatorCss = css(flex('', '', 'column', 40));
