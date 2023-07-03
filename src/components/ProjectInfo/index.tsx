import type { LimitType, SkillsType } from './utils';

import { css } from '@emotion/react';

import { palettes } from '~/styles/utils';

import Info from './Info';
import { PROJECT_INFO } from './utils';

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
        name: 'IOS',
        skillId: 2,
      },
    ],
  } = props;
  // 임시
  return (
    <div css={selfCss}>
      <Info {...PROJECT_INFO.PERSONNEL} content={limits} />
      {/* content type을 배열로 한정짓고 싶어서 배열로 진행 */}
      <Info {...PROJECT_INFO.PERIOD} content={[recruitStart, recruitEnd]} />
      <Info {...PROJECT_INFO.STACK} content={skills} />
    </div>
  );
};

export default ProjectInfo;

const selfCss = css({
  // width: 390,
  // height: 104,
  // w, h는 페이지 작업을 할때 같이 레이아웃 잡으며 수정할 예정
  background: palettes.white,
  color: palettes.font.grey,
});
