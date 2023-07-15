import type { CustomNextPage } from 'next/types';

import { DefaultFullPageLoader } from '~/components/Common';
import TitleBar from '~/components/TitleBar';
import { routes } from '~/utils';

interface PortfolioEditPageProps {}

const PortfolioEditPage: CustomNextPage = (props: PortfolioEditPageProps) => {
  return (
    <div>
      {/* LATER: TitleBar.RecruitForm 이름 바꾸기 */}
      <TitleBar.Form title="포트폴리오 입력" submitButtonText="완료" />
    </div>
  );
};

export default PortfolioEditPage;
PortfolioEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
