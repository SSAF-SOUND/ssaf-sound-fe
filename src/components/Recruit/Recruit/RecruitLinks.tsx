import type { RecruitDetail } from '~/services/recruit';

import { css } from '@emotion/react';

import { Recruit } from '~/components/Recruit/Recruit/index';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { flex } from '~/styles/utils';

interface RecruitLinksProps {
  className?: string;
  recruitDetail: RecruitDetail;
}

export const RecruitLinks = (props: RecruitLinksProps) => {
  const { recruitDetail, className } = props;
  const { recruitId, category, contactURI } = recruitDetail;
  const recruitTheme = getRecruitThemeByCategory(category);

  return (
    <div css={selfCss} className={className}>
      <Recruit.ContactLink
        href={contactURI}
        css={contactLinkCss}
        theme={recruitTheme}
      />
      <Recruit.ApplyLink
        recruitId={recruitId}
        css={dynamicLinkCss}
        theme={recruitTheme}
      />
      {/*<Recruit.MyApplicationLink*/}
      {/*  css={dynamicLinkCss}*/}
      {/*  recruitId={recruitId}*/}
      {/*/>*/}
      {/*<Recruit.ApplicantsLink css={dynamicLinkCss} recruitId={recruitId} />*/}
      {/* 유저에 따라 달라짐 */}
    </div>
  );
};

const selfCss = css(flex('center', '', 'row', 12));

const contactLinkCss = css({ width: '33%', minWidth: 120 });
const dynamicLinkCss = css({ width: '66%' });
