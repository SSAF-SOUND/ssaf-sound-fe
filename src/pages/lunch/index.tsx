import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import React from 'react';

import { DefaultFullPageLoader } from '~/components/Common';
import { LunchLayout } from '~/components/Layout';
import {
  LunchTabs,
  LunchIntroduction,
  LunchCampusSelectBox,
} from '~/components/Lunch';
import LunchMenus from '~/components/Lunch/LunchMenus';
import NavigationGroup from '~/components/NavigationGroup';
import { LunchDateSpecifier } from '~/services/lunch/utils';
import { useCampuses } from '~/services/meta';

const validateDateSpecifier = (date?: string): date is LunchDateSpecifier => {
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
  const { campus, date: dateSpecifier } = query;

  const isValidCampus = campus && campuses.includes(campus);
  const isValidDateSpecifier =
    dateSpecifier && validateDateSpecifier(dateSpecifier);
  const isValidQueryParams = isValidCampus && isValidDateSpecifier;

  if (!isValidQueryParams) {
    const safeCampus = isValidCampus ? campus : campuses[0];
    const safeDateSpecifier = isValidDateSpecifier
      ? dateSpecifier
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
      <LunchCampusSelectBox
        css={lunchCampusSelectBoxCss}
        selectedCampus={campus}
        campuses={campuses}
        onCampusChange={onCampusChange}
      />
      <LunchTabs />
      <LunchMenus
        css={lunchMenusCss}
        campus={campus}
        dateSpecifier={dateSpecifier}
      />
    </LunchLayout>
  );
};

const lunchPageZIndex = {
  lunchMenu: 1,
  selectBox: 2,
};

const lunchMenusCss = css({ zIndex: lunchPageZIndex.lunchMenu });
const lunchCampusSelectBoxCss = css({ zIndex: lunchPageZIndex.selectBox });

export default Lunch;
