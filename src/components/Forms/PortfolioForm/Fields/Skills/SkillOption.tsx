import type { MutableRefObject } from 'react';
import type { PortfolioFormValues } from '~/components/Forms/PortfolioForm/utils';
import type { SkillName } from '~/services/recruit';

import { useWatch } from 'react-hook-form';
import { useTransformContext } from 'react-zoom-pan-pinch';

import { usePortfolioFormContext } from '~/components/Forms/PortfolioForm/utils';
import SkillBadge from '~/components/SkillBadge';

const fieldName = 'skills';

interface SkillSelectButtonProps {
  skillName: SkillName;
  selectedOrderRef: MutableRefObject<number>;
}

const SkillOption = (props: SkillSelectButtonProps) => {
  const { skillName, selectedOrderRef } = props;
  const optionFieldName = `${fieldName}.${skillName}` as const;
  const { setCenter } = useTransformContext();
  const { setValue } = usePortfolioFormContext();
  const selectedOrder = useWatch<PortfolioFormValues>({
    name: optionFieldName,
  }) as number | undefined;
  const getNextOrder = () => {
    return selectedOrderRef.current++;
  };
  const handlePressedChange = (pressed: boolean) => {
    setValue(optionFieldName, pressed ? getNextOrder() : undefined, {
      shouldDirty: true,
    });
    setTimeout(() => setCenter());
  };

  return (
    <SkillBadge
      defaultPressed={!!selectedOrder}
      name={skillName}
      onPressedChange={handlePressedChange}
    />
  );
};

export default SkillOption;
