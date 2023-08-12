import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type { CommentFormValues } from '~/components/Forms/CommentForm/utils';
import type {
  SubmitErrorHandlerWithErrorMessage,
  SubmitHandlerWithReset,
} from '~/components/Forms/utils';

import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';

import { Checkbox, Icon, IconButton } from '~/components/Common';
import { flex, palettes } from '~/styles/utils';

const contentFieldName = 'content';
const anonymousFieldName = 'anonymous';

interface CommentFormOptions {
  showAnonymous: boolean;
}

export interface CommentFormProps {
  defaultValues?: CommentFormValues;
  onValidSubmit: SubmitHandlerWithReset<CommentFormValues>;
  onInvalidSubmit?: SubmitErrorHandlerWithErrorMessage<CommentFormValues>;
  options?: Partial<CommentFormOptions>;
}

const CommentForm = (props: CommentFormProps) => {
  const {
    onValidSubmit,
    onInvalidSubmit,
    defaultValues = defaultCommentFormValues,
    options = {},
  } = props;
  const { showAnonymous = true } = options;

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CommentFormValues>({
    defaultValues,
  });

  const onAnonymousChange = (value: boolean) =>
    setValue(anonymousFieldName, value);

  const handleValidSubmit: SubmitHandler<CommentFormValues> = async (
    ...args
  ) => {
    await onValidSubmit?.(reset, ...args);
  };

  const handleInvalidSubmit: SubmitErrorHandler<CommentFormValues> = async (
    ...args
  ) => {
    const errorMessage = errors.content?.message || errors.anonymous?.message;
    await onInvalidSubmit?.(errorMessage, ...args);
  };

  return (
    <form
      css={selfCss}
      onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}
    >
      <input
        type="text"
        {...register(contentFieldName)}
        css={{
          flexGrow: 1,
          border: 0,
          height: 40,
          padding: '4px 20px',
          outline: 0,
        }}
      />
      {showAnonymous && (
        <label css={checkboxLabelCss}>
          <Checkbox
            {...register(anonymousFieldName)}
            onCheckedChange={onAnonymousChange}
          />
          <span>익명</span>
        </label>
      )}
      <IconButton type="submit" theme="black" disabled={isSubmitting} size={30}>
        <Icon name="send" label="댓글 작성" size={20} />
      </IconButton>
    </form>
  );
};

const defaultCommentFormValues: CommentFormValues = {
  content: '',
  anonymous: false,
};

export default CommentForm;

const selfCss = css(
  { background: palettes.white, padding: '0 10px 0 0', color: palettes.black },
  flex('center', '', 'row', 8)
);

const checkboxLabelCss = css(
  { cursor: 'pointer' },
  flex('center', '', 'row', 4)
);
