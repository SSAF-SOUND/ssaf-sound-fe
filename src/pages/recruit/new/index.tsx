import type { CustomNextPage } from 'next/types';

import { css } from '@emotion/react';

import { DefaultFullPageLoader, loaderText } from '~/components/Common';
import RecruitForm from '~/components/Forms/RecruitForm';
import { globalVars } from '~/styles/utils';
import { routes } from '~/utils';

const RecruitCreatePage: CustomNextPage = () => {
  return (
    <div css={selfCss}>
      <RecruitForm
        onValidSubmit={(v) => {
          console.log(v);
        }}
        options={{
          // FIXME: routes.recruit()
          submitBarCloseRoute: '/recruit',
          barTitle: '리쿠르팅 등록하기',
          submitButtonText: '완료',
          marginForExpand,
        }}
      />
    </div>
  );
};

export default RecruitCreatePage;
RecruitCreatePage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText.checkUser} />,
  unauthorized: routes.unauthorized(),
};

const selfPaddingX = 15;
const marginForExpand = `calc(${selfPaddingX}px + ${globalVars.mainLayoutPaddingX.var})`;
const selfCss = css({
  padding: `0 ${selfPaddingX}px`,
});
