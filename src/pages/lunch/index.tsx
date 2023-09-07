import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import React, { useEffect } from 'react';

import { PageHead, PageHeadingText } from '~/components/Common';
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
import { routes } from '~/utils';
import { globalMetaData } from '~/utils/metadata';

const metaTitle = '점심 메뉴';
const metaDescription = `${globalMetaData.description} 삼성 청년 SW 아카데미(SSAFY)의 각 캠퍼스별 점심 메뉴를 확인해보세요.`;

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

  const safeCampus = isValidCampus ? campus : campuses[0];
  const safeDateSpecifier = isValidDateSpecifier
    ? dateSpecifier
    : LunchDateSpecifier.TODAY;

  const onCampusChange = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        campus: value,
      },
    });
  };

  useEffect(() => {
    if (isValidQueryParams) return;

    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        campus: safeCampus,
        date: safeDateSpecifier,
      },
    });
  }, [isValidQueryParams, router, safeCampus, safeDateSpecifier]);

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.lunch.self(),
        }}
      />

      <PageHeadingText text={metaTitle} />

      <LunchLayout>
        <NavigationGroup />
        <LunchIntroduction />
        <LunchCampusSelectBox
          css={lunchCampusSelectBoxCss}
          selectedCampus={safeCampus}
          campuses={campuses}
          onCampusChange={onCampusChange}
        />
        <LunchTabs />
        <LunchMenus
          css={lunchMenusCss}
          campus={safeCampus}
          dateSpecifier={safeDateSpecifier}
        />
      </LunchLayout>
    </>
  );
};

const lunchPageZIndex = {
  lunchMenu: 1,
  selectBox: 2,
};

const lunchMenusCss = css({ zIndex: lunchPageZIndex.lunchMenu });
const lunchCampusSelectBoxCss = css({ zIndex: lunchPageZIndex.selectBox });

export default Lunch;
