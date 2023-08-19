import type { ComponentPropsWithoutRef, Ref } from 'react';

import { css } from '@emotion/react';
import { forwardRef } from 'react';

import { flex, fontCss } from '~/styles/utils';

interface ApplyTextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  withMax?: boolean;
}
export const ApplyTextArea = forwardRef(
  (props: ApplyTextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    const { withMax = true, ...restProps } = props;
    return (
      <div css={selfCss}>
        {withMax && <span css={textCss}>(글자 수 500자 내)</span>}

        <textarea {...restProps} rows={5} ref={ref} css={textAreaCss} />
      </div>
    );
  }
);

const selfCss = css(flex('', '', 'column', 4));
const textCss = css(fontCss.family.auto, fontCss.style.R12);
const textAreaCss = css({
  borderRadius: 8,
  padding: '20px',
});

ApplyTextArea.displayName = 'ApplyTextArea';
