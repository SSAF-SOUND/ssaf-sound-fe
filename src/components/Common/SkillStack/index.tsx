import type { SkillType } from '~/services/recruit';

import { SkillStacks } from './stacks';

export interface SkillStackProps {
  stack: SkillType;
  size?: number;
}
const SkillStack = (props: SkillStackProps) => {
  const { stack, size = 24 } = props;
  const SkillIcon = SkillStacks[stack];

  return <SkillIcon style={{ height: size }} />;
};

export default SkillStack;
