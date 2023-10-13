import type { CustomNextPage } from 'next/types';

import { PageHeadingText } from '~/components/Common/PageHeadingText';
import RedirectionGuide from '~/components/RedirectionGuide';
import { createNoIndexPageMetaData, routes } from '~/utils';

const metaTitle = '권한 없음';

const UnauthorizedPage: CustomNextPage = () => {
  return (
    <>
      <PageHeadingText text="페이지를 방문하기 위한 권한이 없습니다." />

      <RedirectionGuide
        title={'권한이 없어요!'}
        description={
          <>
            <p>페이지를 방문하기 위한 권한이 없습니다.</p>
          </>
        }
        redirectionTo={routes.main()}
        redirectionText={'메인 페이지로 돌아가기'}
      />
    </>
  );
};

export default UnauthorizedPage;
UnauthorizedPage.meta = createNoIndexPageMetaData(metaTitle);
