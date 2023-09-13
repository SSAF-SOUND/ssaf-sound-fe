import type { IconNames } from '~/components/Common';
import type { RecruitSummary } from '~/services/recruit';

import { css } from '@emotion/react';
import { useRef } from 'react';

import { Icon, IconButton } from '~/components/Common';
import { Scroll } from '~/components/Common/Scroll';
import { RecruitsPreviewRecruitItem } from '~/components/RecruitsPreview/RecruitsPreviewRecruitItem';
import { recruitPreviewMarginForExpandCssVar } from '~/components/RecruitsPreview/utils';
import { expandCss, flex } from '~/styles/utils';

export interface RecruitsPreviewRecruitListProps {
  recruits: RecruitSummary[];
}

const scrollAmount = 400;
const enum ScrollDirection {
  RIGHT = 1,
  LEFT = -1,
}

export const RecruitsPreviewRecruitList = (
  props: RecruitsPreviewRecruitListProps
) => {
  const { recruits } = props;
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const handleClickScrollButton = (direction: ScrollDirection) => () => {
    const $recruitsItemContainer = scrollViewportRef.current;
    if (!$recruitsItemContainer) return;

    const adjustedScrollAmount = scrollAmount * direction;

    $recruitsItemContainer.scrollBy({
      behavior: 'smooth',
      left: adjustedScrollAmount,
    });
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

      <Scroll.Root css={scrollRootCss}>
        <Scroll.Viewport css={scrollViewportCss} ref={scrollViewportRef}>
          <div css={recruitItemContainerCss}>
            {recruits.map((recruit) => (
              <RecruitsPreviewRecruitItem
                recruit={recruit}
                key={recruit.recruitId}
              />
            ))}
          </div>
        </Scroll.Viewport>
        <Scroll.Bar orientation="horizontal">
          <Scroll.Thumb />
        </Scroll.Bar>
      </Scroll.Root>
    </div>
  );
};

const iconSize = 24;
const iconButtonSize = iconSize + 10;

const scrollRootCss = css(
  {
    height: 180,
  },
  expandCss(recruitPreviewMarginForExpandCssVar.var)
);

const scrollViewportCss = css(
  {
    padding: `0 ${recruitPreviewMarginForExpandCssVar.var} 10px`,
    // scrollBehavior: 'smooth',
    width: '100%',
  },
  flex('center', 'flex-start', 'row', 16)
);

const recruitItemContainerCss = css(flex('center', 'flex-start', 'row', 16));

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
