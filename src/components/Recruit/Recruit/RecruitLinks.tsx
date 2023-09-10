import type { RecruitDetail } from '~/services/recruit';

import { css } from '@emotion/react';

import { Recruit } from '~/components/Recruit/Recruit/index';
import {
  getRecruitThemeByCategory,
  MatchStatus,
  useRecruitDetail,
} from '~/services/recruit';
import { flex } from '~/styles/utils';

interface RecruitLinksProps {
  className?: string;
  recruitDetail: RecruitDetail;
}

export const RecruitLinks = (props: RecruitLinksProps) => {
  const { recruitDetail, className } = props;
  const {
    recruitId,
    category,
    contactURI,
    matchStatus,
    mine,
    finishedRecruit,
  } = recruitDetail;
  const { isFetching: isRecruitDetailFetching } = useRecruitDetail(recruitId);
  const recruitTheme = getRecruitThemeByCategory(category);

  return (
    <div css={selfCss} className={className}>
      <Recruit.ContactLink
        href={contactURI}
        css={contactLinkCss}
        theme={recruitTheme}
        disabled={!contactURI}
      />

      {mine ? (
        <Recruit.ApplicantsLink
          loading={isRecruitDetailFetching}
          css={dynamicLinkCss}
          recruitId={recruitId}
        />
      ) : (
        <>
          {matchStatus === MatchStatus.INITIAL ? (
            <Recruit.ApplyLink
              loading={isRecruitDetailFetching}
              recruitId={recruitId}
              css={dynamicLinkCss}
              theme={recruitTheme}
              disabled={finishedRecruit}
            />
          ) : (
            <Recruit.MyApplicationLink
              loading={isRecruitDetailFetching}
              css={dynamicLinkCss}
              recruitId={recruitId}
            />
          )}
        </>
      )}
    </div>
  );
};

const selfCss = css(flex('center', '', 'row', 12));

const contactLinkCss = css({ width: '33%', minWidth: 120 });
const dynamicLinkCss = css({ width: '66%' });
