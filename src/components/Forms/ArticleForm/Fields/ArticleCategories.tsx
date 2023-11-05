import type { ArticleCategory } from '~/services/article';

import { css } from '@emotion/react';
import { useMemo } from 'react';

import { SelectBox } from '~/components/Common/SelectBox';
import { selectBoxClassnames } from '~/components/Common/SelectBox/classnames';
import { useArticleFormContext } from '~/components/Forms/ArticleForm/utils';
import { palettes } from '~/styles/utils';

const fieldName = 'category';

interface ArticleCategoriesProps {
  articleCategories: ArticleCategory[];
  disabled?: boolean;
}

export const ArticleCategories = (props: ArticleCategoriesProps) => {
  const {
    register,
    setValue,
    formState: { defaultValues: { category: defaultCategoryId } = {} },
  } = useArticleFormContext();
  const { articleCategories, disabled } = props;
  const articleCategoryIdsSet = useMemo(
    () => new Set(articleCategories.map(({ boardId }) => boardId)),
    [articleCategories]
  );
  const validateCategory = (categoryId?: number) => {
    if (categoryId === undefined || categoryId === null) return false;
    return articleCategoryIdsSet.has(categoryId);
  };
  const defaultValue = validateCategory(defaultCategoryId)
    ? String(defaultCategoryId)
    : String(articleCategories[0].boardId);

  register(fieldName, {
    validate: (value) => {
      return validateCategory(value) || '게시판을 선택해주세요.';
    },
  });

  return (
    <div css={selfCss}>
      <SelectBox
        onValueChange={(value) =>
          setValue(fieldName, Number(value), { shouldDirty: true })
        }
        disabled={disabled}
        items={articleCategories}
        textAs={({ title }) => title}
        valueAs={({ boardId }) => String(boardId)}
        size="md"
        placeholder="게시판 선택"
        defaultValue={defaultValue}
      />
    </div>
  );
};

const selfCss = css({
  border: `1px solid #BCBCBC`,
  borderBottom: 0,
  backgroundColor: palettes.white,
  [`& .${selectBoxClassnames.item}`]: {
    background: palettes.grey5,
  },
});
