import { css } from '@emotion/react';

import {
  LunchDateSpecifier,
  useLunchMenusWithPollStatus,
} from '~/services/lunch';
import { useCampuses } from '~/services/meta';
import { flex, pageMinWidth, palettes } from '~/styles/utils';

import { LunchMenusPreviewHeader } from './LunchMenusPreviewHeader';
import { LunchMenusPreviewMenuDescription } from './LunchMenusPreviewMenuDescription';

export interface LunchMenusPreviewProps {
  className?: string;
  campus?: string;
}

const dateSpecifier = LunchDateSpecifier.TODAY;

export const LunchMenusPreview = (props: LunchMenusPreviewProps) => {
  const { className, campus } = props;
  const { data: campuses } = useCampuses();
  const safeCampus = campus && campuses.includes(campus) ? campus : campuses[0];

  const { data: lunchMenusWithPollStatus } = useLunchMenusWithPollStatus({
    campus: safeCampus,
    dateSpecifier,
  });

  const lunchMenusViewCount = 3;

  return (
    <div css={selfCss} className={className}>
      <LunchMenusPreviewHeader
        css={{ marginBottom: 16 }}
        campus={safeCampus}
        dateSpecifier={dateSpecifier}
      />

      <div css={menusCss}>
        {lunchMenusWithPollStatus?.menus
          .slice(0, lunchMenusViewCount)
          .map((menu) => {
            return (
              <LunchMenusPreviewMenuDescription
                key={menu.lunchId}
                menu={menu}
              />
            );
          })}
      </div>
    </div>
  );
};

const selfCss = css({
  minWidth: pageMinWidth - 40,
  padding: '10px 0 0',
  borderRadius: 20,
  backgroundColor: palettes.white,
  color: palettes.font.grey,
  overflow: 'hidden',
});

const menusCss = css({ width: '100%' }, flex('center', 'space-between', 'row'));
