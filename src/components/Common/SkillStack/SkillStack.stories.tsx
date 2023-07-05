import type { SkillStackProps } from './index';
import type { Meta } from '@storybook/react';

import SkillStack from './index';

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

const meta: Meta<typeof SkillStack> = {
  title: 'Icon/SkillStack',
  component: SkillStack,
  tags: ['autodocs'],
  argTypes: {
    stack: {
      options: stacks,
      control: { type: 'select' },
    },
  },
};

export default meta;

export const Single = (props: SkillStackProps) => {
  const { stack = 'React', size } = props;
  return <SkillStack stack={stack} size={size} />;
};

export const All = () => {
  return (
    <div style={{ display: 'flex', width: '200px', flexWrap: 'wrap' }}>
      {stacks.map((s) => (
        <SkillStack stack={s} key={s} size={24} />
      ))}
    </div>
  );
};
