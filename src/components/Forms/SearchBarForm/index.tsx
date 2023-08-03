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
const defaultMinKeywordLength = 3;
const validateKeyword = (minKeywordLength: number) => (value: string) => {
  return (
    value.trim().length >= minKeywordLength ||
    `검색어는 최소 ${minKeywordLength}자 이상이어야 합니다.`
  );
};

const defaultSearchBarFormValues = {
  keyword: '',
};

interface SearchBarFormValues {
  keyword: string;
}

interface SearchBarFormOptions {
  minKeywordLength: number;
}

export interface SearchBarFormProps {
  className?: string;
  style?: CSSProperties;
  onValidSubmit: SubmitHandlerWithReset<SearchBarFormValues>;
  onInvalidSubmit?: SubmitErrorHandlerWithErrorMessage<SearchBarFormValues>;
  defaultValues?: Partial<SearchBarFormValues>;
  options?: Partial<SearchBarFormOptions>;
}

const SearchBarForm = (props: SearchBarFormProps) => {
  const {
    defaultValues = defaultSearchBarFormValues,
    onValidSubmit,
    onInvalidSubmit,
    options = {},
    ...restProps
  } = props;

  const { minKeywordLength = defaultMinKeywordLength } = options;

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
            validate: validateKeyword(minKeywordLength),
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
