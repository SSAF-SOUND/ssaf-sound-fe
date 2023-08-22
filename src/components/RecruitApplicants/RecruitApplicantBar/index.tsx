import { css } from '@emotion/react';

import { Avatar, Icon } from '~/components/Common';
import { flex, fontCss, lineClamp, palettes } from '~/styles/utils';

import { Prefix } from './Prefix';

// 백엔드의 matchingState 관련부분이 정리되면, 수정할 예정이에요
type Status = 'confirmed' | 'waiting' | 'declined' | 'withHeart';

export const RecruitApplicantBar = (props: any) => {
  const {
    status,
    nickname = 'James',
    isMajor = false,
    des = '데스크립션',
    date = '2023-07-12',
  } = props;

  return (
    <li css={[selfCss, status === 'decline' && declinedCss]}>
      <div css={flex('center', '', 'row', 10)}>
        <span css={[{ width: 30 }, flex('center')]}>
          {status === 'withHeart' ? (
            <Icon name="heart" color={palettes.recruit.default} size={16} />
          ) : (
            <Prefix status={status} />
          )}
        </span>
        <div css={flex('center', '', 'row', 10)}>
          <Avatar size="lg" userInfo={{ nickname, isMajor }} />
          <div>
            <p css={headingCss}>{nickname}님의 리쿠르팅 신청</p>
            <p css={textCss}>{des}</p>
            <span css={dateCss}>{date}</span>
          </div>
        </div>
      </div>

      <Icon name="right.outlined" size={16} />
    </li>
  );
};

const selfCss = css(flex('center', 'space-between', 'row', 6));

const declinedCss = css({
  opacity: 0.5,
});

const headingCss = css(fontCss.family.auto, fontCss.style.B16, lineClamp(1));
const textCss = css(fontCss.family.auto, fontCss.style.B12, lineClamp(1));
const dateCss = css(fontCss.family.auto, fontCss.style.R12, {
  color: palettes.font.blueGrey,
});
