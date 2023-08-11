import type { ReactNode } from 'react';

import { css } from '@emotion/react';

import { VisuallyHidden } from '~/components/Common';
import { globalVars, pageMaxWidth, pageMinWidth } from '~/styles/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  headingText?: string;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children, className, headingText } = props;
  return (
    <div css={selfCss} className={className}>
      <main>
        {headingText && (
          <VisuallyHidden asChild>
            <h1>{headingText}</h1>
          </VisuallyHidden>
        )}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

const selfCss = css({
  minWidth: pageMinWidth,
  maxWidth: pageMaxWidth,
  minHeight: '100vh',
  margin: '0 auto',
  padding: `0 ${globalVars.mainLayoutPaddingX.var}`,
  boxShadow: `20px 20px 40px #272b32, -20px -20px 40px #353a44;`,
  overflow: 'hidden',
});
