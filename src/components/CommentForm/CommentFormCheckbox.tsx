import type { CheckboxProps } from '../Common/Checkbox';

import { css } from '@emotion/react';
import { useId } from 'react';

import { Checkbox } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

interface CommentFormCheckBoxProps extends Omit<CheckboxProps, 'id'> {
  loading?: boolean;
}

export const CommentFormCheckBox = (props: CommentFormCheckBoxProps) => {
  const { loading = false, ...restProps } = props;
  const id = useId();
  return (
    <div css={selfCss}>
      <Checkbox size={17} disabled={loading} {...restProps} id={id} />
      <label css={LabelCss} htmlFor={id}>
        익명
      </label>
    </div>
  );
};

const selfCss = css(flex('center', '', 'row', 3));

const LabelCss = css(fontCss.style.B14, fontCss.family.auto, {
  color: palettes.black,
});
