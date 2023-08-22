import { css } from '@emotion/react';

import { Avatar, Toggle } from '~/components/Common';
import { RecruitLayout } from '~/components/Layout';
import { RecruitApplicantBar } from '~/components/RecruitApplicants';
import TitleBar from '~/components/TitleBar';
import { useGetQueryString } from '~/hooks';
import { flex, fontCss, palettes } from '~/styles/utils';
import { routes } from '~/utils';

const a = css(fontCss.family.auto, fontCss.style.B28, {
  color: palettes.white,
});

const b = css(fontCss.family.auto, fontCss.style.R12, {
  color: palettes.recruit.default,
});

const recruitIdQueryKey = 'id';

/**
 * NOTE: 내 리쿠르트인 경우에만 접근 가능한 페이지 (서버에서 검증)
 */
const RecruitApplicantsPage = () => {
  const recruitId = useGetQueryString(recruitIdQueryKey);
  const backwardRoute = recruitId && routes.recruit.detail(Number(recruitId));

  return (
    <RecruitLayout>
      <TitleBar.Default
        title="리쿠르팅 신청 목록"
        withoutClose
        onClickBackward={backwardRoute}
      />

      <div>
        <div css={flex('', '', 'column', 0)}>
          <span css={a}>기획/디자인</span>
          <span css={b}>6명 중 2명 모집 완료</span>
        </div>

        <div css={flex('', '', 'row', 6)}>
          <Avatar size="lg" userInfo={{ isMajor: true, nickname: 'Test' }} />
          <Avatar size="lg" userInfo={{ isMajor: false, nickname: 'A' }} />
          <Avatar size="lg" userInfo={{ isMajor: false, nickname: 'B' }} />
          <Avatar size="lg" userInfo={{ isMajor: false, nickname: 'C' }} />
          <Avatar size="lg" userInfo={{ isMajor: false, nickname: 'D' }} />
          <Avatar size="lg" userInfo={{ isMajor: true, nickname: 'E' }} />
          <Avatar size="lg" />
        </div>

        <div css={flex('', '', 'column', 20)}>
          <div css={flex('center', 'space-between', 'row', 6)}>
            <span css={[fontCss.family.auto, fontCss.style.B18]}>
              리쿠르팅 신청
              <span css={{ color: palettes.recruit.default }}> 9</span>
            </span>
            <Toggle
              thumbSize={20}
              textWidth={40}
              text="하트"
              theme="recruit"
              padding={2}
            />
          </div>
          <ol>
            <RecruitApplicantBar withHeart />
            <RecruitApplicantBar withHeart />
            <RecruitApplicantBar withHeart />
            <RecruitApplicantBar withHeart />
            <RecruitApplicantBar withHeart />
          </ol>
        </div>
      </div>
    </RecruitLayout>
  );
};

export default RecruitApplicantsPage;
