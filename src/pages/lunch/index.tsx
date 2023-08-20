import { useRouter } from 'next/router';

import React from 'react';

import { DefaultFullPageLoader, SelectBox } from '~/components/Common';
import { LunchPageTitle, LunchTabs, LunchPageLayout } from '~/components/Lunch';
import LunchCard from '~/components/Lunch/LunchCard';
import NavigationGroup from '~/components/NavigationGroup';
import { LunchDateSpecifier } from '~/services/lunch/utils';
import { useCampuses } from '~/services/meta';

const validateDateSpecifier = (date: string) => {
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
    <LunchPageLayout>
      <NavigationGroup />
      <LunchPageTitle />
      <CampusSelectBox
        selectedCampus={campus}
        campuses={campuses}
        onCampusChange={onCampusChange}
      />
      <LunchTabs />
      <LunchCard />
    </LunchPageLayout>
  );
};

export default Lunch;

const CampusSelectBox = (props: {
  selectedCampus: string;
  campuses: string[];
  onCampusChange: (value: string) => void;
}) => {
  const { selectedCampus, campuses, onCampusChange } = props;

  return (
    <SelectBox
      items={campuses}
      size="lg"
      placeholder="캠퍼스 선택"
      triggerTextAlign="center"
      value={selectedCampus}
      onValueChange={onCampusChange}
    />
  );
};

export async function getServerSideProps() {
  return {
    props: { data: 1 },
  };
}
