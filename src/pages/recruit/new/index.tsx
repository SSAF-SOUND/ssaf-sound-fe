import { css } from '@emotion/react';

import RecruitForm from '~/components/Forms/RecruitForm';

interface RecruitCreatePageProps {}

const RecruitCreatePage = (props: RecruitCreatePageProps) => {
  return (
    <div css={selfCss}>
      <RecruitForm
        onValidSubmit={(v) => {
          console.log(v);
        }}
        options={{
          barTitle: '리쿠르팅 등록하기',
          submitButtonText: '완료',
        }}
      />
    </div>
  );
};

export default RecruitCreatePage;

const selfCss = css({
  padding: `0 15px`,
});
