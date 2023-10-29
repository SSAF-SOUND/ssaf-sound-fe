import type { LinkProps } from 'next/link';
import type { CustomNextPage } from 'next/types';
import type { PropsWithChildren } from 'react';

import Link from 'next/link';

import TitleBar from '~/components/TitleBar';
import { fontCss, palettes } from '~/styles/utils';
import { createAuthGuard, createNoIndexPageMetaData } from '~/utils';

const AdminPage: CustomNextPage = () => {
  return (
    <div css={[fontCss.family.pretendard, { padding: '80px 0' }]}>
      <TitleBar.Default title="관리자" withoutClose />
      <section>
        <h2 css={fontCss.style.B24}>하위 디렉토리</h2>

        <div>
          <StyledLink href={'/admin/page-revalidation'}>
            Revalidate Page
          </StyledLink>
        </div>
      </section>
    </div>
  );
};

const StyledLink = (props: LinkProps & PropsWithChildren) => {
  return (
    <Link
      css={[
        fontCss.style.B18,
        {
          width: 'max-content',
          padding: '10px 0',
          display: 'block',
          color: palettes.success.default,
          '&:hover, &:focus-visible': { textDecoration: 'underline' },
          '&:active': { textDecoration: 'none' },
        },
      ]}
      {...props}
    />
  );
};

export default AdminPage;
AdminPage.auth = createAuthGuard({
  role: 'admin',
});
AdminPage.meta = createNoIndexPageMetaData('관리자');
