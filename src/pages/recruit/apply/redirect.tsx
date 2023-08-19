import type { RecruitCategory } from '~/services/recruit';

import { useRouter } from 'next/router';

import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import { useGetQueryString } from '~/hooks';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { routes } from '~/utils';

const ApplyRedirectPage = () => {
  const router = useRouter();
  const category = useGetQueryString('category');
  const recruitId = useGetQueryString('recruitId');
  return (
    <>
      <TitleBar.Default
        withoutBackward
        title="리쿠르팅 신청 완료"
        onClickClose={() =>
          router.push(routes.recruit.detail(Number(recruitId)))
        }
      />
      <RedirectionGuide
        title="리쿠르팅 신청이 완료되었습니다."
        description="마이페이지에서 리쿠르팅 현황을 확인하실 수 있습니다."
        redirectionTo={routes.profile.self()}
        redirectionText="마이페이지 가기"
        theme={getRecruitThemeByCategory(category as RecruitCategory)}
      />
    </>
  );
};

export default ApplyRedirectPage;
