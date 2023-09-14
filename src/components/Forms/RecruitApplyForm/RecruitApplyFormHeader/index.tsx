import type { RecruitDetail } from '~/services/recruit';

import { css } from '@emotion/react';

import Name from '~/components/Name';
import { Recruit } from '~/components/Recruit/Recruit';
import { getDisplayCategoryName } from '~/services/recruit';
import { expandCss, fontCss, palettes } from '~/styles/utils';

interface RecruitApplyFormHeaderProps {
  recruitDetail: RecruitDetail;
  className?: string;
}

export const RecruitApplyFormHeader = (props: RecruitApplyFormHeaderProps) => {
  const { recruitDetail, className } = props;
  const { title, author, category } = recruitDetail;
  const displayCategoryName = getDisplayCategoryName(category);

  return (
    <header className={className}>
      <div css={categoryCss}>{displayCategoryName}</div>
      <div css={expandLayerCss}>
        <Recruit.Title>{title}</Recruit.Title>
        <Name userInfo={author} size="md" />
        <Recruit.BasicInfo css={basicInfoCss} recruitDetail={recruitDetail} />
      </div>
    </header>
  );
};

const categoryCss = css({ marginBottom: 10 }, fontCss.style.R14);

const expandLayerCss = css(
  {
    backgroundColor: palettes.background.grey,
    padding: '16px 20px',
  },
  expandCss()
);

const basicInfoCss = css({ padding: '16px 0 0' });
