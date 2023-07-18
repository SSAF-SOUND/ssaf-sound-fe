import type { SkillName } from '~/services/recruit';

import { memo } from 'react';

import { SkillIcon } from '~/components/Common';
import { inlineFlex } from '~/styles/utils';

interface SkillsSorterProps {
  skillNames: string[];
  /** 아이템 개수를 넘는 임의의 값 */
  maxOrder: number;
}

/**
 * - 짝수 인덱스 (0, 2, 4, ...)는 왼쪽 그룹
 * - 홀수 인덱스 (1, 3, 5, ...)는 오른쪽 그룹
 * - 인덱스가 커질수록, 중앙에서 가깝게 위치
 * - 예시) 0 2 4 6 ... 7 5 3 1 순서로 `flex item`의  `order`부여
 * - `SkillsSorter`의 부모 엘리먼트는 `flex container`여야 합니다.
 */
const SkillsSorter = (props: SkillsSorterProps) => {
  const { skillNames, maxOrder } = props;

  const evens = skillNames.filter((_, idx) => !(idx % 2)); //left
  const odds = skillNames.filter((_, idx) => idx % 2); //right

  return (
    <>
      {evens.map((skillName, idx) => (
        <Skill key={skillName} skillName={skillName} order={idx} />
      ))}
      {odds.map((skillName, idx) => (
        <Skill key={skillName} skillName={skillName} order={maxOrder - idx} />
      ))}
    </>
  );
};

export default SkillsSorter;

interface SkillProps {
  skillName: string;
  order: number;
}
const Skill = memo((props: SkillProps) => {
  const { skillName, order } = props;

  return (
    <div key={skillName} css={inlineFlex()} style={{ order }}>
      <SkillIcon name={skillName as SkillName} size={60} />
    </div>
  );
});
Skill.displayName = 'Skill';
