import type { RecruitDetail } from '~/services/recruit';

import { css } from '@emotion/react';

import Name from '~/components/Name';
import { RecruitIconButton } from '~/components/Recruit/Recruit/RecruitIconButton';
import { RecruitTitle } from '~/components/Recruit/Recruit/RecruitTitle';
import { RecruitViewCount } from '~/components/Recruit/Recruit/RecruitViewCount';
import { RecruitDeadline } from '~/components/Recruit/RecruitDeadline';
import { useMyInfo } from '~/services/member';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { flex } from '~/styles/utils';

interface RecruitHeaderProps {
  className?: string;
  recruitDetail: RecruitDetail;
}

export const RecruitHeader = (props: RecruitHeaderProps) => {
  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;

  const { recruitDetail, ...restProps } = props;
  const { category, recruitEnd, view, title, author } = recruitDetail;

  const recruitTheme = getRecruitThemeByCategory(category);

  return (
    <header css={[selfCss, { marginBottom: 20 }]} {...restProps}>
      <RecruitDeadline endDate={recruitEnd} size="md" theme={recruitTheme} />

      <RecruitViewCount>{view.toLocaleString()}</RecruitViewCount>

      <div css={titleLayerCss}>
        <RecruitTitle>{title}</RecruitTitle>
        {isSignedIn && <RecruitIconButton iconName="more" label="더보기" />}
      </div>

      <Name userInfo={author} size="md" />
    </header>
  );
};

const selfCss = css(flex('flex-start', '', 'column'));

const titleLayerCss = css(
  { width: '100%' },
  flex('center', 'space-between', 'row', 12)
);
