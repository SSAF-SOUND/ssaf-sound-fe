import type { ArticleCommentFormValues } from './utils';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type {
  SubmitErrorHandlerWithErrorMessage,
  SubmitHandlerWithReset,
} from '~/components/Forms/utils';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import TextAreaAutoSize from 'react-textarea-autosize';

import { AlertText, Checkbox, Icon, IconButton } from '~/components/Common';
import { flex, fontCss, palettes, Theme } from '~/styles/utils';
import { getPathname, routes, webStorage } from '~/utils';

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
  showNotSignedInFallback: boolean;
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
  const { showAnonymous = true, showNotSignedInFallback = false } = options;

  const methods = useForm<ArticleCommentFormValues>({
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

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

  if (showNotSignedInFallback) {
    return <NotSignedInFallback />;
  }

  return (
    <FormProvider {...methods}>
      <form
        css={selfCss}
        className={className}
        onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}
      >
        <div css={fieldsLayerCss}>
          <TextAreaAutoSize
            css={textAreaCss}
            placeholder="댓글을 입력하세요"
            {...register(contentFieldName, {
              validate: validateComment,
            })}
          />

          {showAnonymous && <Anonymous />}

          <IconButton
            type="submit"
            theme={Theme.BLACK}
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
    </FormProvider>
  );
};

export default ArticleCommentForm;

const defaultArticleCommentFormValues: ArticleCommentFormValues = {
  content: '',
  anonymous: false,
};

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

const Anonymous = () => {
  const {
    register,
    setValue,
    formState: { defaultValues: { anonymous: defaultAnonymous } = {} },
  } = useFormContext<ArticleCommentFormValues>();
  const onAnonymousChange = (value: boolean) =>
    setValue(anonymousFieldName, value, { shouldDirty: true });

  register(anonymousFieldName);

  return (
    <label css={checkboxLabelCss}>
      <Checkbox
        onCheckedChange={onAnonymousChange}
        defaultChecked={defaultAnonymous}
      />
      <span>익명</span>
    </label>
  );
};

const NotSignedInFallback = () => {
  const router = useRouter();
  const onClickSignInButton = () => {
    webStorage.setSignInReturnPage(getPathname());
    router.push(routes.signIn());
  };

  return (
    <div css={notSignedInFallbackSelfCss}>
      <div css={notSignedInFallbackMessageContainerCss}>
        <Icon name="signIn" size={16} />
        <div>
          <span>댓글을 쓰려면</span>{' '}
          <button
            type="button"
            css={signInButtonCss}
            onClick={onClickSignInButton}
          >
            로그인
          </button>
          <span>이 필요합니다.</span>
        </div>
      </div>
    </div>
  );
};

const notSignedInFallbackSelfCss = css(
  {
    backgroundColor: palettes.font.lightGrey,
    color: palettes.font.grey,
    height: 68,
    borderRadius: 20,
    padding: '10px 10px 10px 20px',
  },
  fontCss.style.R14
);

const notSignedInFallbackMessageContainerCss = css(
  flex('center', 'flex-start', 'row', 10)
);

const signInButtonCss = css(fontCss.style.B14, {
  padding: 0,
  color: palettes.primary.darken,
  textDecoration: 'underline',
  backgroundColor: 'inherit',
  cursor: 'pointer',
});
