import type { UserInfo } from '~/services/member';

import { css } from '@emotion/react';

import Name from '~/components/Name';
import { fontCss, inlineFlex, palettes } from '~/styles/utils';

export interface NameCardProps {
  userInfo: UserInfo;
  withBackground?: boolean;
}

const NameCard = (props: NameCardProps) => {
  const { userInfo, withBackground = false } = props;
  const { ssafyInfo: { campus, semester } = {} } = userInfo;
  const hasSsafyInfo = campus && semester;

  return (
    <div css={[selfCss, withBackground && backgroundCss]}>
      <Name userInfo={userInfo} size="lg" />
      {hasSsafyInfo && (
        <div css={ssafyInfoCss}>{formatSsafyInfo(semester, campus)}</div>
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
