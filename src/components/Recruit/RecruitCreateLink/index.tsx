import type { RecruitCategoryName } from '~/services/recruit';

import { CircleButton } from '~/components/Common';
import { getRecruitThemeByCategory } from '~/services/recruit';
import { routes } from '~/utils';

interface RecruitCreateLinkProps {
  category: RecruitCategoryName;
}

export const RecruitCreateLink = (props: RecruitCreateLinkProps) => {
  const { category } = props;
  const recruitTheme = getRecruitThemeByCategory(category);

  return (
    <CircleButton
      asLink
      href={routes.recruit.create({ category })}
      css={{ width: 44, height: 44 }}
      name="pencil.plus"
      label="리쿠르팅 작성 버튼"
      theme={recruitTheme}
    />
  );
};
