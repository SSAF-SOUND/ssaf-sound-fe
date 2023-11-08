import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';

import SearchBarForm from '~/components/Forms/SearchBarForm';
import { customToast } from '~/utils/customToast';

export interface SearchBarProps {
  className?: string;
  keyword: string;
  onSubmit: (keyword: string) => void;
}

/**
 * - 게시글 검색, 리쿠르팅 검색에 사용하는 공통된 Search Bar
 * - 이전 키워드와 동일한 검색어로는 검색 불가능
 */
export const SearchBar = (props: SearchBarProps) => {
  const { keyword, onSubmit, ...restProps } = props;

  const onValidSubmit: SearchBarFormProps['onValidSubmit'] = async (
    reset,
    formValues
  ) => {
    const { keyword: nextKeyword } = formValues;
    if (nextKeyword === keyword) return;

    reset({ keyword: nextKeyword });
    onSubmit(nextKeyword);
  };

  const onInvalidSubmit: SearchBarFormProps['onInvalidSubmit'] = (
    errorMessage
  ) => {
    if (errorMessage) customToast.clientError(errorMessage);
  };

  return (
    <SearchBarForm
      onValidSubmit={onValidSubmit}
      onInvalidSubmit={onInvalidSubmit}
      defaultValues={{ keyword }}
      options={{ allowEmptyString: true }}
      {...restProps}
    />
  );
};
