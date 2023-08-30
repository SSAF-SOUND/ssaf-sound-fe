import type { IconNames } from '~/components/Common';
import type { RecruitSummary } from '~/services/recruit';

import { css } from '@emotion/react';
import { useRef } from 'react';

import { Icon, IconButton } from '~/components/Common';
import { RecruitsPreviewRecruitItem } from '~/components/RecruitsPreview/RecruitsPreviewRecruitItem';
import { recruitPreviewMarginForExpandCssVar } from '~/components/RecruitsPreview/utils';
import { flex } from '~/styles/utils';
import { hideScrollBar } from '~/styles/utils/hideScrollBar';

export interface RecruitsPreviewRecruitListProps {
  recruits: RecruitSummary[];
}

const scrollAmount = 300;
const enum ScrollDirection {
  RIGHT = 1,
  LEFT = -1,
}

export const RecruitsPreviewRecruitList = (
  props: RecruitsPreviewRecruitListProps
) => {
  const { recruits } = props;
  const recruitsItemContainerRef = useRef<HTMLDivElement>(null);

  const handleClickScrollButton = (direction: ScrollDirection) => () => {
    const $recruitsItemContainer = recruitsItemContainerRef.current;
    if (!$recruitsItemContainer) return;

    const adjustedScrollAmount = scrollAmount * direction;

    $recruitsItemContainer.scrollLeft =
      $recruitsItemContainer.scrollLeft + adjustedScrollAmount;
  };

  return (
    <div>
      <div css={scrollButtonsLayerCss}>
        <ScrollButton
          iconName="chevron.left"
          label="왼쪽으로 스크롤"
          onClick={handleClickScrollButton(ScrollDirection.LEFT)}
        />

        <ScrollButton
          iconName="chevron.right"
          label="오른쪽으로 스크롤"
          onClick={handleClickScrollButton(ScrollDirection.RIGHT)}
        />
      </div>

      <div css={recruitItemContainerCss} ref={recruitsItemContainerRef}>
        {recruits.map((recruit) => (
          <RecruitsPreviewRecruitItem
            recruit={recruit}
            key={recruit.recruitId}
          />
        ))}
      </div>
    </div>
  );
};

const iconSize = 24;
const iconButtonSize = iconSize + 10;

const recruitItemContainerCss = css(
  {
    margin: `0 calc(-1 * ${recruitPreviewMarginForExpandCssVar.var})`,
    padding: `4px ${recruitPreviewMarginForExpandCssVar.var} 10px`,
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
  },
  flex('center', 'flex-start', 'row', 16),
  hideScrollBar()
);

const scrollButtonsLayerCss = css(
  { marginBottom: 12, marginRight: -8 },
  flex('center', 'flex-end', 'row', 8)
);

const ScrollButton = (props: {
  iconName: IconNames;
  onClick: () => void;
  label: string;
}) => {
  const { iconName, onClick, label } = props;
  return (
    <IconButton size={iconButtonSize} onClick={onClick}>
      <Icon name={iconName} size={iconSize} label={label} />
    </IconButton>
  );
};
