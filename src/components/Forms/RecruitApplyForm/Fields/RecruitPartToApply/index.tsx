import type { RecruitDetail } from '~/services/recruit';

import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';

import { AlertText } from '~/components/Common';
import { SelectBox } from '~/components/Common/SelectBox';
import { RecruitApplyFormFieldTitle } from '~/components/Forms/RecruitApplyForm/RecruitApplyFormFieldTitle';
import {
  recruitApplyFormFieldOrder,
  useRecruitApplyFormContext,
} from '~/components/Forms/RecruitApplyForm/utils';
import {
  RecruitCategoryName,
  RecruitPartsSet,
  RecruitParts,
} from '~/services/recruit';
import { flex, fontCss, palettes } from '~/styles/utils';
import { isEqualString } from '~/utils';

const fieldName = 'recruitPartToApply';
const validateRecruitPartToApply = (value: RecruitParts) =>
  RecruitPartsSet.has(value) || '올바른 지원파트를 선택해주세요';
const fieldOrder =
  recruitApplyFormFieldOrder.recruitPartToApply[RecruitCategoryName.PROJECT];

interface RecruitPartToApplyProps {
  recruitDetail: RecruitDetail;
  className?: string;
  readonly?: boolean;
}

export const RecruitPartToApply = (props: RecruitPartToApplyProps) => {
  const { recruitDetail, className, readonly = false } = props;
  const { category } = recruitDetail;
  const {
    register,
    setValue,
    formState: {
      defaultValues: { recruitPartToApply: defaultRecruitPartToApply } = {},
    },
  } = useRecruitApplyFormContext();

  const { limits } = recruitDetail;
  const possibleRecruitParts = limits.map(({ recruitType }) => recruitType);

  const isCategoryProject = isEqualString(
    category,
    RecruitCategoryName.PROJECT,
    { caseSensitive: false }
  );

  register(fieldName, {
    validate: validateRecruitPartToApply,
  });

  useEffect(() => {
    if (isCategoryProject) return;
    setValue(fieldName, RecruitParts.STUDY);

    // eslint-disable-next-line
  }, []);

  if (!isCategoryProject) return <></>;

  return (
    <div css={[selfCss, readonly && readonlySelfCss]} className={className}>
      <RecruitApplyFormFieldTitle css={titleMarginCss}>
        {fieldOrder}. 지원파트를 선택해주세요.
      </RecruitApplyFormFieldTitle>

      <ErrorMessage
        name={fieldName}
        render={({ message }) => (
          <AlertText css={titleMarginCss}>{message}</AlertText>
        )}
      />

      {readonly ? (
        <div css={readonlyCss}>{defaultRecruitPartToApply}</div>
      ) : (
        <SelectBox
          defaultValue={defaultRecruitPartToApply}
          items={possibleRecruitParts}
          size="lg"
          onValueChange={(selectedPart) =>
            setValue(fieldName, selectedPart as RecruitParts, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
      )}
    </div>
  );
};

const selfCss = css({ minHeight: 280 });
const readonlySelfCss = css({ minHeight: 200 });
const titleMarginCss = css({ marginBottom: 10 });
const readonlyCss = css(
  {
    width: '100%',
    height: 44,
    backgroundColor: palettes.background.grey,
    color: palettes.white,
    borderRadius: 8,
    padding: '0 20px',
    userSelect: 'none',
  },
  fontCss.style.R14,
  flex('center', '', 'row')
);
