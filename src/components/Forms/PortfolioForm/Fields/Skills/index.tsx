import { css } from '@emotion/react';
import { useId, useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { usePortfolioFormContext } from '~/components/Forms/PortfolioForm/utils';
import { SkillName } from '~/services/recruit';
import { expandStyle, flex, fontCss, palettes, position } from '~/styles/utils';
import { clamp } from '~/utils';

import SelectedSkills from './SelectedSkills';
import SkillOption from './SkillOption';
import SkillOptionsVisibilityToggle from './SkillOptionsVisibilityToggle';

const fieldName = 'skills';

interface SkillsProps {
  className?: string;
  marginForExpand?: string;
}

export const Skills = (props: SkillsProps) => {
  const { className, marginForExpand } = props;
  const {
    register,
    formState: { defaultValues: { skills: defaultSkills = {} } = {} },
  } = usePortfolioFormContext();
  const selectedOrderRef = useRef<number>(getStartOrder(defaultSkills));

  const [showSkillOptions, setShowSkillOptions] = useState(false);
  const showSkillOptionsTriggerId = useId();
  const handleCheckedChange = () => setShowSkillOptions((p) => !p);

  register(fieldName);

  return (
    <div css={selfCss} className={className}>
      <label htmlFor={showSkillOptionsTriggerId} css={labelCss}>
        ② 사용하시는 기술스택을 자유롭게 골라주세요
      </label>

      <TransformWrapper
        minScale={1}
        maxScale={1}
        panning={{ lockAxisY: true }}
        limitToBounds={true}
        disablePadding={true}
      >
        <div css={selectedSkillsCss}>
          <TransformComponent
            wrapperStyle={
              marginForExpand ? expandStyle(marginForExpand) : undefined
            }
          >
            <SelectedSkills />
          </TransformComponent>
          <SkillOptionsVisibilityToggle
            css={position.x('center', 'absolute')}
            checked={showSkillOptions}
            id={showSkillOptionsTriggerId}
            onCheckedChange={handleCheckedChange}
          />
        </div>

        {showSkillOptions && (
          <div css={skillOptionCss}>
            {Object.values(SkillName).map((skillName) => (
              <SkillOption
                key={skillName}
                skillName={skillName}
                selectedOrderRef={selectedOrderRef}
              />
            ))}
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};

const getStartOrder = (skills: Record<string, number | undefined>) => {
  const orders = Object.values(skills).filter(Boolean) as number[];
  const maxOrder = clamp(Math.max(...orders), [0, 10000]);
  return maxOrder + 1;
};

const selfCss = css({ position: 'relative' });

const labelCss = css(
  {
    cursor: 'pointer',
    color: palettes.font.lightGrey,
    display: 'inline-block',
    marginBottom: 44,
  },
  fontCss.style.R14
);

const selectedSkillsCss = css(
  { marginBottom: 20 },
  flex('center', 'center', 'row')
);

const skillOptionCss = css(flex('center', 'center', 'row', 8, 'wrap'));
