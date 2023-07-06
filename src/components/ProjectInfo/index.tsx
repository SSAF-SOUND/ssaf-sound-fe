import type { LimitType, SkillsType } from '~/services/recruit';

import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

import Info from './Info';
import Personnel from './Personnel';
import { PROJECT_INFO } from './utils';
import { SkillIcon } from '../Common';

interface ProjectProps {
  recruitStart: string;
  recruitEnd: string;
  limits: LimitType[];
  skills: SkillsType[];
}

const ProjectInfo = (props: ProjectProps) => {
  const {
    recruitStart = '2023-06-23',
    recruitEnd = '2023-06-30',
    limits = [
      {
        recruitType: '프론트엔드',
        limit: 5,
      },
      {
        recruitType: '백엔드',
        limit: 4,
      },
    ],
    skills = [
      {
        name: 'React',
        skillId: 1,
      },
      {
        name: 'NextJs',
        skillId: 2,
      },
      {
        name: 'IOS',
        skillId: 3,
      },
    ],
  } = props;
  // 임시

  return (
    <div css={selfCss}>
      <Info {...PROJECT_INFO.personnel}>
        {/* 데이터 어떤식으로 넘어오는지 여쭈어보고 수ㅇㅖ정 */}
        <Personnel type="기획/디자인" max={6} recruitedNumber={2} />
      </Info>
      {/* content type을 배열로 한정짓고 싶어서 배열로 진행 */}
      <Info {...PROJECT_INFO.period}>
        <span>{recruitStart.replaceAll('-', '/')}</span>
        <span> ~ </span>
        <span data-theme="highLight">{recruitEnd.replaceAll('-', '/')}</span>
      </Info>
      <Info {...PROJECT_INFO.stack}>
        {skills.map((skill) => (
          <SkillIcon name={skill.name} key={skill.skillId} />
        ))}
      </Info>
    </div>
  );
};

export default ProjectInfo;

const selfCss = css({
  background: palettes.background.grey,
  color: palettes.white,

  /** 추후에 수정할게요! */
  '[data-theme="highLight"]': {
    color: palettes.point.recruit,
  },
});
