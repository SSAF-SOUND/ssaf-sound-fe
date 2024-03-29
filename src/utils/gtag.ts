import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { APP_URL, isDevMode, GA_ID } from '~/utils/constants';
import { composeUrls } from '~/utils/misc';

// https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag#default-behavior
// UA -> GA4에서 page_path 파라미터가 삭제됨
export const pageView = (url: string) => {
  window.gtag('config', GA_ID, {
    page_location: url,
  });
};

export const useGtagPageView = () => {
  const router = useRouter();
  useEffect(() => {
    if (isDevMode) return;

    const handleRouteChangeComplete = (path: string) => {
      // 프로토콜 포함하는 full url 사용해야함.
      const url = composeUrls(APP_URL, path);
      pageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);
};
