const Test = () => {
  return <div>123</div>;
};

// export const getServerSideProps = () => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ['data'],
//     queryFn: getData,
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
