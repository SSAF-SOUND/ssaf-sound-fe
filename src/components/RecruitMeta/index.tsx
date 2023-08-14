import type { UserInfo } from '~/services/member';
import type { LimitType, SkillsType } from '~/services/recruit';

import { css } from '@emotion/react';

import { fontCss, palettes } from '~/styles/utils';

import { RecruitMetaTitle } from './RecruitMetaTitle';
import RecruitTable from './RecruitTable';
import Name from '../Name';

export interface RecruitMeta {
  recruitStart: string;
  recruitEnd: string;
  limits: LimitType[];
  skills: SkillsType[];
}

export interface RecruitMetaProps {
  userInfo?: UserInfo;
  title?: string;
  recruitMeta: RecruitMeta;
  expanded?: boolean;
  className?: string;
}

const RecruitMeta = (props: RecruitMetaProps) => {
  const { expanded = true, userInfo, title, recruitMeta, className } = props;

  if (expanded && userInfo && title)
    // 이 부분 로직은 추후 수정할게요!
    return (
      <div css={selfCss} className={className}>
        <RecruitMetaTitle title={title} css={titleCss} />
        <Name userInfo={userInfo} size="md" />
        <RecruitTable {...recruitMeta} />
      </div>
    );

  return <RecruitTable {...recruitMeta} />;
};

export default RecruitMeta;

const selfCss = css({
  background: palettes.background.grey,
  color: palettes.white,

  width: '100vw',
  marginLeft: '-30px',
  // marginLeft 값은 페이지의 padding 값을 사용해야해요.
  // 추후에 페이지관련 레이아웃이 마무리되게 되면 수정하겠습니다!

  padding: '0 30px',
  paddingTop: '10px',
});

const titleCss = css(fontCss.family.auto, fontCss.style.R20);
