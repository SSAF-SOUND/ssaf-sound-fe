import type { CustomNextPage } from 'next/types';

import { DefaultFullPageLoader } from '~/components/Common';
import PortfolioForm from '~/components/PortfolioForm';
import { routes } from '~/utils';

interface PortfolioEditPageProps {}

const PortfolioEditPage: CustomNextPage = (props: PortfolioEditPageProps) => {
  return (
    <div>
      <PortfolioForm />
    </div>
  );
};

export default PortfolioEditPage;
PortfolioEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader />,
  unauthorized: routes.unauthorized(),
};
