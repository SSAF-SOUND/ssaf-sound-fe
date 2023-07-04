import type { SkillType } from '~/services/recruit';

import { SkillStacks } from './stacks';

export interface SkillStackProps {
  stack: SkillType;
}
const SkillStack = (props: SkillStackProps) => {
  const { stack } = props;

  return SkillStacks[stack];
};

export default SkillStack;
