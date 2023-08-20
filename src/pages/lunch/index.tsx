import React from 'react';

import { LunchPageTitle, LunchTabs, LunchPageLayout } from '~/components/Lunch';
import LunchCard from '~/components/Lunch/LunchCard';

const Lunch = () => {
  return (
    <LunchPageLayout>
      <LunchPageTitle />
      <LunchTabs />
      <LunchCard />
    </LunchPageLayout>
  );
};

export default Lunch;

export async function getServerSideProps() {
  return {
    props: { data: 1 },
  };
}
