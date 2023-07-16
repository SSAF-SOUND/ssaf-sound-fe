import { css } from '@emotion/react';
import { useId, useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import SelectedSkills from '~/components/PortfolioForm/Fields/Skills/SelectedSkills';
import SkillSelectButton from '~/components/PortfolioForm/Fields/Skills/SkillSelectButton';
import { usePortfolioFormContext } from '~/components/PortfolioForm/utils';
import { SkillName } from '~/services/recruit';
import { flex, fontCss, palettes, position } from '~/styles/utils';

import Checkbox from './Checkbox';

const fieldName = 'skills';

interface SkillsProps {
  className?: string;
}

export const Skills = (props: SkillsProps) => {
  const { className } = props;
  const selectedOrderRef = useRef<number>(1);
  const { register } = usePortfolioFormContext();

  const [showSkillSelectButtons, setShowSkillSelectButtons] = useState(false);
  const showSkillSelectButtonsTriggerId = useId();
  const handleCheckedChange = () => setShowSkillSelectButtons((p) => !p);

  register(fieldName);

  return (
    <div css={selfCss} className={className}>
      <label htmlFor={showSkillSelectButtonsTriggerId} css={labelCss}>
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
          <TransformComponent>
            <SelectedSkills />
          </TransformComponent>
          <Checkbox
            css={position.x('center', 'absolute')}
            checked={showSkillSelectButtons}
            id={showSkillSelectButtonsTriggerId}
            onCheckedChange={handleCheckedChange}
          />
        </div>

        {showSkillSelectButtons && (
          <div css={skillSelectButtonsCss}>
            {Object.values(SkillName).map((skillName) => (
              <SkillSelectButton
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

// 페이지 padding 값에 따라 negative margin 조절
const selectedSkillsCss = css(
  { marginBottom: 20 },
  flex('center', 'center', 'row')
);

const skillSelectButtonsCss = css(flex('center', 'center', 'row', 8, 'wrap'));
