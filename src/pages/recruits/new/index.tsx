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
import { reconfirmRecruitFormUnload } from '~/services/recruit';
import { globalVars } from '~/styles/utils';
import { routes } from '~/utils';

const metaTitle = '리쿠르팅 등록';

const RecruitCreatePage: CustomNextPage = () => {
  const router = useRouter();
  useUnloadReconfirmEffect();

  const onClickTitleBarClose = () => {
    if (reconfirmRecruitFormUnload()) {
      router.push(routes.recruit.self());
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
