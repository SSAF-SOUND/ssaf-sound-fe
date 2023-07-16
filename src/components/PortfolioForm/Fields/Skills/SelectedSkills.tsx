import type { PortfolioFormValues } from '~/components/PortfolioForm/utils';
import type { SkillName } from '~/services/recruit';

import { css } from '@emotion/react';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';

import { SkillIcon } from '~/components/Common';
import { inlineFlex } from '~/styles/utils';

const fieldName = 'skills';
const midOrder = 50;
const maxOrder = 101;

const SelectedSkills = () => {
  const skills = useWatch<PortfolioFormValues>({
    name: fieldName,
    defaultValue: {},
  }) as Record<string, number | undefined>;

  const selectedSkills = Object.entries(skills)
    .filter(([, selectedOrder]) => selectedOrder)
    .sort(([, num1], [, num2]) => (num1 as number) - (num2 as number)) as [
    string,
    number
  ][];

  const evens = selectedSkills.filter((_, idx) => !(idx % 2)); // left (index 가 0부터 시작하므로)
  const odds = selectedSkills.filter((_, idx) => idx % 2); // right
  const length = evens.length + odds.length;

  return (
    <div css={selfCss}>
      {evens.map(([skillName], idx) => (
        <SelectedSkillsGroup
          key={skillName}
          skillName={skillName}
          order={idx}
        />
      ))}
      {odds.map(([skillName], idx) => (
        <SelectedSkillsGroup
          key={skillName}
          skillName={skillName}
          order={maxOrder - idx}
        />
      ))}
      <div css={paddingCss} style={{ order: midOrder }} />
      {Boolean(length % 2) && (
        <div css={paddingCss} style={{ order: maxOrder }} />
      )}
    </div>
  );
};

export default SelectedSkills;
const selfCss = inlineFlex('center', 'center', 'row', 28);
const paddingCss = css({ width: 60, height: 60 });

interface SelectedSkillsGroupProps {
  skillName: string;
  order: number;
}
const SelectedSkillsGroup = memo((props: SelectedSkillsGroupProps) => {
  const { skillName, order } = props;

  return (
    <div key={skillName} css={inlineFlex()} style={{ order }}>
      <SkillIcon name={skillName as SkillName} size={60} />
    </div>
  );
});
SelectedSkillsGroup.displayName = 'SelectedSkillsGroup';
