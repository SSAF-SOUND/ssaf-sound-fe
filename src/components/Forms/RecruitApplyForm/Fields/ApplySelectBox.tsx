import type { QuestionProps } from './ApplyQuestion';
import type { SelectBoxProps } from '~/components/Common/SelectBox';

import { css } from '@emotion/react';

import { SelectBox } from '~/components/Common';
import { palettes } from '~/styles/utils';

import { ApplyQuestion } from './ApplyQuestion';
import { LabelWrapper } from './LabelWrapper';
import { disabledCss } from './utils';

interface ApplySelectBoxProps extends SelectBoxProps {
  readOnly?: boolean;
}

type ApplySelectBoxWithQuestion = ApplySelectBoxProps & QuestionProps;
export const ApplySelectBox = (props: ApplySelectBoxWithQuestion) => {
  const {
    readOnly = false,
    order = 1,
    question = '지원파트를 선택해주세요.',
    disabled = false,
    ...restProps
  } = props;
  return (
    <LabelWrapper>
      <ApplyQuestion order={order} question={question} />
      <SelectBox
        {...restProps}
        size="md"
        withIcon={false}
        disabled={readOnly ? undefined : disabled}
        css={readOnly && [readonlyCss, disabledCss]}
      />
    </LabelWrapper>
  );
};

const readonlyCss = css({
  /**
   * 이 Field를 재활용해서 만들 수 있는 페이지가 너무 많았지만,
   * 기존 사용하고 있었던 컴포넌트의 스타일을 (disabled 고정스타일) 지금 바꾸는 것은
   * 위험성이 너무 커 보였어요.
   * 그래서 우선, 스타일만 입히고 포인터이벤트를 불가능하도록 했습니다.
   */
  pointerEvents: 'none',
});
