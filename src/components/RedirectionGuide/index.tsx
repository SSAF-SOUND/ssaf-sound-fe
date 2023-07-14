import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Button, SsafyIcon, TrackSize } from '~/components/Common';
import { flex, fontCss, pageMinHeight, themeColorVars } from '~/styles/utils';

type RedirectionGuideTheme = 'primary' | 'secondary';

interface RedirectionGuideProps {
  theme?: RedirectionGuideTheme;
  /** 여러 줄을 사용하고 싶은 경우엔, `React.Fragment`와 `p`엘리먼트를 사용해서 전달 */
  title: ReactNode;
  /** 여러 줄을 사용하고 싶은 경우엔, `React.Fragment`와 `p`엘리먼트를 사용해서 전달 */
  description: ReactNode;
  /** 기본값은 `<SsafyIcon.Track name="fallback" size={TrackSize.LG2} />`의 */
  indicator?: ReactNode;
  redirectionTo: LinkProps['href'];
  redirectionText: string;
}

const RedirectionGuide = (props: RedirectionGuideProps) => {
  const {
    theme = 'primary',
    title,
    description,
    redirectionTo,
    redirectionText,
    indicator = <SsafyIcon.Track size={TrackSize.LG2} theme={theme} />,
  } = props;

  return (
    <div css={selfCss}>
      <div css={topContainerCss}>
        <h2 css={titleCss} data-theme={theme}>
          {title}
        </h2>
        {indicator}
        <div css={descriptionCss}>{description}</div>
      </div>
      <div css={bottomContainerCss}>
        <Button asChild size="lg" theme={theme}>
          <Link href={redirectionTo}>{redirectionText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default RedirectionGuide;

const selfCss = css(
  {
    minHeight: pageMinHeight,
    height: '100vh',
  },
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
