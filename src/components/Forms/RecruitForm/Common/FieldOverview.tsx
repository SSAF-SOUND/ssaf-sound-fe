import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

interface FieldOverviewProps {
  className?: string;
  children: ReactNode;
}

const FieldOverview = (props: FieldOverviewProps) => {
  return <h3 css={selfCss} {...props} />;
};

export default FieldOverview;

const selfCss = css(
  {
    marginBottom: 8,
    color: palettes.font.blueGrey,
  },
  fontCss.style.R14
);
