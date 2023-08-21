import type { GetServerSideProps } from 'next/types';

import Link from 'next/link';

const Recruit = () => {
  return (
    <div>
      <Link
        href={{
          pathname: 'recruit/1',
        }}
      >
        id = 1
      </Link>
      <div>---------------</div>
      <Link
        href={{
          pathname: 'recruit/2',
        }}
      >
        id = 2
      </Link>
    </div>
  );
};

export default Recruit;

export const getServerSideProps: GetServerSideProps = async () => {
  // const res = await fetch(`http://localhost/recruits`);

  // // Only absolute URLs are supported
  // const data: any = await res.json();

  // console.log(res);
  // 추후에 prefetch 적용
  return {
    props: {
      data: 1,
    },
  };
};
