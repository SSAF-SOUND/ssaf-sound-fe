import { css } from '@emotion/react';
import { useId, useMemo } from 'react';

import { SelectBox } from '~/components/Common';
import { useStudentCertificationFormContext } from '~/components/StudentCertificationForm/utils';
import { MajorType } from '~/services/member/utils';
import { flex, fontCss } from '~/styles/utils';
import { capitalize } from '~/utils';

const fieldName = 'track';

interface TrackProps {
  onSelect: () => void;
}

export const Track = (props: TrackProps) => {
  const { onSelect } = props;
  const { setValue, register } = useStudentCertificationFormContext();
  const selectBoxId = useId();
  const items = useMemo(() => Object.values(MajorType), []);

  const handleChangeTrack = (value: string) => {
    setValue(fieldName, value as MajorType);
    onSelect();
  };

  register(fieldName, {
    required: true,
  });

  return (
    <div css={selfCss}>
      <label htmlFor={selectBoxId} css={labelCss}>
        <p>SSAFY</p>
        <p>어떤 트랙이신가요?</p>
      </label>

      <SelectBox
        id={selectBoxId}
        items={items}
        textAs={(item) => capitalize(item)}
        size="lg"
        focusOnMount
        onValueChange={handleChangeTrack}
      />
    </div>
  );
};

const selfCss = css({ paddingTop: 80 }, flex('', '', 'column', 32));
const labelCss = css(fontCss.style.B28);
