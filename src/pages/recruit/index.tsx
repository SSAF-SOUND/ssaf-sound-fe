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
