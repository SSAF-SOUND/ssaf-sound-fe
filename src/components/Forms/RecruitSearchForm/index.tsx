import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';

import { useRouter } from 'next/router';

import SearchBarForm from '~/components/Forms/SearchBarForm';
import { useGetQueryString } from '~/hooks';
import { customToast } from '~/utils';

export const RecruitSearchForm = () => {
  const router = useRouter();
  const queryKeyword = useGetQueryString('keyword');
  const onValidSubmit: SearchBarFormProps['onValidSubmit'] = async (
    reset,
    formValues
  ) => {
    const { keyword } = formValues;

    if (keyword === queryKeyword) {
      return;
    }
    reset((formValues) => ({
      ...formValues,
      keyword: '',
    }));

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        keyword: keyword,
      },
    });
  };

  const onInvalidSubmit: SearchBarFormProps['onInvalidSubmit'] = (
    errorMessage
  ) => {
    if (errorMessage) {
      customToast.clientError(errorMessage);
    }
  };

  return (
    <SearchBarForm
      onValidSubmit={onValidSubmit}
      onInvalidSubmit={onInvalidSubmit}
    />
  );
};
