import { PageHead, PageHeadingText } from '~/components/Common';
import RedirectionGuide from '~/components/RedirectionGuide';
import { routes } from '~/utils';

const metaTitle = '권한 없음';

const UnauthorizedPage = () => {
  return (
    <>
      <PageHead title={metaTitle} />

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
