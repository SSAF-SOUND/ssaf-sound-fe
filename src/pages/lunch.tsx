import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import React from 'react';

import LunchLayout from '~/components/Layout/LunchLayout';
import LunchCard from '~/components/LunchCard';

const Lunch = ({ data }: any) => {
  const router = useRouter();
  return (
    <LunchLayout>
      <div>Select Box</div>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Link
          href={{
            pathname: '/lunch',
            query: { date: 'today' },
          }}
          css={[textCss, linkCss]}
          style={router.query.date === 'today' ? { color: 'blue' } : undefined}
        >
          오늘
        </Link>
        <span>디바이더</span>
        <Link
          href={{
            pathname: '/lunch',
            query: { date: 'tomorrow' },
          }}
          css={[textCss, linkCss]}
          style={
            router.query.date === 'tomorrow' ? { color: 'blue' } : undefined
          }
        >
          내일
        </Link>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 17px;
        `}
      >
        <LunchCard checked mainMenu="돼지갈비" extraMenu="시금치" />
        <LunchCard mainMenu="돼지갈비" extraMenu="시금치" />
      </div>
    </LunchLayout>
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

export default Lunch;

export async function getServerSideProps() {
  return {
    props: { data: 1 },
  };
}
