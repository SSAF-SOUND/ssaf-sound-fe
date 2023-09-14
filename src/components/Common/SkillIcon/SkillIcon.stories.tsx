import type { SkillIconProps } from './index';
import type { Meta } from '@storybook/react';

import { SkillName } from '~/services/recruit';

import { SkillIcon } from './index';

const skillNames = Object.values(SkillName);

const meta: Meta<typeof SkillIcon> = {
  title: 'Icon/Skill',
  component: SkillIcon,
  tags: ['autodocs'],
};

export default meta;

export const Single = (props: SkillIconProps) => {
  const { name = SkillName.REACT, size } = props;
  return <SkillIcon name={name} size={size} />;
};

export const All = () => {
  return (
    <div style={{ display: 'flex', width: '200px', flexWrap: 'wrap' }}>
      {skillNames.map((name) => (
        <SkillIcon name={name} key={name} size={24} />
      ))}
    </div>
  );
};
