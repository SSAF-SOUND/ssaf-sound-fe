import type { RecruitCategory } from '~/services/recruit';

import { useRouter } from 'next/router';

import RedirectionGuide from '~/components/RedirectionGuide';
import TitleBar from '~/components/TitleBar';
import { useGetQueryString } from '~/hooks';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { routes } from '~/utils';

const RECRUIT_REDIRECT_TYPE = {
  APPLY: '신청',
  APPROVE: '수락',
  REJECT: '거절',
  CANCEL: '취소',
};

const END_FIX = {
  APPLY: '이',
  APPROVE: '이',
  REJECT: '이',
  CANCEL: '가',
};
const ApplyRedirectPage = () => {
  const router = useRouter();
  const category = useGetQueryString('category');
  const recruitId = useGetQueryString('recruitId');
  const type = useGetQueryString('type');
  const safeType = (type ?? 'APPLY') as keyof typeof RECRUIT_REDIRECT_TYPE;

  return (
    <>
      <TitleBar.Default
        withoutBackward
        title={`리쿠르팅 ${RECRUIT_REDIRECT_TYPE[safeType]} 완료`}
        onClickClose={() =>
          router.push(routes.recruit.detail(Number(recruitId)))
        }
      />
      <RedirectionGuide
        title={`리쿠르팅 ${RECRUIT_REDIRECT_TYPE[safeType]}${END_FIX[safeType]} 완료되었습니다.`}
        description="마이페이지에서 리쿠르팅 현황을 확인하실 수 있습니다."
        redirectionTo={routes.profile.self()}
        redirectionText="마이페이지 가기"
        theme={getRecruitThemeByCategory(category as RecruitCategory)}
      />
    </>
  );
};

export default ApplyRedirectPage;
