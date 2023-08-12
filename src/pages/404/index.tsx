import { PageHead, PageHeadingText } from '~/components/Common';
import RedirectionGuide from '~/components/RedirectionGuide';
import { routes } from '~/utils';

const NotFoundPage = () => (
  <>
    <PageHead />

    <PageHeadingText text="페이지를 찾지 못했습니다." />

    <RedirectionGuide
      theme="primary"
      title="잘못된 페이지예요!"
      description={
        <>
          <p>요청하신 페이지를 찾을 수 없습니다.</p>
          <p>주소가 정확한지 확인해주세요.</p>
        </>
      }
      redirectionText="메인 페이지로 돌아가기"
      redirectionTo={routes.main()}
    />
  </>
);

export default NotFoundPage;
