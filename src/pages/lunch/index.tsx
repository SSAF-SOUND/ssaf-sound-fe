import { useRouter } from 'next/router';

import React from 'react';

import { SelectBox } from '~/components/Common';
import { LunchPageTitle, LunchTabs, LunchPageLayout } from '~/components/Lunch';
import LunchCard from '~/components/Lunch/LunchCard';
import NavigationGroup from '~/components/NavigationGroup';
import { useCampuses } from '~/services/meta';

const Lunch = () => {
  return (
    <LunchPageLayout>
      <NavigationGroup />
      <LunchPageTitle />
      <CampusSelectBox />

      <LunchTabs />
      <LunchCard />
    </LunchPageLayout>
  );
};

export default Lunch;

const CampusSelectBox = () => {
  const router = useRouter();
  const { data: campuses } = useCampuses();
  const onValueChange = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        campus: value,
      },
    });
  };

  return (
    <SelectBox
      items={campuses}
      size="lg"
      placeholder="캠퍼스 선택"
      triggerTextAlign="center"
      onValueChange={onValueChange}
    />
  );
};

export async function getServerSideProps() {
  return {
    props: { data: 1 },
  };
}
