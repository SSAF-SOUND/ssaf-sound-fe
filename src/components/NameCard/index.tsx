import type { UserInfo } from '~/services/member';

import { css } from '@emotion/react';
import { isNullOrUndefined } from 'is-what';

import Name from '~/components/Name';
import { isDeletedUser } from '~/services/member/utils/isDeletedUser';
import { fontCss, inlineFlex, palettes } from '~/styles/utils';

export interface NameCardProps {
  userInfo: Omit<UserInfo, 'memberRole' | 'memberId'>;
  withBackground?: boolean;
  className?: string;
}

const NameCard = (props: NameCardProps) => {
  const { className, userInfo, withBackground = false } = props;
  const { ssafyInfo } = userInfo;
  const hasSsafyInfo = !isNullOrUndefined(ssafyInfo);
  const isDeleted = isDeletedUser(userInfo);

  return (
    <div css={[selfCss, withBackground && backgroundCss]} className={className}>
      <Name userInfo={userInfo} size="lg" />
      {!isDeleted && hasSsafyInfo && (
        <div css={ssafyInfoCss}>
          {formatSsafyInfo(ssafyInfo.semester, ssafyInfo.campus)}
        </div>
      )}
    </div>
  );
};

const formatSsafyInfo = (year: number, campus: string) => {
  return `${campus}캠퍼스 SSAFY ${year}기`;
};

export default NameCard;

const selfCss = css(
  {
    padding: '6px 10px',
    color: palettes.white,
    borderRadius: 10,
  },
  fontCss.family.auto,
  inlineFlex('flex-start', 'center')
);

const ssafyInfoCss = css(fontCss.style.B16);

const backgroundCss = css({
  backgroundColor: palettes.white,
  color: palettes.font.grey,
});
