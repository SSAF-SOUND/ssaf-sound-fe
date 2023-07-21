import type { LimitType, SkillsType } from '~/services/recruit';

import { css } from '@emotion/react';

import { palettes, themeColorVars } from '~/styles/utils';

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
        recruitType: '기획/디자인',
        limit: 3,
        currentNumber: 1,
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

  return (
    <div css={selfCss}>
      <Info {...PROJECT_INFO.personnel}>
        {limits.map((limit, index) => (
          <>
            <Personnel {...limit} key={limit.recruitType} />
            {limits.length !== index + 1 && <span>,&nbsp;</span>}
          </>
        ))}
      </Info>
      <Info {...PROJECT_INFO.period}>
        <span>{recruitStart.replaceAll('-', '/')}</span>
        <span> ~ </span>
        <span data-theme="recruit">{recruitEnd.replaceAll('-', '/')}</span>
      </Info>
      <Info {...PROJECT_INFO.stack}>
        {skills.map((skill) => (
          <SkillIcon name={skill.name} key={skill.skillId} size={21} />
        ))}
      </Info>
    </div>
  );
};

export default ProjectInfo;

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
