import type { SkillType } from '~/services/recruit';

import { Skills } from './skills';

export interface SkillIconProps {
  name: SkillType;
  size?: number;
}

const SkillIcon = (props: SkillIconProps) => {
  const { name, size = 24 } = props;
  const SkillSVG = Skills[name];

  return <SkillSVG style={{ height: size }} />;
};

export default SkillIcon;
