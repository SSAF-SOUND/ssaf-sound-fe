import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useSignIn } from '~/services/auth';

interface QueryParams {
  code: string;
}

export default function CallbackPage() {
  const router = useRouter();
  const queryParams = router.query as unknown as QueryParams;
  const { code } = queryParams;
  const { mutate } = useSignIn();

  useEffect(() => {
    mutate(code, {
      onSuccess: () => {
        router.push('/auth/register');
      },
    });

    // eslint-disable-next-line
  }, []);

  return <div>CallbackPage</div>;
}
