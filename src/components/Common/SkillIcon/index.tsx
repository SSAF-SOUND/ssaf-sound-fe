import type { SkillType } from '~/services/recruit';

import { Skills } from './skills';

export interface SkillIconProps {
  name: SkillType;
  size?: number;
}
const SkillIcon = (props: SkillIconProps) => {
  const { name, size = 24 } = props;
  const SkillIcon = Skills[name];

  return <SkillIcon style={{ height: size }} />;
};

export default SkillIcon;
