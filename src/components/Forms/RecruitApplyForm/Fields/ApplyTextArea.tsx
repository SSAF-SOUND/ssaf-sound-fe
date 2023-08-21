import type { QuestionProps } from './ApplyQuestion';
import type { ComponentPropsWithoutRef, Ref } from 'react';

import { css } from '@emotion/react';
import { forwardRef } from 'react';

import { flex, fontCss, palettes, resetStyle } from '~/styles/utils';

import { ApplyQuestion } from './ApplyQuestion';
import { LabelWrapper } from './LabelWrapper';
import { disabledCss } from './utils';

interface ApplyTextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  withMax?: boolean;
}

type ApplyTextAreaWithQuestion = ApplyTextAreaProps & QuestionProps;
export const ApplyTextArea = forwardRef(
  (props: ApplyTextAreaWithQuestion, ref: Ref<HTMLTextAreaElement>) => {
    const {
      withMax = true,
      order = 1,
      question = 'TextArea Question',
      disabled = false,
      ...restProps
    } = props;

    return (
      <LabelWrapper>
        <ApplyQuestion order={order} question={question} />

        <div css={selfCss}>
          {withMax && <span css={textCss}>(글자 수 500자 내)</span>}
          <textarea
            {...restProps}
            rows={5}
            ref={ref}
            css={[textAreaCss, disabled && disabledCss]}
            disabled={disabled}
          />
        </div>
      </LabelWrapper>
    );
  }
);

const selfCss = css(flex('', '', 'column', 4));
const textCss = css(fontCss.family.auto, fontCss.style.R12);
const textAreaCss = css(resetStyle.textArea(), {
  borderRadius: 8,
  padding: '20px',
  background: palettes.white,
});

ApplyTextArea.displayName = 'ApplyTextArea';
