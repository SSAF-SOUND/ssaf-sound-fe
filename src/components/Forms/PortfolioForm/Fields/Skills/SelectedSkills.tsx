import type { PortfolioFormValues } from '~/components/Forms/PortfolioForm/utils';

import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useTransformContext } from 'react-zoom-pan-pinch';

import { inlineFlex } from '~/styles/utils';

import SkillsSorter from './SkillsSorter';

const fieldName = 'skills';
const midOrder = 50;
const maxOrder = 101;

const SelectedSkills = () => {
  const { setCenter } = useTransformContext();
  const skills = useWatch<PortfolioFormValues>({
    name: fieldName,
  }) as Record<string, number | undefined>;

  const selectedSkills = Object.entries(skills)
    .filter(([, selectedOrder]) => selectedOrder)
    .sort(([, num1], [, num2]) => (num1 as number) - (num2 as number))
    .map(([skillName]) => skillName);

  useEffect(() => {
    setCenter();
  }, [setCenter]);

  return (
    <div css={selfCss}>
      <SkillsSorter skillNames={selectedSkills} maxOrder={maxOrder} />
      <div css={paddingCss} style={{ order: midOrder }} />
      {Boolean(selectedSkills.length % 2) && (
        <div css={paddingCss} style={{ order: maxOrder }} />
      )}
    </div>
  );
};

export default SelectedSkills;
const selfCss = inlineFlex('center', 'center', 'row', 28);
const paddingCss = css({ width: 60, height: 60 });
