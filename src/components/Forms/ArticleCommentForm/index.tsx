import type { ArticleCommentFormValues } from './utils';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type {
  SubmitErrorHandlerWithErrorMessage,
  SubmitHandlerWithReset,
} from '~/components/Forms/utils';

import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';

import { AlertText, Checkbox, Icon, IconButton } from '~/components/Common';
import { flex, fontCss, palettes } from '~/styles/utils';

const contentFieldName = 'content';
const anonymousFieldName = 'anonymous';

const minCommentLength = 2;
const maxCommentLength = 300;
const validateComment = (value: string) => {
  const { length } = value;
  if (length < minCommentLength || length > maxCommentLength) {
    return `댓글의 내용은 ${minCommentLength}자 이상 ${maxCommentLength}자 이하여야 합니다.`;
  }

  return true;
};

interface ArticleCommentFormOptions {
  showAnonymous: boolean;
}

export interface ArticleCommentFormProps {
  defaultValues?: ArticleCommentFormValues;
  onValidSubmit: SubmitHandlerWithReset<ArticleCommentFormValues>;
  onInvalidSubmit?: SubmitErrorHandlerWithErrorMessage<ArticleCommentFormValues>;
  options?: Partial<ArticleCommentFormOptions>;
  className?: string;
}

const ArticleCommentForm = (props: ArticleCommentFormProps) => {
  const {
    onValidSubmit,
    onInvalidSubmit,
    defaultValues = defaultArticleCommentFormValues,
    options = {},
    className,
  } = props;
  const { showAnonymous = true } = options;

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ArticleCommentFormValues>({
    defaultValues,
  });

  const onAnonymousChange = (value: boolean) =>
    setValue(anonymousFieldName, value, { shouldDirty: true });

  const handleValidSubmit: SubmitHandler<ArticleCommentFormValues> = async (
    ...args
  ) => {
    await onValidSubmit?.(reset, ...args);
  };

  const handleInvalidSubmit: SubmitErrorHandler<
    ArticleCommentFormValues
  > = async (errors, event) => {
    const errorMessage = errors.content?.message || errors.anonymous?.message;
    await onInvalidSubmit?.(errorMessage, errors, event);
  };

  register(anonymousFieldName);

  return (
    <form
      css={selfCss}
      className={className}
      onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}
    >
      <div css={fieldsLayerCss}>
        <textarea
          css={textAreaCss}
          placeholder="댓글을 입력하세요"
          {...register(contentFieldName, {
            validate: validateComment,
          })}
        />

        {showAnonymous && (
          <label css={checkboxLabelCss}>
            <Checkbox
              onCheckedChange={onAnonymousChange}
              defaultChecked={defaultValues.anonymous}
            />
            <span>익명</span>
          </label>
        )}

        <IconButton
          type="submit"
          theme="black"
          disabled={isSubmitting}
          size={24}
          css={submitButtonCss}
        >
          <Icon name="send" label="댓글 작성" size={20} />
        </IconButton>
      </div>

      <ErrorMessage
        name={contentFieldName}
        errors={errors}
        render={({ message }) =>
          message && (
            <AlertText css={errorMessageCss} bold>
              {message}
            </AlertText>
          )
        }
      />
    </form>
  );
};

const defaultArticleCommentFormValues: ArticleCommentFormValues = {
  content: '',
  anonymous: false,
};

export default ArticleCommentForm;

const selfCss = css({
  background: palettes.white,
  padding: 10,
  paddingLeft: 0,
  color: palettes.black,
  borderRadius: 20,
  ':focus-within': {
    outline: `3px solid ${palettes.primary.default}`,
  },
});

const fieldsLayerCss = css(flex('flex-end', '', 'row', 8));

const checkboxLabelCss = css(
  { display: 'block', cursor: 'pointer', flexShrink: 0 },
  fontCss.style.B14,
  flex('center', '', 'row', 2)
);

const textAreaCss = css(
  {
    width: '100%',
    flexGrow: 1,
    border: 0,
    height: 40,
    padding: '4px 20px',
    outline: 0,
    borderRadius: 20,
    resize: 'vertical',
    minHeight: 48,
  },
  fontCss.style.R14
);

const submitButtonCss = css({
  flexShrink: 0,
});

const errorMessageCss = css({
  paddingLeft: 20,
  marginTop: 8,
});
