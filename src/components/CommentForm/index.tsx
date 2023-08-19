import type { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';

import { flex, palettes } from '~/styles/utils';

import { CommentFormButton } from './CommentFormButton';
import { CommentFormCheckBox } from './CommentFormCheckbox';
import { CommentFormTextArea } from './CommentFormTextArea';

interface DefaultValues {
  commentText?: string;
  anonymousChecked?: boolean;
}

interface CommentFormProps extends ComponentPropsWithoutRef<'form'> {
  withAnonymousCheck?: boolean;
  defaultValues?: DefaultValues;
}

const COMMENT_TEXT_AREA_NAME = 'commentText';
const COMMENT_CHECKBOX_NAME = 'anonymousChecked';

export const CommentForm = (props: CommentFormProps) => {
  const {
    withAnonymousCheck = true,
    defaultValues = { commentText: '', anonymousChecked: true },
    ...restFormProps
  } = props;

  const { register, setValue, handleSubmit } = useForm<DefaultValues>({
    defaultValues,
  });

  const onSubmit = (d: DefaultValues) => console.log(d);

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={selfCss} {...restFormProps}>
      <CommentFormTextArea
        {...register(COMMENT_TEXT_AREA_NAME, {
          setValueAs: (value) => value.trim(),
        })}
      />
      <div css={wrapperCss}>
        {withAnonymousCheck && (
          <CommentFormCheckBox
            defaultChecked={defaultValues.anonymousChecked}
            onCheckedChange={(value) =>
              setValue(COMMENT_CHECKBOX_NAME, value as boolean)
            }
            {...register(COMMENT_CHECKBOX_NAME)}
          />
        )}
        <CommentFormButton />
      </div>
    </form>
  );
};
const selfCss = css(flex('center', 'space-between', 'row', 20), {
  padding: '8px 16px',
  width: '100%',
  borderRadius: 16,
  border: 'none',
  '&:focus': {
    outline: 'none',
  },
  background: palettes.white2,
  position: 'relative',
});

const wrapperCss = css(flex('', '', 'row', 6), {
  flex: '0 0 auto',
});
