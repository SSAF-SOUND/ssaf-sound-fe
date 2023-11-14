import type { UseQueryResult } from '@tanstack/react-query';
import type { ReactElement } from 'react';

import { Fragment, memo } from 'react';

import { ErrorMessageWithSsafyIcon } from '~/components/ErrorMessageWithSsafyIcon';

export interface QueryItemListProps<T> {
  query: UseQueryResult<T>;
  skeleton: ReactElement;
  skeletonCount: number;
  className?: string;
  render: (data: T) => ReactElement;
}

export const QueryItemList = <T,>(props: QueryItemListProps<T>) => {
  const { query, skeleton, skeletonCount, className, render } = props;

  const { isLoading, isError, error, isSuccess, data } = query;

  return (
    <div className={className}>
      {isLoading && <Skeletons count={skeletonCount} skeleton={skeleton} />}
      {isError && <ErrorMessageWithSsafyIcon error={error} />}
      {isSuccess && render(data)}
    </div>
  );
};

interface SkeletonsProps {
  count: number;
  skeleton: ReactElement;
}
const Skeletons = memo((props: SkeletonsProps) => {
  const { count, skeleton } = props;
  return (
    <>
      {Array(count)
        .fill(undefined)
        .map((_, index) => (
          <Fragment key={index}>{skeleton}</Fragment>
        ))}
    </>
  );
});

Skeletons.displayName = 'Skeletons';
