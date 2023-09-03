import { useRouter } from 'next/router';

import { isDevMode, routes } from '~/utils';

const DevPage = () => {
  const router = useRouter();
  if (!isDevMode) {
    router.replace(routes.main());
    return <></>;
  }
  return <div>DevPage</div>;
};

export default DevPage;
