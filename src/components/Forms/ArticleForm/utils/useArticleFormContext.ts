import type { ArticleFormValues } from '~/components/Forms/ArticleForm/utils/types';

import { useFormContext } from 'react-hook-form';


export const useArticleFormContext = () => {
  return useFormContext<ArticleFormValues>();
};
