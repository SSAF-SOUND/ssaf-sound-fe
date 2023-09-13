import type { RecruitCategoryName } from '~/services/recruit';

import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';

import { AlertText } from '~/components/Common';
import { AgreeToProvideProfileCheckbox } from '~/components/Forms/RecruitApplyForm/Fields/AgreeToProvideProfile/AgreeToProvideProfileCheckbox';
import { RecruitApplyFormFieldTitle } from '~/components/Forms/RecruitApplyForm/RecruitApplyFormFieldTitle';
import {
  recruitApplyFormFieldOrder,
  useRecruitApplyFormContext,
} from '~/components/Forms/RecruitApplyForm/utils';
import { getRecruitThemeByCategory } from '~/services/recruit';

interface AgreeToProvideProfileProps {
  className?: string;
  category: RecruitCategoryName;
}

const fieldName = 'agreeToProvideProfile';

export const AgreeToProvideProfile = (props: AgreeToProvideProfileProps) => {
  const { category, className } = props;
  const { register, setValue } = useRecruitApplyFormContext();

  const fieldOrder = recruitApplyFormFieldOrder.agreeToProvideProfile[category];
  const recruitTheme = getRecruitThemeByCategory(category);

  register(fieldName, {
    required: '지원하기 위해서는 프로필 제공에 동의해야합니다.',
  });

  const onCheckedChange = (checked: boolean) =>
    setValue(fieldName, checked, { shouldDirty: true });

  return (
    <div css={selfCss} className={className}>
      <RecruitApplyFormFieldTitle css={titleMarginCss}>
        {fieldOrder}. 리쿠르팅 등록자에게 프로필이 공개됩니다. 이에
        동의하십니까?
      </RecruitApplyFormFieldTitle>
      <ErrorMessage
        name={fieldName}
        render={({ message }) => (
          <AlertText css={titleMarginCss}>{message}</AlertText>
        )}
      />
      <AgreeToProvideProfileCheckbox
        theme={recruitTheme}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};

const selfCss = css({});
const titleMarginCss = css({ marginBottom: 10 });
