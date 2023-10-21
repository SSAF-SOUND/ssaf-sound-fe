import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { breadcrumbsHeight } from '~/components/BreadCrumbs';
import { titleBarHeight } from '~/styles/utils';

interface RecruitDetailLayoutProps {
  children: ReactNode;
  className?: string;
}

export const RecruitDetailLayout = (props: RecruitDetailLayoutProps) => {
  return <div css={selfCss} {...props} />;
};

const selfPaddingY = titleBarHeight + breadcrumbsHeight + 12;
const selfCss = css({
  padding: `${selfPaddingY}px 0`,
});
