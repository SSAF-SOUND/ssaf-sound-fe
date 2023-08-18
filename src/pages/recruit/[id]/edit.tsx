import type { CustomNextPage } from 'next/types';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import { DefaultFullPageLoader, loaderText } from '~/components/Common';
import RecruitForm from '~/components/Forms/RecruitForm';
import { useMyInfo } from '~/services/member';
import { globalVars } from '~/styles/utils';
import { routes } from '~/utils';

const RecruitEditPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  // get recruit detail -> populate defaultValues

  const mine = true as boolean;

  // 내 리쿠르팅이 아니라면 리다이렉션
  if (!mine) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader />;
  }

  return (
    <div css={selfCss}>
      <RecruitForm
        onValidSubmit={(v) => console.log(v)}
        options={{
          editMode: true,
          barTitle: '리쿠르팅 수정하기',
          marginForExpand,
        }}
      />
    </div>
  );
};

export default RecruitEditPage;
RecruitEditPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText.checkUser} />,
  unauthorized: routes.unauthorized(),
};

const selfPaddingX = 15;
const marginForExpand = `calc(${selfPaddingX}px + ${globalVars.mainLayoutPaddingX.var})`;
const selfCss = css({
  padding: `0 ${selfPaddingX}px`,
});
