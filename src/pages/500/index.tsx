import RedirectionGuide from '~/components/RedirectionGuide';
import { routes } from '~/utils';

const SeverErrorPage = () => {
  // 일단 여기는 콜라가 작업하신 부분으로 임시로 넣어놨어요!
  // 개인적으로는 메인페이지로 가기와, 새로고침하기 정도 있는 것도 좋을 것 같아요!
  // noFound 에러와 달리 500에러는 서버의 상태에 따라 실시간으로 변할 수 있으니까요!

  return (
    <RedirectionGuide
      theme="primary"
      title="서버에서 문제가 발생했어요!"
      description={<>serverError</>}
      redirectionText="새로고침하기"
      redirectionTo={routes.main()}
    />
  );
};

export default SeverErrorPage;
