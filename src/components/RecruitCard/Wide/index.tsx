import type { ReactNode } from 'react';
import type { RecruitCategoryType, RecruitSummary } from '~/services/recruit';

import Link from 'next/link';

import { css } from '@emotion/react';

import Dday from '~/components/Dday';
import { flex, palettes } from '~/styles/utils';

import RecruitParticipants from './RecruitParticipants';
import RecruitTitle from './RecruitTitle';
import WithMyBadge from './WithMyBadge';
import RecruitCardSkills from '../Common/RecruitSkills';

export interface RecruitCardProps {
  category?: RecruitCategoryType;
  withBadge?: boolean;
  children?: ReactNode;
  withMessage?: boolean;
  recruitSummary: RecruitSummary;
}

const RecruitCard = (props: RecruitCardProps) => {
  const { withMessage = false, children, ...rest } = props;

  return withMessage ? (
    <div css={selfCss}>
      <RecruitCardImpl {...rest} withMessage={withMessage} />
      {children}
    </div>
  ) : (
    <RecruitCardImpl {...rest} />
  );
};

const RecruitCardImpl = (props: RecruitCardProps) => {
  const {
    recruitSummary,
    withBadge = true,
    withMessage,
    category = 'project',
  } = props;

  const { recruitId, title, recruitEnd, skills, participants } = recruitSummary;

  const categoryIsProject = category === 'project';

  return (
    <Link css={withMessage || selfCss} href={`/recruit/${recruitId}`}>
      <div css={flex('', '', 'column', 5)}>
        <div css={flex('', 'space-between', 'row')}>
          {withBadge ? (
            <WithMyBadge>
              <RecruitTitle title={title} />
            </WithMyBadge>
          ) : (
            <RecruitTitle title={title} />
          )}
          <Dday recruitEnd={recruitEnd} category={category} />
        </div>
        <RecruitCardSkills skills={skills} />
      </div>
      <RecruitParticipants
        participants={participants}
        withLabel={categoryIsProject}
      />
    </Link>
  );
};

const selfCss = css(flex('', 'space-between', 'column'), {
  background: palettes.white,
  width: 340,
  minHeight: 150,
  borderRadius: 16,
  color: palettes.black,
  padding: '15px 20px',
});

export default RecruitCard;
