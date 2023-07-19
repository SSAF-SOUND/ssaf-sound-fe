import { css } from '@emotion/react';
import { isBoolean } from 'is-what';

import { SelectBox } from '~/components/Common';
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
    setValue(fieldName, isMajorValue);
  };

  register(fieldName, {
    validate: (value) => isBoolean(value),
  });

  return (
    <div css={selfCss}>
      <SelectBox
        defaultValue={defaultIsMajor ? Major.MAJOR : Major.NON_MAJOR}
        size="lg"
        items={Object.values(Major)}
        onValueChange={onIsMajorChange}
      />
    </div>
  );
};

const selfCss = css({});
