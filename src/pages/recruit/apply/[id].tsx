import { css } from '@emotion/react';

import { RecruitApplyForm } from '~/components/Forms/RecruitApplyForm';
import RecruitMeta from '~/components/RecruitMeta';
import TitleBar from '~/components/TitleBar';
import { userInfo } from '~/mocks/handlers/member/data';
import { RecruitData } from '~/mocks/handlers/recruit/data';
import { flex, fontCss } from '~/styles/utils';
import { routes } from '~/utils';

const RecruitApplyPage = (props: any) => {
  return (
    <div css={{ padding: '0 20px', paddingTop: '50px' }}>
      <TitleBar.Default
        title="리쿠르팅 신청"
        onClickBackward={routes.main()}
        withoutClose
      />
      {/* todo routes 정리 후 수정 */}

      <div
        css={[
          { paddingTop: '20px', marginBottom: '30px' },
          flex('', '', 'column', 8),
        ]}
      >
        <h2 css={titleCss}>스터디</h2>
        <RecruitMeta
          recruitMeta={RecruitData.recruitDetail.project}
          userInfo={userInfo.certifiedSsafyUserInfo}
          expanded
          title={'test'}
        />
      </div>

      <RecruitApplyForm recruitId={1} />
    </div>
  );
};

export default RecruitApplyPage;

const titleCss = css(fontCss.family.auto, fontCss.style.R14);
