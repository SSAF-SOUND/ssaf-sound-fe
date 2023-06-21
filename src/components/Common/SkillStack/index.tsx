import type { StacksType } from './stacks';

import { SkillStacks } from './stacks';

export interface SkillStackProps {
  stack: StacksType;
}
const SkillStack = (props: SkillStackProps) => {
  const { stack } = props;

  return SkillStacks[stack];
};

export default SkillStack;
