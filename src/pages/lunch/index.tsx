import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import React, { useEffect } from 'react';

import { PageHead } from '~/components/Common/PageHead';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import { LunchLayout } from '~/components/Layout';
import {
  LunchTabs,
  LunchIntroduction,
  LunchCampusSelectBox,
} from '~/components/Lunch';
import LunchMenus from '~/components/Lunch/LunchMenus';
import NavigationGroup from '~/components/NavigationGroup';
import {
  LunchDateSpecifier,
  LunchDateSpecifierSet,
} from '~/services/lunch/utils';
import { useCampuses } from '~/services/meta';
import { SsafyCampus, SsafyCampusSet } from '~/services/meta/utils';
import { routes } from '~/utils';
import { globalMetaData } from '~/utils/metadata';

const metaTitle = '점심 메뉴';
const metaDescription = `${globalMetaData.description} 삼성 청년 SW 아카데미(SSAFY)의 각 캠퍼스별 점심 메뉴를 확인해보세요.`;

const validateDateSpecifier = (date?: string): date is LunchDateSpecifier => {
  return !!date && LunchDateSpecifierSet.has(date);
};

type Params = Partial<{
  campus: string;
  date: string;
}>;

const LunchPage = () => {
  const router = useRouter();
  const query = router.query as Params;

  const { data: campuses } = useCampuses();
  const { campus, date: dateSpecifier } = query;

  const isValidCampus = campus && SsafyCampusSet.has(campus);
  const isValidDateSpecifier =
    dateSpecifier && validateDateSpecifier(dateSpecifier);
  const isValidQueryParams = isValidCampus && isValidDateSpecifier;

  const safeCampus = isValidCampus ? campus : SsafyCampus.SEOUL;
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
    if (isValidQueryParams || !router.isReady) return;

    router.replace(
      routes.lunch.detail({
        campus: safeCampus,
        date: safeDateSpecifier,
      })
    );
  }, [isValidQueryParams, router, safeCampus, safeDateSpecifier]);

  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.lunch.self().pathname,
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

      <Footer />
    </>
  );
};

const lunchPageZIndex = {
  lunchMenu: 1,
  selectBox: 2,
};

const lunchMenusCss = css({ zIndex: lunchPageZIndex.lunchMenu });
const lunchCampusSelectBoxCss = css({ zIndex: lunchPageZIndex.selectBox });

export default LunchPage;
