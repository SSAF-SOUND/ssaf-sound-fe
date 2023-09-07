import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import {
  DefaultFullPageLoader,
  loaderText,
  PageHeadingText,
} from '~/components/Common';
import RecruitForm from '~/components/Forms/RecruitForm';
import { useUnloadReconfirmEffect } from '~/hooks/useUnloadReconfirmEffect';
import { globalVars } from '~/styles/utils';
import { routes } from '~/utils';

const metaTitle = '리쿠르팅 등록';

const RecruitCreatePage: CustomNextPage = () => {
  const router = useRouter();
  useUnloadReconfirmEffect();

  const onClickTitleBarClose = () => {
    if (
      window.confirm(
        '작성중인 리쿠르팅 내용이 사라집니다. 페이지를 이동할까요?'
      )
    ) {
      // FIXME: routes.recruit()
      router.push('/main');
    }
  };

  return (
    <>
      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <RecruitForm
          onValidSubmit={(v) => {
            console.log(v);
          }}
          options={{
            // FIXME: routes.recruit()
            onClickTitleBarClose: onClickTitleBarClose,
            barTitle: '리쿠르팅 등록하기',
            submitButtonText: '완료',
            marginForExpand,
          }}
        />
      </div>
    </>
  );
};

export default RecruitCreatePage;
RecruitCreatePage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText.checkUser} />,
  unauthorized: routes.unauthorized(),
};
RecruitCreatePage.meta = {
  title: metaTitle,
  openGraph: { title: metaTitle },
  robots: { index: false, follow: false },
};

const selfPaddingX = 15;
const marginForExpand = `calc(${selfPaddingX}px + ${globalVars.mainLayoutPaddingX.var})`;
const selfCss = css({
  padding: `0 ${selfPaddingX}px`,
});
