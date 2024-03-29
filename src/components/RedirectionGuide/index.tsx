import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '~/components/Common/Button';
import { SsafyIcon, TrackSize } from '~/components/Common/SsafyIcon';
import { flex, fontCss, pageCss, themeColorVars } from '~/styles/utils';

type RedirectionGuideTheme = 'primary' | 'secondary';

interface RedirectionGuideProps {
  className?: string;
  theme?: RedirectionGuideTheme;
  /** 여러 줄을 사용하고 싶은 경우엔, `React.Fragment`와 `p`엘리먼트를 사용해서 전달 */
  title: ReactNode;
  /** 여러 줄을 사용하고 싶은 경우엔, `React.Fragment`와 `p`엘리먼트를 사용해서 전달 */
  description: ReactNode;
  /** 기본값은 `<SsafyIcon.Track name="fallback" size={TrackSize.LG2} />`의 */
  indicator?: ReactNode;
  redirectionTo?: LinkProps['href'];
  redirectionText?: string;

  /** 이 prop을 명시하면 redirectionTo, redirectionText는 사용되지 않습니다. */
  customLinkElements?: ReactNode;
}

const RedirectionGuide = (props: RedirectionGuideProps) => {
  const {
    className,
    theme = 'primary',
    title,
    description,
    redirectionTo,
    redirectionText = '',
    customLinkElements,
    indicator = <SsafyIcon.Track size={TrackSize.LG2} theme={theme} />,
  } = props;

  return (
    <div css={selfCss} className={className}>
      <div css={topContainerCss}>
        <h2 css={titleCss} data-theme={theme}>
          {title}
        </h2>
        {indicator}
        <div css={descriptionCss}>{description}</div>
      </div>
      <div css={bottomContainerCss}>
        {!customLinkElements && redirectionTo && (
          <Button asChild size="lg" theme={theme}>
            <Link href={redirectionTo}>{redirectionText}</Link>
          </Button>
        )}
        {customLinkElements}
      </div>
    </div>
  );
};

export default RedirectionGuide;

const selfCss = css(
  { height: '100vh' },
  pageCss.minHeight,
  flex('center', 'space-between')
);

const topContainerCss = css(
  { flexGrow: 1 },
  flex('center', 'center', 'column', 34)
);
const bottomContainerCss = css({ width: '100%', padding: 25 });

const descriptionCss = css({ textAlign: 'center' }, fontCss.style.R14);

const titleCss = css(
  { color: themeColorVars.mainColor.var },
  fontCss.style.B28
);
