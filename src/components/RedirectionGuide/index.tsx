import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Button, SsafyIcon, TrackSize } from '~/components/Common';
import { flex, fontCss, themeColorVars } from '~/styles/utils';

type RedirectionGuideTheme = 'primary' | 'secondary';

interface RedirectionGuideProps {
  theme?: RedirectionGuideTheme;
  title: ReactNode;
  description: ReactNode;
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
    minHeight: '100vh',
    height: 'max-content',
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
