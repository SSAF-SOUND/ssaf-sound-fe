import { css } from '@emotion/react';
import { isBoolean } from 'is-what';

import { SelectBox } from '~/components/Common/SelectBox';
import { useMyInfoEditFormContext } from '~/components/Forms/MyInfoEditForm/utils';

enum Major {
  MAJOR = '전공자',
  NON_MAJOR = '비전공자',
}

const fieldName = 'isMajor';

export const IsMajor = () => {
  const {
    register,
    setValue,
    formState: { defaultValues: { isMajor: defaultIsMajor } = {} },
  } = useMyInfoEditFormContext();

  const onIsMajorChange = (value: string) => {
    const isMajorValue = value === Major.MAJOR;
    setValue(fieldName, isMajorValue, { shouldDirty: true });
  };

  register(fieldName, {
    validate: (value) => {
      if (!isBoolean(value)) return '전공자 여부는 필수로 선택해야 합니다.';
      return defaultIsMajor !== value;
    },
  });

  return (
    <div css={selfCss}>
      <SelectBox
        focusOnMount
        defaultValue={defaultIsMajor ? Major.MAJOR : Major.NON_MAJOR}
        size="lg"
        items={Object.values(Major)}
        onValueChange={onIsMajorChange}
      />
    </div>
  );
};

const selfCss = css({});
