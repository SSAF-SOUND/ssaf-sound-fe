import type { CSSProperties } from 'react';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type {
  SubmitHandlerWithReset,
  SubmitErrorHandlerWithErrorMessage,
} from '~/components/Forms/utils/types';

import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';

import { Icon, IconButton, TextInput } from '~/components/Common';
import { position } from '~/styles/utils';

const fieldName = 'keyword';
const minLength = 3;
const defaultValidateKeyword = (value: string) => {
  const formatted = value.trim();
  if (formatted.length < minLength) {
    return `검색어는 최소 ${minLength}자 이상이어야 합니다.`;
  }
};

const defaultSearchBarFormValues = {
  keyword: '',
};

interface SearchBarFormValues {
  keyword: string;
}

export interface SearchBarFormProps {
  className?: string;
  style?: CSSProperties;
  validate?: (value: string) => boolean | string;
  onValidSubmit: SubmitHandlerWithReset<SearchBarFormValues>;
  onInvalidSubmit?: SubmitErrorHandlerWithErrorMessage<SearchBarFormValues>;
  defaultValues?: Partial<SearchBarFormValues>;
}

const SearchBarForm = (props: SearchBarFormProps) => {
  const {
    defaultValues = defaultSearchBarFormValues,
    onValidSubmit,
    onInvalidSubmit,
    validate = defaultValidateKeyword,
    ...restProps
  } = props;

  const { register, handleSubmit, reset } = useForm<SearchBarFormValues>({
    defaultValues,
  });

  const handleValidSubmit: SubmitHandler<SearchBarFormValues> = async (
    formValues
  ) => {
    await onValidSubmit(reset, formValues);
  };

  const handleInvalidSubmit: SubmitErrorHandler<SearchBarFormValues> = (
    errors
  ) => {
    const errorMessage = errors.keyword?.message || '';

    onInvalidSubmit?.(errorMessage, errors);
  };

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}
      {...restProps}
    >
      <div css={inputContainerCss}>
        <TextInput
          autoComplete="off"
          rounded
          size="md"
          css={searchBarInputCss}
          {...register(fieldName, {
            validate,
          })}
        />
        <IconButton type="submit" css={searchButtonCss} theme="black" size={34}>
          <Icon name="search" size={28} />
        </IconButton>
      </div>
    </form>
  );
};

export default SearchBarForm;

const inputContainerCss = css({
  position: 'relative',
});

const searchButtonCss = css(
  {
    right: 12,
  },
  position.y('center', 'absolute')
);

const searchBarInputCss = css({
  width: '100%',
  padding: '0 44px 0 20px',
});
