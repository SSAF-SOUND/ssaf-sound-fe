import type { GetServerSideProps } from 'next/types';

const Detail = (props: any) => {
  return <div>{Object.values(props.data).join('')}</div>;
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as any;
  const res = await fetch(`http://localhost/recruit/detail`);

  // Only absolute URLs are supported
  const data: any = await res.json();

  console.log(res);
  // 추후에 prefetch 적용
  return {
    props: {
      data: data.data,
    },
  };
};
