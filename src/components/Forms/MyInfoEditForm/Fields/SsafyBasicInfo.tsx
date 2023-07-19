import type { MyInfoEditFormValues } from '~/components/Forms/MyInfoEditForm/utils';

import { css } from '@emotion/react';
import { isBoolean } from 'is-what';
import { useId } from 'react';
import { useWatch } from 'react-hook-form';

import { SelectBox } from '~/components/Common';
import Label from '~/components/Common/Label';
import { useMyInfoEditFormContext } from '~/components/Forms/MyInfoEditForm/utils';
import campus from '~/components/Forms/UserRegisterForm/Fields/Campus';
import { extractNumericText } from '~/services/member';
import { useCampuses, useYears } from '~/services/meta';
import { flex } from '~/styles/utils';

const ssafyBasicInfoFieldName = 'ssafyBasicInfo' as const;
const ssafyMemberFieldName = `${ssafyBasicInfoFieldName}.ssafyMember` as const;
const yearFieldName = `${ssafyBasicInfoFieldName}.year` as const;
const campusFieldName = `${ssafyBasicInfoFieldName}.campus` as const;

enum IsSsafyMember {
  YES = '네',
  NO = '아니오',
}

const resolveSsafyMemberFieldValue = (value?: boolean) => {
  if (!isBoolean(value)) return value;
  return value ? IsSsafyMember.YES : IsSsafyMember.NO;
};

export const SsafyBasicInfo = () => {
  const { data: campuses } = useCampuses();
  const { data: years } = useYears();
  const {
    register,
    setValue,
    formState: { defaultValues = {} },
  } = useMyInfoEditFormContext();
  const { ssafyBasicInfo: { campus: defaultCampus, year: defaultYear } = {} } =
    defaultValues;

  const ssafyMemberSelectBoxId = useId();
  const yearSelectBoxId = useId();
  const campusSelectBoxId = useId();

  const ssafyMember = useWatch<MyInfoEditFormValues>({
    name: ssafyMemberFieldName,
  }) as boolean | undefined;

  const handleSelectSsafyMember = (value: string) => {
    const fieldValue = value === IsSsafyMember.YES;
    setValue(ssafyMemberFieldName, fieldValue, {
      shouldDirty: true,
    });
  };

  const handleSelectYear = (value: string) => {
    setValue(yearFieldName, Number(extractNumericText(value)), {
      shouldDirty: true,
    });
  };

  const handleSelectCampus = (value: string) => {
    setValue(campusFieldName, value, {
      shouldDirty: true,
    });
  };

  register(ssafyMemberFieldName, {
    validate: (value) => isBoolean(value),
  });

  register(yearFieldName, {
    validate: (value, formValues) => {
      if (formValues.ssafyBasicInfo.ssafyMember) {
        if (value === undefined) return '기수를 선택해주세요.';
      }

      return true;
    },
  });

  register(campusFieldName, {
    validate: (value, formValues) => {
      if (formValues.ssafyBasicInfo.ssafyMember) {
        if (value === undefined) return '캠퍼스를 선택해주세요.';
      }

      return true;
    },
  });

  return (
    <div css={selfCss}>
      <Label
        htmlFor={ssafyMemberSelectBoxId}
        css={labelCss}
        name="SSAFY인 여부"
        style={{ zIndex: 3 }}
      >
        <SelectBox
          id={ssafyMemberSelectBoxId}
          size="lg"
          value={resolveSsafyMemberFieldValue(ssafyMember)}
          items={Object.values(IsSsafyMember)}
          onValueChange={handleSelectSsafyMember}
        />
      </Label>
      <Label
        htmlFor={yearSelectBoxId}
        css={labelCss}
        name="SSAFY 기수 선택"
        style={{ zIndex: 2 }}
      >
        <SelectBox
          defaultValue={String(defaultYear)}
          disabled={!ssafyMember}
          id={yearSelectBoxId}
          size="lg"
          items={years.map(String)}
          textAs={(value) => value + '기'}
          onValueChange={handleSelectYear}
        />
      </Label>
      <Label
        htmlFor={campusSelectBoxId}
        css={labelCss}
        name="SSAFY 캠퍼스 선택"
        style={{ zIndex: 1 }}
      >
        <SelectBox
          defaultValue={defaultCampus}
          disabled={!ssafyMember}
          id={campusSelectBoxId}
          size="lg"
          items={campuses}
          onValueChange={handleSelectCampus}
        />
      </Label>
    </div>
  );
};

const selfCss = css(flex('', 'flex-start', 'column', 30));
const labelCss = css({ position: 'relative' });
