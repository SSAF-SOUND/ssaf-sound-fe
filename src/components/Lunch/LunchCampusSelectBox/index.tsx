import { css } from '@emotion/react';
import React from 'react';

import { SelectBox } from '~/components/Common/SelectBox';

interface LunchCampusSelectBoxProps {
  className?: string;
  selectedCampus: string;
  campuses: string[];
  onCampusChange: (value: string) => void;
}

export const LunchCampusSelectBox = (props: LunchCampusSelectBoxProps) => {
  const { selectedCampus, campuses, onCampusChange, className } = props;

  return (
    <div css={campusSelectBoxSelfCss} className={className}>
      <SelectBox
        items={campuses}
        size="lg"
        placeholder="캠퍼스 선택"
        triggerTextAlign="center"
        value={selectedCampus}
        onValueChange={onCampusChange}
      />
    </div>
  );
};

const campusSelectBoxSelfCss = css({
  width: '100%',
});
