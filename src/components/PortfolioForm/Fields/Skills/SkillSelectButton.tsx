import type { MutableRefObject } from 'react';
import type { PortfolioFormValues } from '~/components/PortfolioForm/utils';
import type { SkillName } from '~/services/recruit';

import { useWatch } from 'react-hook-form';
import { useTransformContext } from 'react-zoom-pan-pinch';

import { usePortfolioFormContext } from '~/components/PortfolioForm/utils';
import SkillBadge from '~/components/SkillBadge';

const fieldName = 'skills';

interface SkillSelectButtonProps {
  skillName: SkillName;
  selectedOrderRef: MutableRefObject<number>;
}

const SkillSelectButton = (props: SkillSelectButtonProps) => {
  const { skillName, selectedOrderRef } = props;
  const { setCenter } = useTransformContext();
  const { setValue } = usePortfolioFormContext();
  const selectedOrder = useWatch<PortfolioFormValues>({
    name: `${fieldName}.${skillName}`,
    defaultValue: undefined,
  }) as number | undefined;

  return (
    <SkillBadge
      defaultPressed={!!selectedOrder}
      name={skillName}
      onPressedChange={(selectedOrder) => {
        setValue(
          `${fieldName}.${skillName}`,
          selectedOrder ? selectedOrderRef.current++ : undefined
        );
        setTimeout(() => setCenter());
      }}
    />
  );
};

export default SkillSelectButton;
