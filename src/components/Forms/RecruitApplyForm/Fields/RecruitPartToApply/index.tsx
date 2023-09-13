import type { RecruitDetail, RecruitParts } from '~/services/recruit';


import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';

import { AlertText } from '~/components/Common';
import { SelectBox } from '~/components/Common/SelectBox';
import { RecruitApplyFormFieldTitle } from '~/components/Forms/RecruitApplyForm/RecruitApplyFormFieldTitle';
import {
  recruitApplyFormFieldOrder,
  useRecruitApplyFormContext,
} from '~/components/Forms/RecruitApplyForm/utils';
import { RecruitCategoryName, RecruitPartsSet } from '~/services/recruit';

interface RecruitPartToApplyProps {
  recruitDetail: RecruitDetail;
  className?: string;
}

const fieldName = 'recruitPartToApply';
const validateRecruitPartToApply = (value: RecruitParts) =>
  RecruitPartsSet.has(value) || '올바른 지원파트를 선택해주세요';
const fieldOrder = recruitApplyFormFieldOrder.recruitPartToApply[RecruitCategoryName.PROJECT]

export const RecruitPartToApply = (props: RecruitPartToApplyProps) => {
  const { recruitDetail, className } = props;
  const { register, setValue } = useRecruitApplyFormContext();

  const { limits } = recruitDetail;
  const possibleRecruitParts = limits.map(({ recruitType }) => recruitType);

  register(fieldName, {
    validate: validateRecruitPartToApply,
  });

  return (
    <div css={selfCss} className={className}>
      <RecruitApplyFormFieldTitle css={titleMarginCss}>
        {fieldOrder}. 지원파트를
        선택해주세요.
      </RecruitApplyFormFieldTitle>

      <ErrorMessage
        name={fieldName}
        render={({ message }) => (
          <AlertText css={titleMarginCss}>{message}</AlertText>
        )}
      />

      <SelectBox
        items={possibleRecruitParts}
        size="lg"
        onValueChange={(selectedPart) =>
          setValue(fieldName, selectedPart as RecruitParts, {
            shouldDirty: true,
          })
        }
      />
    </div>
  );
};

const selfCss = css({ minHeight: 280 });
const titleMarginCss = css({ marginBottom: 10 });
