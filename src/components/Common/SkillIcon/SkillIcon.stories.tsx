import type { SkillIconProps } from './index';
import type { Meta } from '@storybook/react';

import SkillIcon from './index';

const stacks = [
  'React',
  'JavaScript',
  'TypeScript',
  'Vue',
  'Svelte',
  'NextJs',
  'Java',
  'NodeJs',
  'Spring',
  'Django',
  'Android',
  'IOS',
  'Swift',
  'Flutter',
  'XD',
  'Figma',
] as const;

const meta: Meta<typeof SkillIcon> = {
  title: 'Icon/Skill',
  component: SkillIcon,
  tags: ['autodocs'],
};

export default meta;

export const Single = (props: SkillIconProps) => {
  const { name = 'React', size } = props;
  return <SkillIcon name={name} size={size} />;
};

export const All = () => {
  return (
    <div style={{ display: 'flex', width: '200px', flexWrap: 'wrap' }}>
      {stacks.map((s) => (
        <SkillIcon name={s} key={s} size={24} />
      ))}
    </div>
  );
};
