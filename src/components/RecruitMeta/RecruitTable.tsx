import type { RecruitMeta } from '.';

import { css } from '@emotion/react';

import { flex, palettes, themeColorVars } from '~/styles/utils';

import RecruitPeriodInfo from './RecruitPeriodInfo';
import RecruitPersonnelInfo from './RecruitPersonnelInfo';
import { PROJECT_INFO } from './utils';
import { SkillIcon, VisuallyHidden, Table } from '../Common';

interface RecruitTableProps extends Omit<RecruitMeta, 'userInfo'> {}

const RecruitTable = (props: RecruitTableProps) => {
  const { recruitStart, recruitEnd, limits, skills } = props;

  return (
    <Table.Root css={selfCss}>
      <VisuallyHidden>
        <thead>리쿠르트 정보 테이블</thead>
      </VisuallyHidden>
      <tbody css={tbodyCss}>
        <Table.Row>
          <Table.RowHead {...PROJECT_INFO.personnel} />
          <Table.RowData>
            {limits.map((limit, index) => (
              <>
                <RecruitPersonnelInfo {...limit} key={limit.recruitType} />
                {limits.length !== index + 1 && <span>,&nbsp;</span>}
                {/* 추후 이부분 로직을 수정하려고 합니다. */}
              </>
            ))}
          </Table.RowData>
        </Table.Row>

        <Table.Row>
          <Table.RowHead {...PROJECT_INFO.period} />
          <Table.RowData>
            <RecruitPeriodInfo
              recruitStart={recruitStart}
              recruitEnd={recruitEnd}
            />
          </Table.RowData>
        </Table.Row>

        <Table.Row>
          <Table.RowHead {...PROJECT_INFO.stack} />
          <Table.RowData>
            {skills.map((skill) => (
              <SkillIcon name={skill.name} key={skill.skillId} size={21} />
            ))}
          </Table.RowData>
        </Table.Row>
      </tbody>
    </Table.Root>
  );
};

export default RecruitTable;

const selfCss = css({
  background: palettes.background.grey,
  color: palettes.white,

  width: '100vw',
  marginLeft: '-30px',
  // marginLeft 값은 페이지의 padding 값을 사용해야해요.
  // 추후에 페이지관련 레이아웃이 마무리되게 되면 수정하겠습니다!

  padding: '10px 30px',
  '[data-theme="recruit"]': {
    color: themeColorVars.mainColor.var,
  },
});

const tbodyCss = css(flex('', '', 'column', 8), {
  padding: '10px 30px',
});
