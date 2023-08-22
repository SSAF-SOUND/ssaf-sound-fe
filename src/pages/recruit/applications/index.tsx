import { css } from '@emotion/react';

import { Accordion, Avatar, Toggle } from '~/components/Common';
import { RecruitLayout } from '~/components/Layout';
import { RecruitApplicationList } from '~/components/RecruitApplicationList';
import TitleBar from '~/components/TitleBar';
import { flex, fontCss, palettes } from '~/styles/utils';

const a = css(fontCss.family.auto, fontCss.style.B28, {
  color: palettes.white,
});

const b = css(fontCss.family.auto, fontCss.style.R12, {
  color: palettes.recruit.default,
});
const ApplicationsPage = () => {
  return (
    <RecruitLayout>
      <TitleBar.Default title="리쿠르팅 신청 목록" />
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
            <RecruitApplicationList withHeart />
            <RecruitApplicationList withHeart />
            <RecruitApplicationList withHeart />
            <RecruitApplicationList withHeart />
            <RecruitApplicationList withHeart />
          </ol>
        </div>
      </div>
    </RecruitLayout>
  );
};

export default ApplicationsPage;
