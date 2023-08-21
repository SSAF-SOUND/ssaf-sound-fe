import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import React from 'react';

import { LunchLayout } from '~/components/Layout';
import { LunchPageTitle, LunchTabs, LunchPageLayout } from '~/components/Lunch';
import LunchCard from '~/components/Lunch/LunchCard';

const Lunch = ({ data }: any) => {
  return (
    <LunchPageLayout>
      <LunchPageTitle />
      <LunchTabs />
      <LunchCard />
    </LunchPageLayout>
  );
};

const textCss = css({
  fontSize: 20,
  fontWeight: 500,
  lineHeight: '22.5px',
  letterSpacing: '-1.25',
});

const linkCss = css({
  textDecoration: 'none',
  color: '#000',
});

const highLightCss = css({
  color: 'blue',
});

export default Lunch;

export async function getServerSideProps() {
  return {
    props: { data: 1 },
  };
}
