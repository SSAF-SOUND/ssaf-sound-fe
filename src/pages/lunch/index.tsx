import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import React from 'react';

import { DefaultFullPageLoader, SelectBox } from '~/components/Common';
import { LunchLayout } from '~/components/Layout';
import { LunchTabs, LunchIntroduction } from '~/components/Lunch';
import LunchMenus from '~/components/Lunch/LunchMenus';
import NavigationGroup from '~/components/NavigationGroup';
import { LunchDateSpecifier } from '~/services/lunch/utils';
import { useCampuses } from '~/services/meta';

const validateDateSpecifier = (date: string): date is LunchDateSpecifier => {
  return Object.values(LunchDateSpecifier).includes(date as LunchDateSpecifier);
};

type QueryString = {
  campus: string;
  date: string;
};

const Lunch = () => {
  const router = useRouter();
  const query = router.query as Partial<QueryString>;

  const { data: campuses } = useCampuses();
  const { campus, date } = query;

  const isValidCampus = campus && campuses.includes(campus);
  const isValidDateSpecifier = date && validateDateSpecifier(date);
  const isValidQueryParams = isValidCampus && isValidDateSpecifier;

  if (!isValidQueryParams) {
    const safeCampus = isValidCampus ? campus : campuses[0];
    const safeDateSpecifier = isValidDateSpecifier
      ? date
      : LunchDateSpecifier.TODAY;

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        campus: safeCampus,
        date: safeDateSpecifier,
      },
    });

    return <DefaultFullPageLoader />;
  }

  const onCampusChange = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        campus: value,
      },
    });
  };

  return (
    <LunchLayout>
      <NavigationGroup />
      <LunchIntroduction />
      <CampusSelectBox
        selectedCampus={campus}
        campuses={campuses}
        onCampusChange={onCampusChange}
      />
      <LunchTabs />
      <LunchMenus css={lunchMenusCss} campus={campus} dateSpecifier={date} />
    </LunchLayout>
  );
};

const lunchPageZIndex = {
  lunchMenu: 1,
  selectBox: 2,
};

const lunchMenusCss = css({ zIndex: lunchPageZIndex.lunchMenu });

export default Lunch;

interface CampusSelectBoxProps {
  className?: string;
  selectedCampus: string;
  campuses: string[];
  onCampusChange: (value: string) => void;
}

const CampusSelectBox = (props: CampusSelectBoxProps) => {
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
  zIndex: lunchPageZIndex.selectBox,
});

export async function getServerSideProps() {
  return {
    props: { data: 1 },
  };
}
